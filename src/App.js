import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

//components
import Navbar from './components/Navbar';

//pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#d81b60',
      main: '#ad1457',
      dark: '#880e4f',
      contrastText: '#fff'
    },
    secondary: {
      light: '#7b1fa2',
      main: '#6a1b9a',
      dark: '#4a148c',
      contrastText: '#fff'
    }
  },
  typography: {
  }
})

class App extends Component {
  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
        <Router>
        <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path="/" component={home}/>
              <Route exact path="/login" component={login}/>
              <Route exact path="/signup" component={signup}/>
            </Switch>
          </div>
        </Router>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
