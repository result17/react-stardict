import React, {Component} from 'react';
import Header from './views/Header'
import Main from './views/Main'
import throttle from './utils/throttle'
import req from './utils/ajax'
import cloneDeep from './utils/cloneDeep'
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
        open: false,
      },
      {
        context: 'History',
        data: getLocalStorage('history', 'computer,game,gggggggggggggggggggggggggggggggggggggggg').split(',').reverse(),
        open: false,
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
    console.log(event.type)
  // 只有在页面的Input的keypress事件和Accordion的click事件触发此函数
    // if (event.type !== 'click' || event.type !== 'keypress' && event.key !== 'Enter') return 
    // 过滤无效值
    let value = this.filterValue(this.state.searchWord)
    if (value === undefined) return

    let dataCache = this.state.dataCache
    // 没有被缓存则进行请求
    if (!dataCache.hasOwnProperty(value)) {
      if (Object.keys(dataCache).length > 199) {
        dataCache = {}
      }
      debu
      let response = await req.getData('/s', {wd: value})
      console.log(response)
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
  
  setAccordionOpen = (event) => {
    // https://github.com/facebook/react/issues/15486
    event.preventDefault()
    let val = event.target.innerText
    let details = cloneDeep(this.state.details)
    let target = details.find((detail) => detail.context === val)
    target.open = !target.open
    this.setState({
      ...this.state,
      details: details,
    })
  }

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          setToggleTheme :this.setToggleTheme,
          setInputSearchWord: this.setInputSearchWord,
          setAccordionOpen: this.setAccordionOpen,
          getWordData: this.getWordData,
        }}
      >
        <Header></Header>
        <Main></Main>
      </Provider>
    )
  }
}

export default App
