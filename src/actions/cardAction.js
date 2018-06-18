import axios from 'axios'
// const addCard = (id,text) => ({
//   type: 'ADD_CARD',
//   payload: {
//     id,
//     text
//   }
// })
const apiURL = 'http://localhost:5000/'

const showCard = id => dispatch => {
  axios.get(`${apiURL}manage/cards`).then(response => {
    dispatch({
      type: 'SHOW_CARD',
      payload: response.data.items
    })
  })
}

export { addCard, showCard }
