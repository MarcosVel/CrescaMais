import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { HiOutlineDesktopComputer } from 'react-icons/hi';

import './style.css';

import api from '../services/api';

// Valida se estou criando curso (SE é criação de curso) ==true => criação
// const isCreate = this.state.id != '';

export default class NewAndEditCurso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      curso: {
        tiutle: '',
        price: '',
        workland: '',
        lesson: '',
        author: '',
        year: '',
      }
    };
  }

  componentDidMount() {
    const isCreate = this.props.match.params.id == '';

    this.setState({
      id: this.props.match.params.id,
      titlePagina: (isCreate ? 'Cadastrar novo curso' : 'Editar curso'),
      descPagina: (isCreate ? 'Complete os campos para cadastrar um novo curso.' : 'Edite os campos que deseja para alterar.'),
      textButton: (isCreate ? 'Cadastrar' : 'Salvar alterações')
    });
    api.get(`courses/${ this.props.match.params.id }`)
      .then(response => {
        console.log(response.data);
        this.setState({ ...this.state, curso: response.data })
        console.log(this.state)
      })
  }

  // const history = useHistory();

  handleCourse(e) {
    e.preventDefault();
    const isCreate = this.state.id == '';

    if (isCreate) {
      try {
        api.post('courses', this.state.curso)
          .then(response => {
            // history.push('/cursos');
          })
      } catch (err) {
        alert('Erro ao cadastrar curso, tente novamente.')
      }
    }
    else {
      try {
        api.put(`courses/${ this.state.id }`, this.state.curso)
          .then(response => {
            // history.push('/cursos');
          })
      } catch (err) {
        alert('Erro ao editar curso, tente novamente.')
      }
    }
  }

  render() {

    return (
      <div className="new-incident-container">
        <div className="content">
          <section>
            <HiOutlineDesktopComputer id='iconCourse' size={ 250 } />

            <h1>{ this.state.titlePagina }</h1>
            <p>{ this.state.descPagina }</p>

            <Link className="back-link" to="/cursos">
              <FiArrowLeft size={ 20 } color="#407BFF" />
                          Voltar para cursos
                      </Link>
          </section>

          <form
            onSubmit={ this.handleCourse.bind(this) }
          >
            <input
              placeholder="Título do curso"
              value={ this.state.curso.tiutle }
            // onChange={e => setTiutle(e.target.value)}
            />
            <input
              placeholder="Valor em reais"
              value={ this.state.curso.price }
            // onChange={e => setPrice(e.target.value)}
            />
            <input
              placeholder="Workland"
              value={ this.state.curso.workland }
            // onChange={e => setWorkland(e.target.value)}
            />
            <input
              placeholder="Quantidade de aulas"
              value={ this.state.curso.lesson }
            // onChange={e => setLesson(e.target.value)}
            />
            <input
              placeholder="Autor"
              value={ this.state.curso.author }
            // onChange={e => setAuthor(e.target.value)}
            />
            <input
              placeholder="Ano"
              value={ this.state.curso.year }
            // onChange={e => setYear(e.target.value)}
            />

            <button className="button" type="submit">{ this.state.textButton }</button>
          </form>
        </div>
      </div>
    );
  }
}