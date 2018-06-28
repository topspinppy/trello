import React, { Component } from 'react'
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap'
import { Tag } from 'antd'
import lodash from 'lodash'
class PopOverTag extends Component {
  state = {
    Tag: this.props.data.tag || []
  }
  handleAddTagToDatabase = async e => {
    const isHaveTag = this.state.Tag.includes(e.target.id)
    if (isHaveTag) {
      await this.setState({
        Tag: this.state.Tag.filter(tag => tag !== e.target.id)
      })
    } else {
      await this.setState({ Tag: [...this.state.Tag, e.target.id] })
    }
    await this.props.handlePopOverTagAddToDatabase(
      this.state.Tag,
      this.props.idcard
    )
  }
  render() {
    console.log('state =', this.state)
    console.log('props =', this.props.data)
    const tagColor = [
      'magenta',
      'red',
      'orange',
      'gold',
      'lime',
      'green',
      'cyan',
      'blue',
      'purple'
    ]
    const tagItem = tagColor.map((tag, index) => {
      return (
        <Tag
          style={{ background: this.state.Tag.includes(tag) ? tag : 'white' }}
          id={tag}
          color={tag}
          key={index}
          onClick={this.handleAddTagToDatabase}
        >
          {tag}
        </Tag>
      )
    })
    return (
      <Popover
        placement="bottom"
        isOpen={this.props.isOpen}
        target="Popover1"
        toggle={this.props.toggle}
      >
        <PopoverHeader>Select Tag</PopoverHeader>
        <PopoverBody>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {tagItem}
          </div>
        </PopoverBody>
      </Popover>
    )
  }
}

export default PopOverTag
