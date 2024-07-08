import { useEffect, useState } from "react";
import { detallePedido } from "../../api/pedido";
import { Data } from "../../interfaces/ResponseDetallePedido";
import ClienteLayout from "../../layouts/ClienteLayout";
import { useParams } from "react-router-dom";
import Descuento from "../../components/Productos/Descuento";
import formatoDinero from "../../utils/formatoDinero";
import Estatus from "../../components/Pedidos/Estatus";

export default function DetallePedido() {

    const { id } = useParams();

    const [pedido, setPedido] = useState<Data | null>(null);

    const [total, setTotal] = useState<number | undefined>(0);

    useEffect(() => {
        const obtenerPedido = async () => {
            try {
                const res = await detallePedido(id || '0');
                setPedido(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (id) {
            obtenerPedido();
        }
    }, [id]);

    useEffect(() => {
        const total = pedido?.productos.reduce((total, producto) => {
            const { precio, porcentajeDescuento } = producto.producto;
            const { cantidad } = producto;
            return total + cantidad * precio * (1 - (porcentajeDescuento ? porcentajeDescuento : 0) / 100)
        }, 0);
        setTotal(total);
    }, [pedido])

    if (!pedido) return <ClienteLayout><h1>Loading...</h1></ClienteLayout>;

    return (
        <ClienteLayout>
            <div className="p-4">
                <div className="flex align-middle justify-between items-center">
                    <h1 className="m-2 text-4xl text-primary">Detalle Pedido</h1>
                    <div className="flex align-middle gap-4 items-center">
                        <p className="text-xl text-inactive">{pedido.fecha}</p>
                        <p><Estatus estatus={pedido.estatus} pedidoId={pedido.pedidoId} onClickEstatus={() => { }} /></p>
                    </div>
                </div>
                <h3 className="m-2 text-2lg text-primary">Cliente</h3>
                <div className="bg-white-secondary shadow-lg rounded-lg gap-14 p-2 flex flex-wrap justify-start align-middle items-center">
                    <div className="flex gap-3 align-middle items-start m-2 flex-col">
                        <p className="font-bold ">Correo:</p>
                        <p className="font-light">{pedido.cliente.direccion}</p>
                    </div>
                    <div className="flex gap-3 align-middle items-start m-2 flex-col">
                        <p className="font-bold ">Nombre:</p>
                        <p className="font-light ">{pedido.cliente.nombre}</p>
                    </div>
                    <div className="flex gap-3 align-middle items-start m-2 flex-col">
                        <p className="font-bold ">Direccion:</p>
                        <p className="font-light ">{pedido.cliente.direccion}</p>
                    </div>
                    <div className="flex gap-3 align-middle items-start m-2 flex-col">
                        <p className="font-bold ">Teléfono:</p>
                        <p className="font-light ">{pedido.cliente.telefono}</p>
                    </div>
                </div>
                <h3 className="m-2 text-2lg text-primary">Productos</h3>
                <table className="table-auto w-full">
                    <tr className="border-b border-gray">
                        <th scope="col" className="px-6 py-4 text-center">HAWA</th>
                        <th scope="col" className="px-6 py-4 text-center">Nombre</th>
                        <th scope="col" className="px-6 py-4 text-center">Existencias</th>
                        <th scope="col" className="px-6 py-4 text-center">Precio</th>
                        <th scope="col" className="px-6 py-4 text-center">Descuento</th>
                        <th scope="col" className="px-6 py-4 text-center">Cantidad</th>
                        <th scope="col" className="px-6 py-4 text-center">Subtotoal</th>

                    </tr>
                    {pedido.productos.map(producto => (
                        <tr className="border-b border-gray">
                            <td className="whitespace-nowrap px-6 py-4 text-center">{producto.producto.hawa}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-center">{producto.producto.nombre}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-center">{producto.producto.existencias}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-center">{formatoDinero(producto.producto.precio)}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-center">{producto.producto.porcentajeDescuento ? <Descuento porcentaje={producto.producto.porcentajeDescuento} /> : 'Sin Descuento'}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-center">{producto.cantidad}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-center">{formatoDinero(producto.cantidad * (producto.producto.precio * (1 - producto.producto.porcentajeDescuento / 100)))}</td>
                        </tr>
                    ))}
                    <tr className="border-b border-gray">
                        <td className="whitespace-nowrap px-6 py-4 text-center">-</td>
                        <td className="whitespace-nowrap px-6 py-4 text-center">-</td>
                        <td className="whitespace-nowrap px-6 py-4 text-center"></td>
                        <td className="whitespace-nowrap px-6 py-4 text-center">-</td>
                        <td className="whitespace-nowrap px-6 py-4 text-center">-</td>
                        <th scope="col" className="px-6 py-4 text-center">Total:</th>
                        <td className="whitespace-nowrap px-6 py-4 text-center">{formatoDinero(total || 0)}</td>
                    </tr>
                </table>
            </div>
        </ClienteLayout>
    )
}
