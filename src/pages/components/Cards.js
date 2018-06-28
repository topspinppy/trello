import React, { Component } from 'react'
import { connect } from 'react-redux'
import ModalData from './ModalData'
import { DragSource } from 'react-dnd'
import { DropTarget } from 'react-dnd'
import { moveCard } from '../../actions/homeAction'

const cardSource = {
  beginDrag(props, component) {
    console.log('cardSource =', props)
    const item = {
      id: props.card._id,
      title: props.card.namecards,
      index: props.index,
      boardId: props.boardid
    }
    return item
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id
  }
}

const cardTarget = {
  drop(targetProps, monitor, component) {
    const targetId = targetProps.card._id
    const targetIdx = targetProps.index
    const sourceProps = monitor.getItem()
    const sourceId = sourceProps.id
    const sourceType = monitor.getItemType()
    const sourceIdx = sourceProps.index
    const sourceBoard = sourceProps.boardId
    const targetBoard = targetProps.boardid

    const item = {
      s: {
        sourceId,
        sourceIdx,
        sourceBoard
      },
      t: {
        targetId,
        targetIdx,
        targetBoard
      }
    }
    if (targetId !== sourceId && sourceType === 'CARD') {
      console.log('item =', item)
      targetProps.onMoveCard(item, targetProps.boards)
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

class Cards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  handleDeleteCard = (e, id) => {
    this.props.handleDeleteCard(e, id)
    this.setState({ modal: false })
  }

  render() {
    const {
      connectDragPreview,
      connectDropTarget,
      connectDragSource
    } = this.props
    const url = `http://localhost:5000/${this.props.card.Attachment}`
    return connectDragPreview(
      connectDragSource(
        connectDropTarget(
          <div>
            <li onClick={this.toggle}>
              {this.props.card.Attachment ? (
                <img
                  src={url}
                  alt="attachmentimg"
                  style={{ width: '100%', height: 'auto' }}
                />
              ) : null}
              <div style={{ whiteSpace: 'normal' }}>
                {this.props.card.namecards}
              </div>
            </li>
            <ModalData
              urlimg={url}
              handleDeleteCards={this.handleDeleteCard}
              editCard={this.props.editCard}
              data={this.props.card}
              isOpen={this.state.modal}
              toggle={this.toggle}
              handlePopOverTagAddToDatabase={
                this.props.handlePopOverTagAddToDatabase
              }
            />
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
  onMoveCard(item, boards) {
    console.log('items', item)
    dispatch(moveCard(item, boards))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  DragSource('CARD', cardSource, collectDragSource)(
    DropTarget('CARD', cardTarget, collectDropTarget)(Cards)
  )
)
