import React, { useState } from "react"
import './OrderItem.scss'
import { useDispatch } from 'react-redux'
import { cancelOrder } from "../../../store/actions/clientAction"

function OrderItem({ order }) {

    const dispatch = useDispatch()

    const [showDetail, setShowDetail] = useState(false)

    const handleCancelOrder = (order) => {
        let checkConfirm = window.confirm('Bạn muốn hủy đơn hàng này !')
        if (checkConfirm) {
            dispatch(cancelOrder(order))
        }
    }

    return (
        <>
            <div className={showDetail ? "order-item isActive" : "order-item"}>
                <div className="order-code">{order.code}</div>
                <div className="order-total">{order.totalPrice}</div>
                <div className="order-time">{order.timeOrder}</div>
                {order.statusOrder === 'SO1'
                    ?
                    <div className="order-cancel"
                        onClick={() => handleCancelOrder(order)}
                    >Hủy đơn
                    </div>
                    :
                    <div className="order-cancel inactive">Hủy đơn</div>
                }
                <div className="order-detail"
                    onClick={() => setShowDetail(true)}
                >Chi tiết
                </div>
            </div>
            {showDetail === true &&
                <div className="order-item-detail">
                    <div className="products">
                        {order.productData && order.productData.length > 0 &&
                            order.productData.map((product, index) => (
                                <ul className="product" key={index}>
                                    <li className="product-name">{product.name}</li>
                                    <li className="product-quantity">
                                        &times;{product.Order_Product.quantity}
                                    </li>
                                    <li className="product-total-price">
                                        {product.Order_Product.priceUnit}
                                    </li>
                                </ul>
                            ))
                        }
                    </div>
                    <div className="order-item-status">
                        <span className="order-item-title">Trạng thái hóa đơn: </span>
                        <span className="order-item-status-value">
                            {order.statusOrderData.valueVi}
                        </span>
                    </div>
                    <div className="order-item-total">
                        <span className="order-item-title">Tổng hóa đơn:</span>
                        <span className="order-item-total-value">{order.totalPrice}</span>
                        <span className="order-hide"
                            onClick={() => setShowDetail(false)}
                        >Ẩn</span>
                    </div>
                </div>
            }
        </>
    )
}

export default OrderItem