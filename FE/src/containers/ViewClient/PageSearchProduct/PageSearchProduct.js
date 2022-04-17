import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import ProductItem from './../ProductItem/ProductItem'
import { getAllProductByName } from './../../../store/actions/productActions'
import ReactPaginate from 'react-paginate'
import './PageSearchProduct.scss'
import { PATH } from '../../../utilities/const'
import Loading from '../../../components/Loading/Loading'

function PageSearchProduct() {
    const { productName } = useParams()
    const dispatch = useDispatch()
    const products = useSelector(state => state.productReducer.products)
    const sizeProducts = useSelector(state => state.productReducer.sizeProducts)
    const isLoading = useSelector(state => state.productReducer.isLoading)

    useEffect(() => {
        if (productName !== '') {
            dispatch(getAllProductByName(8, 1, productName))
        }
    }, [productName])

    const handleOnChangePage = (data) => {
        dispatch(getAllProductByName(8, data.selected + 1, productName))
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
                                        <li>Tìm kiếm</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    {isLoading === true
                        ?
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <Loading />
                        </div>
                        :
                        <>
                            <div className='col-lg-12 col-md-12 col-sm-12'>
                                <div className='result-text'>
                                    Tìm thấy {sizeProducts} kết quả cho từ khóa
                                    "<span>{productName}</span>"
                                </div>
                            </div>
                            {products && products.length > 0 &&
                                products.map((product, index) => (
                                    <div className='col-lg-3 col-md-4 col-sm-6' key={index}>
                                        <ProductItem product={product} />
                                    </div>
                                ))
                            }
                        </>
                    }
                </div>
                <div className='row'>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        {sizeProducts && +sizeProducts > 0
                            ?
                            <ReactPaginate
                                previousLabel={'<<'}
                                nextLabel={'>>'}
                                pageCount={Math.ceil(+sizeProducts / 8)}
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
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default PageSearchProduct