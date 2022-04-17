import { React, useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import './Cart.scss'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { PATH } from './../../../utilities/const'
import CartItem from './CartItem'
import _ from 'lodash'
import { createOrder, getAllOrderByUserId } from '../../../store/actions/clientAction'
import { formatCurrency } from '../../../utilities/formatCurrency'
import Loading from './../../../components/Loading/Loading'
import moment from 'moment'


function Cart() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const carts = useSelector(state => state.cartReducer.carts)
    const totalCartPrice = useSelector(state => state.cartReducer.totalCartPrice)
    const clientLoginInfo = useSelector(state => state.clientReducer.clientLoginInfo)
    const isLoading = useSelector(state => state.clientReducer.isLoading)

    const ordersByUserId = useSelector(state => state.clientReducer.ordersByUserId)
    // Nếu order ở trạng thái New thì ko cho mua hàng (phải giao hàng thành công, hoặc hủy mới được đặt hàng)
    const [checkOrderNew, setCheckOrderNew] = useState(false)


    useEffect(() => {
        if (!_.isEmpty(clientLoginInfo)) {
            dispatch(getAllOrderByUserId(clientLoginInfo.id))
        }
    }, [clientLoginInfo])

    console.log(ordersByUserId)

    useEffect(() => {
        if (ordersByUserId && ordersByUserId.length > 0) {
            let index = ordersByUserId.findIndex((order) => (
                order.statusOrder === 'SO1'
            ))
            if (index !== -1) setCheckOrderNew(true)
        }
    }, [ordersByUserId])

    const handleClickOrder = () => {
        if (_.isEmpty(clientLoginInfo)) {
            let checkConfirm = window.confirm('Bạn phải đăng nhập để đặt hàng !')
            if (checkConfirm) {
                navigate(PATH.CLIENT_LOGIN)
            }
            return
        }
        else {
            if (carts && carts.length > 0) {
                let products = []
                for (let i = 0; i < carts.length; i++) {
                    let priceUnit = ''
                    if (+carts[i].product.priceSale > 0) {
                        priceUnit = +carts[i].product.priceSale * +carts[i].quantityProduct
                    } else {
                        priceUnit = +carts[i].product.priceOrigin * +carts[i].quantityProduct
                    }
                    products.push({
                        productId: carts[i].product.id,
                        quantity: +carts[i].quantityProduct,
                        priceUnit: formatCurrency(priceUnit),
                        name: carts[i].product.name
                    })
                }
                let order = {
                    code: `ORDER-${new Date().getTime()}`,
                    totalPrice: totalCartPrice,
                    userId: !_.isEmpty(clientLoginInfo) && clientLoginInfo.id ? clientLoginInfo.id : '',
                    timeOrder: moment(new Date()).format("DD/MM/YYYY HH:mm:ss"),
                    products: products,
                    // send mail
                    email: !_.isEmpty(clientLoginInfo) && clientLoginInfo.email ? clientLoginInfo.email : '',
                    fullname: !_.isEmpty(clientLoginInfo) && clientLoginInfo.fullname ? clientLoginInfo.fullname : '',
                }
                let checkConfirm = window.confirm('Bạn chắc chắn muốn đặt hàng !')
                if (checkConfirm) {
                    if (checkOrderNew) {
                        alert('Order cũ của bạn chưa hoàn thành !')
                        return
                    }
                    else {
                        dispatch(createOrder(order))
                    }
                }
            }
        }
    }
    return (
        <>
            {/* <Header /> */}
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
                                        <li className="active">Giỏ hàng</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12'>
                        {carts && carts.length > 0
                            ?
                            <table className='cart-table'>
                                <thead className='cart-table-thead'>
                                    <tr>
                                        <th>Hình ảnh</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Giá gốc</th>
                                        <th>Giá sale</th>
                                        <th>Số lượng</th>
                                        <th>Tổng giá</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carts.map((cartItem, index) => (
                                        <CartItem cartItem={cartItem} key={index} />
                                    ))}
                                </tbody>
                            </table>
                            :
                            <div className='cart-empty'>
                                <h2 className='cart-empty-heading'>Giỏ hàng trống</h2>
                                <NavLink to={PATH.HOMEPAGE} className='back-home'>Tiếp tục mua hàng</NavLink>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {carts && carts.length > 0 &&
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='cart-total'>
                                <div className='cart-price'>
                                    <span className='cart-price-title'>Tổng giá: </span>
                                    <span className='cart-price-value'>{totalCartPrice}</span>
                                </div>
                                {isLoading === true
                                    ?
                                    <Loading />
                                    :
                                    <div
                                        className='cart-button-order'
                                        onClick={() => handleClickOrder()}>
                                        Đặt hàng
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/* <Footer /> */}
        </>
    )
}

export default Cart
