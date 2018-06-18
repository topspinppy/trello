const INITIAL_STATE = {
  boards: [],
  cards: []
}
const homes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_BOARD':
      return { ...state, boards: action.payload }
    case 'SHOW_BOARD':
      return { ...state, boards: action.payload }
    case 'DELETE_BOARD':
      return { ...state, boards: action.payload }
    case 'ADD_CARD':
      return { ...state, boards: action.payload }
    default:
      return state //Return Initial State ลกับไปที่หน้าบ้าน ซึ่งเป็นตัวเดิมที่ส่งมา
  }
}

export default homes
