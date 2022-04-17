import React, { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import Header from "../Header/Header"
import './Category.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
    getAllProductByCategorySeo,
    getAllProductByCategorySeoFilterPrice,
    getAllProductByCategorySeoSortBy,
    getAllProductByCategorySeoSortByFilterPrice
} from "../../../store/actions/productActions"
import { LIMIT_ITEM_ONE_PAGE_CLIENT } from "../../../utilities/const"
import Footer from './../Footer/Footer'
import ProductItem from './../ProductItem/ProductItem'

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Loading from "../../../components/Loading/Loading"
import { PATH } from './../../../utilities/const'
import ReactPaginate from 'react-paginate'
import { getCategoryBySeo } from "../../../store/actions/categoryActions"
import _ from "lodash"
import { Buffer } from 'buffer'

function Category() {
    const { categorySeo } = useParams()
    const dispatch = useDispatch()
    //const isLoading = useSelector(state => state.productReducer.isLoading)
    const [isLoading, setIsLoading] = useState(false)
    const category = useSelector(state => state.categoryReducer.category)
    const products = useSelector(state => state.productReducer.products)
    const sizeProducts = useSelector(state => state.productReducer.sizeProducts)

    const [objSort, setObjSort] = useState({})
    const [filterPrice, setFilterPrice] = useState({})
    const [listFilterPrice, setListFilterPrice] = useState(
        [
            {
                priceStart: 0,
                priceEnd: 2000,
                label: '<= 2000 VND',
            },
            {
                priceStart: 2000,
                priceEnd: 19500000,
                label: '2000 VND - 19500000 VND',
            },
            {
                priceStart: 19500000,
                priceEnd: 30000000,
                label: ' >= 19.5000.00 VND',
            },
        ]
    )

    useEffect(() => {
        dispatch(getCategoryBySeo(categorySeo))
    }, [categorySeo])

    useEffect(() => {
        // dispatch(getCategoryBySeo(categorySeo))
        //dispatch(getAllProductByCategorySeo(LIMIT_ITEM_ONE_PAGE_CLIENT, 1, categorySeo))
        if (_.isEmpty(objSort)) {
            if (_.isEmpty(filterPrice)) {
                dispatch(getAllProductByCategorySeo(LIMIT_ITEM_ONE_PAGE_CLIENT, 1, categorySeo))
            }
            else {
                dispatch(getAllProductByCategorySeoFilterPrice(LIMIT_ITEM_ONE_PAGE_CLIENT, 1, categorySeo, filterPrice.priceStart, filterPrice.priceEnd))
            }
        }
        else {
            if (_.isEmpty(filterPrice)) {
                dispatch(getAllProductByCategorySeoSortBy(LIMIT_ITEM_ONE_PAGE_CLIENT, 1, categorySeo, objSort.sortBy, objSort.typeSort))
            }
            else {
                dispatch(getAllProductByCategorySeoSortByFilterPrice(LIMIT_ITEM_ONE_PAGE_CLIENT, 1, categorySeo, objSort.sortBy, objSort.typeSort, filterPrice.priceStart, filterPrice.priceEnd))
            }
        }
    }, [categorySeo, objSort, filterPrice])

    const handleOnChangePage = (data) => {
        if (_.isEmpty(objSort)) {
            if (_.isEmpty(filterPrice)) {
                dispatch(getAllProductByCategorySeo(LIMIT_ITEM_ONE_PAGE_CLIENT, data.selected + 1, categorySeo))
            }
            else {
                dispatch(getAllProductByCategorySeoFilterPrice(LIMIT_ITEM_ONE_PAGE_CLIENT, data.selected + 1, categorySeo, filterPrice.priceStart, filterPrice.priceEnd))
            }
        }
        else {
            if (_.isEmpty(filterPrice)) {
                dispatch(getAllProductByCategorySeoSortBy(LIMIT_ITEM_ONE_PAGE_CLIENT, data.selected + 1, categorySeo, objSort.sortBy, objSort.typeSort))
            }
            else {
                dispatch(getAllProductByCategorySeoSortByFilterPrice(LIMIT_ITEM_ONE_PAGE_CLIENT, data.selected + 1, categorySeo, objSort.sortBy, objSort.typeSort, filterPrice.priceStart, filterPrice.priceEnd))
            }
        }
    }

    const handleSortBy = (e) => {
        let valueSearch = e.target.value
        if (valueSearch === 'DEFAULT') {
            if (_.isEmpty(filterPrice)) {
                dispatch(getAllProductByCategorySeo(LIMIT_ITEM_ONE_PAGE_CLIENT, 1, categorySeo))
            }
            else {
                let priceStart = filterPrice.priceStart
                let priceEnd = filterPrice.priceEnd
                dispatch(getAllProductByCategorySeoFilterPrice(LIMIT_ITEM_ONE_PAGE_CLIENT, 1, categorySeo, priceStart, priceEnd))
            }
            setObjSort({})
        }
        else {
            valueSearch = valueSearch.split('-')
            let sortBy = valueSearch[0]
            let typeSort = valueSearch[1]
            if (_.isEmpty(filterPrice)) {
                dispatch(getAllProductByCategorySeoSortBy(LIMIT_ITEM_ONE_PAGE_CLIENT, 1, categorySeo, sortBy, typeSort))
            }
            else {
                let priceStart = filterPrice.priceStart
                let priceEnd = filterPrice.priceEnd
                dispatch(getAllProductByCategorySeoSortByFilterPrice(LIMIT_ITEM_ONE_PAGE_CLIENT, 1, categorySeo, sortBy, typeSort, priceStart, priceEnd))
            }
            setObjSort({
                sortBy: sortBy,
                typeSort: typeSort
            })
        }
    }

    const handleFileterPrice = (e, filterPrice) => {
        let valueFilter = e.target.value
        if (valueFilter === 'DEFAULT') {
            if (_.isEmpty(objSort)) {
                dispatch(getAllProductByCategorySeo(LIMIT_ITEM_ONE_PAGE_CLIENT, 1, categorySeo))
            }
            else {
                let sortBy = objSort.sortBy
                let typeSort = objSort.typeSort
                dispatch(getAllProductByCategorySeoSortBy(LIMIT_ITEM_ONE_PAGE_CLIENT, 1, categorySeo, sortBy, typeSort))
            }
            setFilterPrice({})
        }
        else {
            let priceStart = filterPrice.priceStart
            let priceEnd = filterPrice.priceEnd
            if (_.isEmpty(objSort)) {
                dispatch(getAllProductByCategorySeoFilterPrice(LIMIT_ITEM_ONE_PAGE_CLIENT, 1, categorySeo, priceStart, priceEnd))
            }
            else {
                let sortBy = objSort.sortBy
                let typeSort = objSort.typeSort
                dispatch(getAllProductByCategorySeoSortByFilterPrice(LIMIT_ITEM_ONE_PAGE_CLIENT, 1, categorySeo, sortBy, typeSort, priceStart, priceEnd))
            }
            setFilterPrice(filterPrice)
        }
    }

    return (
        <>
            {/* <Header /> */}
            {!_.isEmpty(category)
                ?
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
                                                <li>{category.name}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="category">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4 col-md-5 col-sm-12 text-center">
                                    <div className="content-left">
                                        <div className="sort-by">
                                            <label className="sort-by-title">Sắp Xếp:</label>
                                            <select className="sort-by-select"
                                                onChange={(e) => handleSortBy(e)}>
                                                <option value='DEFAULT'>Mặc định</option>
                                                <option value='name-asc'>Tên (A-Z)</option>
                                                <option value='name-desc'>Tên (Z-A)</option>
                                                <option value='priceOrigin-asc'>Giá gốc (Thấp-Cao)</option>
                                                <option value='priceOrigin-desc'>Giá gốc (Cao-Thấp)</option>
                                            </select>
                                        </div>
                                        <div className="filter">
                                            <div className="filter-title">Lọc Theo Giá Gốc: </div>
                                            <div className="filter-item">
                                                <input
                                                    type='radio'
                                                    className="filter-radio"
                                                    id='default-price'
                                                    name="filter-item"
                                                    value='DEFAULT'
                                                    defaultChecked
                                                    onChange={(e) => handleFileterPrice(e, filterPrice)}
                                                />
                                                <label htmlFor='default-price' className='filter-label'>Mặc định</label>
                                            </div>
                                            {listFilterPrice && listFilterPrice.length > 0 &&
                                                listFilterPrice.map((filterPrice, index) => (
                                                    <div className="filter-item" key={index}>
                                                        <input
                                                            type='radio'
                                                            className="filter-radio"
                                                            id={index}
                                                            name="filter-item"
                                                            value={filterPrice.label}
                                                            onChange={(e) => handleFileterPrice(e, filterPrice)}
                                                        />
                                                        <label htmlFor={index} className='filter-label'>
                                                            {filterPrice.label}
                                                        </label>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-md-7 col-sm-12">
                                    {isLoading === true
                                        ?
                                        <Loading />
                                        :
                                        <div className="row">
                                            {products && products.length > 0
                                                ?
                                                products.map((product) => (
                                                    <div className="col-lg-4 col-md-6 col-sm-6" key={product.id}>
                                                        <ProductItem product={product} />
                                                    </div>
                                                ))
                                                :
                                                <h4 className="text-center" style={{ marginTop: '120px' }}>KHÔNG CÓ SẢN PHẨM NÀO !!!</h4>
                                            }
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                {sizeProducts && +sizeProducts > 0
                                                    ?
                                                    <ReactPaginate
                                                        previousLabel={'<<'}
                                                        nextLabel={'>>'}
                                                        pageCount={Math.ceil(+sizeProducts / LIMIT_ITEM_ONE_PAGE_CLIENT)}
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
                                                    : <div></div>
                                                }
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                : <h4 className="category-empty">Category không tồn tại</h4>
            }
            {/* <Footer /> */}
        </>
    )
}

export default Category