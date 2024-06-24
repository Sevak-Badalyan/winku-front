import {createStore} from 'redux'

const store = createStore(function(state,action){
  if(action.type === "edit-current-user-name"){
    return{
      ...state,
      currentUser:{
        // ...state.currentUser
        name:action.payload.name
      }
    }
  }
  return state
},{
  currentUser:{
    name:'Jone'
  }
}
)

export default store;