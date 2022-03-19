import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const appStyle = {
  backgroundColor: 'rgb(43, 42, 51)',
  borderRadius: '20px',
  margin: '10px',
  padding: '20px',
  marginTop: '10px',
  width: '1250px',
  height: '565px',
};

const titleStyle = {
  textAlign: 'center',
  color: 'white',
  fontFamily: 'sans-serif',
  fontSize: '22px',
};

class App extends React.Component {
  render() {
    return (
      <div
        style={ appStyle }
      >
        <BrowserRouter>
          <div
            style={ titleStyle }
          >
            <h1>Trybetunes</h1>
          </div>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/search" component={ Search } />
            <Route path="/album/:id" component={ Album } />
            <Route path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
