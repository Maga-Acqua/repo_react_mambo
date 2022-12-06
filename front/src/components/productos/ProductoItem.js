import React from 'react';

const PoductoItem = (props) => {
    const { titulo, descripcion, tipo_objeto, precio, imagen} = props;
    return (
        <div className="producto">
            <img src={imagen} alt="imagen" />
            <h4>{titulo}</h4>
            <p className="tipoObjeto">{tipo_objeto}</p>
            <p className="precio">$ {precio}</p>
            <p className="descripcion">{descripcion}</p>
        </div>
    );
};

export default PoductoItem;