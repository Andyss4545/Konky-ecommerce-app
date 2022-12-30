// import the react context api dependencies
import React, {createContext, useContext, useReducer} from "react";


// // This is the DATA LAYER
export const StateContext = createContext()


// BUILD A PROVIDER AND WRAP OUR ENTIRE APP AND GIVE ACCESS TO STATE LAYER ABOVE
export const StateProvider = ({reducer, initialState, children}) => (
       <StateContext.Provider value={useReducer(reducer, initialState)}>
                 {children}
       </StateContext.Provider>
)


export const useStateValue  = () => useContext(StateContext)

// This is how we use it inside of a component
