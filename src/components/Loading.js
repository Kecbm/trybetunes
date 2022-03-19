import React from 'react';

const loadingStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '50px',
  textAlign: 'center',
  color: 'white',
  fontFamily: 'sans-serif',
  fontSize: '18px',
};

class Login extends React.Component {
  render() {
    return (
      <div
        className="Loading"
        style={ loadingStyle }
      >
        <h2>Carregando...</h2>
      </div>
    );
  }
}

export default Login;
