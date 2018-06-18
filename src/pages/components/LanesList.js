import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import AddCard from './AddCard'
import Cards from './Cards'
import { Container, Row, Col } from 'reactstrap'

const Containers = styled.div`
  white-space: nowrap;
`
const Board = styled.div`
  float: left;
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

  .list:last-of-type {
    margin-right: 4px;
  }

  .list-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #333;
    padding: 1rem;
  }

  .list-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-content: start;
    padding: 0 0.6rem 0.5rem;
    overflow-y: auto;
  }

  .list-items::-webkit-scrollbar {
    width: 1.6rem;
  }

  .list-items::-webkit-scrollbar-thumb {
    background-color: #c4c9cc;
    border-right: 0.6rem solid #e2e4e6;
  }

  .list-items li {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.3;
    background-color: #fff;
    padding: 0.65rem 0.6rem;
    color: #4d4d4d;
    border-bottom: 0.1rem solid #ccc;
    border-radius: 0.3rem;
    margin-bottom: 0.6rem;
    word-wrap: break-word;
    cursor: pointer;
  }

  .list-items li:last-of-type {
    margin-bottom: 0;
  }

  .list-items li:hover {
    background-color: #eee;
  }
`
const ColumnTitle = styled.div`
  color: white;
  /* font-style: oblique; */
  font-size: x-large;
  font-weight: bold;
  text-transform: capitalize;
  padding: 10px;
  text-align: justify;
  border-radius: 10px;
`
const Card = styled.div`
  flex: 1 1 auto;
  margin-bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0 4px;
  padding: 0 4px;
  z-index: 1;
  min-height: 0;
  text-decoration: none;
  word-wrap: break-word;
  white-space: normal;
`
const Footer = styled.div``

class LanesList extends Component {
  state = {
    isAddCard: false
  }
  handleAddCard = () => {
    this.setState({
      isAddCard: true
    })
  }

  handleCancel = () => {
    this.setState({
      isAddCard: false
    })
  }
  render() {
    console.log('ddd', this.props.board)
    const card = this.props.board.cards.map(card => (
      <Cards key={card._id} card={card} />
    ))
    return (
      <Board>
        <div class="list">
          <h3 class="list-title"> {this.props.board.namelanes} </h3>{' '}
          <ul class="list-items"> {card} </ul>{' '}
          <button
            type="submit"
            onClick={e => this.props.handleDeleteBoard(e, this.props.board._id)}
          >
            ลบ{' '}
          </button>{' '}
          <Footer>
            <a onClick={this.handleAddCard}> AddCard </a>{' '}
            {this.state.isAddCard ? (
              <AddCard
                idcard={this.props.board._id}
                handleCancel={this.handleCancel}
              />
            ) : null}{' '}
          </Footer>{' '}
          <div class="add-card"> Add a card... </div>{' '}
        </div>{' '}
      </Board>
    )
  }
}

export default LanesList
