import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Data } from "../../interfaces/ResponseProductosDetalle";
import { getByHawa } from "../../api/productos";
import Descuento from "../../components/Productos/Descuento";
import ClienteLayout from "../../layouts/ClienteLayout";

export default function DetalleProducto() {

    const { hawa } = useParams();

    const [producto, setProducto] = useState<Data | null>(null);


    useEffect(() => {
        const obtenerProducto = async () => {
            try {
                const res = await getByHawa(hawa || '');
                setProducto(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (hawa && hawa != '') {
            obtenerProducto();
        }
    }, [hawa]);

    if (!producto) return <ClienteLayout><h1>Loading...</h1></ClienteLayout>;

    return (
        <ClienteLayout>

            <div className="flex bg-white shadow-lg gap-4 p-3 m-2 rounded-md justify-center items-center flex-col align-middle">
                <div>
                    <img src="/pato.webp" alt={producto.hawa} width={256} height={256} />
                </div>
                <h1 className="text-4xl">{producto.nombre}</h1>
                <p>$ {producto.precio} {producto.porcentajeDescuento && <Descuento key={producto.hawa} porcentaje={producto.porcentajeDescuento} />}</p>
                <p>Existencias: {producto.existencias}</p>
                <div className="w-[50%]">
                    <h2 className="text-2xl">Tienda</h2>
                    <table className="table-auto w-full">
                        <tr className="border-b border-gray">
                            <th scope="col" className="px-6 py-4 text-center">Nombre</th>
                            <th scope="col" className="px-6 py-4 text-center">Dirección</th>
                            <th scope="col" className="px-6 py-4 text-center">Telefono</th>
                        </tr>
                        <tr className="border-b border-gray">
                            <td className="whitespace-nowrap px-6 py-4 text-center">{producto.tienda.nombre}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-center">{producto.tienda.direccion}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-center">{producto.tienda.telefono}</td>
                        </tr>
                    </table>
                </div>
                <div className="w-[50%]">
                    <h2 className="text-2xl">Vendedor</h2>
                    <table className="table-auto w-full">
                        <tr className="border-b border-gray">
                            <th scope="col" className="px-6 py-4 text-center">Nombre</th>
                            <th scope="col" className="px-6 py-4 text-center">Contacto</th>
                        </tr>
                        <tr className="border-b border-gray">
                            <td className="whitespace-nowrap px-6 py-4 text-center">{producto.nombreVendedor}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-center">{producto.contactoVendedor}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </ClienteLayout>
    );
}
