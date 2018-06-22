import React, { Component } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col
} from 'reactstrap'

class ModalData extends Component {
  state = {
    description: '',
    descriptiontoggleedit: false
  }
  handleToggleEditTrue = () => {
    this.setState({ descriptiontoggleedit: true })
  }
  handleSaveToDescription = (e, id, txt) => {
    this.props.editCard(e, id, txt)
    this.setState({ description: txt, descriptiontoggleedit: false })
  }
  handleDel = () => {}
  handleChange = (field, e) => {
    this.setState({
      [field]: e.target.value
    })
  }
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.props.toggle}
          className={this.props.className}
          size="lg"
        >
          <ModalHeader toggle={this.props.toggle}>
            {this.props.data.namecards}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="8">
                <Row>
                  <Col xs="1">
                    <i class="fas fa-align-left" />
                  </Col>
                  <Col xs="6">
                    <b>
                      <h5>Description</h5>
                    </b>
                  </Col>
                </Row>
                <Row>
                  <Col xs="1" />
                  <Col
                    xs="7"
                    onClick={this.handleToggleEditTrue}
                    style={{ 'white-space': 'normal' }}
                  >
                    {this.state.descriptiontoggleedit ? (
                      <div>
                        <textarea
                          style={{ width: '165%', height: '300px' }}
                          onChange={e => this.handleChange('description', e)}
                          id="exampleText"
                        >
                          {this.props.data.description}
                        </textarea>
                        <button
                          type="button"
                          onClick={e =>
                            this.handleSaveToDescription(
                              e,
                              this.props.data._id,
                              this.state.description
                            )
                          }
                        >
                          Save ffff
                        </button>
                        &nbsp;&nbsp;&nbsp;
                      </div>
                    ) : this.props.data.description === '' ? (
                      <div>
                        <textarea
                          style={{ width: '165%' }}
                          onClick={this.handleClickTextBoxShowButton}
                        >
                          {this.props.data.description}
                        </textarea>
                      </div>
                    ) : (
                      this.props.data.description
                    )}
                    <br />
                    <br />
                  </Col>
                </Row>
              </Col>
              <Col xs="4">
                Actions
                <Col xs="14">
                  <Button
                    onClick={e =>
                      this.props.handleDeleteCards(e, this.props.data._id)
                    }
                    color="danger"
                    block
                  >
                    Delete Card
                  </Button>
                </Col>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default ModalData
