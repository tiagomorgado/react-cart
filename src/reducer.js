import { CLEAR_CART, REMOVE, INCREASE, DECREASE, LOADING, DISPLAY_ITEMS } from "./actions";

const reducer = (state, action) => {
    if(action.type === CLEAR_CART) {
        return {...state, cart: new Map()}
    }

    if(action.type === REMOVE) {
        const updatedCart = new Map(state.cart)
        updatedCart.delete(action.payload.id)
        return {...state, cart:updatedCart}
    }

    if(action.type === INCREASE) {
        const updatedCart = new Map(state.cart)
        const itemId = action.payload.id
        const item = updatedCart.get(itemId)
        const newItem = {...item, amount: item.amount + 1}
        updatedCart.set(itemId, newItem)
        return {...state, cart:updatedCart}
    }

    if(action.type === DECREASE) {
        const updatedCart = new Map(state.cart)
        const itemId = action.payload.id
        const item = updatedCart.get(itemId)
        if(item.amount === 1) {
            updatedCart.delete(itemId)
        } else {
            const newItem = {...item, amount: item.amount - 1}
            updatedCart.set(itemId, newItem)
        }
        return {...state, cart:updatedCart}
    }

    if(action.type === LOADING) {
        return {...state, loading:true}
    }

    if(action.type === DISPLAY_ITEMS) {
        const updatedCart = new Map(action.payload.cart.map((item) => [item.id, item]))

        return {...state, loading:false, cart:updatedCart}
    }
    
    throw new Error (`no matching action type: ${action.type}`)
}

export default reducer