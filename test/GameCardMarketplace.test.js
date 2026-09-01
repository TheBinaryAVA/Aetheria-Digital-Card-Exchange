const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('GameCardMarketplace', function () {
  let GameCardMarketplace;
  let marketplace;
  let owner;
  let buyer;
  let seller;

  beforeEach(async function () {
    [owner, seller, buyer] = await ethers.getSigners();
    GameCardMarketplace = await ethers.getContractFactory('GameCardMarketplace');
    marketplace = await GameCardMarketplace.deploy();
    await marketplace.waitForDeployment();
  });

  it('should deploy with correct name and symbol', async function () {
    expect(await marketplace.name()).to.equal('Aetheria Cards');
    expect(await marketplace.symbol()).to.equal('AETH');
  });

  it('should mint a token and auto-list it when price is greater than zero', async function () {
    const tokenURI = 'ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbz6y';
    const price = ethers.parseEther('0.75');

    await expect(marketplace.connect(seller).mintCard(tokenURI, price))
      .to.emit(marketplace, 'CardMinted')
      .withArgs(seller.address, 1, tokenURI, price);

    expect(await marketplace.ownerOf(1)).to.equal(seller.address);
    expect(await marketplace.tokenURI(1)).to.equal(tokenURI);

    const listings = await marketplace.fetchMarketItems();
    expect(listings.length).to.equal(1);
    expect(listings[0].tokenId).to.equal(1);
    expect(listings[0].price).to.equal(price);
    expect(listings[0].seller).to.equal(seller.address);
    expect(listings[0].listed).to.equal(true);
  });

  it('should allow a user to list an owned card for sale', async function () {
    const tokenURI = 'ipfs://card-2';
    const initialPrice = ethers.parseEther('1');
    const newPrice = ethers.parseEther('2');

    await marketplace.connect(seller).mintCard(tokenURI, initialPrice);

    await expect(marketplace.connect(seller).listCard(1, newPrice))
      .to.emit(marketplace, 'CardListed')
      .withArgs(1, seller.address, newPrice);

    const listings = await marketplace.fetchMarketItems();
    expect(listings[0].price).to.equal(newPrice);
  });

  it('should transfer ownership and ETH on successful purchase', async function () {
    const tokenURI = 'ipfs://card-3';
    const price = ethers.parseEther('1.5');

    await marketplace.connect(seller).mintCard(tokenURI, price);

    const sellerInitialBalance = await ethers.provider.getBalance(seller.address);
    const buyerInitialBalance = await ethers.provider.getBalance(buyer.address);

    await expect(
      marketplace.connect(buyer).buyCard(1, { value: price })
    ).to.emit(marketplace, 'CardSold')
      .withArgs(1, seller.address, buyer.address, price);

    expect(await marketplace.ownerOf(1)).to.equal(buyer.address);
    const listings = await marketplace.fetchMarketItems();
    expect(listings.length).to.equal(0);

    expect(await ethers.provider.getBalance(seller.address)).to.be.greaterThan(sellerInitialBalance);
    expect(await ethers.provider.getBalance(buyer.address)).to.be.lessThan(buyerInitialBalance);
  });

  it('should return all NFTs owned by the caller', async function () {
    await marketplace.connect(seller).mintCard('ipfs://card-4', 0);
    await marketplace.connect(seller).mintCard('ipfs://card-5', ethers.parseEther('0.5'));

    const owned = await marketplace.connect(seller).fetchMyNFTs();
    expect(owned.length).to.equal(2);
    expect(owned[0]).to.equal(1);
    expect(owned[1]).to.equal(2);
  });

  it('should revert when buying a non-listed card', async function () {
    const tokenURI = 'ipfs://card-6';
    await marketplace.connect(seller).mintCard(tokenURI, 0);

    await expect(marketplace.connect(buyer).buyCard(1, { value: ethers.parseEther('0.1') }))
      .to.be.revertedWith('Token is not listed for sale');
  });

  it('should revert when the buyer sends insufficient ETH', async function () {
    const tokenURI = 'ipfs://card-7';
    const price = ethers.parseEther('1');

    await marketplace.connect(seller).mintCard(tokenURI, price);

    await expect(marketplace.connect(buyer).buyCard(1, { value: ethers.parseEther('0.5') }))
      .to.be.revertedWith('Insufficient ETH sent');
  });
});
