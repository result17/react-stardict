import React, {Component} from 'react'
import Accordion from '../components/Accordion'
import '../css/Aside.css'

export default class Aside extends Component {
  render() {
    return (
      <aside className="aside">
        <Accordion></Accordion>
      </aside>
    )
  }
}