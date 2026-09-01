const axios = require('axios');

async function pinMetadataToPinata({
  name,
  description,
  image,
  rarity,
  attack,
  defense,
  jwt,
}) {
  if (!jwt) {
    throw new Error('Pinata JWT is required');
  }

  const metadata = {
    name,
    description,
    image,
    attributes: [
      { trait_type: 'Rarity', value: rarity },
      { trait_type: 'Attack', value: attack },
      { trait_type: 'Defense', value: defense },
    ],
  };

  try {
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      metadata,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      ipfsHash: response.data.IpfsHash,
      uri: `ipfs://${response.data.IpfsHash}`,
      metadata,
    };
  } catch (error) {
    throw new Error(`Unable to pin metadata to IPFS: ${error.message}`);
  }
}

module.exports = { pinMetadataToPinata };
