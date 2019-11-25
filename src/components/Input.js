import React, {Component} from 'react'
import { Consumer } from '../App'
import '../css/Input.css'
class Input extends Component {
  render() {
    return (
      <Consumer>
        {({searchWord, setInputSearchWord, getWordData}) => (
          <input 
            tyep="text"
            className="input"
            value={searchWord} 
            onChange={setInputSearchWord} 
            autoFocus={true}
            placeholder="enter your word"
            maxLength="20"
            onKeyPress={getWordData}
          />
        )}
      </Consumer>
    ) 
  }
}

export default Input