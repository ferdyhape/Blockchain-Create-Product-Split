// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

contract TestProductRegistry {
    address public contractOwner; // Ganti nama variabel kontrak menjadi contractOwner
    
    struct Product {
        uint productId;
        string name;
        string description;
        uint price;
        address owner;
    }

    mapping(uint => Product) public products;
    uint public productCount;

    event ProductAdded(uint productId, string name, string description, uint price, address owner);

    modifier onlyOwner() {
        require(msg.sender == contractOwner, "Only the owner can call this function");
        _;
    }

    constructor() {
        contractOwner = msg.sender;
    }

    function addProduct(string memory _name, string memory _description, uint _price) public onlyOwner {
        productCount++;
        products[productCount] = Product(productCount, _name, _description, _price, msg.sender);
        emit ProductAdded(productCount, _name, _description, _price, msg.sender);
    }

    function getProduct(uint _productId) public view returns (
        string memory name,
        string memory description,
        uint price,
        address productOwner
    ) {
        Product memory product = products[_productId];
        return (product.name, product.description, product.price, product.owner);
    }

    function getAllProducts() public view returns (Product[] memory) {
        Product[] memory allProducts = new Product[](productCount);
        for (uint i = 1; i <= productCount; i++) {
            allProducts[i - 1] = products[i];
        }
        return allProducts;
    }
}
