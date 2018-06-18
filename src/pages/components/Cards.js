import React, { Component } from 'react'

class Cards extends Component {
  render() {
    return (
      <li>
        {this.props.card.namecards}
        {/* <Card>
          <CardBody>
            <CardTitle>{this.props.card.namecards}</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText style={{ 'line-height': '14px' }}>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </CardText>
            <Button>Button</Button>
          </CardBody>
        </Card> */}
      </li>
    )
  }
}

export default Cards
