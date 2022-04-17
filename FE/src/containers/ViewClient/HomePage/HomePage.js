import React, { useEffect } from "react"
import './HomePage.scss'
import '../Section/Section.scss'

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import Section from "../Section/Section"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"

import { useDispatch, useSelector } from "react-redux"
import { getAllCategoryHomePage } from "../../../store/actions/categoryActions"
import Loading from "../../../components/Loading/Loading"

function HomePage() {
    const dispatch = useDispatch()
    // LIST PRODUCT BY CATEGORY
    const categoriesHomePage = useSelector(state => state.categoryReducer.categoriesHomePage)
    const isLoading = useSelector(state => state.categoryReducer.isLoading)


    useEffect(() => {
        dispatch(getAllCategoryHomePage())
    }, [])

    const settingsBanner = {
        dots: true,
        infinite: true,
        speed: 200,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    const settingsCustomer = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    const settingsBrand = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    return (
        <>
            {/* <Header /> */}
            <div className="banner">
                <Slider {...settingsBanner}>
                    <div>
                        <img src="/assets/banner/banner-1.png" alt='avatar' />
                    </div>
                    <div>
                        <img src="/assets/banner/banner-2.png" alt='avatar' />
                    </div>
                    <div>
                        <img src="/assets/banner/banner-3.png" alt='avatar' />
                    </div>
                </Slider>
            </div>
            {/* POLICY */}
            <div className="policy">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="policy-item">
                                <div className="policy-icon">
                                    <i className="fa fa-th" ></i>
                                </div>
                                <div className="policy-desc">
                                    <div className="policy-title">10000+ Sản phẩm</div>
                                    <div className="policy-sub-title">400+ Thương hiệu</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="policy-item">
                                <div className="policy-icon">
                                    <i className="fa fa-smile-o" ></i>
                                </div>
                                <div className="policy-desc">
                                    <div className="policy-title">2 Triệu khách hàng</div>
                                    <div className="policy-sub-title">Tin tưởng mua sắm</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="policy-item">
                                <div className="policy-icon">
                                    <i className="fa fa-hand-o-right" ></i>
                                </div>
                                <div className="policy-desc">
                                    <div className="policy-title">Hàng chính hãng</div>
                                    <div className="policy-sub-title">100% Chính hãng</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="policy-item">
                                <div className="policy-icon">
                                    <i className="fa fa-truck" ></i>
                                </div>
                                <div className="policy-desc">
                                    <div className="policy-title">Giao hàng nhanh chóng</div>
                                    <div className="policy-sub-title">Miễn phí nội thành</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading === true
                ?
                <Loading />
                :
                <>
                    {/* LIST PRODUCT BY CATEGORY */}
                    {categoriesHomePage && categoriesHomePage.length > 0 &&
                        categoriesHomePage.map((item) => (
                            < Section category={item.category} products={item.products} key={item.category.id} />
                        ))
                    }
                    {/* ĐÁNH GIÁ KHÁCH HÀNG */}
                    <div className="customer">
                        <div className="section-home-page">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="section-header">
                                            <div className="section-category">Đánh giá</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                                        <Slider {...settingsCustomer}>
                                            <div className="customer-item">
                                                <div className="customer-item-info">
                                                    <img src="/assets/customer/1.jpg" className="customer-image" alt='avatar' />
                                                    <div className="customer-rate-start">
                                                        <i className="fa fa-star" ></i>
                                                        <i className="fa fa-star" ></i>
                                                        <i className="fa fa-star" ></i>
                                                        <i className="fa fa-star" ></i>
                                                        <i className="fa fa-star" ></i>
                                                    </div>
                                                    <div className="customer-name">Pham Viet Long</div>
                                                </div>
                                                <div className="customer-desc">
                                                    Hãng điện thoại nào bền nhất hiện nay và top các sản phẩm được ưa chuộng nhất.
                                                </div>
                                            </div>
                                            <div className="customer-item">
                                                <img src="/assets/customer/2.jpg" className="customer-image" alt='avatar' />
                                                <div className="customer-rate-start">
                                                    <i className="fa fa-star" ></i>
                                                    <i className="fa fa-star" ></i>
                                                    <i className="fa fa-star" ></i>
                                                    <i className="fa fa-star" ></i>
                                                    <i className="fa fa-star" ></i>
                                                </div>
                                                <div className="customer-name">Pham Viet Long</div>
                                                <div className="customer-desc">
                                                    Hãng điện thoại nào bền nhất hiện nay và top các sản phẩm được ưa chuộng nhất.
                                                </div>
                                            </div>
                                            <div className="customer-item">
                                                <img src="/assets/customer/3.jpg" className="customer-image" alt='avatar' />
                                                <div className="customer-rate-start">
                                                    <i className="fa fa-star" ></i>
                                                    <i className="fa fa-star" ></i>
                                                    <i className="fa fa-star" ></i>
                                                    <i className="fa fa-star" ></i>
                                                    <i className="fa fa-star" ></i>
                                                </div>
                                                <div className="customer-name">Pham Viet Long</div>
                                                <div className="customer-desc">
                                                    Hãng điện thoại nào bền nhất hiện nay và top các sản phẩm được ưa chuộng nhất.
                                                </div>
                                            </div>
                                            <div className="customer-item">
                                                <img src="/assets/customer/4.jpg" className="customer-image" alt='avatar' />
                                                <div className="customer-rate-start">
                                                    <i className="fa fa-star" ></i>
                                                    <i className="fa fa-star" ></i>
                                                    <i className="fa fa-star" ></i>
                                                    <i className="fa fa-star" ></i>
                                                    <i className="fa fa-star" ></i>
                                                </div>
                                                <div className="customer-name">Pham Viet Long</div>
                                                <div className="customer-desc">
                                                    Hãng điện thoại nào bền nhất hiện nay và top các sản phẩm được ưa chuộng nhất.

                                                </div>
                                            </div>
                                            <div className="customer-item">
                                                <img src="/assets/customer/5.jpg" className="customer-image" alt='avatar' />
                                                <div className="customer-rate-start">
                                                    <i className="fa fa-star" ></i>
                                                    <i className="fa fa-star" ></i>
                                                    <i className="fa fa-star" ></i>
                                                    <i className="fa fa-star" ></i>
                                                    <i className="fa fa-star" ></i>
                                                </div>
                                                <div className="customer-name">Pham Viet Long</div>
                                                <div className="customer-desc">
                                                    Hãng điện thoại nào bền nhất hiện nay và top các sản phẩm được ưa chuộng nhất.

                                                </div>
                                            </div>
                                            <div className="customer-item">
                                                <img src="/assets/customer/6.jpg" className="customer-image" alt='avatar' />
                                                <div className="customer-rate-start">
                                                    <i className="fa fa-star" ></i>
                                                    <i className="fa fa-star" ></i>
                                                    <i className="fa fa-star" ></i>
                                                    <i className="fa fa-star" ></i>
                                                    <i className="fa fa-star" ></i>
                                                </div>
                                                <div className="customer-name">Pham Viet Long</div>
                                                <div className="customer-desc">
                                                    Hãng điện thoại nào bền nhất hiện nay và top các sản phẩm được ưa chuộng nhất.

                                                </div>
                                            </div>
                                        </Slider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* THUONG HIEU */}
                    <div className="brand">
                        <div className="section-home-page">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="section-header">
                                            <div className="section-category">Thương hiệu</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <Slider {...settingsBrand}>
                                            <img src="/assets/brand/brand-1.jpg" className="brand-image" alt='avatar' />
                                            <img src="/assets/brand/brand-2.jpg" className="brand-image" alt='avatar' />
                                            <img src="/assets/brand/brand-3.jpg" className="brand-image" alt='avatar' />
                                            <img src="/assets/brand/brand-4.jpg" className="brand-image" alt='avatar' />
                                            <img src="/assets/brand/brand-5.jpg" className="brand-image" alt='avatar' />
                                            <img src="/assets/brand/brand-6.jpg" className="brand-image" alt='avatar' />
                                        </Slider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
            {/* <Footer /> */}
        </>
    )
}

export default HomePage