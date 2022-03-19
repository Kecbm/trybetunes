import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

const loginStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '150px',
  fontFamily: 'monospace',
  fontSize: '20px',
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nomeUsuario: '',
      botaoDesabilitado: true,
      loading: false,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.botaoSubmeter = this.botaoSubmeter.bind(this);
  }

  handleChange(evento) {
    const { name, value } = evento.target;
    this.setState(() => ({
      [name]: value }
    ), () => {
      const {
        nomeUsuario,
      } = this.state;
      const STRING_VALIDA = 3;
      const verificaString = nomeUsuario.length >= STRING_VALIDA;
      this.setState(() => ({
        botaoDesabilitado: !verificaString,
      }));
    });
  }

  botaoSubmeter = async (event) => {
    event.preventDefault();
    const { nomeUsuario: name } = this.state;
    this.setState({ loading: true });
    await createUser(({ name }));
    this.setState({
      loading: false,
      redirect: true,
    });
  }

  renderizarForm = () => {
    const {
      nomeUsuario,
      botaoDesabilitado,
      loading,
    } = this.state;
    return (
      loading ? <Loading /> : (
        <div
          data-testid="page-login"
          style={ loginStyle }
        >
          <label
            htmlFor="login-name-input"
          >
            Nome
            <br />
            <input
              type="text"
              data-testid="login-name-input"
              value={ nomeUsuario }
              onChange={ this.handleChange }
              name="nomeUsuario"
              placeholder="Digite seu nome aqui"
            />
          </label>
          <br />
          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ botaoDesabilitado }
            onClick={ this.botaoSubmeter }
          >
            Entrar
          </button>
        </div>
      )
    );
  }

  render() {
    const { redirect } = this.state;
    return (
      redirect ? <Redirect to="/search" /> : this.renderizarForm()
    );
  }
}

export default Login;
