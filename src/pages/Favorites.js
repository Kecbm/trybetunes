import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoritas: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const musicasFavoritas = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoritas: musicasFavoritas,
    });
  }

  async handleClick(trackId) {
    const {
      favoritas,
    } = this.state;
    const atualizaFavoritas = favoritas.find((musica) => musica.trackId === trackId);
    this.setState({ loading: true });
    await removeSong(atualizaFavoritas);
    this.setState((prevState) => ({
      favoritas: prevState.favoritas.filter((musica) => musica.trackId !== trackId),
      loading: false,
    }));
  }

  render() {
    const {
      loading,
      favoritas,
    } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          loading ? <Loading />
            : (
              <>
                {
                  favoritas.map((musica) => (
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
              </>
            )
        }
      </div>
    );
  }
}

export default Favorites;
