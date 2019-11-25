import React, {Component} from 'react';
import Header from './views/Header'
import Main from './views/Main'
import throttle from './utils/throttle'
import req from './utils/ajax'
import './css/App.css'
import getLocalStorage from './data/localStorage'

export const { Provider, Consumer } = React.createContext()

class App extends Component {
  state = {
    theme: this.theme === 'light',
    searchWord: '',
    searchWordData: {},
    dataCache: {},
  }
  theme = undefined
  componentDidMount() {
    this.theme = getLocalStorage('theme', 'light')
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
  // 在utils中单独写一个过滤方法（在界面显示提示信息？）
  filterValue = (val) => val

  getWordData = async(event) => {
    let value = this.filterValue(event.target.balue)
    if (value === undefined) return

    let dataCache = this.state.dataCache
    // 如果值合法且没有被缓存
    if (!dataCache.hasOwnProperty(value)) {
      if (event.type === 'keypress' && event.key === 'Enter' || event.type === 'click') {
        let response = await req.getData('/s', {wd: value})
        // dataCache对象不得超过两百个键值对
        if (Object.keys(dataCache).length > 199) {
          dataCache = {}
        }
        dataCache[value] = response.data
        this.setState({
          ...this.stata,
          searchWordData: response.data,
        })
      }
    } else {
      this.setState({
        ...this.stata,
        searchWordData: response.data
      })
    }
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
