import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiTrash2, FiEdit3 } from 'react-icons/fi';

import api from '../services/api';

import './style.css';

function Cursos() {
  const [ courses, setCourses ] = useState([]);

  useEffect(() => {
    api.get('courses')
      .then(response => {
        setCourses(response.data);
        console.log(response.data);
      })
  }, []);

  async function handleDeleteCourse(id) {
    try {
      await api.delete(`courses/${ id }`)

      setCourses(courses.filter(course => course.id !== id));
    } catch (err) {
      alert('Erro ao deletar curso, tente novamente.')
    }
  }

  return (
    <div className="profile-container">
      <header>
        <Link id="getBackLink" className="back-link" to="/">
          <FiArrowLeft size={ 20 } color="#407BFF" />
            Voltar para cursos
        </Link>
        <Link className="button" to="/curso/new">Cadastrar novo curso</Link>
      </header>

      <h1>Cursos:</h1>

      <ul>
        { courses.map(course => (
          <li key={ course.id }>
            <strong>Título:</strong>
            <p>{ course.tiutle }</p>

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

            <div className='divIcons'>
              <Link type="button" to="/curso/edit" title="Editar curso">
                <FiEdit3 size={ 20 } color="#2165ff" />
              </Link>
              <button onClick={ () => handleDeleteCourse(course.id) } type="button" title="Deletar curso">
                <FiTrash2 size={ 20 } color="red" />
              </button>
            </div>

          </li>
        )) }
      </ul>
    </div>
  );
}

export default Cursos;