import React from 'react';
import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import './style.css';

import imgUser from '../assets/imgUser.svg';

export default function Login() {

  return (
    <div className="login-container">
      <img src={ imgUser } id='imgUser' width='700' alt="User Background" />

      <section className="form">
        <form>
          <h1>Faça seu login</h1>

          <input
            id='firstChildInput'
            placeholder="E-mail"
          />
          <input
            placeholder="Senha"
          />

          <Link className="button" to="/cursos">Entrar</Link>

          <Link className="back-link" to="/">
            <FiLogIn size={ 16 } color="#407BFF" />
              Não tenho cadastro
          </Link>
        </form>
      </section>
      
    </div>
  );
}