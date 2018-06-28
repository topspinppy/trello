import axios from 'axios'
let _ = require('lodash')

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

const addTag = (tag, idcard) => dispatch => {
  const data = {
    tag,
    idcard
  }
  axios.patch(`${apiURL}manage/cards/tag`, data).then(response => {
    console.log(response)
    dispatch({
      type: 'ADD_TAG',
      payload: response.data
    })
  })
}

const moveCard = (item, allBoard) => dispatch => {
  console.log('moveCard Action !!')

  const boards = Array.from(allBoard)
  const startIndex = item.s.sourceIdx
  const endIndex = item.t.targetIdx

  //move in same lane
  if (item.s.sourceBoard === item.t.targetBoard) {
    console.log('same')
    console.log('boards', boards)
    const bIndex = boards.findIndex(b => b._id === item.s.sourceBoard)
    const [removed] = boards[bIndex].cards.splice(startIndex, 1)

    boards[bIndex].cards.splice(endIndex, 0, removed)

    boards.map(b => b.cards.map((c, idx) => (c.index = idx)))

    console.log('NewBoards =', boards)

    dispatch({
      type: 'MOVE_CARD',
      payload: boards
    })
  }

  //move to another lane
  else {
    console.log(boards)
    const sbIndex = boards.findIndex(b => b._id === item.s.sourceBoard)
    const tbIndex = boards.findIndex(b => b._id === item.t.targetBoard)
    console.log('tbindex', tbIndex)
    console.log('sbIndex', sbIndex)
    const [removed] = boards[sbIndex].cards.splice(startIndex, 1)

    boards[tbIndex].cards.splice(endIndex, 0, removed)

    boards.map(b => b.cards.map((c, idx) => (c.index = idx)))

    console.log('NewBoards =', boards)

    dispatch({
      type: 'MOVE_CARD',
      payload: boards
    })
  }
}

const attachToBoard = (item, allBoard) => dispatch => {
  console.log('attach Action !!')
  const boards = Array.from(allBoard)
  const startIndex = item.source.sourceIdx
  const endIndex = item.target.targetIdx
  const sbIndex = boards.findIndex(b => b._id === item.source.sourceBoard)
  const tbIndex = boards.findIndex(b => b._id === item.target.targetBoard)

  const [removed] = boards[sbIndex].cards.splice(startIndex, 1)
  boards[tbIndex].cards.push(removed)

  boards.map(b => b.cards.map((c, idx) => (c.index = idx)))

  console.log('NewBoards =', boards)

  dispatch({
    type: 'MOVE_CARD',
    payload: boards
  })
}

export {
  addBoard,
  showBoard,
  deleteBoard,
  addCard,
  addBoardName,
  editCard,
  deleteCard,
  moveBoard,
  addTag,
  moveCard,
  attachToBoard
}
