import { getDataByKey } from './localStorageHandle';

const localhostURL = 'http://localhost:3001';

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
    Authorization: token || getDataByKey('token') || '',
  },
  body: JSON.stringify(data),
});

// Use esta aqui ou outra que não envolva retorno do retorno do ternário:

// prettier-ignore
export const getProducts = () => (
  fetch(`${localhostURL}/products`, myInit).then((response) => (
    response
      .json()
      .then((json) => Promise.resolve(json))
      .catch((err) => Promise.reject(err))
  ))
);

// prettier-ignore
export const getUser = (data) => (
  fetch(`${localhostURL}/`, myInitWithBody(data)).then((response) => (
    response
      .json()
      .then((json) => Promise.resolve(json))
      .catch((err) => Promise.reject(err))))
);

export const login = ({ email, password }) => (
  fetch(`${localhostURL}/`, myInitWithBody({ email, password }))
    .then((response) => (
      response
        .json()
        .then((json) => Promise.resolve(json))
        .catch((err) => Promise.reject(err))))
);

// prettier-ignore
export const updateUser = (data) => {
  const token = getDataByKey('token');
  return fetch(`${localhostURL}/update`, myInitWithBody(data, token)).then(
    (response) => response
      .json()
      .then((json) => Promise.resolve(json))
      .catch((err) => Promise.reject(err)),
  );
};

// [REFATORAR] - Precisamos retornar o status da requisição para saber se houve um erro
export const submitOrderFetch = (data) => (
  fetch(`${localhostURL}/sales`, myInitWithBody(data)).then((response) => (
    response
      .json()
      .then((json) => Promise.resolve(json))
      .catch((err) => Promise.reject(err))))
);
// prettier-ignore
export const registerUser = (data) => (
  fetch(`${localhostURL}/register`, myInitWithBody(data)).then(
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

export const clientSalesByUserId = (id) => fetch(`${localhostURL}/sales/user/${id}`, myInitWithBody).then((response) => response
  .json()
  .then((json) => Promise.resolve(json))
  .catch((err) => Promise.reject(err)));

export const salesById = (id) => fetch(`${localhostURL}/sales/${id}`, myInitWithBody).then((response) => response
  .json()
  .then((json) => Promise.resolve(json))
  .catch((err) => Promise.reject(err)));

export const getSalesOrder = () => fetch(`${localhostURL}/sales`, myInit).then((response) => response
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

export const updateDeliveryStatus = (id, status) => fetch(`${localhostURL}/sales/status`, updateStatusFetchFlag({ id, status })).then((response) => response
  .json()
  .then((json) => Promise.resolve(json))
  .catch((err) => Promise.reject(err.response)));
