import React, {Component} from 'react'
import { Consumer } from '../App'
import '../css/Accordion.css'

class Accordion extends Component {
  render() {
    return (
      <Consumer>
        {({details, getWordData, setAccordionOpen}) => (
          details.map((detail) => {
            return <details
              key={detail.context}
              className="detail-menu" 
              open={detail.open}
            >
            <summary className="detail-menu-summary"onClick={setAccordionOpen}>{detail.context}</summary>
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