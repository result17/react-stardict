import React, {Component} from 'react'
import { Consumer } from '../App'
import myReverse from '../utils/myReverse'
import '../css/Accordion.css'

class Accordion extends Component {
  render() {
    return (
      <Consumer>
        {({details, setAccordionSearchWordData, setAccordionOpen}) => (
          details.map((detail) => {
            return <details
              key={detail.context}
              className="detail-menu" 
              open={detail.open}
            >
            <summary className="detail-menu-summary"onClick={setAccordionOpen}>{detail.context}</summary>
            <ul className="detail-menu-list">
              {detail.data &&
                myReverse(detail.data).map((item) => {
                  if (!item) return
                  return (
                    <li 
                      key={item}
                      className="detail-menu-item"
                      onClick={setAccordionSearchWordData}
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