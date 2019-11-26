import React from 'react'
import '../css/Main.css'
import Aside from './Aside'
import MainContent from './MainContext'

export default function Main() {
  return (
    <div className="main">
      <div className="aside-wrapper">
        <Aside></Aside>
      </div>
      <div className="maincontent-wrapper">
        <MainContent></MainContent>
      </div>
    </div>
  )
}
