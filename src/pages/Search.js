import { Link } from 'react-router-dom';
import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

const searchStyle = {
  fontFamily: 'monospace',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '50px',
  textAlign: 'center',
  fontSize: '20px',
};

const sectionStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '10px',
};

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nomeArtista: '',
      nomePesquisado: '',
      habilitarBotao: true,
      dadosAlbum: [],
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(evento) {
    const { value } = evento.target;
    const STRING_VALIDA = 2;
    this.setState({
      nomeArtista: value,
      nomePesquisado: value,
      habilitarBotao: value.length < STRING_VALIDA,
    });
  }

  async handleClick() {
    const {
      nomeArtista,
    } = this.state;
    this.setState({
      loading: true,
    });
    const response = await searchAlbumsAPI(nomeArtista);
    this.setState({
      nomeArtista: '',
      nomePesquisado: nomeArtista,
      dadosAlbum: response,
      loading: false,
    });
  }

  render() {
    const {
      nomeArtista,
      habilitarBotao,
      nomePesquisado,
      dadosAlbum,
      loading,
    } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <div>
        <Header />
        <div
          style={ searchStyle }
        >
          <div
            data-testid="page-search"
          >
            <div
              style={ formStyle }
            >
              <input
                type="text"
                data-testid="search-artist-input"
                placeholder="Nome do artista/banda"
                onChange={ this.handleChange }
                value={ nomeArtista }
              />
              <button
                data-testid="search-artist-button"
                type="submit"
                disabled={ habilitarBotao }
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>
            </div>
            <section
              style={ sectionStyle }
            >
              {
                nomePesquisado.length > 0 && (
                  <p>
                    {
                      `Resultado de álbuns de: ${nomePesquisado}`
                    }
                  </p>
                )
              }
              {
                dadosAlbum.length > 0 ? (
                  dadosAlbum.map((album) => (
                    <ul key={ album.collectionId }>
                      <li key={ album.artistId }>
                        <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                        <h4>{ album.collectionName }</h4>
                        <h5>{ album.artistName }</h5>
                      </li>
                      <Link
                        data-testid={ `link-to-album-${album.collectionId}` }
                        to={ `/album/${album.collectionId}` }
                      >
                        Acessar album
                      </Link>
                    </ul>
                  ))
                )
                  :
                  <div>
                    <p>Nenhum álbum foi encontrado</p>
                  </div>
              }
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
