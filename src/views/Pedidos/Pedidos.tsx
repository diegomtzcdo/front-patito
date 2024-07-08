import { useEffect, useState } from "react";
import { cambiarEstatus, obtenerListado } from "../../api/pedido";
import { Daum } from "../../interfaces/ResponseListadoPedido";
import ClienteLayout from "../../layouts/ClienteLayout";
import TrPedido from "../../components/Pedidos/TrPedido";
import Estatus from "../../components/Pedidos/Estatus";
import { toast } from "react-toastify";
import Modal from 'react-modal'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export default function Pedidos() {

    const [pedidos, setPedidos] = useState<Daum[]>([]);

    useEffect(() => {
        getAllPedidos();
    }, []);

    const getAllPedidos = async () => {
        const res = await obtenerListado();
        setPedidos(res.data.data);
        console.log(res.data.data);
    }

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentPedido, setCurrentPedido] = useState<number>(0);

    const onHandleClickEstatus = (pedidoId: number) => {
        console.log(pedidoId);
        setCurrentPedido(pedidoId);
        const pedidoFound = pedidos.find(p => p.pedidoId = pedidoId);
        if(pedidoFound){
            if(pedidoFound.estatus == "PENDIENTE") {
                setModalIsOpen(true);
            }
        }
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    const changeEstatus = async (estatus: "PENDIENTE" | "ENTREGADO" | "CANCELADO") => {
        try {
            const res = await cambiarEstatus(currentPedido, { nuevoEstatus: estatus });
            console.log(res.data.data);
            toast(res.data.message);
        } catch (error) {
            console.log(error);
            toast(`Ocurrio un Error`);
        }
        setModalIsOpen(false);
    }

    return (
        <ClienteLayout>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Cambiar Estutus"
            >
                <h2 className="text-lg ">Cambiar Estatus</h2>
                <button onClick={closeModal}>close</button>
                <div className="m-2">
                    <div>Deseas cambiar el estatus?<br />De ser asi, haz click en el nuevo estatus</div>
                    <div className="flex grap-2">

                        <Estatus estatus={"ENTREGADO"} pedidoId={currentPedido} onClickEstatus={() => {
                            changeEstatus("ENTREGADO");
                        }} />
                        <Estatus estatus={"CANCELADO"} pedidoId={currentPedido} onClickEstatus={() => {
                            changeEstatus("CANCELADO");
                        }} />
                    </div>
                </div>
            </Modal>
            <h1 className="m-2 text-4xl text-primary">Pedidos</h1><table className="table-auto w-full">
                <tr className="border-b border-gray">
                    <th scope="col" className="px-6 py-4 text-center">Cliente Nombre</th>
                    <th scope="col" className="px-6 py-4 text-center">Cliente Direccion</th>
                    <th scope="col" className="px-6 py-4 text-center">Cliente Correo</th>
                    <th scope="col" className="px-6 py-4 text-center">Fecha</th>
                    <th scope="col" className="px-6 py-4 text-center">Cantidad de Articulos</th>
                    <th scope="col" className="px-6 py-4 text-center">Estatus</th>
                </tr>
                {pedidos.length > 0 && pedidos.map(pedido => (
                    <TrPedido
                        key={pedido.pedidoId}
                        onHandleClick={onHandleClickEstatus}
                        info={pedido} />
                ))}
            </table>
        </ClienteLayout>
    )
}
