import React, {Component} from 'react';
import Header from './views/Header'
import Main from './views/Main'
import './css/App.css'

export const { Provider, Consumer } = React.createContext()

if (!window.localStorage.getItem('theme')) {
  window.localStorage.setItem('theme', 'light')
}

class App extends Component {
  state = {
    theme: window.localStorage.getItem('theme') === 'light',
    searchWord: '',
  }

  setToggleTheme = () => {
    this.setState((state) => ({...state, theme: !state.theme}))
  }
  setSearchWord = (value) => {
    this.setState((state) => ({...state, searchWord: value}))
  }
  render() {
    return (
      <Provider
        value={{
          theme: this.state.theme,
          searchWord: this.state.searchWord,
          setSearchWord: this.setSearchWord,
          setToggleTheme: this.setToggleTheme,
        }}
      >
        <Header></Header>
        <Main></Main>
      </Provider>
    )
  }
}

export default App
