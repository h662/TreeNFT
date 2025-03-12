// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IFruitToken {
    function mint(address to, uint amount) external;
}

contract TreeNFT is ERC721Enumerable, Ownable {
    IFruitToken public fruitToken;
    mapping(uint => uint) public lastClaimTime;

    // One day - 86400
    uint constant REWARD_INTERVAL = 120;

    string metadataURI = "https://slime-project.mypinata.cloud/ipfs/bafkreifjbr2r32owrbqdjogstvpcjncgadcepphxs3cmf7h7bmofsdlq6u";

    constructor(address _fruitTokenAddress) ERC721("Tree NFT", "TREE") Ownable(msg.sender) {
        fruitToken = IFruitToken(_fruitTokenAddress);
    }

    function mintNFT() external {
        uint tokenId = totalSupply();

        _safeMint(msg.sender, tokenId);

        lastClaimTime[tokenId] = block.timestamp;
    }

    function claimRewards(uint[] calldata tokenIds) external  {
        uint totalReward = 0;
        for (uint i = 0; i < tokenIds.length; i++) {
            require(ownerOf(tokenIds[i]) == msg.sender, "Caller is not NFT owner.");

            uint lastTime = lastClaimTime[tokenIds[i]];
            uint daysPassed = (block.timestamp - lastTime) / REWARD_INTERVAL;

            if (daysPassed > 0) {
                totalReward += daysPassed;
                lastClaimTime[tokenIds[i]] = lastTime + daysPassed * REWARD_INTERVAL;
            }
        }
        require(totalReward > 0, "No rewards available");
        fruitToken.mint(msg.sender, totalReward * 1e18);
    }

    function tokenURI(uint tokenId) public override view returns(string memory) {
        require(tokenId <= totalSupply(), "Not exist NFT.");
        
        return metadataURI;
    }
}