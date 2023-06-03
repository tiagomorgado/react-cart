import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import { CLEAR_CART, REMOVE, INCREASE, DECREASE, LOADING, DISPLAY_ITEMS } from "./actions";
import cartItems from "./data";
import { getTotals } from "./utils";

const AppContext = createContext()

const initialState = {
    loading: false,
    cart:new Map(cartItems.map((item) => [item.id, item])),
}

export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {totalAmount, totalCost} = getTotals(state.cart)

    const clearCart = () => {
        dispatch({type:CLEAR_CART})
    }

    const removeItem = (id) => {
        dispatch({type:REMOVE, payload: { id }})
    }

    const increaseQty = (id) => {
        dispatch({type:INCREASE, payload: { id }})
    }

    const decreaseQty = (id) => {
        dispatch({type:DECREASE, payload: { id }})
    }

    return(
        <AppContext.Provider 
          value={{
            ...state, 
            clearCart, 
            removeItem, 
            increaseQty, 
            decreaseQty, 
            totalAmount, 
            totalCost
          }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return (
        useContext(AppContext)
    )
}

