import _ from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getBlogBySeo } from '../../../store/actions/blogActions'
import { PATH } from '../../../utilities/const'
import { Buffer } from 'buffer'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import './DetailBlog.scss'
import Loading from '../../../components/Loading/Loading'

function DetailBlog() {
    const { blogSeo } = useParams()
    const dispatch = useDispatch()
    const blog = useSelector(state => state.blogReducer.blog)
    const isLoading = useSelector(state => state.blogReducer.isLoading)

    useEffect(() => {
        dispatch(getBlogBySeo(blogSeo))
    }, [blogSeo])

    return (
        <>
            {/* <Header /> */}
            {!_.isEmpty(blog)
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
                                                <li>Blog</li>
                                                <li>{blog.name}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='blog-detail'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-lg-12 col-md-12 col-sm-12'>
                                    {isLoading === true
                                        ?
                                        <Loading />
                                        :
                                        <>
                                            {blog.image &&
                                                <img src={Buffer.from(blog.image, 'base64').toString('binary')} alt='avatar' className='blog-image' />
                                            }
                                            <h4 className='blog-name'>{blog.name}</h4>
                                            <div className='blog-date'>
                                                <i className="fa fa-calendar" aria-hidden="true"></i>
                                                <span>Ngày: {blog.timeCreate}</span>
                                            </div>
                                            <div className='blog-descript'
                                                dangerouslySetInnerHTML={{ __html: blog.content_HTML }}
                                            ></div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :
                <h4 className="product-empty">Blog không tồn tại</h4>
            }
            {/* <Footer /> */}
        </>
    )
}

export default DetailBlog