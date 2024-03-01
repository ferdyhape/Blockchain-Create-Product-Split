import { createContractInstance } from "../config/smartContract.js";

export const getProducts = async (req, res) => {
  try {
    const contract = await createContractInstance();
    const products = await contract.methods.getAllProducts().call();
    console.log(products);
    const mappedProducts = products.map((product) => {
      return {
        productId: product.productId,
        name: product.name,
        description: product.description,
        price: product.price,
        owner: product.owner,
      };
    });
    res.json(mappedProducts);
  } catch (error) {
    console.error("Error fetching products from contract:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get product by id
export const getProductById = async (req, res) => {
  const { id } = req.params;
  const contract = await createContractInstance();
  const product = await contract.methods.getProduct(id).call();
  const mappedProduct = {
    productId: product.productId,
    name: product.name,
    description: product.description,
    price: product.price,
    owner: product.productOwner,
  };
  res.json(mappedProduct);
};

// create product
export const createProduct = async (req, res) => {
  const { name, description, price, userAddress } = req.body;
  console.log(name, description, price, userAddress);
  const contract = await createContractInstance();
  const response = await contract.methods
    .addProduct(name, description, price)
    .send({
      from: userAddress,
      gasPrice: 0,
    });
  res.json(response);
};
