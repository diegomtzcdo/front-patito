export interface ResponseDetallePedido {
    success: boolean
    data: Data
    message: string
}

export interface Data {
    pedidoId: number
    cliente: Cliente
    productos: Producto[]
    fecha: string
    estatus: string
}

export interface Cliente {
    email: string
    nombre: string
    direccion: string
    telefono: string
}

export interface Producto {
    producto: Producto2
    cantidad: number
}

export interface Producto2 {
    hawa: string
    nombre: string
    precio: number
    existencias: number
    porcentajeDescuento: number
}
