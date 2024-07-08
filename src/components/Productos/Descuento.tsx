export default function Descuento({ porcentaje }: { porcentaje: number}) {
  return (
    <span className="text-xs px-3 py-1 text-white bg-error-color-secondary rounded-3xl">% {porcentaje}</span>
  )
}
