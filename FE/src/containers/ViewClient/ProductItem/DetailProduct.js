import React, { useEffect, useState } from "react"
import './DetailProduct.scss'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import { NavLink, useParams } from "react-router-dom"
import { PATH } from "../../../utilities/const"
import { useDispatch, useSelector } from "react-redux"
import { getProductBySeo } from "../../../store/actions/productActions"
import { formatCurrency } from './../../../utilities/formatCurrency'
import { addProductToCart } from "../../../store/actions/cartActions"
import { Buffer } from 'buffer'
import _ from "lodash"
import Loading from './../../../components/Loading/Loading'

function DetailProduct() {
    const { productSeo } = useParams()
    const dispatch = useDispatch()
    const product = useSelector(state => state.productReducer.product)
    const carts = useSelector(state => state.cartReducer.carts)
    const isLoading = useSelector(state => state.productReducer.isLoading)

    const [quantityProduct, setQuantityProduct] = useState(1)

    useEffect(() => {
        dispatch(getProductBySeo(productSeo))
    }, [productSeo])

    const handleAddProductToCart = (product, quantityProduct) => {
        if (carts.length > 0) {
            if (+quantityProduct > +product.totalQuantity) {
                alert('Vượt quá số lượng hàng trong kho !!!')
                return
            }
            let index = carts.findIndex((cart) => {
                return cart.product.id === product.id
            })
            if (index !== -1) {
                if (+carts[index].quantityProduct + +quantityProduct > +carts[index].product.totalQuantity) {
                    alert('Vượt quá số lượng hàng trong kho !!!')
                    return
                }
            }
        }
        else {
            if (+quantityProduct > +product.totalQuantity) {
                alert('Vượt quá số lượng hàng trong kho !!!')
                return
            }
        }
        dispatch(addProductToCart(product, quantityProduct))
    }

    return (
        <>
            {/* <Header /> */}
            {!_.isEmpty(product) ?
                <>
                    <div className="breadcrumb">
                        <div className="container-fluid">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="breadcrumb-content">
                                            <ul>
                                                <li>
                                                    <NavLink to={PATH.HOMEPAGE} className="link">Trang chủ</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={`/category/${product.categoryData.seo}`} className="link">{product.categoryData.name}</NavLink>
                                                </li>
                                                <li>{product.name}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-detail">
                        <div className="container">
                            {isLoading === true
                                ?
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <Loading />
                                    </div>
                                </div>
                                :
                                <>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-sm-12">
                                            <div className="product-image">
                                                {product.image &&
                                                    <img src={Buffer.from(product.image, 'base64').toString('binary')} alt='avatar' />
                                                }
                                                {parseInt(product.priceSale) > 0 &&
                                                    <span className="sale">Sale</span>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-12">
                                            <div className="product-name">{product.name}</div>
                                            <div className="product-status">
                                                <span className="product-status-title">Trạng thái:</span>
                                                <span className="product-status-value">{+product.totalQuantity > 0 ? 'Còn hàng' : 'Hết hàng'}</span>
                                            </div>
                                            <div className="product-rate-star">
                                                <i className="fa fa-star" ></i>
                                                <i className="fa fa-star" ></i>
                                                <i className="fa fa-star" ></i>
                                                <i className="fa fa-star" ></i>
                                                <i className="fa fa-star" ></i>
                                            </div>
                                            <div className="product-price">
                                                {+product.priceSale > 0 ? formatCurrency(product.priceSale) : formatCurrency(product.priceOrigin)}
                                            </div>
                                            <div className="product-price-line-through">
                                                {+product.priceSale > 0 && formatCurrency(product.priceOrigin)}
                                            </div>
                                            <div className="product-quantity">
                                                <input className="quantity"
                                                    type='number'
                                                    min={1}
                                                    disabled={+product.totalQuantity > 0 ? false : true}
                                                    onChange={(e) => setQuantityProduct(e.target.value)}
                                                    value={quantityProduct} />
                                                <div className="list-btn">
                                                    <button type="button" className={+product.totalQuantity > 0 ? 'btn-buy' : 'btn-buy-disabled'}
                                                        disabled={+product.totalQuantity > 0 ? false : true}
                                                        onClick={() => handleAddProductToCart(product, quantityProduct)}
                                                    >Thêm Vào Giỏ Hàng
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div className="tabs">
                                                <Tabs>
                                                    <TabList>
                                                        <Tab>Thông số kỹ thuật</Tab>
                                                        <Tab>Mô tả</Tab>
                                                    </TabList>
                                                    <TabPanel>
                                                        <div className="product-specific-html" dangerouslySetInnerHTML={{ __html: product.specific_HTML }}></div>
                                                    </TabPanel>
                                                    <TabPanel>
                                                        <div className="product-descript-html" dangerouslySetInnerHTML={{ __html: product.descript_HTML }}></div>
                                                    </TabPanel>
                                                </Tabs>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </>
                :
                <h4 className="product-empty">Sản phẩm không tồn tại</h4>
            }
            {/* <Footer /> */}
        </>
    )
}

export default DetailProduct