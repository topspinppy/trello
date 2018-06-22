import React, { Component } from 'react'
import ModalData from './ModalData'
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
          <div style={{ 'white-space': 'normal' }}>
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
