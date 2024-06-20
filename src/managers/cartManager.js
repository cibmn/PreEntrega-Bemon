import fs from "fs";
import { v4 as uuid } from "uuid";

let carts = [];
const path = "./src/managers/data/carts.json";

const getCarts = async () => {
  const cartsJson = await fs.promises.readFile(path, "utf-8");
  carts = JSON.parse(cartsJson) || [];

  return carts;
};

const createCart = async () => {
  await getCarts();
  const newCart = {
    id: uuid(),
    products: [],
  };

  carts.push(newCart);

  await fs.promises.writeFile(path, JSON.stringify(carts));

  return newCart;
};

const getCartById = async (cid) => {
  await getCarts();
  const cart = carts.find((c) => c.id === cid);
  return cart;
};

const addProductToCart = async (cid, pid) => {
  await getCarts();
  const cartIndex = carts.findIndex((c) => c.id === cid);

  if (cartIndex === -1) {
    throw new Error("Carrito no encontrado");
  }

  const cart = carts[cartIndex];

  const existingProductIndex = cart.products.findIndex((p) => p.product === pid);

  if (existingProductIndex !== -1) {
    cart.products[existingProductIndex].quantity++;
  } else {
    cart.products.push({ product: pid, quantity: 1 });
  }

  // Guardar los cambios 
  await fs.promises.writeFile(path, JSON.stringify(carts));

  return cart;
};

export default {
  createCart,
  getCartById,
  addProductToCart,
};
