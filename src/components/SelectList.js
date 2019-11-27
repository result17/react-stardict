import React, {Component} from 'react'
import '../css/SelectList.css'
import { Consumer } from '../App'

class SelectList extends Component {
  render() {
    return (
      <Consumer>
        {({theme}) => (
          <section className={theme ? "select-list animated bounceInRight" : "select-list select-list-dark animated bounceInRight"}>
            more
            <ul className="btns">
              {
                this.props.buttons.map((btnObj) => {
                  return <li className="btn" key={btnObj.btnName} onClick={btnObj.func}>> {btnObj.btnName}</li>
                })
              } 
            </ul>
        </section>
        )}
      </Consumer>
    )
  }
}

export default SelectList