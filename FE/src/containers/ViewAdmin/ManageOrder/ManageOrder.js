import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeOrderStatus, deleteOrderById, getAllOrder } from '../../../store/actions/orderActions'
import { LIMIT_ITEM_ONE_PAGE_ADMIN } from '../../../utilities/const'
import AdminHeader from '../AdminHeader/AdminHeader'
import Loading from './../../../components/Loading/Loading'
import ReactPaginate from 'react-paginate'


function ManageOrder() {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.orderReducer.orders)
    const sizeOrders = useSelector(state => state.orderReducer.sizeOrders)
    const isLoading = useSelector(state => state.orderReducer.isLoading)

    const [currentPage, setCurrentPage] = useState(1)
    const [orderDetail, setOrderDetail] = useState({})

    useEffect(() => {
        dispatch(getAllOrder(LIMIT_ITEM_ONE_PAGE_ADMIN, 1))
    }, [])

    const handleOnChangeStatusOrder = (order, statusOrder) => {
        if (order.statusOrder !== 'SO1') {
            alert('Bạn không thể thay đổi !!!')
            return
        }
        order.statusOrder = statusOrder
        let checkConfirm = window.confirm('Bạn muốn thay đổi trạng thái (chỉ có thể thay đổi 1 lần) ???')
        if (checkConfirm) {
            dispatch(changeOrderStatus(order, currentPage))
        }
    }

    const handleDeleteOrder = (id, currentPage) => {
        let checkConfirm = window.confirm('Bạn muốn xóa ???')
        if (checkConfirm) {
            dispatch(deleteOrderById(id, currentPage))
        }
    }

    const handleShowOrderDetail = (orderDetail) => {
        setOrderDetail(orderDetail)
    }

    const ShowTable = () => {
        return (
            <>
                {orders && orders.length > 0 &&
                    <div className="container mb-3">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <table className='table table-hover text-center'>
                                    <thead>
                                        <tr>
                                            <th>Code</th>
                                            <th>Total Price</th>
                                            <th>Status Order</th>
                                            <th>Time Order</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td style={{ textTransform: 'capitalize' }}>{item.code}</td>
                                                    <td>{item.totalPrice}</td>
                                                    <td style={{ color: 'blue', fontWeight: '500' }}>
                                                        <button style={{ cursor: 'auto' }} className={item.statusOrder === 'SO1' ? "btn btn-primary" : "btn btn-primary inactive"}>
                                                            New
                                                        </button>
                                                        <button className={item.statusOrder === 'SO2' ? "btn btn-warning" : "btn btn-warning inactive"}
                                                            onClick={() => handleOnChangeStatusOrder(item, 'SO2')}>
                                                            Cancel
                                                        </button>
                                                        <button className={item.statusOrder === 'SO3' ? "btn btn-success" : "btn btn-success inactive"}
                                                            onClick={() => handleOnChangeStatusOrder(item, 'SO3')}>
                                                            Done
                                                        </button>
                                                    </td>
                                                    <td>{item.timeOrder}</td>
                                                    <td>
                                                        <button className="btn btn-danger mx-2" title="Delete"
                                                            onClick={() => handleDeleteOrder(item.id, currentPage)}>
                                                            <i className="fa fa-trash-o"></i>
                                                        </button>
                                                        <button className="btn btn-success" title="Detail"
                                                            data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                            onClick={() => handleShowOrderDetail(item)}>
                                                            <i className="fa fa-eye"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }

    const ShowOrderDetail = () => {
        return (
            <>
                {!_.isEmpty(orderDetail)
                    ?
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Detail Order</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className='my-2'>Khách hàng: <b>{orderDetail.userData && orderDetail.userData.fullname}</b></div>
                                    <div>Email: <b>{orderDetail.userData && orderDetail.userData.email}</b></div>
                                    <div className='text-primary my-2'>Đơn đặt hàng</div>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Tên sản phẩm</th>
                                                <th>Số lượng mua</th>
                                                <th>Tổng giá</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderDetail.productData && orderDetail.productData.length > 0 &&
                                                orderDetail.productData.map((product, index) => (
                                                    <tr key={index}>
                                                        <td>{product.name}</td>
                                                        <td>{product.Order_Product.quantity}</td>
                                                        <td>{product.Order_Product.priceUnit}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <div className='d-flex'>TỔNG: <h5 className='text-danger mx-3'>{orderDetail.totalPrice}</h5></div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div></div>
                }
            </>
        )
    }

    const handleOnChangePage = (data) => {
        dispatch(getAllOrder(LIMIT_ITEM_ONE_PAGE_ADMIN, data.selected + 1))
        setCurrentPage(data.selected + 1)
    }

    return (
        <>
            {/* <AdminHeader /> */}
            <div className='container'>
                <div className='row'>
                    <div className="col-md-12" >
                        <h4 className="text-center mb-3 title-heading-manage" > QUẢN LÝ ORDERS </h4>
                    </div>
                </div>
            </div>
            {/* ------------- */}
            {isLoading === true
                ?
                <Loading />
                :
                <>
                    <ShowTable />
                </>
            }
            {/* -------- */}
            <ShowOrderDetail />
            {/*  */}
            {sizeOrders && +sizeOrders > 0
                ?
                <ReactPaginate
                    previousLabel={'<<'}
                    nextLabel={'>>'}
                    pageCount={Math.ceil(+sizeOrders / LIMIT_ITEM_ONE_PAGE_ADMIN)}
                    onPageChange={handleOnChangePage}
                    containerClassName={'pagintation'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    activeClassName={'active'}
                />
                : <h4 className="text-center my-3">KHÔNG CÓ ORDER NÀO !!!</h4>
            }
        </>
    )
}

export default ManageOrder