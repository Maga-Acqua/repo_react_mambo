import React from 'react';

const PoductoItem = (props) => {
    const { titulo, descripcion, tipo_objeto, precio, imagen} = props;
    return (
        <div className="producto">
            <img src={imagen} alt="Imagen" />
            <h4>{titulo}</h4>
            <p>{tipo_objeto}</p>
            <p>{descripcion}</p>
            <p>{precio}</p>
        </div>
    );
};

export default PoductoItem;