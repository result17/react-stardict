import React, {Component} from 'react';
import Header from './views/Header'
import Main from './views/Main'
import throttle from './utils/throttle'
import {getWordData, setWordCache} from './data/cache'
import cloneDeep from './utils/cloneDeep'
import './css/App.css'
import getLocalStorage from './data/getLocalStorage'

export const { Provider, Consumer } = React.createContext()

class App extends Component {
  state = {
    theme: getLocalStorage('theme', 'light') === 'light',
    searchWord: '',
    searchWordData: {},
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
  
  // input的change的事件
  setInputSearchWord = (event) => {
    event.persist()
    let setSearchWordState = (value) => {
      this.setState({...this.state, searchWord: value})
    }
    console.log(event.target.value)
    let throttler = throttle(setSearchWordState, 100)
    throttler(event.target.value)
  }
  // Accordion的click事件
  setAccordionSearchWord = (event) => {
    this.setState({...this.stata, searchWord: event.target.innerText})
  }
  
  setInputSearchWordData = async(event) => {
    // 验证是否为敲回车事件
    if (event.key !== 'Enter') return
    // 过滤无效值(纯函数)
    let value = this.filterValue(this.state.searchWord)
    if (value === undefined) return
    // axios超时限制为1000ms
    console.log(this.filterValue(this.state.searchWord))
    let resData = await getWordData(value)
    try {
      setWordCache(this.state.searchWord, resData.data)
      this.state({
        ...this.state,
        searchWordData: resData.data
      })
    } catch {
      console.error('backend has error')
    }
  }
 
  setAccordionSearchWordData = async(event) => {
    event.persist()
    this.setAccordionSearchWord(event)
    // console.log(this.state.searchWord)
    let value = this.filterValue(event.target.innerText)
    if (value === undefined) return
    let resData = await getWordData(value)
    try {
      setWordCache(event.target.innerText, resData.data)
      this.setState({
        ...this.state,
        searchWordData: resData.data
      })
    } catch {
      console.error('backend has error')
    }
  }
  // 在utils中单独写一个过滤方法（在界面显示提示信息？）
  filterValue = (val) => val
  
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
          setInputSearchWordData: this.setInputSearchWordData,
          setAccordionSearchWord: this.setAccordionSearchWord,
          setAccordionSearchWordData: this.setAccordionSearchWordData,
          setAccordionOpen: this.setAccordionOpen,
        }}
      >
        <Header></Header>
        <Main></Main>
      </Provider>
    )
  }
}

export default App
