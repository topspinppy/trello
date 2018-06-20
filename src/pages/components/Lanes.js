import React, { Component } from 'react'
import { addBoardName } from '../../actions/homeAction'
import { connect } from 'react-redux'
import styled from 'styled-components'
import LanesList from './LanesList'

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

  handleClick = (e, text) => {
    // console.log(this.state.boardName)
    e.stopPropagation()
    this.props.handleAddBoard(this.state.boardName)
    this.setState({ boardName: '' })
  }
  render() {
    const lanes = this.props.boards.map(board => (
      <LanesList
        key={board._id}
        board={board}
        handleDeleteBoard={this.props.handleDeleteBoard}
      />
    ))
    return (
      <Containers>
        <section className="lists-container">
          {lanes}
          <div className="list">
            <input onChange={this.handleChange} value={this.state.boardName} />
            <button onClick={e => this.handleClick(e, this.state.boardName)}>
              Add
            </button>
          </div>
        </section>
      </Containers>
    )
  }
}

export default Lanes
