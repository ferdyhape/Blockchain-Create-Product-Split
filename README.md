# Create Product | Blockchain Based

## Table of Contents

1. [Preview](#preview)
2. [Description](#description)
3. [Tech Stack](#tech-stack)
4. [How to Use](#how-to-use)
5. [About Creator](#about-creator)

## Preview
<p align="center">
  <img src="https://github.com/ferdyhape/Split-Solidity-Express-Blockchain/assets/75787853/dea0f045-1d52-4df4-8dd1-378680f7fca9" width="90%" height="90%">
</p>

## Description

- This repository is made for learning the block

## Tech Stack

- [x] Solidity
- [x] Express.js
- [x] Web3.js
- [x] Remix IDE
- [x] Bootstrap 5.0.2
- [x] Node.js

## How to Use

1.  Create Account on [Infura](https://infura.io/) or [Alchemy](https://www.alchemy.com/) and get the API Key for Ethereum testnet (in this case I use Goerli from Infura and Sepolia from Alchemy)
2.  Copy smart contract code from file **Backend/TestProductRegistry.sol** and paste it to [Remix IDE](https://remix.ethereum.org/)
3.  Compile the smart contract and deploy it to Ethereum testnet (adjust the network to Goerli or Sepolia, depends on your API Key)

4.  Clone this repository
    ```
    git clone https://github.com/ferdyhape/Split-Solidity-Express-Blockchain.git
    ```
5.  Copy paste **.env.example** file and rename as **.env**
6.  Adjust the **.env** file

    ```
    APP_PORT = 5000
    INFURA_URL_API = "YOUR_INFURA_API_KEY"
    ALCHEMY_URL_API = "YOUR_ALCHEMY_API_KEY"
    CONTRACT_ADDRESS_GOERLI = "YOUR_CONTRACT_ADDRESS" // You can get this from Remix IDE
    CONTRACT_ADDRESS_SEPOLIA = "YOUR_CONTRACT_ADDRESS" // You can get this from Remix IDE
    MY_WALLET_PRIVATE_KEY = "YOUR_WALLET_PRIVATE_KEY" // You can get this from your wallet
    MY_WALLET_ADDRESS = "YOUR_WALLET_ADDRESS" // You can get this from your wallet
    ```

7.  Open your terminal and go to the backend folder

    ```
    cd backend
    ```

8.  Install all backend dependencies

    ```
    npm install
    ```

9.  Run the backend server
    ```
    npm start
    ```
10. Open new terminal and go to the frontend folder
    ```
    cd frontend
    ```
11. Install all frontend dependencies
    ```
    npm install
    ```
12. Run the frontend server
    ```
    npm start
    ```
13. Open your browser and go to `http://localhost:3000`
14. You can create a new product by filling the form
15. You can see the list of products that have been created by clicking the `Read Contract` button
16. Enjoy use!

### About Creator

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ferdy-hahan-pradana)
[![instagram](https://img.shields.io/badge/instagram-833AB4?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/ferdyhape)
[![github](https://img.shields.io/badge/github-333?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ferdyhape)
