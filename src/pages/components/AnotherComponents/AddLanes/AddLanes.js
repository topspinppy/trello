import React, { Component } from 'react'
import { Button, Input } from 'reactstrap'

class AddLanes extends Component {
  render() {
    return (
      <div>
        {this.props.openCard ? (
          <div style={{ padding: '9px' }}>
            <Input
              onChange={e => this.props.handleChange(e)}
              value={this.props.boardName}
            />
            <Button
              color="success"
              style={{ marginTop: '6px' }}
              onClick={e => this.props.handleClick(e, this.props.boardName)}
            >
              Add
            </Button>
            <a
              style={{ marginLeft: '18px' }}
              onClick={this.props.handleCloseCard}
            >
              <i className="fas fa-times" />
            </a>
          </div>
        ) : (
          <div
            style={{ padding: '20px', fontSize: '20px', fontWeight: 'bold' }}
            onClick={this.props.handleOpenCard}
          >
            "Add a list..."
          </div>
        )}
      </div>
    )
  }
}

export default AddLanes
