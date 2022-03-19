import { Link } from 'react-router-dom';
import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

const headerStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  textAlign: 'center',
  fontFamily: 'sans-serif',
  fontSize: '22px',
  backgroundColor : 'rgb(28, 27, 34)',
  borderRadius: '10px',
  width: '1240px',
  height: '50px',
  padding: '7px',
};

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      nomeUsuario: '',
      loading: false,
    };
  }

  usuario = async () => {
    this.setState({
      loading: true,
    });
    const { name } = await getUser();
    this.setState(() => ({
      nomeUsuario: name,
      loading: false,
    }));
  }

  componentDidMount = async () => {
    this.usuario();
  }

  render() {
    const {
      nomeUsuario,
      loading,
    } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <header
        data-testid="header-component"
        style={ headerStyle }
      >
        <p
          data-testid="header-user-name"
          name="nomeUsuario"
        >
          👤
          {' '}
          { nomeUsuario }
        </p>
        <Link
          to="/search"
          data-testid="link-to-search"
        >
          <h2>Search</h2>
        </Link>
        <Link
          to="/favorites"
          data-testid="link-to-favorites"
        >
          <h2>Favorites</h2>
        </Link>
        <Link
          to="/profile"
          data-testid="link-to-profile"
        >
          <h2>Profile</h2>
        </Link>
      </header>
    );
  }
}

export default Header;
