import { Link } from "react-router-dom";
import { Daum } from "../../interfaces/ResponseProductos";
import Button from "../Button";
import Descuento from "./Descuento";
import { useEffect, useState } from "react";
import { Producto } from "../../interfaces/PedidoLoad";
import { usePedidos } from "../../context/PedidosContext";
import { toast } from "react-toastify";

interface ProductoCardType {
    producto: Daum
}

export default function ProductoCard(props: ProductoCardType) {

    const [error, setError] = useState('');
    const [cantidad, setCantidad] = useState(1);
    
    const { pedidos, updatePedidoLoad } = usePedidos();
    
    const { nombre, hawa, existencias, precio, porcentajeDescuento } = props.producto;

    const [disponibles, setDisponibles] = useState(existencias);

    useEffect(() => {
        const checkDisponibles = () => {
            if(pedidos) {
                const itemExists = pedidos.productos.findIndex((producto: Producto) => producto.hawa === hawa);
                if (itemExists >= 0) {
                    setDisponibles(existencias - pedidos.productos[itemExists].cantidad);
                }
            }
        }
        checkDisponibles();
    }, [pedidos, existencias, hawa]);

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

    function formatNumber(amount: number) {
        return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
    }

    return (
        <div className="flex bg-white shadow-lg gap-4 p-3 m-2 rounded-md justify-between">
            <Link to={`/producto/${hawa}`}>
                <div className="flex justify-center align-middle items-center gap-4">
                    <div>
                        <img src="/pato.webp" alt={hawa} width={128} height={128} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold uppercase">{nombre}</h1>
                        <div className="flex items-center align-middle gap-2">
                            <h2 className="text-base">${formatNumber(porcentajeDescuento ? precio - porcentajeDescuento / 100 * precio : precio)}</h2>
                            {porcentajeDescuento && <div className="flex items-center justify-center align-middle gap-2">
                                <p className="line-through text-xs">${formatNumber(precio)}</p> <Descuento porcentaje={porcentajeDescuento} />
                            </div>}
                        </div>
                        <p>{hawa}</p>
                        <p>Disponibles {disponibles}</p>
                    </div>
                </div>
            </Link>

            <div className="flex flex-col bg-white-secondary rounded-lg py-3 px-10 align-middle items-center">
                {error && (
                    <p className="mt-2 text-sm text-error-color dark:text-error-color">
                        {error}
                    </p>
                )}
                <p>
                    Comprar: <input onChange={(e) => setCantidad(+e.target.value)} min={1} max={existencias} className="w-10 p-2 m-2 rounded-sm" type="number" placeholder="1" value={cantidad} />
                </p>
                <p>Total: ${formatNumber(porcentajeDescuento ? (precio - porcentajeDescuento / 100 * precio) * cantidad : precio * cantidad)}</p>
                <Button id={"comprar"} handleClick={onBuy} isDisabled={existencias <= 0}>
                    Comprar
                </Button>
            </div>
        </div>
    )
}
