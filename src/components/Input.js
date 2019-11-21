import React, {Component} from 'react'
import throttle from '../utils/throttle'
import '../css/Input.css'

class Input extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }
  
  handleChange = (event) => {
    event.persist()
    this.handleThrottle(event)
  }

  handleThrottle = throttle((event) => {
    this.setState({
      value: event.target.value,
    })
  }, 100)

  render() {
    return (
      <input 
      tyep="text"
      className="input"
      value={this.state.value} 
      onChange={this.handleChange} 
      autoFocus={true}
      placeholder="enter your word"
      maxLength="20"
      />
    ) 
  }
}

export default Input