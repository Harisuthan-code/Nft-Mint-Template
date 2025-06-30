// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {BasicNFTMinter} from "../src/BasicNFTMinter.sol";

contract BasicNFTMinterScript is Script {
    BasicNFTMinter public basicNFTMinter;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        basicNFTMinter = new BasicNFTMinter(1000 , "ipfs://baseuri");

        vm.stopBroadcast();
    }
}
