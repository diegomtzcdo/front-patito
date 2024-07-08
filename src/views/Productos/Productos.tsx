import { useEffect, useState } from "react";
import ClienteLayout from "../../layouts/ClienteLayout";
import { Daum } from "../../interfaces/ResponseProductos";
import { listadoProductos } from "../../api/productos";
import ProductoCard from "../../components/Productos/ProductoCard";

export default function Productos() {

  const [productos, setProductos] = useState<Daum[]>([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    const res = await listadoProductos();
    setProductos(res.data.data);
    console.log(res.data.data);
  }

  return (
    <ClienteLayout>
      {productos.length > 0 && productos.map((producto) => (
        <ProductoCard key={producto.hawa} producto={producto} />
      ))}
    </ClienteLayout>
  );
}
