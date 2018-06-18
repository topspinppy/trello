import React, { Component } from 'react'
import { addBoard, showBoard, deleteBoard } from '../actions/homeAction'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Lanes from './components/Lanes'

const Root = styled.div`
  backgroud-color: #f8f8fb;
`
class HomePage extends Component {
  state = {
    boardName: ''
  }
  componentDidMount() {
    this.props.handleShowBoard()
  }
  handleChange = e => {
    this.setState({ boardName: e.target.value })
  }

  handleClick = () => {
    // console.log(this.state.boardName)
    this.props.handleAddBoard(this.state.boardName)
    this.setState({ boardName: '' })
  }
  handleDeleteBoard = (e, id) => {
    e.stopPropagation()
    this.props.handleDeleteBoard(id)
  }
  render() {
    console.log(this.props.boards)
    return (
      <Root>
        <p>Add new Board</p>
        <input onChange={this.handleChange} value={this.state.boardName} />
        <button onClick={this.handleClick}>Add</button>
        <Lanes
          handleToggleAddCard={this.handleToggleAddCard}
          boards={this.props.boards}
          handleDeleteBoard={this.handleDeleteBoard}
        />
      </Root>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleAddBoard(text) {
      dispatch(addBoard(text))
    },
    handleShowBoard() {
      dispatch(showBoard())
    },
    handleDeleteBoard(id) {
      dispatch(deleteBoard(id))
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
)(HomePage)
