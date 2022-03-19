import { Link } from 'react-router-dom';
import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

const profileStyle = {
  margin: '50px',
  textAlign: 'center',
};

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { name } = await getUser();
    this.setState({
      nome: name,
    });
    this.setState({ loading: false });
  }

  render() {
    const {
      nome,
      loading,
    } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading ? <Loading />
            : (
              <div
                style={ profileStyle }
              >
                <label htmlFor="nome">
                  Nome
                  <h4 name="nome">{ nome }</h4>
                </label>
              </div>
            )
        }
      </div>
    );
  }
}

export default Profile;
