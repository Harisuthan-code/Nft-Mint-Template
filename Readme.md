# 📄 README: BasicNFTMinter – Free Public NFT Minting Contract

🧾 What is This?


This is a simple and free public NFT minting contract.
Perfect for artists, creators, indie hackers, and early-stage founders who want to launch an NFT collection with zero cost.


✨ Anyone can mint 1 NFT (free, just pay gas)

🔒 Owner has control (pause minting, change metadata)

💾 Metadata stored via IPFS (or any custom base URI)

✅ Built with OpenZeppelin & Foundry

⚙️ Clean and gas-efficient

💡 Use Case Example

Let’s say Liya is an artist.
She draws 50 cool digital animals and wants to let her fans mint them for free.
She just deploys this contract, sets the IPFS URL, and shares it.

Boom — instant mint site.

⚙️ Features
Feature	Description
✅ publicMint()	Anyone can mint 1 NFT per wallet
👑 ownerMint()	Owner can mint 1 NFT to any wallet
🔒 pause() / unpause()	Emergency stop switch for safety
🧠 tokenURI()	Metadata is dynamic: baseURI/tokenId.json
📝 setBaseURI()	Owner can update metadata URI anytime
🔍 checkyourownership()	Anyone can check if they own a token
📊 totalSupply()	Returns how many NFTs are minted so far

🛠️ Tech Stack
✅ Solidity ^0.8.20

✅ OpenZeppelin Contracts

✅ Foundry for building, testing, and deploying

✅ Clean Frontend (React + Ethers.js) – optional UI to test minting

📦 Installation
Install Foundry (if you don’t have it):

```
curl -L https://foundry.paradigm.xyz | bash
foundryup

```

Clone this repo and install dependencies:

```
git clone https://github.com/yourname/BasicNFTMinter.git
cd BasicNFTMinter
forge install openzeppelin/openzeppelin-contracts


```


🚀 Deploy Contract (Using Foundry)


Update deployment script with your desired values:

maxSupply

baseURI (e.g., ipfs://Qm123abc)

Deploy via Foundry script or manually using Remix or Hardhat (works with all tools).

🧪 Testing (Already Done for You ✅)

✅ User can mint once

✅ Owner can mint once

✅ Minting is blocked when paused

✅ tokenURI() returns correct link

✅ Total supply increases correctly

You can run tests with:

```
forge test
```


🧙‍♂️ How to Use (Step-by-Step)


Deploy the contract

Call setBaseURI() with your IPFS or metadata URL

Users call publicMint() to mint their NFT

You (owner) can use pause() if anything breaks

Users can view metadata using tokenURI(tokenId)

🧠 Tips

Store metadata on Pinata or NFT.Storage

Always test minting before sharing publicly

Keep your private key secure when deploying

💙 Credits
Built with love by a solo indie dev.

📄 License
MIT License – Use it freely, just don’t remove the credit. 🙏



### 💬 Got Feedback or Ideas?

I’d love to hear what you think!

👉 Fill out this quick form: [Feedback Form](https://forms.gle/a1E8R1DbXEP81mru8)  
Or DM me on Linkdin: [Hari Suthan]

Your feedback helps shape future tools 🙌
