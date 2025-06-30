// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract BasicNFTMinter is ERC721 , Ownable , Pausable  {
     
    uint256 public  maxSupply;
    uint256 public  currentTokenId;
    string public baseURI;
    mapping (address => bool) public Minted;


    constructor(uint256 max_supply , string memory base_Uri) ERC721("MyNFT" , "NFT") Ownable(){

        maxSupply = max_supply;
        baseURI = base_Uri;

    }

    function publicMint() external whenNotPaused {
    require(maxSupply > currentTokenId  , "Max supply reached");
    require(!Minted[msg.sender] , "You already minted");
    currentTokenId  += 1;
    Minted[msg.sender]= true;
    _safeMint(msg.sender, currentTokenId );
    }

    function ownerMint(address to) external  onlyOwner{

    require(maxSupply > currentTokenId  , "Max supply reached");
    require(!Minted[to] , "You already minted");
    currentTokenId  += 1;
    Minted[to] = true;
    _safeMint(to, currentTokenId );

    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
    require(tokenId > 0 && tokenId <= currentTokenId, "Invalid token id");
    return string(abi.encodePacked(getbaseURI(), "/", Strings.toString(tokenId), ".json"));
   
   }

    function setBaseURI(string memory New_Base_uri) external onlyOwner{

        baseURI = New_Base_uri;

    }

    function gettotalsupply() external view returns (uint256){

        return currentTokenId;
    }

    function getbaseURI() public view returns (string memory){

        return  baseURI;
    }

    function checkyourownership(uint256 token_id) external view returns (bool){

        return ownerOf(token_id) == msg.sender;
    }


   function pause() public onlyOwner {

    _pause();

   }

    function unpause() public onlyOwner {

     _unpause();
   
    }




    
}