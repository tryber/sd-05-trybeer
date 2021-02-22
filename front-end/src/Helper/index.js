import io from 'socket.io-client';

import getUserData from './getUserData';
import localstorage from './localStorageHandle';
import fetch from './fetch';

const CART = 'cart';
const CHAT = 'messages';
const MIN = 0;

const socket = io(fetch.SERVER_URL);

const Socket = (component) => {
  return ({ ...props }) => component({ ...props, socket }); 
}

const updateChat = (newMessage) => {
  const currentChat = localstorage.getDataByKey(CHAT);
  localstorage.registerData({ messages: [...currentChat, newMessage] });
}

const getChatMessages = () => localstorage.getDataByKey(CHAT) || [];

const loginUser = async ({ email, password }) => {
  const {
    message = null,
    ...user
  } = await fetch.login({ email, password });
  if (message) return { error: message };
  localstorage.registerData({ token: user.token, messages: user?.user.messages });
  return { user };
}

const transformPrice = (value) => {
  const decimals = 2;
  const valueWith2Decimals = parseFloat(value).toFixed(decimals);
  const valueWithComma = valueWith2Decimals.toString().replace('.', ',');
  return valueWithComma;
};

const getCartInfo = () => {
  const currentCart = localstorage.getDataByKey(CART);
  if (!currentCart) return {};
  return Object.keys(currentCart).reduce((info, id) => {
    const { quantity, price, name } = currentCart[id];
    if (quantity === 0) return info;
    const itemArray = [ ...info.itemArray, { id, price, quantity, name } ];
    const total = info.total += Number(quantity) * Number(price);
    return {
      total,
      itemArray,
    };
  }, { total: 0, itemArray: [] });
};

const getProductFromCartById = (productId) => {
  const currentCart = localstorage.getDataByKey(CART)?.[productId];
  return currentCart || {};
};

const setProductToCart = (product, amount) => {
  const currentCart = localstorage.getDataByKey(CART);
  const item = {
    ...product,
    quantity: Math.max((currentCart[product.id]?.quantity || 0) + amount, 0),
  };
  const cart = { ...currentCart, [product.id]: item };
  localstorage.registerData({ cart });
  return item.quantity;
};

const removeProductFromCartById = (productID) => {
  const currentCart = localstorage.getDataByKey(CART);
  const { [productID]: product, ...cart } = currentCart;
  localstorage.registerData({ cart });
  return cart;
};

const transformDate = (date) => new Date(date)
  .toLocaleDateString('pt-br', {
    day: '2-digit',
    month: '2-digit',
  });

// Essa função gera chaves aleatórias para as iterações de map
const generateKey = (prefix) => `${prefix}-${Math.random()}`;

const initialAccumulator = MIN;
const totalPriceOfProducts = (products) => products.reduce(
  (acc, product) => acc + product.quantity * product.price,
  initialAccumulator,
);

export default {
  fetch,
  generateKey,
  getCartInfo,
  getChatMessages,
  getProductFromCartById,
  getUserData,
  localstorage,
  loginUser,
  removeProductFromCartById,
  setProductToCart,
  Socket,
  socket,
  totalPriceOfProducts,
  transformDate,
  transformPrice,
  updateChat,
};
