import React, {Component} from 'react'
import '../css/SelectList.css'

class SelectList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }
  
  render() {
    return (
      <section className="select-list animated bounceInRight">
        more
        <ul className="btns">
          {
            this.props.buttons.map((btnObj) => {
              return <li className="btn" key={btnObj.btnName} onClick={btnObj.func}>> {btnObj.btnName}</li>
            })
          } 
        </ul>
      </section>
    )
  }
}

export default SelectList