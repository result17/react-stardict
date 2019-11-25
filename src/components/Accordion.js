import React, {Component} from 'react'
import { Consumer } from '../App'
import '../css/Accordion.css'

class Accordion extends Component {
  constructor(props) {
    super(props)
    let state = this.props.detailsData.reduce((acc, cur) => {
      return (acc[`${cur.summaryContent}Open`] = false, acc)
    }, {})
    this.state = state
  }
  handleOpen = (event) => {

    // https://github.com/facebook/react/issues/15486
    event.preventDefault()
    
    let key = `${event.target.innerText}Open`

    this.setState({
      [key]: !this.state[key]
    })
  }
  render() {
    return (
      <Consumer>
        {({details, getWordData}) => (
          details.map((detail) => {
            return <details
              key={detail.context}
              className="detail-menu" 
              open={this.state[`${detail.context}Open`]}
              onClick={this.handleOpen}
            >
            <summary className="detail-menu-summary">{detail.context}</summary>
            <ul className="detail-menu-list">
              {detail.data &&
                detail.data.map((item) => {
                  return (
                    <li 
                      key={item}
                      className="detail-menu-item"
                      onClick={getWordData}
                    >
                    {item}
                    </li>
                  )
                })
              }
            </ul>
          </details>
          })
        )}
      </Consumer>
    )
  }
}

export default Accordion