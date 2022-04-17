import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getAllBlog } from "../../../store/actions/blogActions"
import { LIMIT_ITEM_ONE_PAGE_CLIENT, PATH } from "../../../utilities/const"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import BlogItem from "./BlogItem"
import './Blogs.scss'

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Loading from "../../../components/Loading/Loading"

function Blogs() {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogReducer.blogs)
    const isLoading = useSelector(state => state.blogReducer.isLoading)

    useEffect(() => {
        dispatch(getAllBlog(LIMIT_ITEM_ONE_PAGE_CLIENT, 1))
    }, [])

    const settings = {
        dots: true,
        infinite: true,
        speed: 200,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
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
                                        <li>Blog</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="blog">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 col-md-9 col-sm-12">
                            <div className="banner-left">
                                <Slider {...settings}>
                                    <img src="/assets/blog/banner-1.png" alt='avatar' />
                                    <img src="/assets/blog/banner-2.png" alt='avatar' />
                                    <img src="/assets/blog/banner-3.png" alt='avatar' />
                                </Slider>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="banner-right">
                                <img src="/assets/blog/banner-right-1.png" alt='avatar' />
                                <img src="/assets/blog/banner-right-2.png" alt='avatar' />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {isLoading === true
                            ?
                            <div className="col-md-12">
                                <Loading />
                            </div>
                            :
                            <>
                                {blogs && blogs.length > 0 &&
                                    blogs.map((blog, index) => (
                                        <div className="col-lg-3 col-md-6 col-sm-6" key={index}>
                                            <BlogItem blog={blog} />
                                        </div>
                                    ))
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default Blogs