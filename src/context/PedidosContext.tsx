import { createContext, useContext, useEffect, useState } from "react";
import { PedidoLoad } from "../interfaces/PedidoLoad";
import { getCookie, setCookie } from "typescript-cookie";

interface PedidosContextType {
    pedidos: PedidoLoad; 
    updatePedidoLoad: (pedidosLoad: PedidoLoad) => void;
}

const PedidosContext = createContext<PedidosContextType | undefined>(undefined);

export const usePedidos = () => {
  const context = useContext(PedidosContext);
  if (!context) throw new Error("usePedidos must be used within a PedidosProvider");
  return context;
};

export function PedidosProvider({ children }: { children: React.ReactNode }) {
  const [pedidos, setPedido] = useState<PedidoLoad>({ productos: []});

  const updatePedidoLoad = (pedidosLoad: PedidoLoad) => {
    console.log('pedidos to save: ', pedidosLoad);
    setCookie('pedidos', JSON.stringify(pedidosLoad));
    setPedido(pedidosLoad);
  };

  useEffect(() => {
    const checkPedidos = async () => {
        const cookiePedidos = getCookie('pedidos');
        if(cookiePedidos) {
            const pedidosLoad: PedidoLoad = JSON.parse(cookiePedidos);
            setPedido(pedidosLoad);
            return;
        }
    };
    checkPedidos();
}, []);

  return (
    <PedidosContext.Provider
      value={{
        pedidos,
        updatePedidoLoad
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
}
