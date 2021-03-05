import helper from '../../Helper';

export const REQUEST_USER_SALES_SUCCESS = 'REQUEST_USER_SALES_SUCCESS';
export const REQUEST_USER_SALES_ERROR = 'REQUEST_USER_SALES_ERROR';
export const REQUESTING_SALES = 'REQUESTING_SALES';

const requestingSales = () => ({
  type: REQUESTING_SALES,
});

const requestUserSalesSuccess = (data) => ({
  type: REQUEST_USER_SALES_SUCCESS,
  data,
});

const requestProductsError = (error) => ({
  type: REQUEST_USER_SALES_ERROR,
  error,
});

export function getUserSalesAct(id) {
  return (dispatch) => {
    dispatch(requestingSales());
    return helper.fetch.clientSalesByUserId(id).then(
      (data) => dispatch(requestUserSalesSuccess(data)),
      (error) => dispatch(requestProductsError(error)),
    );
  };
}
