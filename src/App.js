import React, {Component} from 'react';
import Header from './views/Header'
import Main from './views/Main'
import throttle from './utils/throttle'
import './css/App.css'

export const { Provider, Consumer } = React.createContext()

if (!window.localStorage.getItem('theme')) {
  window.localStorage.setItem('theme', 'light')
}

class App extends Component {
  state = {
    theme: window.localStorage.getItem('theme') === 'light',
    searchWord: 'test',
  }

  setToggleTheme = () => {
    this.setState((state) => ({...state, theme: !state.theme}))
  }
  setSearchWord = (event) => {
    event.persist()
    let setSearchWordState = (value) => {
      this.setState({...this.state, searchWord: value})
    }
    let throttler = throttle(setSearchWordState, 100)
    if (event.type === 'click') {
      throttler(event.target.innerText)
    } else {
      throttler(event.target.value)
    }
  }
  getData = (event) => {
    // if (event.type !== '')
  }
  render() {
    return (
      <Provider
        value={{
          ...this.state,
          setToggleTheme :this.setToggleTheme,
          setSearchWord: this.setSearchWord,
        }}
      >
        <Header></Header>
        <Main></Main>
      </Provider>
    )
  }
}

export default App
