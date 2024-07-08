import { ResponseListadoProductoDetalle } from '../interfaces/ResponseListadoProductoDetalle';
import { ResponseProductos } from '../interfaces/ResponseProductos';
import { ResponseProductosDetalle } from '../interfaces/ResponseProductosDetalle';
import axiosInstance from './axiosAuth';

export const listadoProductos = async () => axiosInstance.get<ResponseProductos>(`/producto/todos`);

export const getByHawa = async (hawa: string) => axiosInstance.get<ResponseProductosDetalle>(`/producto/${hawa}`);

export const getListByHawas = async(hawas: string[]) => axiosInstance.post<ResponseListadoProductoDetalle>(`/producto/detalles`, hawas);