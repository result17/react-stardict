import React, {Component} from 'react';
import Header from './views/Header'
import Main from './views/Main'
import throttle from './utils/throttle'
import cloneDeep from './utils/cloneDeep'
import updataAry from './utils/updataAry'
import {getWordData, setWordCache} from './data/cache'
import {getLocalStorage, setLocalStorage, clearAll} from './data/localStorage'
import './css/App.css'

export const { Provider, Consumer } = React.createContext()

class App extends Component {
  state = {
    theme: getLocalStorage('theme', 'light') === 'light',
    searchWord: '',
    searchWordData: {},
    details: [{
        context: 'Collections',
        data: getLocalStorage('collection').split(','),
        open: false,
      },
      {
        context: 'History',
        data: getLocalStorage('history').split(','),
        open: false,
      }
    ]
  }

  setToggleTheme = () => {
    let theme = this.state.theme ? 'dark' : 'light'
    this.setState((state) => ({...state, theme: !state.theme}))
    setLocalStorage('theme', theme)
  }
  
  // input的change的事件
  setInputSearchWord = (event) => {
    event.persist()
    let setSearchWordState = (value) => {
      this.setState({...this.state, searchWord: value})
    }
    let throttler = throttle(setSearchWordState, 100)
    throttler(event.target.value)
  }
  // Accordion的click事件
  setAccordionSearchWord = (event) => {
    this.setState({...this.stata, searchWord: event.target.innerText})
  }
  
  setInputSearchWordData = async(event) => {
    // 验证是否为敲回车事件
    if (event.key !== 'Enter' || event.target.value === '') return
    // 过滤无效值(纯函数)
    let value = this.filterValue(this.state.searchWord)
    if (value === undefined) return
    // axios超时限制为1000ms
    try {
      let resData = await getWordData(value)
      let newDetails = this.setDetailsAry('History', resData.data.word)
      setWordCache(this.state.searchWord, resData.data)
      this.setState({
        ...this.state,
        searchWordData: resData.data,
        [newDetails ? 'details' : '']: newDetails,
      })
    } catch {
      console.error('backend has error')
    }
  }
 
  setDetailsAry = (tar, value) => {
    if (value === undefined) return
    if (this.state.details.find((detail) => detail.context === tar).data.includes(value)) return
    let details = cloneDeep(this.state.details)
    let target = details.find((detail) => detail.context === tar)
    let newAry = updataAry(target.data, value)
    target.data = newAry
    // 投机取巧的使数组直接转为字符传
    setLocalStorage(tar.toLowerCase(), newAry.toString())
    return details
  }

  setAccordionSearchWordData = async(event) => {
    event.persist()
    this.setAccordionSearchWord(event)
    let value = this.filterValue(event.target.innerText)
    if (value === undefined) return
    try {
      let resData = await getWordData(value)
      let newDetails = this.setDetailsAry('History', resData.data.word)
      setWordCache(event.target.innerText, resData.data)
      if (newDetails) {
        this.setState({
          ...this.state,
          searchWordData: resData.data,
          details: newDetails,
        })
      } else {
        this.setState({
          ...this.state,
          searchWordData: resData.data,
        })
      }
    } catch(err) {
      console.error(err)
    }
  }

  setStarStatus = (event) => {
    let details = cloneDeep(this.state.details)
    if (details[0].data.includes(this.state.searchWordData.word)) {
      let newAry = details[0].data.filter(el => el !== this.state.searchWordData.word)
      details[0].data = newAry
    } else {
      details[0].data.push(this.state.searchWordData.word)
    }
    // 修改local stroge中的collections
    clearAll()
    setLocalStorage('collection', details[0].data.toString())

    this.setState({
      ...this.state,
      details: details,
    })
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
          setStarStatus: this.setStarStatus,
        }}
      >
        <Header></Header>
        <Main></Main>
      </Provider>
    )
  }
}

export default App
