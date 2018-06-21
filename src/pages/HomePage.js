import React, { Component } from 'react'
import {
  addBoard,
  showBoard,
  deleteBoard,
  editCard,
  deleteCard
} from '../actions/homeAction'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Lanes from './components/Lanes'
import Header from '../pages/components/Header'
const Root = styled.div`
  white-space: nowrap;
  .lists-container {
    display: flex;
    align-items: start;
    padding: 0 0.8rem 0.8rem;
    overflow-x: auto;
    height: calc(100vh - 8.6rem);
    white-space: nowrap;
  }

  .add-card {
    font-size: 1.4rem;
    font-weight: 400;
    color: #838c91;
    padding: 1rem;
    cursor: pointer;
  }

  .add-card:hover {
    background-color: #cdd2d4;
    color: #4d4d4d;
    text-decoration: underline;
  }
`
class HomePage extends Component {
  state = {
    boardName: ''
  }
  componentDidMount() {
    this.props.handleShowBoard()
  }
  handleDeleteBoard = (e, id) => {
    e.stopPropagation()
    this.props.handleDeleteBoard(id)
  }
  handleEditCard = (e, id, txt) => {
    e.stopPropagation()
    this.props.handleEditCard(id, txt)
  }
  handleDeleteCard = (e, id) => {
    e.stopPropagation()
    this.props.handleDeleteCard(id)
  }
  render() {
    console.log(this.props.boards)
    return (
      <Root>
        <Header />
        <br />
        <br />
        <Lanes
          editCard={this.handleEditCard}
          handleToggleAddCard={this.handleToggleAddCard}
          boards={this.props.boards}
          handleDeleteBoard={this.handleDeleteBoard}
          handleAddBoard={this.props.handleAddBoard}
          handleDeleteCard={this.handleDeleteCard}
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
    handleDeleteBoard(id, txt) {
      dispatch(deleteBoard(id, txt))
    },
    handleEditCard(id, txt) {
      dispatch(editCard(id, txt))
    },
    handleDeleteCard(id) {
      dispatch(deleteCard(id))
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
