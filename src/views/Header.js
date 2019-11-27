import React, { Component } from 'react'
import {Consumer} from '../App'
import '../css/Header.css'
import Input from '../components/Input'
import SelectList from '../components/SelectList'
import ToggleTheme from '../components/ToggleTheme'
import mySetInterval from '../utils/mySetInterval.js'
import btns from '../data/btnsData'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showS: false, 
      studyTime: 0,
    }
  }
  timerID = undefined
  componentDidMount () {
    this.timerID = this.increaseStudyTime()
  }
  increaseStudyTime = () => {
    let studyTime = 1
    let updataState = () => {
      this.setState({
      showS: studyTime > 1,
      studyTime: studyTime++,
     })
    }
    return mySetInterval(updataState, 60000)
  }
  componentWillUnmount() {
    clearInterval(this.timerID)
  }
  render() {
    return (
      <Consumer>
        {({theme}) => (
          <header className={theme ? "header-wrapper" : "header-wrapper header-wrapper-drak"}>
            <div className="logo-wrapper animated bounceInDown">
              {/* 用css线性渐变 + 阴影 */}
              <h2 className="pattern-overlay logo">
                <span data-text="stardict"></span>
                {/* animate */}
                stardict
              </h2>
            </div>
            <div className={theme ? "study-time-wrapper" : "study-time-wrapper study-time-wrapper-drak"}>
              {/* 分钟的字体适当增大更好 */}
              <h4 className={theme ? "study-time animated fadeIn" : "study-time study-time-dark animated fadeIn"}>Learned: {this.state.studyTime} min
                {
                this.state.showS && 's'
                }
              </h4>
            </div>
            <div className="input-outer-wrapper">
              <div className="input-inner-wrapper">
                <Input></Input>
              </div>
            </div>
            <div className={theme ? "toggle-theme-wrapper" : "toggle-theme-wrapper toggle-theme-wrapper-dark"}>
              <div className="toggle-theme">
                <ToggleTheme></ToggleTheme>
              </div>
            </div>
            <div className="select-list-wrapper">
              <SelectList buttons={btns}></SelectList>
            </div>
          </header>
        )}
      </Consumer>
    )
  }
}

export default Header
