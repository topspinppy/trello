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
  display: inline-block;
  flex: 1 1 auto;
  width: 370px;
  height: 800px;
  background-color: #bebebe;
  margin-right: 50px;
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
    this.setState({ isAddCard: true })
  }

  handleCancel = () => {
    this.setState({ isAddCard: false })
  }
  render() {
    console.log('ddd', this.props.board)
    const card = this.props.board.cards.map(card => (
      <Cards key={card._id} card={card} />
    ))
    return (
      <Board>
        <ColumnTitle>{this.props.board.namelanes}</ColumnTitle>
        <Card>{card}</Card>
        <button
          type="submit"
          onClick={e => this.props.handleDeleteBoard(e, this.props.board._id)}
        >
          ลบ
        </button>
        <Footer>
          <a onClick={this.handleAddCard}>AddCard</a>
          {this.state.isAddCard ? (
            <AddCard
              idcard={this.props.board._id}
              handleCancel={this.handleCancel}
            />
          ) : null}
        </Footer>
      </Board>
    )
  }
}

export default LanesList
