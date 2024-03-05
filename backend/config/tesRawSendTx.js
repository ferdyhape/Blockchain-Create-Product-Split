import Web3 from "web3";
import dotenv from "dotenv";
dotenv.config();

export const tesRawSendTx = async (name, description, price, userAddress) => {
  try {
    console.log(name, description, price, userAddress);

    // Initialize web3 instance
    const web3 = new Web3(process.env.INFURA_URL_API);

    // Retrieve nonce
    const nonce = await web3.eth.getTransactionCount(userAddress);

    // Set gas price and gas limit
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 3000000; // You may need to adjust the gas limit according to your contract's complexity

    // Load contract ABI and address
    const contractABI = [
      {
        inputs: [
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "string",
            name: "_description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_price",
            type: "uint256",
          },
        ],
        name: "addProduct",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "productId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            indexed: false,
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "ProductAdded",
        type: "event",
      },
      {
        inputs: [],
        name: "contractOwner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getAllProducts",
        outputs: [
          {
            components: [
              {
                internalType: "uint256",
                name: "productId",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "string",
                name: "description",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "price",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "owner",
                type: "address",
              },
            ],
            internalType: "struct TestProductRegistry.Product[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_productId",
            type: "uint256",
          },
        ],
        name: "getProduct",
        outputs: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "productOwner",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "productCount",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "products",
        outputs: [
          {
            internalType: "uint256",
            name: "productId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ]; // Load your contract ABI here
    const contractAddress = process.env.CONTRACT_ADDRESS_GOERLI;

    // Create contract instance
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Encode contract method call data
    const data = contract.methods
      .addProduct(name, description, price)
      .encodeABI();

    // Construct raw transaction object
    const rawTx = {
      nonce: web3.utils.toHex(nonce),
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      to: contractAddress,
      value: "0x00",
      data: data,
    };

    // Sign transaction
    const signedTx = await web3.eth.accounts.signTransaction(
      rawTx,
      process.env.PRIVATE_KEY
    );

    // Send raw transaction
    const sentTx = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    console.log("Transaction hash:", sentTx.transactionHash);

    return sentTx.transactionHash; // Return transaction hash if successful
  } catch (error) {
    console.error("Error sending raw transaction:", error);
    throw error;
  }
};
