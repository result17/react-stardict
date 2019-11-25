import React, {Component} from 'react';
import Header from './views/Header'
import Main from './views/Main'
import throttle from './utils/throttle'
import req from './utils/ajax'
import './css/App.css'
import getLocalStorage from './data/getLocalStorage'

export const { Provider, Consumer } = React.createContext()

class App extends Component {
  state = {
    theme: getLocalStorage('theme', 'light') === 'light',
    searchWord: '',
    searchWordData: {},
    dataCache: {},
    details: [{
        context: 'Collections',
        data: getLocalStorage('collection', 'apple,dog,canndy').split(',').reverse(),
      },
      {
        context: 'History',
        data: getLocalStorage('history', 'computer,game,gggggggggggggggggggggggggggggg').split(',').reverse(),
      }
    ]
  }

  setToggleTheme = () => {
    this.setState((state) => ({...state, theme: !state.theme}))
  }

  setInputSearchWord = (event) => {
    event.persist()
    let setSearchWordState = (value) => {
      this.setState({...this.state, searchWord: value})
    }
    let throttler = throttle(setSearchWordState, 100)
    throttler(event.target.vale)
  }

  // 在utils中单独写一个过滤方法（在界面显示提示信息？）
  filterValue = (val) => val
  
  getWordData = async(event) => {
    // 只有在页面的Input的keypress事件和Accordion的click事件触发此函数
    if (event.type === 'keypress' && event.key === 'Enter' || event.type === 'click') return
    // 过滤无效值
    let value = this.filterValue(event.target.balue)
    if (value === undefined) return
    
    let dataCache = this.state.dataCache
    // 没有被缓存则进行请求
    if (!dataCache.hasOwnProperty(value)) {
      if (Object.keys(dataCache).length > 199) {
        dataCache = {}
      }
      let response = await req.getData('/s', {wd: value})
      dataCache[value] = response.data
    }
    // Accordion点击事件还会改变searchWord的值
    if (event.type === 'click') {
      this.setState({
        ...this.state,
        searchWord: value,
        searchWordData: dataCache[value], 
      })
    } else {
      this.setState({
        ...this.state,
        searchWordData: dataCache[value]
      })
    }
    return
  }

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          setToggleTheme :this.setToggleTheme,
          setInputSearchWord: this.setInputSearchWord,
        }}
      >
        <Header></Header>
        <Main></Main>
      </Provider>
    )
  }
}

export default App
