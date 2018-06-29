import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import AddCard from './AnotherComponents/AddCards/index'
import { DragSource } from 'react-dnd'
import { DropTarget } from 'react-dnd'
import Cardsinlane from './Cards'
import { Container, Row, Col } from 'reactstrap'
import { moveBoard, attachToBoard } from '../../actions/homeAction'
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
import swal from 'sweetalert2'

const boardSource = {
  beginDrag(props, component) {
    const item = {
      id: props.board.id,
      title: props.board.namelanes,
      index: props.index,
      boardId: props.boardId
    }
    return item
  },

  isDragging(props, monitor) {
    return props.id === monitor.getItem().id
  }
}

const boardTarget = {
  drop(targetProps, monitor, component) {
    const targetId = targetProps.board._id
    const targetIdx = targetProps.index

    const sourceProps = monitor.getItem()
    const sourceId = sourceProps.id
    const sourceType = monitor.getItemType()
    const sourceIdx = sourceProps.index
    const sourceBoard = sourceProps.boardId
    const targetBoard = targetProps.board._id

    const item = {
      source: {
        sourceId,
        sourceIdx,
        sourceBoard
      },
      target: {
        targetId,
        targetIdx,
        targetBoard
      }
    }

    if (targetId !== sourceId && sourceType === 'BOARD') {
      targetProps.onMoveBoard(item, targetProps.boards)
    } else if (!targetProps.board.cards.length && sourceType === 'CARD') {
      targetProps.attachToBoard(item, targetProps.boards)
    }
  }
}

const collectDragSource = (DnDconnect, monitor) => ({
  connectDragSource: DnDconnect.dragSource(),
  connectDragPreview: DnDconnect.dragPreview(),
  isDragging: monitor.isDragging()
})

const collectDropTarget = (DnDconnect, monitor) => ({
  connectDropTarget: DnDconnect.dropTarget(),
  isOver: monitor.isOver()
})

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
  handleDrop = draggedProps => {}
  handleShowDialogDeleteLanes = (e, idlanes) => {
    swal({
      title: 'แจ้งเตือน !',
      text: 'คุณแน่ใจหรือไม่ว่าคุณต้องการลบ Lanes',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        swal(
          'ลบเรียบร้อย!',
          'Lanes ของท่านถูกลบออกจากระบบเรียบร้อย.',
          'success'
        )
        this.props.handleDeleteBoard(e, this.props.board._id)
      }
    })
  }
  render() {
    const {
      connectDragPreview,
      connectDropTarget,
      connectDragSource
    } = this.props
    const card = this.props.board.cards.map((card, index) => (
      <Cardsinlane
        handleDeleteCard={this.props.handleDeleteCard}
        editCard={this.props.editCard}
        index={index}
        key={card._id}
        card={card}
        boardid={this.props.board._id}
        handlePopOverTagAddToDatabase={this.props.handlePopOverTagAddToDatabase}
      />
    ))

    const menu = (
      <Menu>
        <Menu.Item>
          <a
            onClick={e =>
              this.handleShowDialogDeleteLanes(e, this.props.board._id)
            }
          >
            DeleteCard
          </a>
        </Menu.Item>
      </Menu>
    )
    return connectDragPreview(
      connectDragSource(
        connectDropTarget(
          <div>
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
                <ul className="list-items" style={{ wordWrap: 'break-word' }}>
                  {card}
                </ul>
                {this.state.isAddCard ? (
                  <AddCard
                    idcard={this.props.board._id}
                    handleCancel={this.handleCancel}
                  />
                ) : (
                  <div onClick={this.handleAddCard} className="add-card">
                    Add a card...
                  </div>
                )}
              </div>
            </Board>
          </div>
        )
      )
    )
  }
}

const mapStateToProps = state => {
  return {
    boards: state.homes.boards
  }
}

const mapDispatchToProps = dispatch => ({
  onMoveBoard(item, allBoard) {
    dispatch(moveBoard(item, allBoard))
  },
  attachToBoard(item, allBoard) {
    dispatch(attachToBoard(item, allBoard))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  DragSource('BOARD', boardSource, collectDragSource)(
    DropTarget(['CARD', 'BOARD'], boardTarget, collectDropTarget)(LanesList)
  )
)
