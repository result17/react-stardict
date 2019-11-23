import React, {Component} from 'react'
import { Consumer } from '../App'
import '../css/Input.css'

class Input extends Component {

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
          />
        )}
      </Consumer>
    ) 
  }
}

export default Input