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
import { Upload, Icon, message } from 'antd'

const Dragger = Upload.Dragger

class ModalData extends Component {
  state = {
    description: '',
    descriptiontoggleedit: false,
    previewVisible: false,
    previewImage: ''
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
  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
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
          console.log(info.file, info.fileList)
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
                          onChange={e => this.handleChange('description', e)}
                          id="exampleText"
                          defaultValue={this.props.data.description}
                        />
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
