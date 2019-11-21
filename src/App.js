import React, {Component} from 'react';
import Header from './views/Header'
import Main from './views/Main'
import './css/App.css'

export const ThemeContext = React.createContext()

if (!window.localStorage.getItem('theme')) {
  window.localStorage.setItem('theme', 'light')
}

class App extends Component {
  state = {
    theme: window.localStorage.getItem('theme') === 'light'
  }

  handleToggleTheme = () => {
    this.setState((state) => ({theme: !state.theme}))
  }
  render() {
    return (
      <ThemeContext.Provider
        value={{
          theme: this.state.theme,
          handleToggleTheme: this.handleToggleTheme,
        }}
      >
        <Header></Header>
        <Main></Main>
      </ThemeContext.Provider>
    )
  }
}

export default App
