import React, { Component } from 'react'
import ModalData from './ModalData'
import { DragSource } from 'react-dnd'
import { DropTarget } from 'react-dnd'

// const boardSource = {
//   beginDrag(props, component) {
//     console.log("beginDrag" , props)
//     const item = {
//       id: props.key,
//       title: props.card.namecards,
//       index: props.index,
//     }
//     return item
//   },

//   isDragging(props, monitor) {
//     return props.id === monitor.getItem().id
//   },
// }

class Cards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  handleDeleteCard = (e, id) => {
    this.props.handleDeleteCard(e, id)
    this.setState({ modal: false })
  }

  render() {
    return (
      <div>
        <li onClick={this.toggle}>
          <div style={{ whiteSpace: 'normal' }}>
            {this.props.card.namecards}
          </div>
        </li>
        <ModalData
          handleDeleteCards={this.handleDeleteCard}
          editCard={this.props.editCard}
          data={this.props.card}
          isOpen={this.state.modal}
          toggle={this.toggle}
        />
      </div>
    )
  }
}

export default Cards
