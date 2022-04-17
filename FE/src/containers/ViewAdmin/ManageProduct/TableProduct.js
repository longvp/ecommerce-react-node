import React, { useEffect, useState } from 'react'
import {
    getAllProduct,
    deleteProduct,
    getAllProductByName,
    getAllProductByCategory,
    getAllProductByCategoryAndName
} from '../../../store/actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../components/Loading/Loading'
import { Buffer } from 'buffer'
import ReactPaginate from 'react-paginate'
import { LIMIT_ITEM_ONE_PAGE_ADMIN } from './../../../utilities/const'
import { formatCurrency } from '../../../utilities/formatCurrency'

function TableProduct(props) {
    const dispatch = useDispatch()
    const products = useSelector(state => state.productReducer.products)
    const isLoading = useSelector(state => state.productReducer.isLoading)
    //const [isLoading, setIsLoading] = useState(false)
    const sizeProducts = useSelector(state => state.productReducer.sizeProducts)
    const categories = useSelector(state => state.categoryReducer.categories)

    const [currentPage, setCurrentPage] = useState(1)
    const [searchByCategory, setSearchByCategory] = useState('DEFAULT')
    const [searchByName, setSearchByName] = useState('')

    useEffect(() => {
        if (!searchByName) {
            if (searchByCategory === 'DEFAULT')
                dispatch(getAllProduct(LIMIT_ITEM_ONE_PAGE_ADMIN, 1))
            else
                dispatch(getAllProductByCategory(LIMIT_ITEM_ONE_PAGE_ADMIN, 1, searchByCategory))
        } else {
            if (searchByCategory === 'DEFAULT')
                dispatch(getAllProductByName(LIMIT_ITEM_ONE_PAGE_ADMIN, 1, searchByName))
            else
                dispatch(getAllProductByCategoryAndName(LIMIT_ITEM_ONE_PAGE_ADMIN, 1, searchByCategory, searchByName))
        }
    }, [searchByCategory])

    const handleDeleteProduct = (id, currentPage) => {
        let checkConfirm = window.confirm('Bạn chắc chắn muốn xóa ?')
        if (checkConfirm) {
            dispatch(deleteProduct(id, currentPage))
        }
    }

    const handleGetItemEdit = (item, currentPage) => {
        props.onGetItemEditFromParent(item, currentPage)
        setSearchByName('')
    }

    const ShowTable = () => {
        return (
            <>
                {products && products.length > 0 &&
                    <div className="container mb-3">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <table className='table table-hover text-center'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Price Origin</th>
                                            <th>Price Sale</th>
                                            <th>Quantity</th>
                                            <th>Image</th>
                                            <th>Status</th>
                                            <th>Category</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((item, index) => {
                                            let imageUrl = '', priceOrigin = '', priceSale = ''
                                            if (item.image) {
                                                imageUrl = Buffer.from(item.image, 'base64').toString('binary')
                                            }
                                            if (item.priceOrigin) {
                                                priceOrigin = formatCurrency(item.priceOrigin)
                                            }
                                            if (item.priceSale) {
                                                priceSale = formatCurrency(item.priceSale)
                                            }
                                            return (
                                                <tr key={index}>
                                                    <td style={{ textTransform: 'capitalize' }}>{item.name}</td>
                                                    <td>{priceOrigin}</td>
                                                    <td>{priceSale}</td>
                                                    <td>{item.totalQuantity}</td>
                                                    <td>
                                                        <img src={imageUrl} alt='avatar' style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                                                    </td>
                                                    <td style={{ color: 'blue', fontWeight: '500' }}>
                                                        {item.totalQuantity > 0 ? 'Còn hàng' : 'Hết hàng'}
                                                    </td>
                                                    <td style={{ textTransform: 'capitalize', fontWeight: '500', color: 'red' }}>
                                                        {item.categoryData && item.categoryData.name ? item.categoryData.name : ''}
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-danger mx-2" title="Delete"
                                                            onClick={() => handleDeleteProduct(item.id, currentPage)}>
                                                            <i className="fa fa-trash-o"></i>
                                                        </button>
                                                        <button className="btn btn-success" title="Edit"
                                                            onClick={() => handleGetItemEdit(item, currentPage)}>
                                                            <i className="fa fa-pencil-square-o"></i>
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

    const handleClickSearchByCategoryAndName = () => {
        if (!searchByName) {
            window.alert('Chưa nhập tên tìm kiếm !')
            return
        }
        else {
            if (searchByCategory === 'DEFAULT')
                dispatch(getAllProductByName(LIMIT_ITEM_ONE_PAGE_ADMIN, 1, searchByName))
            else
                dispatch(getAllProductByCategoryAndName(LIMIT_ITEM_ONE_PAGE_ADMIN, 1, searchByCategory, searchByName))
        }
    }

    const handleOnChangePage = (data) => {
        if (searchByName === '') {
            if (searchByCategory === 'DEFAULT')
                dispatch(getAllProduct(LIMIT_ITEM_ONE_PAGE_ADMIN, data.selected + 1))
            else
                dispatch(getAllProductByCategory(LIMIT_ITEM_ONE_PAGE_ADMIN, data.selected + 1, searchByCategory))
        }
        else {
            if (searchByCategory === 'DEFAULT')
                dispatch(getAllProductByName(LIMIT_ITEM_ONE_PAGE_ADMIN, data.selected + 1, searchByName))
            else
                dispatch(getAllProductByCategoryAndName(LIMIT_ITEM_ONE_PAGE_ADMIN, data.selected + 1, searchByCategory, searchByName))
        }
        setCurrentPage(data.selected + 1)
    }

    // ------------------- DELETE TEXT SEARCH-------------------------
    const handleDeleteTextSearch = () => {
        setSearchByName(() => {
            if (searchByCategory === 'DEFAULT')
                dispatch(getAllProduct(LIMIT_ITEM_ONE_PAGE_ADMIN, 1))
            else
                dispatch(getAllProductByCategory(LIMIT_ITEM_ONE_PAGE_ADMIN, 1, searchByCategory))
            return ''
        })
    }

    return (
        <>
            <div className="d-flex my-5 justify-content-center">
                <div className="form-group mx-5">
                    <label></label> <br />
                    <select className="form-control"
                        value={searchByCategory}
                        onChange={(e) => setSearchByCategory(e.target.value)}
                        style={{ textTransform: 'capitalize' }}>
                        <option value='DEFAULT'>Mặc định</option>
                        {categories && categories.length > 0 &&
                            categories.map((item, index) => {
                                return (
                                    <option key={index} value={item.id}>
                                        {item.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="d-flex align-items-end">
                    <div className="form-group mx-2">
                        <label>Tìm kiếm theo tên: </label> <br />
                        <div className='input-text'>
                            <input className="form-control"
                                value={searchByName}
                                onChange={(e) => setSearchByName(e.target.value)}
                            />
                            {searchByName &&
                                <span className='btn-delete-text-search'
                                    onClick={() => handleDeleteTextSearch()}
                                >&times;</span>
                            }
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-dark" onClick={() => handleClickSearchByCategoryAndName()}>Tìm kiếm</button>
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
            {sizeProducts && +sizeProducts > 0
                ?
                <ReactPaginate
                    previousLabel={'<<'}
                    nextLabel={'>>'}
                    pageCount={Math.ceil(+sizeProducts / LIMIT_ITEM_ONE_PAGE_ADMIN)}
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
                : <h4 className="text-center my-3">KHÔNG CÓ SẢN PHẨM NÀO !!!</h4>
            }
        </>
    )
}

export default TableProduct