export interface ResponsePedidoCreado {
    success: boolean
    data: Data
    message: string
}

export interface Data {
    pedidoId: number
    clienteNombre: string
    clienteDireccion: string
    clienteCorreo: string
    fecha: string
    cantidadArticulos: number
    estatus: string
}
