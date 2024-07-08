import { useEffect, useState } from "react";
import { getListByHawas } from "../../api/productos";
import { usePedidos } from "../../context/PedidosContext";
import ClienteLayout from "../../layouts/ClienteLayout";
import { Daum } from "../../interfaces/ResponseListadoProductoDetalle";
import TrProducto from "../../components/Productos/TrProducto";
import Button from "../../components/Button";
import { crearPedido } from "../../api/pedido";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export interface ProductoInfo {
    producto: Daum;
    cantidad: number
}

export default function ResumenPedido() {

    const { pedidos, updatePedidoLoad } = usePedidos();
    const [productos, setProductos] = useState<ProductoInfo[]>([]);
    const [total, setTotal] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const getAllProducts = async () => {
            const hawas = pedidos.productos.map(producto => producto.hawa);
            const res = await getListByHawas(hawas);
            const listInfo = res.data.data;
            const nuevaLista: ProductoInfo[] = listInfo.map((info) => {
                const producto = pedidos.productos.find((p) => p.hawa === info.hawa);
                return {
                    producto: info,
                    cantidad: producto ? producto.cantidad : 0,
                };
            });
            setProductos(nuevaLista);
            console.log(res.data.data);
            const total = nuevaLista.reduce((prev, current) =>
                prev + (current.cantidad *
                    (current.producto.porcentajeDescuento ?
                        (current.producto.precio * (1 - current.producto.porcentajeDescuento / 100)) :
                        current.producto.precio
                    )
                ), 0);
            setTotal(total);
        }
        getAllProducts();
    }, [pedidos]);

    function formatNumber(amount: number) {
        return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
    }

    const realizarPedido = async () => {
        try {
            const res = await crearPedido(pedidos);
            console.log(res);
            updatePedidoLoad({
                productos: []
            });
            navigate("/productos");
            toast(`Creacion del pedido exitoso - ESTATUS: ${res.data.data.estatus}`);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <ClienteLayout>
            <h1 className="m-2 text-4xl text-primary">Resumen</h1>
            <div>
            </div>
            <table className="table-auto w-full">
                <tr className="border-b border-gray">
                    <th scope="col" className="px-6 py-4 text-center">HAWA</th>
                    <th scope="col" className="px-6 py-4 text-center">Nombre</th>
                    <th scope="col" className="px-6 py-4 text-center">Existencias</th>
                    <th scope="col" className="px-6 py-4 text-center">Nombre Tienda</th>
                    <th scope="col" className="px-6 py-4 text-center">Direccion Tienda</th>
                    <th scope="col" className="px-6 py-4 text-center">Contacto Tienda</th>
                    <th scope="col" className="px-6 py-4 text-center">Nombre Vendedor</th>
                    <th scope="col" className="px-6 py-4 text-center">Contacto Vendedor</th>
                    <th scope="col" className="px-6 py-4 text-center">Comprar</th>
                </tr>
                {productos.length > 0 && productos.map(productoPedido => (
                    <TrProducto key={productoPedido.producto.hawa} cantidad={productoPedido.cantidad} producto={productoPedido.producto} />
                ))}
            </table>
            <div className="flex w-full justify-end">
                <div className="m-5">
                    <p>Total: ${formatNumber(total)}</p>
                    <Button id="pedido" handleClick={realizarPedido}>Realizar Pedido</Button>
                </div>
            </div>

        </ClienteLayout>
    )
}
