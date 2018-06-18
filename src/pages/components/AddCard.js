import React, { Component } from 'react'
import { addCard } from '../../actions/homeAction'
import { connect } from 'react-redux'

class AddCard extends Component {
  state = {
    changeAdd: ''
  }
  handleChangeAdd = e => {
    this.setState({ changeAdd: e.target.value })
  }
  handleAddCardToLens = (e, id) => {
    e.stopPropagation()
    this.props.handleAddCard(id, this.state.changeAdd)
  }
  render() {
    console.log('ttttt', this.props)
    return (
      <div>
        <input
          placeholder="Enter card description"
          type="text"
          onChange={this.handleChangeAdd}
        />
        <br />
        <div className="btn-group">
          <button
            className="btn btn-success"
            onClick={e => this.handleAddCardToLens(e, this.props.idcard)}
          >
            Save
          </button>
          <button onClick={this.props.handleCancel} className="btn btn-success">
            Cancel
          </button>
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleAddCard(id, txt) {
      dispatch(addCard(id, txt))
    }
  }
}
const mapStateToProps = state => {
  return {
    boards: state.homes.boards
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard)
