export interface ResponseProductosDetalle {
    success: boolean
    data: Data
    message: string
}

export interface Data {
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
