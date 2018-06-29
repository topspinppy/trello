import React, { Component } from 'react'
import { addCard } from '../../../../actions/homeAction'
import { connect } from 'react-redux'
import { Input } from 'reactstrap'

class AddCard extends Component {
  state = {
    changeAdd: ''
  }
  handleChangeAdd = e => {
    this.setState({ changeAdd: e.target.value })
  }
  handleAddCardToLens = (e, id) => {
    e.stopPropagation()
    this.setState({ changeAdd: '' })
    this.props.handleAddCard(id, this.state.changeAdd)
  }
  render() {
    console.log('ttttt', this.props)
    return (
      <div>
        <Input
          type="textarea"
          placeholder="Enter card description"
          style={{ margin: '9px', width: '362px' }}
          onChange={this.handleChangeAdd}
          value={this.state.changeAdd}
        />
        <div className="btn-group">
          <button
            className="btn btn-success"
            style={{ marginLeft: '10px' }}
            onClick={e => this.handleAddCardToLens(e, this.props.idcard)}
          >
            Save
          </button>
          <button onClick={this.props.handleCancel} className="btn btn-success">
            Cancel
          </button>
        </div>
        <br />
        <br />
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
