import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/components/pages/ProductosPage.css';
import ProductoItem from "../components/productos/ProductoItem";

const ProductosPage = (props) => {

    const [loading, setLoading] = useState(false);
    const [productos, setProductos] = useState([]);

    useEffect( () => {
        const cargarProductos = async () => {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/productos');
            setProductos(response.data);
            setLoading(false);
        };
        cargarProductos();
    }, []);

    return (
        <main className="holder">
            <div className="productos-container">

                { loading ? (
                    <p>Cargando...</p>
                ) : (
                    productos.map(item => <ProductoItem key={item.id} titulo={item.titulo}
                        descripcion={item.descripcion} tipo_objeto={item.tipo_objeto}
                        precio={item.precio} imagen={item.imagen} />)
                )}
            </div>
        </main>
    );
}

export default ProductosPage;