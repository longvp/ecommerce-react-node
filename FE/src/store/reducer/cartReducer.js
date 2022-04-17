import actionTypes from '../actions/actionTypes'
import { formatCurrency } from './../../utilities/formatCurrency'

const initialState = {
    carts: JSON.parse(localStorage.getItem('cart_ecommerce')) || [],
    totalCartPrice: JSON.parse(localStorage.getItem('total_price')) || '0 VND'
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PRODUCT_TO_CART: {
            let newItem = action.data
            let newState = { ...state }
            let cartList = [...state.carts]
            let index = -1
            if (cartList.length > 0) {
                index = cartList.findIndex((cart) => {
                    return cart.product.id === newItem.product.id
                })
            }
            if (index !== -1) { // Khác -1, đã có trong giỏ hàng
                cartList[index].quantityProduct = (+cartList[index].quantityProduct) + (+newItem.quantityProduct)
            } else {
                cartList.unshift(newItem)
            }
            newState = {
                carts: cartList,
                totalCartPrice: getTotalCartPrice(cartList)
            }
            localStorage.setItem('cart_ecommerce', JSON.stringify(cartList))
            localStorage.setItem('total_price', JSON.stringify(getTotalCartPrice(cartList)))
            return newState
        }
        case actionTypes.UPDATE_QUANTITY_PRODUCT: {
            let product = action.data.product
            let newState = { ...state }
            let cartList = [...state.carts]
            let index = cartList.findIndex((cart) => {
                return cart.product.id === product.id
            })
            cartList[index].quantityProduct = action.data.quantityProduct
            newState = {
                carts: cartList,
                totalCartPrice: getTotalCartPrice(cartList)
            }
            localStorage.setItem('cart_ecommerce', JSON.stringify(cartList))
            localStorage.setItem('total_price', JSON.stringify(getTotalCartPrice(cartList)))
            return newState
        }
        case actionTypes.DELETE_PRODUCT_IN_CART: {
            let newState = { ...state }
            let cartList = [...state.carts]
            let productDelete = action.data.product
            let index = cartList.findIndex((cart) => {
                return cart.product.id === productDelete.id
            })
            if (index !== -1) {
                cartList.splice(index, 1)
            }
            newState = {
                carts: cartList,
                totalCartPrice: getTotalCartPrice(cartList)
            }
            localStorage.setItem('cart_ecommerce', JSON.stringify(cartList))
            localStorage.setItem('total_price', JSON.stringify(getTotalCartPrice(cartList)))
            return newState
        }
        case actionTypes.DELETE_ALL_PRODUCT_IN_CART: {
            localStorage.removeItem('cart_ecommerce')
            localStorage.removeItem('total_price')
            return {
                ...state,
                carts: [],
                totalCartPrice: '0 VND'
            }
        }
        default: {
            return state
        }
    }
}

let getTotalCartPrice = (cartList) => {
    let totalPrice = 0
    if (cartList.length > 0) {
        for (let i = 0; i < cartList.length; i++) {
            if (+cartList[i].product.priceSale > 0) {
                totalPrice += +cartList[i].product.priceSale * +cartList[i].quantityProduct
            } else {
                totalPrice += +cartList[i].product.priceOrigin * +cartList[i].quantityProduct
            }
        }

    }
    return formatCurrency(totalPrice)
}

export default cartReducer