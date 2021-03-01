export const SET_SOCKET = 'SET_SOCKET';

const startSocket = (payload) => ({
  type: SET_SOCKET,
  payload,
});

export function initializeSocket() {
  return (dispatch) => {
    dispatch(startSocket());
    return io(fetch.SERVER_URL).then(
      
/*       (data) => dispatch(startSocket(data)),
      (error) => dispatch(requestProductsError(error)), */
    );
  };
}