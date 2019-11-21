import React, {Component} from 'react'
import Accordion from '../components/Accordion'
import '../css/Aside.css'

const details = [{
  summaryContent: 'Collections',
  items: ['apple', 'dog', 'candy', 'girl', 'game', 'computer', 'javascript', 'journey', 'music', 'coffice', 'tea', 'city', 'life', 'lunch', 'milk', 'coke', 'light', 'dark'],
}, {
  summaryContent: 'History',
  items: ['apple', 'dog', 'candy', 'girl', 'game', 'computer', 'javascript', 'journey', 'music', 'coffice', 'tea', 'city', 'life', 'lunch', 'milk', 'coke', 'light', 'dark'],
}]
export default class Aside extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <aside className="aside">
        <Accordion detailsData={details}></Accordion>
      </aside>
    )
  }
}