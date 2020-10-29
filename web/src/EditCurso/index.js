import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { HiOutlineDesktopComputer } from 'react-icons/hi';

import './style.css';

import api from '../services/api';

// Valida se estou criando curso (SE é criação de curso) ==true => criação
// const isCreate = this.state.id == '';

export default class NewAndEditCurso extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      id: '',
      isCreate: false,
      curso: {
        tiutle: '',
        price: '',
        workland: '',
        lesson: '',
        author: '',
        year: '',
      },
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    let _isCreate = (params.id) == undefined;

    this.setState({
      id: params.id,
      isCreate: _isCreate,
      titlePagina: (_isCreate ? 'Cadastrar novo curso' : 'Editar curso'),
      descPagina: (_isCreate ? 'Complete os campos para cadastrar um novo curso.' : 'Edite os campos que deseja para alterar.'),
      textButton: (_isCreate ? 'Cadastrar' : 'Salvar alterações')
    });
    if (!this.state.isCreate) {
      api.get(`courses/${ params.id }`)
        .then(response => {
          console.log(response.data);
          this.setState({ ...this.state, curso: response.data })
          console.log(this.state)
        })
    }
  }


  // Função para lidar com criação ou edição de curso 
  handleCourse(e) {
    e.preventDefault();
    const { history } = this.props;

    if (this.state.isCreate) {
      api.post('courses', this.state.curso)
        .then(response => {
          history.push('/cursos');
        })
        .catch((err) => {
          alert('Erro ao cadastrar curso, tente novamente.')
        });
    }
    else {
      api.put(`courses/${ this.state.id }`, this.state.curso)
        .then(response => {
          history.push('/cursos');
        })
        .catch(() => {
          alert('Erro ao editar curso, tente novamente.')
        });
    }
  }

  // Função para setar mudanças dos inputs
  handleInputChange(event) {
    console.log(event.target)
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let cursoCopia = this.state.curso;
    cursoCopia[ name ] = value;
    this.setState({
      curso: cursoCopia
    });
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
              onChange={ this.handleInputChange }
              name='tiutle'
            />
            <input
              placeholder="Valor em reais"
              value={ this.state.curso.price }
              onChange={ this.handleInputChange }
              name='price'
            />
            <input
              placeholder="Workland"
              value={ this.state.curso.workland }
              onChange={ this.handleInputChange }
              name='workland'
            />
            <input
              placeholder="Quantidade de aulas"
              value={ this.state.curso.lesson }
              onChange={ this.handleInputChange }
              name='lesson'
            />
            <input
              placeholder="Autor"
              value={ this.state.curso.author }
              onChange={ this.handleInputChange }
              name='author'
            />
            <input
              placeholder="Ano"
              value={ this.state.curso.year }
              onChange={ this.handleInputChange }
              name='year'
            />

            <button className="button" type="submit">{ this.state.textButton }</button>
          </form>
        </div>
      </div>
    );
  }
}