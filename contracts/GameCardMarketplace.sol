// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract GameCardMarketplace is ERC721URIStorage, Ownable, ReentrancyGuard {
    uint256 private _tokenIds;

    struct MarketItem {
        uint256 tokenId;
        address seller;
        address owner;
        uint256 price;
        bool sold;
        bool listed;
    }

    mapping(uint256 => MarketItem) private _marketItems;
    mapping(address => uint256[]) private _ownedTokens;

    event CardMinted(address indexed minter, uint256 indexed tokenId, string tokenURI, uint256 price);
    event CardListed(uint256 indexed tokenId, address indexed seller, uint256 price);
    event CardSold(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price);

    constructor() ERC721("Aetheria Cards", "AETH") Ownable(msg.sender) {}

    function mintCard(string memory tokenURI, uint256 price) public returns (uint256) {
        _tokenIds += 1;
        uint256 newTokenId = _tokenIds;

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        _ownedTokens[msg.sender].push(newTokenId);

        if (price > 0) {
            _listToken(msg.sender, newTokenId, price);
        }

        emit CardMinted(msg.sender, newTokenId, tokenURI, price);
        return newTokenId;
    }

    function listCard(uint256 tokenId, uint256 price) public {
        require(_exists(tokenId), "Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "Not owner of token");
        require(price > 0, "Price must be greater than zero");

        _listToken(msg.sender, tokenId, price);
    }

    function buyCard(uint256 tokenId) public payable nonReentrant {
        require(_exists(tokenId), "Token does not exist");

        MarketItem storage item = _marketItems[tokenId];
        require(item.listed, "Token is not listed for sale");
        require(!item.sold, "Token already sold");
        require(msg.value >= item.price, "Insufficient ETH sent");

        address seller = item.seller;
        uint256 salePrice = item.price;

        item.owner = msg.sender;
        item.seller = msg.sender;
        item.price = 0;
        item.sold = true;
        item.listed = false;

        _transfer(seller, msg.sender, tokenId);

        (bool success, ) = payable(seller).call{value: salePrice}("");
        require(success, "ETH transfer failed");

        if (msg.value > salePrice) {
            (bool refundSuccess, ) = payable(msg.sender).call{value: msg.value - salePrice}("");
            require(refundSuccess, "Refund failed");
        }

        emit CardSold(tokenId, seller, msg.sender, salePrice);
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 totalCount = _tokenIds;
        uint256 activeCount = 0;

        for (uint256 i = 1; i <= totalCount; i++) {
            if (_marketItems[i].listed) {
                activeCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](activeCount);
        uint256 index = 0;

        for (uint256 i = 1; i <= totalCount; i++) {
            if (_marketItems[i].listed) {
                items[index] = _marketItems[i];
                index += 1;
            }
        }

        return items;
    }

    function fetchMyNFTs() public view returns (uint256[] memory) {
        return _ownedTokens[msg.sender];
    }

    function _listToken(address seller, uint256 tokenId, uint256 price) internal {
        require(ownerOf(tokenId) == seller, "Seller must own token");

        _marketItems[tokenId] = MarketItem({
            tokenId: tokenId,
            seller: seller,
            owner: seller,
            price: price,
            sold: false,
            listed: true
        });

        emit CardListed(tokenId, seller, price);
    }
}
