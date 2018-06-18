import React, { Component } from 'react'
import styled from 'styled-components'
import LanesList from './LanesList'

const Containers = styled.div`
  white-space: nowrap;
  .lists-container {
    display: flex;
    align-items: start;
    padding: 0 0.8rem 0.8rem;
    overflow-x: auto;
    height: calc(100vh - 8.6rem);
    white-space: nowrap;
  }
`

const Lanes = props => {
  const lanes = props.boards.map(board => (
    <LanesList
      key={board._id}
      board={board}
      handleDeleteBoard={props.handleDeleteBoard}
    />
  )) //ไม่ต้องใส่ index เพราะมันวนจาก index ให้อยู่แล้ว
  return (
    <Containers>
      <section className="lists-container">{lanes}</section>
    </Containers>
  )
}

export default Lanes
