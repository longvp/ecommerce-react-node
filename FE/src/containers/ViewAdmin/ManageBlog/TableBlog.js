import React, { useEffect, useState } from 'react'
import { deleteBlog, getAllBlog, getAllBlogByName } from '../../../store/actions/blogActions'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../components/Loading/Loading'
import { Buffer } from 'buffer'
import ReactPaginate from 'react-paginate'
import { LIMIT_ITEM_ONE_PAGE_ADMIN } from '../../../utilities/const'

function TableBlog(props) {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogReducer.blogs)
    const isLoading = useSelector(state => state.blogReducer.isLoading)
    //const [isLoading, setIsLoading] = useState(false)
    const sizeBlogs = useSelector(state => state.blogReducer.sizeBlogs)

    const [currentPage, setCurrentPage] = useState(1)
    const [searchByName, setSearchByName] = useState('')

    useEffect(() => {
        dispatch(getAllBlog(LIMIT_ITEM_ONE_PAGE_ADMIN, 1))
    }, [])

    const handleDeleteBlog = (id, currentPage) => {
        let checkConfirm = window.confirm('Bạn chắc chắn muốn xóa ?')
        if (checkConfirm) {
            dispatch(deleteBlog(id, currentPage))
        }
    }

    const handleGetItemEdit = (item, currentPage) => {
        props.onGetItemEditFromParent(item, currentPage)
        setSearchByName('')
    }

    const ShowTable = () => {
        return (
            <>
                {blogs && blogs.length > 0 &&
                    <div className="container mb-3">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <table className='table table-hover text-center'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Image</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {blogs.map((item, index) => {
                                            let imageUrl = ''
                                            if (item.image) {
                                                imageUrl = Buffer.from(item.image, 'base64').toString('binary')
                                            }
                                            return (
                                                <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        <img src={imageUrl} alt='avatar' style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-danger mx-2" title="Delete"
                                                            onClick={() => handleDeleteBlog(item.id, currentPage)}>
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

    const handleClickSearchByName = () => {
        if (!searchByName) {
            window.alert('Chưa nhập tên tìm kiếm !')
            return
        }
        else {
            dispatch(getAllBlogByName(LIMIT_ITEM_ONE_PAGE_ADMIN, 1, searchByName))
        }
    }

    const handleOnChangePage = (data) => {
        if (searchByName === '') {
            dispatch(getAllBlog(LIMIT_ITEM_ONE_PAGE_ADMIN, data.selected + 1))
        }
        else {
            dispatch(getAllBlogByName(LIMIT_ITEM_ONE_PAGE_ADMIN, data.selected + 1, searchByName))
        }
        setCurrentPage(data.selected + 1)
    }

    // ------------------- DELETE TEXT SEARCH-------------------------
    const handleDeleteTextSearch = () => {
        setSearchByName(() => {
            dispatch(getAllBlog(LIMIT_ITEM_ONE_PAGE_ADMIN, 1))
            return ''
        })
    }

    return (
        <>
            <div className="d-flex my-5 justify-content-center">
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
                        <button className="btn btn-dark" onClick={() => handleClickSearchByName()}>Tìm kiếm</button>
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
            {sizeBlogs && +sizeBlogs > 0
                ?
                <ReactPaginate
                    previousLabel={'<<'}
                    nextLabel={'>>'}
                    pageCount={Math.ceil(+sizeBlogs / LIMIT_ITEM_ONE_PAGE_ADMIN)}
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
                : <h4 className="text-center my-3">KHÔNG CÓ BLOG  NÀO !!!</h4>
            }
        </>
    )
}

export default TableBlog