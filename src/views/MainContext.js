import React, {Component} from 'react'
import { Consumer } from '../App'
import '../css/MainContext.css'
export default class MainContext extends Component {
  render() {
    return (
      <Consumer>
        {({searchWordData}) => (
          <main className="main-context">
            <div className="search-word-wrapper">
              <h2 className="search-word">
                {searchWordData.word}
              </h2>
            </div>
            <div className="data-wrapper">
              <div className="phonetic">
                {searchWordData.phonetic}
              </div>
              <div className="translation">
                {searchWordData.translation}
              </div>
              <div className="reason">
                {searchWordData.reason}
              </div>
            </div>  
          </main>
        )}
      </Consumer>
    )
  }
}