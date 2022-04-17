import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllCategory,
    deleteCategory,
    getAllCategoryByName
} from '../../../store/actions/categoryActions'
import Loading from './../../../components/Loading/Loading'
import { Buffer } from 'buffer'
import { useState } from 'react'

function TableCategory(props) {

    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.categoryReducer.isLoading)
    const categories = useSelector(state => state.categoryReducer.categories)

    const [searchByName, setSearchByName] = useState('')

    useEffect(() => {
        dispatch(getAllCategory())
    }, [])

    const handleDeleteCategory = (id) => {
        let checkConfirm = window.confirm('Bạn chắc chắn muốn xóa ?')
        if (checkConfirm) {
            dispatch(deleteCategory(id))
        }
    }

    const handleGetItemEdit = (item) => {
        props.onGetItemEditFromParent(item)
    }

    const ShowTable = () => {
        return (
            <>
                {categories && categories.length > 0 &&
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
                                        {categories.map((item, index) => {
                                            let imageUrl = ''
                                            if (item.image) {
                                                imageUrl = Buffer.from(item.image, 'base64').toString('binary')
                                            }
                                            return (
                                                <tr key={index}>
                                                    <td style={{ textTransform: 'capitalize' }}>
                                                        {item.name}
                                                    </td>
                                                    <td>
                                                        <img src={imageUrl} style={{ width: '200px', objectFit: 'contain' }} alt='avatar' />
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-danger mx-2" title="Delete"
                                                            onClick={() => handleDeleteCategory(item.id)}>
                                                            <i className="fa fa-trash-o"></i>
                                                        </button>
                                                        <button className="btn btn-success" title="Edit"
                                                            onClick={() => handleGetItemEdit(item)}>
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

    const handleClickSearchName = () => {
        if (!searchByName) {
            window.alert('Chưa nhập tên tìm kiếm !')
            return
        }
        else {
            dispatch(getAllCategoryByName(searchByName))
        }
    }

    const handleDeleteTextSearch = () => {
        setSearchByName(() => {
            dispatch(getAllCategory())
            return ''
        })
    }

    return (
        <>
            <div className="d-flex my-2 justify-content-center">
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
                        <button className="btn btn-dark" onClick={() => handleClickSearchName()}>Tìm kiếm</button>
                    </div>
                </div>
            </div>
            {isLoading === true
                ?
                <Loading />
                :
                <>
                    <ShowTable />
                </>
            }
            {categories.length === 0 &&
                <h4 className="text-center my-3">KHÔNG CÓ CATEGORY NÀO !!!</h4>
            }
        </>
    )
}

export default TableCategory