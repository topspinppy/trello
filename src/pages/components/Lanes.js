import React, { Component } from 'react'
import styled from 'styled-components'
import LanesList from './LanesList'

const Containers = styled.div`
  white-space: nowrap;
`

const Lanes = props => {
  const lanes = props.boards.map(board => (
    <LanesList
      key={board._id}
      board={board}
      handleDeleteBoard={props.handleDeleteBoard}
    />
  )) //ไม่ต้องใส่ index เพราะมันวนจาก index ให้อยู่แล้ว
  return <Containers>{lanes}</Containers>
}

export default Lanes
