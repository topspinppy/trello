import React, { Component } from 'react'
import { Upload, Icon, message, Tag } from 'antd'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Popover,
  PopoverHeader,
  PopoverBody
} from 'reactstrap'
import PopOverTag from '../PopOver/PopOverTag'

const Dragger = Upload.Dragger

class ModalData extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      description: '',
      descriptiontoggleedit: false,
      previewVisible: false,
      previewImage: '',
      popoverOpen: false
    }
  }
  handleToggleEditTrue = () => {
    this.setState({ descriptiontoggleedit: true })
  }
  handleSaveToDescription = (e, id, txt) => {
    this.props.editCard(e, id, txt)
    this.setState({ description: txt, descriptiontoggleedit: false })
  }
  handleDel = () => {}
  handleChangeTextArea = (field, e) => {
    this.setState({
      [field]: e.target.value
    })
  }
  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }
  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    })
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  render() {
    const props = {
      name: 'file',
      multiple: true,
      action: `http://localhost:5000/manage/postsupload/${this.props.data._id}`,
      onChange(info) {
        const status = info.file.status
        if (status !== 'uploading') {
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`)
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`)
        }
      }
    }

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
          <ModalBody style={{ height: 'auto' }}>
            <Row>
              <Col xs="12">
                <Row>
                  <Col xs="1">
                    <i className="fas fa-tags" />
                  </Col>
                  <Col xs="11">
                    {this.props.data.tag.map(tag => (
                      <Tag color={tag}>{tag}</Tag>
                    ))}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xs="8">
                <Row>
                  <Col xs="1">
                    <i className="fas fa-align-left" />
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
                    style={{ whiteSpace: 'normal' }}
                  >
                    {this.state.descriptiontoggleedit ? (
                      <div>
                        <textarea
                          style={{ width: '165%', height: '300px' }}
                          onChange={e =>
                            this.handleChangeTextArea('description', e)
                          }
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
                          Save
                        </button>
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
                <Row>
                  <Col xs="1">
                    <i className="fas fa-upload" />
                  </Col>
                  <Col xs="7">
                    <b>
                      <h5>File Attachment</h5>
                    </b>
                  </Col>
                </Row>
                <Row style={{ marginBottom: '20px' }}>
                  <Col xs="1" />
                  <Col xs="11">
                    <Dragger {...props} style={{ width: '100%' }}>
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit
                        from uploading company data or other band files
                      </p>
                    </Dragger>
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
                  <Button
                    block
                    id="Popover1"
                    color="info"
                    style={{ marginTop: '8px' }}
                    onClick={this.toggle}
                  >
                    Launch Popover
                  </Button>
                  <PopOverTag
                    idcard={this.props.data._id}
                    data={this.props.data}
                    toggle={this.toggle}
                    isOpen={this.state.popoverOpen}
                    handlePopOverTagAddToDatabase={
                      this.props.handlePopOverTagAddToDatabase
                    }
                  />
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
