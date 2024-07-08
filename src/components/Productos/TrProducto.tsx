import { Daum } from "../../interfaces/ResponseListadoProductoDetalle";
import Comprar from "./Comprar";

interface TrProductoType {
    producto: Daum;
    cantidad: number;
}

export default function TrProducto(props: TrProductoType) {

    const { cantidad: cantidadInicial } = props;
    const { hawa, nombre, precio, existencias, porcentajeDescuento, nombreVendedor, contactoVendedor, tienda } = props.producto;
    const { nombre: nombreTienda, direccion: direccionTienda, telefono: contactoTienda } = tienda;

    return (
        <tr className="border-b border-gray">
            <td className="whitespace-nowrap px-6 py-4 text-center">{hawa}</td>
            <td className="whitespace-nowrap px-6 py-4 text-center">{nombre}</td>
            <td className="whitespace-nowrap px-6 py-4 text-center">{existencias}</td>
            <td className="whitespace-nowrap px-6 py-4 text-center">{nombreTienda}</td>
            <td className="whitespace-nowrap px-6 py-4 text-center">{direccionTienda}</td>
            <td className="whitespace-nowrap px-6 py-4 text-center">{contactoTienda}</td>
            <td className="whitespace-nowrap px-6 py-4 text-center">{nombreVendedor}</td>
            <td className="whitespace-nowrap px-6 py-4 text-center">{contactoVendedor}</td>

            <td>
                <Comprar 
                    cantidadInicial={cantidadInicial} 
                    existencias={existencias} 
                    hawa={hawa} 
                    nombre={nombre} 
                    precio={precio} 
                    porcentajeDescuento={porcentajeDescuento}/>
            </td>
        </tr>
    )
}
