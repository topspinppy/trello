import axios from 'axios'
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

export {
  addBoard,
  showBoard,
  deleteBoard,
  addCard,
  addBoardName,
  editCard,
  deleteCard
}
