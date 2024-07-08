import { useState } from "react";
import { usePedidos } from "../../context/PedidosContext";
import { toast } from "react-toastify";
import Button from "../Button";
import { Producto } from "../../interfaces/PedidoLoad";
import formatNumber from "../../utils/formatoDinero";

interface ComprarType {
    cantidadInicial: number;
    existencias: number;
    hawa: string;
    nombre: string;
    precio: number;
    porcentajeDescuento: number;
}

export default function Comprar(props: ComprarType) {

    const { cantidadInicial, existencias, hawa, nombre, precio, porcentajeDescuento } = props;

    const [cantidad, setCantidad] = useState(cantidadInicial);
    const [error, setError] = useState('');

    const { pedidos, updatePedidoLoad } = usePedidos();

    const onBuy = () => {
        console.log('comprar');
        if (cantidad <= 0) return setError('Debes agregar al menos 1 del producto');
        if (cantidad > existencias) return setError(`Solo hay ${existencias} disponibles`);
        if (pedidos) {
            const itemExists = pedidos.productos.findIndex((producto: Producto) => producto.hawa === hawa);
            if (itemExists >= 0) {
                const updateProductos = [...pedidos.productos];
                updateProductos[itemExists].cantidad += cantidad;
                if (updateProductos[itemExists].cantidad > existencias) updateProductos[itemExists].cantidad = existencias;
                updatePedidoLoad({
                    productos: updateProductos
                });
            } else {
                const updateProductos = [...pedidos.productos];
                updateProductos.push({
                    cantidad: cantidad,
                    hawa: hawa
                })
                updatePedidoLoad({
                    productos: updateProductos
                });
            }
            toast(`${nombre} agregado con exito`);
        }
    };

    return (
        <div className="flex flex-col bg-white-secondary rounded-lg py-3 px-10 align-middle items-center">
            {error && (
                <p className="mt-2 text-sm text-error-color dark:text-error-color">
                    {error}
                </p>
            )}
            <p>
                Comprar: <input onChange={(e) => setCantidad(+e.target.value)} min={1} max={existencias} className="w-10 p-2 m-2 rounded-sm" type="number" placeholder="1" value={cantidad} />
            </p>
            <p>Precio Unitario: ${formatNumber(porcentajeDescuento ? (precio * (1 - porcentajeDescuento / 100) ) : precio)}</p>
            <p>Total: ${formatNumber(porcentajeDescuento ? (precio * (1 - porcentajeDescuento / 100) ) * cantidad : precio * cantidad)}</p>
            <Button id={"comprar"} handleClick={onBuy} isDisabled={existencias <= 0}>
                Comprar
            </Button>
        </div>
    )
}
