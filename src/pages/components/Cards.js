import React, { Component } from 'react'
import ModalData from './ModalData'
import { DragSource } from 'react-dnd'
import { DropTarget } from 'react-dnd'

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
    const url = `http://localhost:5000/${this.props.card.Attachment}`
    return (
      <div>
        <li onClick={this.toggle}>
          {this.props.card.Attachment ? (
            <img
              src={url}
              alt="attachmentimg"
              style={{ width: '100%', height: 'auto' }}
            />
          ) : null}
          <div style={{ whiteSpace: 'normal' }}>
            {this.props.card.namecards}
          </div>
        </li>
        <ModalData
          urlimg={url}
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
