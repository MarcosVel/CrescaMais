import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Accordion } from 'react-bootstrap';
import { FiArrowLeft, FiTrash2, FiEdit3, FiHeart, FiUsers } from 'react-icons/fi';

import './style.css';

import api from '../services/api';

function Cursos() {
  const [ courses, setCourses ] = useState([]);

  // Get da api para buscar os cursos e seus dados
  useEffect(() => {
    api.get('courses')
      .then(response => {
        setCourses(response.data);
        console.log(response.data);
      })
  }, []);

  // Função para deletar o curso selecionado
  async function handleDeleteCourse(id) {
    try {
      await api.delete(`courses/${ id }`)

      setCourses(courses.filter(course => course.id !== id));
    } catch (err) {
      alert('Erro ao deletar curso, tente novamente.')
    }
  }

  // Função de alerta quando favorita o curso
  async function handleFavorite() {
    alert(`Você favoritou o curso`);
  }

  return (
    <div className="profile-container">
      <header>
        <Link id="getBackLink" className="back-link" to="/">
          <FiArrowLeft size={ 20 } color="#407BFF" />
            Voltar para Login
        </Link>

        <Link className="button" to="/users">
          <FiUsers id='iconUsers' size={ 20 } color="white" />
          Usuários
        </Link>
        <Link className="button" to="/curs">Cadastrar curso</Link>
      </header>

      <h1>Cursos:</h1>

      <ul>
        { courses.map(course => (
          <li key={ course.id }>
            <Accordion>
              <Card>
                {/* Parte da lista amostra */}
                <Accordion.Toggle as={ Card.Header } eventKey='0'>
                  <>
                    <strong>Título:</strong>
                    <p>{ course.tiutle }</p>

                    <div className='divIcons'>
                      <button onClick={ () => handleFavorite() } type="button" title="Favoritar curso">
                        <FiHeart size={ 20 } color="red" />
                      </button>
                      <Link type="button" to={ `/curs/${ course.id }` } title="Editar curso">
                        <FiEdit3 size={ 20 } color="#2165ff" />
                      </Link>
                      <button onClick={ () => handleDeleteCourse(course.id) } type="button" title="Deletar curso">
                        <FiTrash2 size={ 20 } color="red" />
                      </button>
                    </div>
                  </>
                </Accordion.Toggle>

                {/* Parte da lista oculta */}
                <Accordion.Collapse id='accordionCollapse' eventKey='0'>
                  <>
                    <strong>Preço:</strong>
                    <p>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(course.price) }</p>

                    <strong>Workland:</strong>
                    <p>{ course.workland }</p>

                    <strong>Aulas:</strong>
                    <p>{ course.lesson }</p>

                    <strong>Autor:</strong>
                    <p>{ course.author }</p>

                    <strong>Ano:</strong>
                    <p>{ course.year }</p>
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

export default Cursos;