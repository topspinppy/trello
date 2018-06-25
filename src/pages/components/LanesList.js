import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import AddCard from './AddCard'
import Cards from './Cards'
import { Container, Row, Col } from 'reactstrap'
import {
  Menu,
  Dropdown,
  Icon,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'antd'

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
    .menudropdown {
      position: absolute;
      right: 20px;
    }
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
    margin-bottom: 10px;
  }

  .list-items li:hover {
    background-color: #eee;
  }
`

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
  handleDrop = draggedProps => {
    console.log('You Dropped', draggedProps.name)
  }

  render() {
    const card = this.props.board.cards.map(card => (
      <Cards
        handleDeleteCard={this.props.handleDeleteCard}
        editCard={this.props.editCard}
        key={card._id}
        card={card}
      />
    ))

    const menu = (
      <Menu>
        <Menu.Item>
          <a
            onClick={e => this.props.handleDeleteBoard(e, this.props.board._id)}
          >
            DeleteCard
          </a>
        </Menu.Item>
      </Menu>
    )

    return (
      <Board>
        <div className="list">
          <h3 className="list-title">
            <Row>
              <Col>{this.props.board.namelanes}</Col>
              <Col>
                <Dropdown overlay={menu} className="menudropdown">
                  <a className="ant-dropdown-link">
                    <Icon type="ellipsis" />
                  </a>
                </Dropdown>
              </Col>
            </Row>
          </h3>
          <ul className="list-items" style={{ 'word-wrap': 'break-word' }}>
            {card}
          </ul>
          {this.state.isAddCard ? (
            <AddCard
              idcard={this.props.board._id}
              handleCancel={this.handleCancel}
            />
          ) : (
            <div onClick={this.handleAddCard} className="add-card">
              {' '}
              Add a card...{' '}
            </div>
          )}
        </div>
      </Board>
    )
  }
}

export default LanesList
