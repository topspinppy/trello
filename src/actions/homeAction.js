import axios from 'axios'

const apiURL = 'http://localhost:5000/'

const addBoard = text => dispatch => {
  let data = {
    namelanes: text
  }
  axios.post(`${apiURL}lanes`, data).then(res => {
    let da = res.data
    da.map(d => {
      return d.cards.sort((a, b) => a.index - b.index)
    })
    dispatch({
      type: 'ADD_BOARD',
      payload: da
    })
  })
}
const showBoard = () => dispatch => {
  axios.get(`${apiURL}lanes/all`).then(res => {
    let datashowboard = res.data
    datashowboard.map(datashowboard => {
      return datashowboard.cards.sort((a, b) => a.index - b.index)
    })
    dispatch({
      type: 'SHOW_BOARD',
      payload: datashowboard
    })
  })
}

const deleteBoard = id => dispatch => {
  axios.delete(`${apiURL}lanes/delete/${id}`).then(res => {
    dispatch({
      type: 'DELETE_BOARD',
      payload: res.data
    })
  })
}

const addCard = (lanes, namecards) => dispatch => {
  let data = {
    namecards
  }
  axios.post(`${apiURL}manage/cards/${lanes}`, data).then(res => {
    let dataAddCard = res.data
    dataAddCard.map(dataAddCards => {
      return dataAddCards.cards.sort((a, b) => a.index - b.index)
    })
    dispatch({
      type: 'ADD_CARD',
      payload: dataAddCard
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
  console.log('data', data)
  axios.patch(`${apiURL}manage/cardsdescription`, data).then(res => {
    dispatch({
      type: 'ADD_BOARDNAME',
      payload: res.data
    })
  })
}

const deleteCard = _id => dispatch => {
  axios.delete(`${apiURL}manage/cards/${_id}`).then(res => {
    dispatch({
      type: 'DELETE_CARD',
      payload: res.data
    })
  })
}
const moveBoard = (item, allBoard) => dispatch => {
  const boards = Array.from(allBoard)
  const startIndex = item.source.sourceIdx
  const endIndex = item.target.targetIdx
  const [removed] = boards.splice(startIndex, 1)
  boards.splice(endIndex, 0, removed)
  axios.patch(`${apiURL}lanes/sortlanes`, boards).then(res => {
    dispatch({
      type: 'MOVE_BOARD',
      payload: res.data
    })
  })
}

const addTag = (tag, idcard) => dispatch => {
  const data = {
    tag,
    idcard
  }
  axios.patch(`${apiURL}manage/cards/tag`, data).then(res => {
    dispatch({
      type: 'ADD_TAG',
      payload: res.data
    })
  })
}

const sortArray = arr => {
  return arr.map(arr => {
    return arr.cards.sort((a, b) => a.index - b.index)
  })
}

const moveCard = (item, allBoard) => dispatch => {
  const boards = Array.from(allBoard)
  const startIndex = item.s.sourceIdx
  const endIndex = item.t.targetIdx
  if (item.s.sourceBoard === item.t.targetBoard) {
    const bIndex = boards.findIndex(b => b._id === item.s.sourceBoard)
    const [removed] = boards[bIndex].cards.splice(startIndex, 1)
    boards[bIndex].cards.splice(endIndex, 0, removed)
    boards.map(b => b.cards.map((c, idx) => ((c._id = c._id), (c.index = idx))))
    const cards = boards.map(b => b.cards)
    let Arraycard = []
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < cards[i].length; j++) {
        Arraycard.push(cards[i][j])
      }
    }
    axios.patch(`${apiURL}lanes/card`, Arraycard).then(res => {
      let da = res.data
      da.map(d => {
        return d.cards.sort((a, b) => a.index - b.index)
      })
      dispatch({
        type: 'MOVE_CARD',
        payload: da
      })
    })
  } else {
    const sbIndex = boards.findIndex(b => b._id === item.s.sourceBoard)
    const tbIndex = boards.findIndex(b => b._id === item.t.targetBoard)
    const [removed] = boards[sbIndex].cards.splice(startIndex, 1)
    boards[tbIndex].cards.splice(endIndex, 0, removed)
    boards.map(b => b.cards.map((c, idx) => ((c._id = c._id), (c.index = idx))))
    const cards = boards.map(b => b.cards)
    let Arraycard = []
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < cards[i].length; j++) {
        Arraycard.push(cards[i][j])
      }
    }
    const data = {
      card: Arraycard,
      lane: boards
    }
    axios.patch(`${apiURL}lanes/cards`, data).then(res => {
      let dataMoveToAnotherlanes = res.data
      dataMoveToAnotherlanes.map(data => {
        return data.cards.sort((a, b) => a.index - b.index)
      })
      dispatch({
        type: 'MOVE_CARD',
        payload: da
      })
    })
  }
}

const attachToBoard = (item, allBoard) => dispatch => {
  const boards = Array.from(allBoard)
  const startIndex = item.source.sourceIdx
  const endIndex = item.target.targetIdx
  const sbIndex = boards.findIndex(b => b._id === item.source.sourceBoard)
  const tbIndex = boards.findIndex(b => b._id === item.target.targetBoard)
  const [removed] = boards[sbIndex].cards.splice(startIndex, 1)
  boards[tbIndex].cards.push(removed)

  boards.map(b => {
    b.cards.map((c, idx) => {
      c.index = idx
      c._id = c._id
    })
  })
  axios.patch(`${apiURL}sortlanes/`, boards).then(res => {
    let da = res.data
    da.map(d => {
      return d.cards.sort((a, b) => a.index - b.index)
    })
    dispatch({
      type: 'MOVE_CARD',
      payload: da
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
  deleteCard,
  moveBoard,
  addTag,
  moveCard,
  attachToBoard
}
