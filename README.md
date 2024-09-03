
# Decentralized Identity Management System (DIMS)

This project is a Decentralized Identity Management System (DIMS) built using blockchain technology. It leverages a decentralized architecture to provide secure and tamper-proof identity management, ensuring privacy and security for the user data. The system uses React and Tailwind CSS for the frontend, Express.js and MongoDB for the backend, and Ethereum Blockchain with Solidity smart contracts, powered by Ganache, Ether.js, and Hardhat for blockchain interactions.


# Tech Stack

# Frontend
React.js: For building the user interface.
Tailwind CSS: For styling and responsive design.

# Backend
Node.js & Express.js: To manage API routes and business logic.
MongoDB: For storing user data and session details.
# Blockchain
Ethereum: The platform used for deploying smart contracts.
Solidity: The language used to write smart contracts.
Ganache: Local Ethereum blockchain for development and testing.
Ether.js: For interacting with the Ethereum blockchain and smart contracts.
Hardhat: For smart contract compilation, deployment, and testing.

# Installation and Setup
Prerequisites
Make sure you have the following installed:

Node.js (>= 14.x.x)
MongoDB
Ganache (for local blockchain simulation)
MetaMask (for connecting to the blockchain)
Hardhat (for smart contract deployment and testing)


# Usage
Access the Frontend: Visit http://localhost:3000 in your browser to interact with the decentralized identity management system.
User Authentication: Users can create decentralized identities, and log in using blockchain-based authentication.
Smart Contract Interaction: The app will interact with the Ethereum blockchain via MetaMask, securely managing user identities through deployed smart contracts.

# Project Structure

spark5 -India-Hackathon
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── app.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── public/
├── contracts/
│   ├── IdentityManagement.sol
│   └── migrations/
├── scripts/
│   └── deploy.js
└── hardhat.config.js


# License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
Special thanks to the Ethereum community for their valuable resources and tutorials.
Tools and libraries used: Hardhat, Ganache, Ether.js, MetaMask, Solidity.


