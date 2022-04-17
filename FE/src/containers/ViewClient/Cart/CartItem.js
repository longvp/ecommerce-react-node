import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import { Buffer } from 'buffer'
import {
    updateQuantityProduct,
    deleteProductInCart
} from "../../../store/actions/cartActions"
import { formatCurrency } from "../../../utilities/formatCurrency"
import { useNavigate } from "react-router-dom"

function CartItem(props) {
    const navigate = useNavigate()
    const handleRedirectDetail = (productSeo) => {
        navigate(`/detail-product/${productSeo}`)
    }
    let cartItem = props.cartItem

    let productImageURL = '', priceOrigin = '', priceSale = '', priceTotal = ''
    if (cartItem.product.image) {
        productImageURL = Buffer.from(cartItem.product.image, 'base64').toString('binary')
    }
    if (cartItem.product.priceOrigin) {
        priceOrigin = formatCurrency(cartItem.product.priceOrigin)
    }
    if (cartItem.product.priceSale) {
        priceSale = formatCurrency(cartItem.product.priceSale)
    }
    priceTotal = parseInt(cartItem.product.priceSale) > 0 ? parseInt(cartItem.product.priceSale) * parseInt(cartItem.quantityProduct) : parseInt(cartItem.product.priceOrigin) * parseInt(cartItem.quantityProduct)
    priceTotal = formatCurrency(priceTotal)

    const dispatch = useDispatch()
    const [quantityProduct, setQuantityProduct] = useState(cartItem.quantityProduct)
    const handleUpdateQuantityProduct = (e, totalQuantity) => {
        let quantityProduct = e.target.value
        if (quantityProduct === '') {
            alert('Số lượng không được trống !')
            return
        }
        if (parseInt(quantityProduct) <= 0) {
            alert('Số lượng phải > 0 !')
            return
        }
        if (parseInt(quantityProduct) > totalQuantity) {
            alert('Vượt quá số lượng hàng trong kho !!!')
            return
        }
        setQuantityProduct(quantityProduct)
        dispatch(updateQuantityProduct(cartItem.product, quantityProduct))
    }

    const handleDeleteProductInCart = (product) => {
        let checkConfirm = window.confirm('Bạn muốn xóa khỏi giỏ hàng ???')
        if (checkConfirm) {
            dispatch(deleteProductInCart(product))
        }
    }

    return (
        <>
            <tr className='cart-item'>
                <td>
                    <img src={productImageURL} className='item-image' alt='avatar'
                        onClick={() => handleRedirectDetail(cartItem.product.seo)}
                    />
                </td>
                <td>
                    <span className='item-name' onClick={() => handleRedirectDetail(cartItem.product.seo)}>
                        {cartItem.product.name}
                    </span>
                </td>
                <td>
                    <span className={+cartItem.product.priceSale === 0 ? 'item-price-unit' : 'item-price-unit price-blur'}>
                        {priceOrigin}
                    </span>
                </td>
                <td>
                    <span className={+cartItem.product.priceSale > 0 ? 'item-price-unit' : 'item-price-unit price-blur'}>
                        {priceSale}
                    </span>
                </td>
                <td>
                    <input type='number'
                        min={1}
                        value={quantityProduct}
                        onChange={(e) => handleUpdateQuantityProduct(e, cartItem.product.totalQuantity)}
                        className='item-quantity' />
                </td>
                <td> <span className='item-price-total'>{priceTotal}</span></td>
                <td onClick={() => handleDeleteProductInCart(cartItem.product)}>
                    <i className="fa fa-trash-o item-trash-icon" aria-hidden="true"></i>
                </td>
            </tr>
        </>
    )
}

export default CartItem