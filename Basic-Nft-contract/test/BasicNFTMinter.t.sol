// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/BasicNFTMinter.sol"; 

contract BasicNFTMinterTest is Test {
    BasicNFTMinter public nft;
    address public owner = address(this); 
    address public user1 = vm.addr(1);
    address public user2 = vm.addr(2);

    function setUp() public {
        nft = new BasicNFTMinter(3, "ipfs://baseuri");
    }

    function testPublicMintWorks() public {
        vm.prank(user1);
        nft.publicMint();

        assertEq(nft.ownerOf(1), user1);
        assertEq(nft.gettotalsupply(), 1);

        vm.prank(user1);
        assertTrue(nft.checkyourownership(1));
    }

    function testOnlyOneMintPerAddress() public {
        vm.prank(user1);
        nft.publicMint();

        vm.expectRevert("You already minted");
        vm.prank(user1);
        nft.publicMint();
    }

    function testOwnerMintWorks() public {
        nft.ownerMint(user2);
        assertEq(nft.ownerOf(1), user2);
        assertTrue(nft.checkyourownership(1) == false);
    }

    function testTokenURI() public {
        vm.prank(user1);
        nft.publicMint();
        string memory expected = "ipfs://baseuri/1.json";
        assertEq(nft.tokenURI(1), expected);
    }

    function testPauseUnpause() public {
        nft.pause();
        vm.expectRevert("Pausable: paused");
        vm.prank(user1);
        nft.publicMint();

        nft.unpause();
        vm.prank(user1);
        nft.publicMint();
        assertEq(nft.ownerOf(1), user1);
    }

    function testMaxSupplyReached() public {
        vm.prank(user1);
        nft.publicMint();

        nft.ownerMint(user2);
        nft.ownerMint(vm.addr(3));

        // 4th mint should fail
        vm.expectRevert("Max supply reached");
        nft.ownerMint(vm.addr(4));
    }

    function testUpdateBaseURI() public {
        nft.setBaseURI("ipfs://newbase");
        assertEq(nft.getbaseURI(), "ipfs://newbase");
    }

    function testCheckYourOwnership() public {
        vm.prank(user1);
        nft.publicMint();

        vm.prank(user1);
        bool owns = nft.checkyourownership(1);
        assertTrue(owns);
    }
}
