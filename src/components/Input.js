import React, {Component} from 'react'
import { Consumer } from '../App'
import '../css/Input.css'
import req from '../utils/ajax'
class Input extends Component {
  handleKeyPress = async(event) => {
    if (event.key === 'Enter') {
      await req.getData('/s', {wd: event.target.value})
    }
  }
  render() {
    return (
      <Consumer>
        {({searchWord, setSearchWord}) => (
          <input 
            tyep="text"
            className="input"
            value={searchWord} 
            onChange={setSearchWord} 
            autoFocus={true}
            placeholder="enter your word"
            maxLength="20"
            onKeyPress={this.handleKeyPress}
          />
        )}
      </Consumer>
    ) 
  }
}

export default Input