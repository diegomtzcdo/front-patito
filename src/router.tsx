import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './views/Login';
import { ProtectedRoute } from './routes/ProtectedRoute';
import Producto from './views/Productos/Productos';
import { AuthProvider } from './context/AuthContext';
import DetalleProducto from './views/Productos/DetalleProducto';
import { PedidosProvider } from './context/PedidosContext';
import ResumenPedido from './views/Productos/ResumenPedido'
import Pedidos from './views/Pedidos/Pedidos';
import DetallePedido from './views/Pedidos/DetallePedido';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/',
        element: <ProtectedRoute />,
        children: [
            {
                path: '/productos',
                element: <Producto />
            },
            {
                path: '/producto/:hawa',
                element: <DetalleProducto />
            },
            {
                path: '/resumen',
                element: <ResumenPedido/>
            },
            {
                path: '/pedidos',
                element: <Pedidos />
            },
            {
                path: '/pedido/:id',
                element: <DetallePedido/>
            }
        ]
    }
]);

export default function AppRouter() {
    return (
        <AuthProvider>
            <PedidosProvider>

                <RouterProvider router={router} />
            </PedidosProvider>
        </AuthProvider>
    );
}