import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Accordion, Form, InputGroup, FormControl } from 'react-bootstrap';
import { FiArrowLeft, FiTrash2, FiEdit3, FiHeart, FiUsers } from 'react-icons/fi';

import elearning from '../assets/elearning.png';

import './style.css';

import api from '../services/api';

function Cursos() {
  const [ courses, setCourses ] = useState([]);
  const [ termo, setTermo ] = useState('');
  const [ filtro, setFiltro ] = useState('tiutle');

  // Get da api para buscar os cursos e seus dados
  useEffect(() => {
    api.get('courses')
      .then(response => {
        setCourses(response.data);
      })
  }, []);

  // Função de setar valor do input de busca
  async function handleChange(e) {
    e.preventDefault();

    setTermo(e.target.value);
  }

  // Função de limpar valor do input de busca e retornar todos os cursos
  async function handleResetSearch(e) {
    e.preventDefault();

    setTermo('');

    api.get('courses')
      .then(response => {
        setCourses(response.data);
      });
  }

  // Função de filtro de cursos
  async function handleFiltroChange(e) {
    e.preventDefault();

    setFiltro(e.target[ e.target.selectedIndex ].value);
  }

  // Função para pesquisa de cursos
  async function handleSearch() {
    // Não mandar requisição de busca caso não tenha nada no input
    if (termo.length === 0) {
      return;
    }

    try {
      api.get(`courses?${ filtro }_like=${ termo }`)
        .then(response => {
          setCourses(response.data);
        })
    } catch (err) {
      alert('Erro ao buscar curso, tente novamente.')
    }
  }

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
  async function handleFavorite(tiutle) {
    alert(`Você favoritou o curso ${ tiutle }`);
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

      <div className='divForm mb-4'>
        <InputGroup>
          <Form.Control as="select" onChange={ handleFiltroChange } style={ { flex: 0.2 } } >
            <option value="tiutle">Título</option>
            <option value="price">Preço</option>
            <option value="lesson">Aulas</option>
            <option value="author">Autor</option>
            <option value="year">Ano</option>
          </Form.Control>
          <FormControl value={ termo } onChange={ handleChange } style={ { flex: 1 } } />
        </InputGroup>
        <button className="button" onClick={ handleSearch }>Buscar</button>
        <button className="button" onClick={ handleResetSearch }>Limpar</button>
      </div>

      <ul>
        { courses.map(course => (
          <li key={ course.id }>
            <Accordion>
              <Card>
                {/* Parte da lista amostra */ }
                <Accordion.Toggle as={ Card.Header } eventKey='0'>
                  <>
                    <div className='divCourse'>
                      <img src={ elearning } alt='thumbnail do curso' width={ 59 }></img>
                      <div className='divCourseText'>
                        <strong>Título:</strong>
                        <p>{ course.tiutle }</p>
                      </div>
                    </div>

                    <div className='divIcons'>
                      <button onClick={ () => handleFavorite(course.tiutle) } type="button" title="Favoritar curso">
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

                {/* Parte da lista oculta */ }
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