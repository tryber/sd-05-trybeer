import localStorage from './localStorageHandle';

const SERVER_URL = 'http://localhost:3001';

const myInit = {
  mode: 'cors',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

const myInitWithBody = (data, token) => ({
  mode: 'cors',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: token || localStorage.getDataByKey('token') || '',
  },
  body: JSON.stringify(data),
});

// Use esta aqui ou outra que não envolva retorno do retorno do ternário:

// prettier-ignore
const getProducts = () => (
  fetch(`${SERVER_URL}/products`, myInit).then((response) => (
    response
      .json()
      .then((json) => Promise.resolve(json))
      .catch((err) => Promise.reject(err))
  ))
);

// prettier-ignore
const getUser = (data) => (
  fetch(`${SERVER_URL}/`, myInitWithBody(data)).then((response) => (
    response
      .json()
      .then((json) => Promise.resolve(json))
      .catch((err) => Promise.reject(err))))
);

const login = ({ email, password }) => (
  fetch(`${SERVER_URL}/`, myInitWithBody({ email, password }))
    .then((response) => (
      response
        .json()
        .then((json) => Promise.resolve(json))
        .catch((err) => Promise.reject(err))))
);

// prettier-ignore
const updateUser = (data) => {
  const token = localStorage.getDataByKey('token');
  return fetch(`${SERVER_URL}/update`, myInitWithBody(data, token)).then(
    (response) => response
      .json()
      .then((json) => Promise.resolve(json))
      .catch((err) => Promise.reject(err)),
  );
};

// [REFATORAR] - Precisamos retornar o status da requisição para saber se houve um erro
const submitOrderFetch = (data) => (
  fetch(`${SERVER_URL}/sales`, myInitWithBody(data)).then((response) => (
    response
      .json()
      .then((json) => Promise.resolve(json))
      .catch((err) => Promise.reject(err))))
);
// prettier-ignore
const registerUser = (data) => (
  fetch(`${SERVER_URL}/register`, myInitWithBody(data)).then(
    (response) => response
      .json()
      .then((json) => {
        if (json.message) {
          return Promise.reject(json.message);
        }
        return Promise.resolve(json);
      })
      .catch((err) => Promise.reject(err)),
  )
);

const clientSalesByUserId = (id) => fetch(`${SERVER_URL}/sales/user/${id}`, myInitWithBody).then((response) => response
  .json()
  .then((json) => Promise.resolve(json))
  .catch((err) => Promise.reject(err)));

const salesById = (id) => fetch(`${SERVER_URL}/sales/${id}`, myInitWithBody).then((response) => response
  .json()
  .then((json) => Promise.resolve(json))
  .catch((err) => Promise.reject(err)));

const getSalesOrder = () => fetch(`${SERVER_URL}/sales`, myInit).then((response) => response
  .json()
  .then((json) => Promise.resolve(json))
  .catch((err) => Promise.reject(err.response)));

const updateStatusFetchFlag = (data, token) => ({
  mode: 'cors',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: token || '',
  },
  body: JSON.stringify(data),
});

const updateDeliveryStatus = (id, status) => fetch(`${SERVER_URL}/sales/status`, updateStatusFetchFlag({ id, status })).then((response) => response
  .json()
  .then((json) => Promise.resolve(json))
  .catch((err) => Promise.reject(err.response)));

  export default {
    SERVER_URL,
    getProducts,
    getUser,
    login,
    updateUser,
    submitOrderFetch,
    registerUser,
    clientSalesByUserId,
    salesById,
    getSalesOrder,
    updateStatusFetchFlag,
    updateDeliveryStatus,
  };
