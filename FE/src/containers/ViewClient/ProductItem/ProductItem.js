import React from 'react'
import './ProductItem.scss'
import { Buffer } from 'buffer'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart } from '../../../store/actions/cartActions'
import { formatCurrency } from '../../../utilities/formatCurrency'
import { useNavigate } from 'react-router-dom'

function ProductItem({ product }) {
    const navigate = useNavigate()
    let productImageURL = '', priceOrigin = '', priceSale = ''
    if (product.image) {
        productImageURL = Buffer.from(product.image, 'base64').toString('binary');
    }
    if (product.priceOrigin) {
        priceOrigin = formatCurrency(product.priceOrigin)
    }
    if (product.priceSale) {
        priceSale = formatCurrency(product.priceSale)
    }

    const dispatch = useDispatch()
    const carts = useSelector(state => state.cartReducer.carts)

    const handleAddProductToCart = (product, quantityProduct) => {
        if (carts.length > 0) {
            let index = carts.findIndex((cart) => {
                return cart.product.id === product.id
            })
            if (index !== -1) {
                if (+carts[index].quantityProduct + 1 > +carts[index].product.totalQuantity) {
                    alert('Vượt quá số lượng hàng trong kho !!!')
                    return
                }
            }
        }
        dispatch(addProductToCart(product, quantityProduct))
    }

    const handleRedirectDetail = (productSeo) => {
        navigate(`/detail-product/${productSeo}`)
    }

    return (
        <div className="product-item">
            {parseInt(product.priceSale) > 0 &&
                <span className="sale">Sale</span>
            }
            <img src={productImageURL} className="product-image" alt='avatar'
                onClick={() => handleRedirectDetail(product.seo)}
            />
            <div className="product-info">
                <div className="product-name" title={product.name}
                    onClick={() => handleRedirectDetail(product.seo)}
                >
                    {product.name}
                </div>
                <div className='product-status'>{product.totalQuantity > 0 ? 'Còn Hàng' : 'Hết Hàng'}</div>
                <div className="product-price product-price-sale">
                    {parseInt(product.priceSale) > 0 ? priceSale : priceOrigin}
                </div>
                <div className="product-price product-price-origin">
                    {parseInt(product.priceSale) === 0 ? <div style={{ opacity: '0' }}>no</div> : priceOrigin}
                </div>
                {product.totalQuantity > 0 &&
                    <div
                        className="add-to-cart" title='Thêm vào giỏ hàng'
                        onClick={() => handleAddProductToCart(product, 1)}
                    >
                        <i className="fa fa-cart-plus" ></i>
                    </div>
                }
            </div>
        </div>
    )
}

export default ProductItem