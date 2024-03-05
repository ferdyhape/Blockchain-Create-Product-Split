import Web3 from "web3";
import dotenv from "dotenv";
dotenv.config();

const {
  CONTRACT_ADDRESS_GOERLI,
  CONTRACT_ADDRESS_SEPOLIA,
  INFURA_URL_API, // HANDLING GOERLI ETH USING INFURA
  ALCHEMY_URL_API, // HANDLING SEPOLIA ETH USING ALCHEMY
  MY_WALLET_PRIVATE_KEY,
  MY_WALLET_ADDRESS,
} = process.env;

const web3 = new Web3(INFURA_URL_API);

export const smartContractConfig = {
  ABI: [
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
  ],
  contractAddress: CONTRACT_ADDRESS_GOERLI, // ADDRESS FOR GOERLI
  // contractAddress: CONTRACT_ADDRESS_SEPOLIA, // ADDRESS FOR SEPOLIA
};

export const createContractInstance = async () => {
  const ABI = smartContractConfig.ABI;
  const contractAddress = smartContractConfig.contractAddress;
  const contract = new web3.eth.Contract(ABI, contractAddress);
  return contract;
};

export const sendRawTx = async (name, description, price) => {
  try {
    const nonce = await web3.eth.getTransactionCount(MY_WALLET_ADDRESS);
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 3000000;
    const contractABI = smartContractConfig.ABI;
    const contractAddress = smartContractConfig.contractAddress;
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const data = contract.methods
      .addProduct(name, description, price)
      .encodeABI();
    const rawTx = {
      nonce: web3.utils.toHex(nonce),
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      to: contractAddress,
      value: "0x00",
      data: data,
    };
    const signedTx = await web3.eth.accounts.signTransaction(
      rawTx,
      MY_WALLET_PRIVATE_KEY
    );
    const sentTx = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log("Transaction hash:", sentTx.transactionHash);
    return sentTx.transactionHash;
  } catch (error) {
    console.error("Error sending raw transaction:", error);
    throw error;
  }
};
