import React, {Component} from 'react'
import throttle from '../utils/throttle'
import { Consumer } from '../App'
import '../css/Input.css'

class Input extends Component {
  
  handleChange = (event) => {
    event.persist()
    this.handleThrottle(event)
  }

  handleThrottle = throttle((event) => {
    // this.setState({
    //   value: event.target.value,
    // })
    // use axios send a http request
  }, 100)

  render() {
    return (
      <Consumer>
        {({searchWord, setSearchWord}) => {
          <input 
            tyep="text"
            className="input"
            value={searchWord} 
            onChange={this.handleChange} 
            autoFocus={true}
            placeholder="enter your word"
            maxLength="20"
          />
        }}
      </Consumer>
    ) 
  }
}

export default Input