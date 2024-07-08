import { NuevoEstatus } from '../interfaces/NuevoEstatus';
import { PedidoLoad } from '../interfaces/PedidoLoad';
import { ResponseDetallePedido } from '../interfaces/ResponseDetallePedido';
import { ResponseListadoPedido } from '../interfaces/ResponseListadoPedido';
import { ResponsePedidoCreado } from '../interfaces/ResponsePedidoCreado';
import { ResponsePedidoDTO } from '../interfaces/ResponsePedidoDTO';
import axiosInstance from './axiosAuth';

export const crearPedido = async(pedido: PedidoLoad) => axiosInstance.post<ResponsePedidoCreado>(`/pedido/crear`, pedido);

export const obtenerListado = async() => axiosInstance.get<ResponseListadoPedido>(`/pedido/todos`);

export const cambiarEstatus = async(id: number, nuevoEstatus: NuevoEstatus) => axiosInstance.post<ResponsePedidoDTO>(`/pedido/cambiar-estatus/${id}`, nuevoEstatus);

export const detallePedido = async(id: number) => axiosInstance.get<ResponseDetallePedido>(`/pedido/detalle/${id}`);
