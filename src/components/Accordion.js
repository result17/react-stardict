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
    // let key = `${event.target.innerText}Open`
    // let newState = Object.assign(this.state)
    // newState[key] = !this.state[key]
    // this.setState(newState)

    // https://github.com/facebook/react/issues/15486
    event.preventDefault()
    
    let key = `${event.target.innerText}Open`

    this.setState({
      [key]: !this.state[key]
    })
  }
  render() {
    return (
      this.props.detailsData.map((detail, index) => {
        return (
          <Consumer>
            {({setSearchWord}) => (
              <details
                key={index}
                className="detail-menu" 
                open={this.state[`${detail.summaryContent}Open`]}
                onClick={this.handleOpen}
              >
                <summary className="detail-menu-summary">{detail.summaryContent}</summary>
                <ul className="detail-menu-list">
                  {detail.items &&
                    detail.items.map((item) => {
                      return (
                        <li 
                          key={item}
                          className="detail-menu-item"
                          onClick={setSearchWord}
                        >
                        {item}
                        </li>
                      )
                    })
                  }
                </ul>
              </details>
            )}
          </Consumer>
        )
      })
    )
  }
}

export default Accordion