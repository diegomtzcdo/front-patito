export interface ResponseProductos {
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
}
