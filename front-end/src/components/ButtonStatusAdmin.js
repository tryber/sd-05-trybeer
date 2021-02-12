import React from 'react';
import fetchAdminOrders from '../services/ApiTrybeer'

export default function buttonStatus ({ id }){
  const [status, setStatus] = useState([]);
  if (!status || status === 'Entregue') return <div />;

  return (
    <button
      type="button"
      data-testid="mark-as-delivered-btn"
      onClick={ () => fetchAdminOrders(id).then(setStatus('Entregue')) }
    >
      Marcar como entregue
    </button>
  );
}
