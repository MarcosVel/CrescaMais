import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Accordion } from 'react-bootstrap';
import { FiArrowLeft, FiArrowDown } from 'react-icons/fi';

import './style.css';

import api from '../services/api';

function Users() {
  const [ users, setUsers ] = useState([]);

  // Get da api para buscar os users e seus dados
  useEffect(() => {
    api.get('users')
      .then(response => {
        setUsers(response.data);
        console.log(response.data);
      })
  }, []);

  return (
    <div className="profile-container">
      <header>
        <Link id="getBackLink" className="back-link" to="/cursos">
          <FiArrowLeft size={ 20 } color="#407BFF" />
            Voltar para Cursos
        </Link>
      </header>

      <h1>Usuários:</h1>

      <ul>
        { users.map(user => (
          <li key={ user.id }>
            <Accordion>
              <Card>
                <Accordion.Toggle as={ Card.Header } eventKey='0'>
                  <>
                    <strong>Nome:</strong>
                    <p>{ user.name }</p>

                    <div id='divIcons'>
                      <FiArrowDown size={ 20 } color="#407BFF" />
                    </div>
                  </>
                </Accordion.Toggle>

                <Accordion.Collapse id='accordionCollapse' eventKey='0'>
                  <>
                    <strong>E-mail:</strong>
                    <p>{ user.email }</p>

                    <h6>Favoritos:</h6>
                    <hr></hr>

                    { user.favorites.map(favorite => (
                      <li key={ favorite.id }>
                        <strong>Título:</strong>
                        <p>{ favorite.tiutle }</p>

                        <strong>Preço:</strong>
                        <p>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(favorite.price) }</p>

                        <strong>Workland:</strong>
                        <p>{ favorite.workland }</p>

                        <strong>Aulas:</strong>
                        <p>{ favorite.lesson }</p>

                        <strong>Autor:</strong>
                        <p>{ favorite.author }</p>

                        <strong>Ano:</strong>
                        <p>{ favorite.year }</p>

                        <hr></hr>
                      </li>
                    )) }

                    {/* <strong>Aulas:</strong>
                    <p>{ user.lesson }</p> */}

                  </>
                </Accordion.Collapse>

              </Card>
            </Accordion>
          </li>
        )) }
      </ul>

    </div>
  );
}

export default Users;