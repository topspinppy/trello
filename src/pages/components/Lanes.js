import React, { Component } from 'react'
import { addBoardName } from '../../actions/homeAction'
import { connect } from 'react-redux'
import styled from 'styled-components'
import LanesList from './LanesList'
import { DropTarget } from 'react-dnd'
import AddLanes from '../components/AnotherComponents/AddLanes/index'

const Containers = styled.div`
  white-space: nowrap;
  .lists-container {
    display: flex;
    align-items: start;
    padding: 0 0.8rem 0.8rem;
    overflow-x: auto;
    height: calc(100vh - 8.6rem);
    white-space: nowrap;
  }
  .list {
    flex: 0 0 27rem;
    display: flex;
    flex-direction: column;
    background-color: #e2e4e6;
    max-height: calc(100vh - 11.8rem);
    border-radius: 0.3rem;
    margin-right: 1rem;
    float: left;
    width: 380px;
  }
`

class Lanes extends Component {
  state = {
    boardName: '',
    openCard: false
  }
  handleChange = e => {
    this.setState({ boardName: e.target.value })
  }
  handleCloseCard = () => {
    this.setState({ openCard: false })
  }
  handleOpenCard = () => {
    this.setState({ openCard: true })
  }
  handleClick = (e, text) => {
    e.stopPropagation()
    this.props.handleAddBoard(this.state.boardName)
    this.setState({ boardName: '' })
  }
  render() {
    const lanes = this.props.boards.map((board, index) => (
      <LanesList
        handleDeleteCard={this.props.handleDeleteCard}
        editCard={this.props.editCard}
        key={board._id}
        index={index}
        board={board}
        boardId={this.props.boards._id}
        handleDeleteBoard={this.props.handleDeleteBoard}
        handlePopOverTagAddToDatabase={this.props.handlePopOverTagAddToDatabase}
      />
    ))
    return (
      <Containers>
        <section className="lists-container">
          {lanes}
          <div className="list">
            <AddLanes
              handleOpenCard={this.handleOpenCard}
              handleCloseCard={this.handleCloseCard}
              openCard={this.state.openCard}
              handleChange={this.handleChange}
              boardName={this.state.boardName}
              handleClick={this.handleClick}
            />
          </div>
        </section>
      </Containers>
    )
  }
}

export default Lanes
