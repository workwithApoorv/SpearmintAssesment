import * as actionType from "../actionTypes";

const initialState = [];

const changeTask = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_TASK:
      if (action.data) {
        return (state = [...state, action.data]);
      } else return state;
    case actionType.GET_TASK:
      return state;
    case actionType.UPDATE_STATUS:
      if (action.data) {
        console.log(state, action.data, "-------------------------")

        const index = state.findIndex(
          (ele) => ele.taskName === action.data.taskName
        );
        console.log(index)
        state[index].status = action.data.status;
      }
      return state;
    default:
      return state;
  }
};

export default changeTask;
