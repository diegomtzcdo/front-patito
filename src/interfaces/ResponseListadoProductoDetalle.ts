export interface ResponseListadoProductoDetalle {
    success: boolean
    data: Daum[]
    message: string
}

export interface Daum {
    hawa: string
    nombre: string
    precio: number
    existencias: number
    porcentajeDescuento: number
    nombreVendedor: string
    contactoVendedor: string
    tienda: Tienda
}

export interface Tienda {
    nombre: string
    direccion: string
    telefono: string
}
