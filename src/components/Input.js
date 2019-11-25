import React, {Component} from 'react'
import { Consumer } from '../App'
import '../css/Input.css'
class Input extends Component {
  render() {
    return (
      <Consumer>
        {({searchWord, setInputSearchWord, setInputSearchWordData}) => (
          <input 
            tyep="text"
            className="input"
            value={searchWord} 
            onChange={setInputSearchWord} 
            autoFocus={true}
            placeholder="enter your word"
            maxLength="20"
            onKeyPress={setInputSearchWordData}
          />
        )}
      </Consumer>
    ) 
  }
}

export default Input