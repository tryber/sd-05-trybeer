const magicNumber = -1;
export default (pathname) => ({
  '/profile': 'Meu perfil',
  '/products': 'TryBeer',
  '/checkout': 'Finalizar Pedido',
  '/orders': 'Meus Pedidos',
  '/admin/messages': 'Conversas',
  '/admin/orders': 'Pedidos',
  [`/orders/${pathname.split('/').slice(magicNumber)}`]: 'Detalhes de pedido',
}[pathname]);
