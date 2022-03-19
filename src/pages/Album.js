import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

const sectionStyle = {
  margin: '10px',
  display: 'flex',
  flexDirection: 'column',
};

const albumStyle = {
  display: 'flex',
  flexDirection: 'row',
};

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      nomeArtista: '',
      nomeAlbum: '',
      album: [],
      loading: false,
      favoritas: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const todosOsAlbuns = await getMusics(id);
    console.log('todosOsAlbuns: ', todosOsAlbuns);
    const albuns = todosOsAlbuns.slice(1);
    this.setState({ loading: true });
    const listaDeFavoritas = await getFavoriteSongs();
    this.setState({
      nomeAlbum: todosOsAlbuns[0].collectionName,
      nomeArtista: todosOsAlbuns[0].artistName,
      album: albuns,
      favoritas: listaDeFavoritas,
      loading: false,
    });
  }

  async handleClick(trackId) {
    const {
      album,
      favoritas,
    } = this.state;
    const atualizaFavoritas = favoritas.find((musica) => musica.trackId === trackId);
    if (atualizaFavoritas) {
      this.setState({ loading: true });
      await removeSong(atualizaFavoritas);
      this.setState((prevState) => ({
        favoritas: prevState.favoritas.filter((musica) => musica.trackId !== trackId),
        loading: false,
      }));
    } else {
      const musicaAtual = album.find((musica) => musica.trackId === trackId);
      this.setState({ loading: true });
      await addSong(musicaAtual);
      this.setState((prevState) => ({
        favoritas: [...prevState.favoritas, musicaAtual],
        loading: false,
      }));
    }
  }

  render() {
    const {
      nomeAlbum,
      nomeArtista,
      album,
      favoritas,
      loading,
    } = this.state;

    return (
      <div
        data-testid="page-album"
      >
        <Header />
        {
          loading ? <Loading />
            : (
              <>
                <section
                  style={ sectionStyle }
                >
                  <h3 data-testid="album-name">{ nomeAlbum }</h3>
                  <p data-testid="artist-name">{ nomeArtista }</p>
                </section>
                <div
                  style={ albumStyle }
                >
                  {
                    album.map((musica) => (
                      <MusicCard
                        key={ musica.trackId }
                        trackName={ musica.trackName }
                        previewUrl={ musica.previewUrl }
                        data-testid={ musica.trackId }
                        trackId={ musica.trackId }
                        onClick={ this.handleClick }
                        onChecked={ favoritas
                          .some((favorita) => favorita.trackId === musica.trackId) }
                      />
                    ))
                  }
                </div>
              </>
            )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
