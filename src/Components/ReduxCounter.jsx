import React from 'react'
import { createStore } from 'redux'
import { Provider, useSelector, useDispatch } from 'react-redux'

const initialState = { count: 0 }
const increment = 'INCREMENT'
const decrement = 'DECREMENT'

function counterReducer(state = initialState, action) {
 switch (action.type) {
  case increment:
   return { ...state, count: state.count + 1 }
  case decrement:
   return { ...state, count: state.count - 1 }
  default:
   return state
 }
}

const store = createStore(counterReducer)

export const Counter = () => {
 const count = useSelector((state) => state.count)
 const dispatch = useDispatch()

 return (
  <div>
   <h1>{count}</h1>
   <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
   <button
    onClick={() => dispatch({ type: 'DECREMENT' })}
    disabled={count <= 0}
   >
    Decrement
   </button>
  </div>
 )
}

const ReduxCounter = () => {
 return (
  <Provider store={store}>
   Redux Counter
   <Counter />
  </Provider>
 )
}

export default ReduxCounter
