import { Daum } from "../../interfaces/ResponseListadoPedido";
import Estatus from "./Estatus";

interface TrPedidoProps {
    onHandleClick: (pedidoId: number) => void;
    info: Daum
}

export default function TrPedido(props: TrPedidoProps) {

    const { pedidoId, clienteNombre, clienteDireccion, clienteCorreo, fecha, cantidadArticulos, estatus } = props.info;
    const { onHandleClick } = props;

    const onHandleClickEstatus = (pedidoId: number) => {
        console.log(pedidoId);
        onHandleClick(pedidoId);
    }

    return (
        <tr className="border-b border-gray">
            <td className="whitespace-nowrap px-6 py-4 text-center">{clienteNombre} {pedidoId}</td>
            <td className="whitespace-nowrap px-6 py-4 text-center">{clienteDireccion}</td>
            <td className="whitespace-nowrap px-6 py-4 text-center">{clienteCorreo}</td>
            <td className="whitespace-nowrap px-6 py-4 text-center">{fecha}</td>
            <td className="whitespace-nowrap px-6 py-4 text-center">{cantidadArticulos}</td>

            <td>
                <Estatus estatus={estatus} pedidoId={pedidoId} onClickEstatus={onHandleClickEstatus} />
            </td>
        </tr>
    )
}
