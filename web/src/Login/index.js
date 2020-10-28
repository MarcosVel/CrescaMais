import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../services/api';

import './style.css';

import imgUser from '../assets/imgUser.svg';

export default function Login() {
    const [id, setId] = useState('');
    const history = useHistory();

    // async function handleLogin(e) {
    //     e.preventDefault();

    //     try {
    //         const response = await api.post('sessions', { id })

    //         localStorage.setItem('ongId', id);
    //         localStorage.setItem('ongName', response.data.name);

    //         history.push('/profile');
    //     } catch (err) {
    //         alert('Falha no login, tente novamente.');
    //     }
    // }

    return ( 
        <div className= "login-container">
          <img src = { imgUser } id='imgUser' width='700' alt= "User Background"/>
            <section className = "form">
                <form >

                    <h1>Faça seu login</h1>

                    <input 
                    id='firstChildInput'
                    placeholder= "E-mail"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    />
                    <input 
                    placeholder= "Senha"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    />
                    {/* <button className= "button" type= "submit">Entrar</button> */}
                    <Link className= "button" to="/cursos">Entrar</Link>

                    <Link className="back-link" to= "/register">
                        <FiLogIn size = { 16 } color= "#407BFF"/>
                        Não tenho cadastro 
                    </Link> 
                </form>

            </section> 
            
        </div>
    );
}