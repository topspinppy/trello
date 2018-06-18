import { combineReducers } from 'redux'
import homes from './boardReducer'
import card from './cardsReducer'

export default combineReducers({
  //เอา Reducer ทุกตัวมารวมในนี้
  homes,
  card
})
