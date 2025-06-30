import React, { useState } from "react";
import { ethers } from "ethers";
import { abi } from "../../../Basic-Nft-contract/out/BasicNFTMinter.sol/BasicNFTMinter.json";

const Walletconnect = () => {
  // Contract Info
  const contractAbi = abi;
  const contractAddress = "0x8464135c8F25Da09e49BC8782676a84730C318bC";

  // =========================
  // State Management
  // =========================
  const [account, setAccount] = useState(null);
  const [contract, setcontract] = useState(null);
  const [tokenid, settokenid] = useState(null);
  const [disbutton, setdisbutton] = useState(false);

  // =========================
  // Check if Wallet Connected
  // =========================
  const checkWalletConnected = () => {
    if (!account) {
      alert("Connect your wallet first.");
      return false;
    }
    return true;
  };

  // =========================
  // Connect Wallet
  // =========================
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install it to connect your wallet.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const sign = await provider.getSigner();
      const cont = new ethers.Contract(contractAddress, contractAbi, sign);
      setcontract(cont);
      console.log("Connected account:", accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // =========================
  // Mint NFT Function
  // =========================
  const Mintfunction = async () => {
    setdisbutton(true);

    if (!checkWalletConnected()) {
      setdisbutton(false);
      return;
    }

    try {
      const tx = await contract.publicMint();
      await tx.wait();
      alert("Minted");
    } catch (error) {
      if (error && error.reason) {
        alert(error.reason); // e.g. "You already minted"
      } else {
        alert("Mint failed. Try again later.");
      }
    }

    setdisbutton(false);
  };

  // =========================
  // Check Ownership
  // =========================
  const checkownership = async () => {
    if (!checkWalletConnected()) return;

    try {
      const tokenId = Number(tokenid);
      const result = await contract.checkyourownership(tokenId);

      if (result) {
        alert("You are the owner of this Token");
      } else {
        alert("You are not the owner of this Token");
      }
    } catch (error) {
      alert("Something went wrong. Try again later");
    }
  };

  // =========================
  // Get Token URI
  // =========================
  const gettokenURI = async () => {
    if (!checkWalletConnected()) return;

    try {
      const tokenId = Number(tokenid);
      const result = await contract.tokenURI(tokenId);
      alert(result);
    } catch (error) {
      if (error && error.response) {
        alert(error.response);
      } else {
        alert("Something went wrong. Try again later");
      }
    }
  };

  // =========================
  // Get Total Supply
  // =========================
  const gettotalsupply = async () => {
    if (!checkWalletConnected()) return;

    try {
      const result = await contract.gettotalsupply();
      alert(result);
    } catch (error) {
      alert(error);
    }
  };

  // =========================
  // UI Rendering
  // =========================
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">

      {/* Connect Wallet Button */}
      <button
        onClick={connectWallet}
        className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition w-full max-w-xs"
      >
        {account ? "Wallet Connected" : "Connect Wallet"}
      </button>

      {/* Display Connected Account */}
      {account ? (
        <p className="mt-4 text-gray-700 text-center max-w-xs break-words">
          Connected account: <span className="font-mono">{account}</span>
        </p>
      ) : (
        <p className="mt-4 text-gray-700 text-center max-w-xs">
          Please connect your wallet to continue.
        </p>
      )}

      {/* Functional Buttons & Inputs */}
      <div className="max-w-3xl w-full bg-white rounded-md shadow-md p-6 mt-10 space-y-6">

        {/* Mint NFT */}
        <div className="border border-gray-300 rounded-md p-4 flex flex-col items-center">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition w-full max-w-xs"
            onClick={Mintfunction}
            disabled={disbutton}
          >
            {disbutton ? "Minting..." : "Mint NFT"}
          </button>
          <p className="mt-2 text-gray-600 text-center">
            Call the mint function to mint a new NFT (only when not paused).
          </p>
        </div>

        {/* Token URI */}
        <div className="border border-gray-300 rounded-md p-4 flex flex-col items-center">
          <input
            type="number"
            placeholder="Enter token ID"
            className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs text-center"
            onChange={(e) => settokenid(e.target.value)}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full max-w-xs"
            onClick={gettokenURI}
          >
            Get Token URI
          </button>
          <p className="mt-2 text-gray-600 text-center">
            View the metadata URI of a specific token ID.
          </p>
        </div>

        {/* Total Supply */}
        <div className="border border-gray-300 rounded-md p-4 flex flex-col items-center">
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition w-full max-w-xs"
            onClick={gettotalsupply}
          >
            Get Total Supply
          </button>
          <p className="mt-2 text-gray-600 text-center">
            Returns the total number of NFTs minted.
          </p>
        </div>

        {/* Check Ownership */}
        <div className="border border-gray-300 rounded-md p-4 flex flex-col items-center">
          <input
            type="number"
            placeholder="Enter your token ID"
            className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs text-center"
            onChange={(e) => settokenid(e.target.value)}
          />
          <button
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition w-full max-w-xs"
            onClick={checkownership}
          >
            Check Ownership
          </button>
          <p className="mt-2 text-gray-600 text-center">
            Verify if you own the specified token ID.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Walletconnect;
