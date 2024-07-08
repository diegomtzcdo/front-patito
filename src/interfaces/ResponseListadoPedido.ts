export interface ResponseListadoPedido {
    success: boolean
    data: Daum[]
    message: string
}

export interface Daum {
    pedidoId: number
    clienteNombre: string
    clienteDireccion: string
    clienteCorreo: string
    fecha: string
    cantidadArticulos: number
    estatus: "PENDIENTE" | "ENTREGADO" | "CANCELADO"
}
