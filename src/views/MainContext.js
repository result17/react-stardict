import React, {Component} from 'react'
import { Consumer } from '../App'
import '../css/MainContext.css'
export default class MainContext extends Component {
  render() {
    return (
      <Consumer>
        {({details, searchWordData, setStarStatus}) => (
          <main className="main-context">
            <div className="search-word-wrapper">
              <h2 className="search-word">
                {searchWordData.word}
              </h2>
              <span className="star-wrapper" onClick={setStarStatus}>
              {searchWordData.word &&
                (details[0].data.includes(searchWordData.word) ?
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
                  <path fill="#FFC347" fillRule="evenodd" d="M9.332 14.968c-.46-.255-1.205-.255-1.666 0L4.35 16.794c-.921.506-1.523.044-1.349-1.027l.635-3.867c.088-.537-.142-1.28-.516-1.66L.436 7.5c-.745-.76-.511-1.504.516-1.66l3.707-.564c.514-.08 1.119-.538 1.348-1.027L7.665.731c.462-.976 1.208-.973 1.667 0l1.66 3.519c.23.489.833.95 1.349 1.027l3.708.564c1.029.156 1.258.902.515 1.66l-2.685 2.739c-.372.38-.603 1.123-.515 1.66l.634 3.867c.176 1.074-.43 1.533-1.348 1.027l-3.318-1.826z"/>
                </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
                  <path fill="#B2BAC2" fillRule="evenodd" d="M9.332 14.968c-.46-.255-1.205-.255-1.666 0L4.35 16.794c-.921.506-1.523.044-1.349-1.027l.635-3.867c.088-.537-.142-1.28-.516-1.66L.436 7.5c-.745-.76-.511-1.504.516-1.66l3.707-.564c.514-.08 1.119-.538 1.348-1.027L7.665.731c.462-.976 1.208-.973 1.667 0l1.66 3.519c.23.489.833.95 1.349 1.027l3.708.564c1.029.156 1.258.902.515 1.66l-2.685 2.739c-.372.38-.603 1.123-.515 1.66l.634 3.867c.176 1.074-.43 1.533-1.348 1.027l-3.318-1.826z"/>
                </svg>)
              }
              </span>
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