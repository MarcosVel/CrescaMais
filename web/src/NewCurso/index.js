import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import {HiOutlineDesktopComputer} from 'react-icons/hi';

import './style.css';

import api from '../services/api';

export default function NewCurso() {
  const [tiutle, setTiutle] = useState('');
  const [price, setPrice] = useState('');
  const [workland, setWorkland] = useState('');
  const [lesson, setLesson] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');

  const history = useHistory();

  async function handleNewCourse(e) {
    e.preventDefault();
    
    const data = {
      tiutle,
      price,
      workland,
      lesson,
      author,
      year,
    };

    try {
        await api.post('courses', data)

        history.push('/cursos');
    } catch (err) {
      alert('Erro ao cadastrar curso, tente novamente.')  
    }
}

  return (
    <div className="new-incident-container">
            <div className="content">
                <section>
                    <HiOutlineDesktopComputer id='iconCourse' size = { 250 } />

                    <h1>Cadastrar novo curso</h1>
                    <p>Complete os campos para cadastrar um novo curso.</p>

                    <Link className="back-link" to= "/cursos">
                        <FiArrowLeft size = { 20 } color= "#407BFF"/>
                        Voltar para cursos 
                    </Link>
                </section>

                <form 
                onSubmit={handleNewCourse}
                >
                    <input 
                        placeholder= "Título do curso" 
                        value={tiutle}
                        onChange={e => setTiutle(e.target.value)}
                        />
                    <input 
                        placeholder= "Valor em reais" 
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        />
                    <input 
                        placeholder= "Workland" 
                        value={workland}
                        onChange={e => setWorkland(e.target.value)}
                        />
                    <input 
                        placeholder= "Quantidade de aulas" 
                        value={lesson}
                        onChange={e => setLesson(e.target.value)}
                        />
                    <input 
                        placeholder= "Autor" 
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                        />
                    <input 
                        placeholder= "Ano" 
                        value={year}
                        onChange={e => setYear(e.target.value)}
                        />
                    
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
  );
}