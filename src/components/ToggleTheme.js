import React from 'react'
import { Consumer } from '../App'
import imgsData from '../data/base64Imgs'
import '../css/ToggleTheme.css'

export default function ToggleTheme() {
  const myToggler = React.createRef()
  return (
    <Consumer>
      {({theme, setToggleTheme}) => (
        <section 
          className={theme ? 'toggler' : 'toggler actived'} 
          onClick={setToggleTheme}
          ref={myToggler}
        >
          <div className="toggler-background">
            <div className="toggler-dark-wrapper">
              <img src={imgsData.dark} width="16" height="16" alt="dark"></img>
            </div>
            <div className="toggler-light-wrapper">
              <img src={imgsData.light} width="16" height="16" alt="light"></img>
            </div>
          </div>
          <div className="toggler-thumb"></div>
        </section>)}
    </Consumer>
  )
}
