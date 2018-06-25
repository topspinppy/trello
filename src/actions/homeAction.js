import axios from 'axios'
let _ = require('lodash')
//ต้องกำหนด Export ในทุก Action

// export const addBoard = text => ({
//   type: 'ADD_BOARD',
//   payload: text,
// })
const apiURL = 'http://localhost:5000/'

const addBoard = text => dispatch => {
  let data = {
    namelanes: text
  }
  axios.post(`${apiURL}lanes`, data).then(response => {
    dispatch({
      type: 'ADD_BOARD',
      payload: response.data
    })
  })
}

const showBoard = () => dispatch => {
  axios.get(`${apiURL}lanes/all`).then(response => {
    dispatch({
      type: 'SHOW_BOARD',
      payload: response.data
    })
  })
}

const deleteBoard = id => dispatch => {
  axios.delete(`${apiURL}lanes/${id}`).then(response => {
    console.log('foifkoek ', response)
    dispatch({
      type: 'DELETE_BOARD',
      payload: response.data
    })
  })
}

const addCard = (lanes, namecards) => dispatch => {
  let data = {
    namecards
  }
  console.log('dataaddCard = ', data)
  axios.post(`${apiURL}manage/cards/${lanes}`, data).then(response => {
    console.log('Form add card action: ', response)
    dispatch({
      type: 'ADD_CARD',
      payload: response.data
    })
  })
}

const addBoardName = text => dispatch => ({
  type: 'ADD_BOARDNAME',
  payload: text
})

const editCard = (_id, description) => dispatch => {
  let data = {
    _id,
    description
  }
  console.log('data = ', data)
  axios.patch(`${apiURL}manage/cardsdescription`, data).then(response => {
    dispatch({
      type: 'ADD_BOARDNAME',
      payload: response.data
    })
  })
}

const deleteCard = _id => dispatch => {
  axios.delete(`${apiURL}manage/cards/${_id}`).then(response => {
    dispatch({
      type: 'DELETE_CARD',
      payload: response.data
    })
  })
}
const moveBoard = (item, allBoard) => dispatch => {
  console.log('moveBoard Action !!')
  const boards = Array.from(allBoard)
  const startIndex = item.source.sourceIdx
  const endIndex = item.target.targetIdx

  //Remove Source Board
  const [removed] = boards.splice(startIndex, 1)
  //Insert Source Board to targetIndex
  boards.splice(endIndex, 0, removed)

  //Now We have NewBoards
  console.log('Newboards =', boards)

  //Update Backend here
  axios.patch(`${apiURL}lanes/sortlanes`, boards).then(response => {
    console.log(response)
    dispatch({
      type: 'MOVE_BOARD',
      payload: response.data
    })
  })
  //Then update our state
}

export {
  addBoard,
  showBoard,
  deleteBoard,
  addCard,
  addBoardName,
  editCard,
  deleteCard,
  moveBoard
}
