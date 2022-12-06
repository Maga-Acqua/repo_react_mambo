import React, { useState } from 'react';
import axios from 'axios';
import '../styles/components/pages/ContactoPage.css';

const ContactoPage = (props) => {
    const initialForm = {
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    }
    const [sending, setSending] = useState(false);
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState(initialForm);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(oldData => ({
            ...oldData,
            [name]: value
        }));
    }
    const handleSubmit = async e => {
        e.preventDefault();
        setMsg('');
        setSending(true);
        const response = await axios.post('http://localhost:3000/api/contacto', formData);
        setSending(false);
        setMsg(response.data.message);
        if(response.data.error === false){
            setFormData(initialForm);
        }
    }
    return (
        <main className="holder contacto-container">
            <div className="contacto">
                <h2>Contacto</h2>
                <form className="formulario" onSubmit={handleSubmit}>
                    <p>
                        <label htmlFor="nombre" aria-required="true">Nombre</label>
                        <input type="text" name="nombre" value={formData.nombre} 
                            onChange={handleChange} />
                    </p>
                    <p>
                        <label htmlFor="email" aria-required="true">Email</label>
                        <input type="email" name="email" value={formData.email}
                            onChange={handleChange} />
                    </p>
                    <p>
                        <label htmlFor="tel">Tel&eacute;fono</label>
                        <input type="tel" name="telefono" value={formData.telefono}
                            onChange={handleChange} />
                    </p>
                    <p>
                        <label htmlFor="mensaje">Mensaje</label>
                        <textarea name="mensaje" value={formData.mensaje} onChange={handleChange}></textarea>
                    </p>
                    {sending ? <p>Enviando...</p> : null}
                    {msg ? <p>{msg}</p> : null}
                    <p>
                        <input type="submit" value="Enviar" />
                    </p>
                </form>
            </div>
            <section className="section-redes-contacto">
                <div className="section-col">
                    <img src="images/flor_amarilla.jpg" alt="Flor amarilla" />
                </div>
                <div className="section-col">
                    <p>Te invito a seguirme en mis redes</p>
                    <ul>
                        <li><img src="images/instagram-logo.png" alt="Logo instagram" /><a href="">@mamboarte</a></li>
                        <li><img src="images/facebook-logo.png" alt="Logo facebook" /><a href="">Mambo Arte</a></li>
                        <li><img src="images/linkedin-logo.png" alt="Logo linkedin" /><a href="">/MamboArte </a></li>
                        <li><img src="images/behance-logo.png" alt="Logo linkedin" /><a href="">/MamboArte </a></li>
                    </ul>
                </div>
            </section>
        </main>
    );
}

export default ContactoPage;