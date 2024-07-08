export default function Estatus({ estatus, pedidoId, onClickEstatus }: 
    { estatus: "PENDIENTE" | "ENTREGADO" | "CANCELADO", pedidoId: number, onClickEstatus: (pedidoId: number) => void }) {
  
    const onHandleClick = () => {
        onClickEstatus(pedidoId);
    }
  
   return (
    <div onClick={onHandleClick} className={`w-[120px] p-2 text-white rounded-3xl flex gap-1 align-middle items-center ${estatus == "PENDIENTE" ? 'bg-warning-color cursor-pointer' : (estatus == "ENTREGADO" ? 'bg-success-color' : 'bg-error-color')}`}>
        <div className="w-[6px] h-[6px] rounded-full bg-[#ffffff67]"></div>
        <p>{estatus}</p>
    </div>
  )
}
