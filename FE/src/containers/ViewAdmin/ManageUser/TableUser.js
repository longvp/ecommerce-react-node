import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './TableUser.scss'
import {
    changeStatusAccountUser,
    deleteUser,
    getAllUser,
    getAllUserByFullname,
    getAllUserByRole,
    getAllUserByRoleAndFullname
} from './../../../store/actions/userActions'; //getSizeUsers
import { Buffer } from 'buffer'
import Loading from './../../../components/Loading/Loading';
import '../../../components/Pagination/Pagination.scss'
import { LIMIT_ITEM_ONE_PAGE_ADMIN } from './../../../utilities/const';
import ReactPaginate from 'react-paginate'
import _ from "lodash"

function TableUser(props) {

    const dispatch = useDispatch()
    const users = useSelector(state => state.userReducer.users)
    const isLoading = useSelector(state => state.userReducer.isLoading)
    //const [isLoading, setIsLoading] = useState(false)
    const sizeUsers = useSelector(state => state.userReducer.sizeUsers)
    const roles = useSelector(state => state.allcodeReducer.roles)

    const [currentPage, setCurrentPage] = useState(1)
    const [searchByrole, setSearchByRole] = useState('DEFAULT')
    const [searchByFullname, setSearchByFullname] = useState('')

    const adminLoginInfo = useSelector(state => state.userReducer.adminLoginInfo)
    const [idAdminLogin, setIdAdminLogin] = useState('')

    useEffect(() => {
        if (!_.isEmpty(adminLoginInfo)) {
            setIdAdminLogin(adminLoginInfo.id)
        }
    }, [adminLoginInfo])

    useEffect(() => {
        if (!searchByFullname) {
            if (searchByrole === 'DEFAULT')
                dispatch(getAllUser(LIMIT_ITEM_ONE_PAGE_ADMIN, 1))
            else
                dispatch(getAllUserByRole(LIMIT_ITEM_ONE_PAGE_ADMIN, 1, searchByrole))
        } else {
            if (searchByrole === 'DEFAULT')
                dispatch(getAllUserByFullname(LIMIT_ITEM_ONE_PAGE_ADMIN, 1, searchByFullname))
            else
                dispatch(getAllUserByRoleAndFullname(LIMIT_ITEM_ONE_PAGE_ADMIN, 1, searchByrole, searchByFullname))
        }
    }, [searchByrole])

    const handleDeleteUser = (id, currentPage) => {
        let checkConfirm = window.confirm('Bạn chắc chắn muốn xóa ?')
        if (checkConfirm) {
            dispatch(deleteUser(id, currentPage))
        }
    }

    const handleGetItemEdit = (item, currentPage) => {
        props.onGetItemEditFromParent(item, currentPage)
        setSearchByFullname('')
    }

    const handleChangeStatusAccount = (id, statusAccount, currentPage) => {
        dispatch(changeStatusAccountUser({ id, statusAccount }, currentPage))
    }

    const ShowTable = () => {
        return (
            <>
                {users && users.length > 0 &&
                    <div className="container mb-3" >
                        <div className="row" >
                            <div className="col-lg-12 col-md-12 col-sm-12" >
                                <table className='table table-hover text-center' >
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Fullname</th>
                                            <th>Address</th>
                                            <th>Phonenumber</th>
                                            <th>Gender</th>
                                            <th>Role</th>
                                            <th>Avatar</th>
                                            <th>Status Account</th>
                                            <th> Actions </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((item, index) => {
                                            let imageUrl = ''
                                            if (item.image) {
                                                imageUrl = Buffer.from(item.image, 'base64').toString('binary')
                                            }
                                            return (
                                                <tr key={index} >
                                                    <td>{item.email}</td>
                                                    <td>{item.fullname}</td>
                                                    <td>{item.address}</td>
                                                    <td>{item.phonenumber}</td>
                                                    <td>{item.genderData.valueVi}</td>
                                                    <td>{item.roleData.valueVi}</td>
                                                    <td>
                                                        <img src={imageUrl} alt='avatar' style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                                                    </td>
                                                    <td>
                                                        <button className={item.statusAccount === 'SA2' ? "btn btn-danger" : "btn btn-danger inactive"}
                                                            onClick={() => handleChangeStatusAccount(item.id, 'SA2', currentPage)}
                                                            disabled={adminLoginInfo.id === item.id ? true : false}>
                                                            Inactive
                                                        </button>
                                                        <button className={item.statusAccount === 'SA1' ? "btn btn-success" : "btn btn-success inactive"}
                                                            onClick={() => handleChangeStatusAccount(item.id, 'SA1', currentPage)}>
                                                            Active
                                                        </button>
                                                        <button className={item.statusAccount === 'SA3' ? "btn btn-warning" : "btn btn-warning inactive"}
                                                            onClick={() => handleChangeStatusAccount(item.id, 'SA3', currentPage)}
                                                            disabled={adminLoginInfo.id === item.id ? true : false}>
                                                            Block
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-danger mx-2"
                                                            title="Delete"
                                                            disabled={idAdminLogin === item.id ? true : false}
                                                            onClick={
                                                                () => handleDeleteUser(item.id, currentPage)} >
                                                            <i className="fa fa-trash-o"></i>
                                                        </button>
                                                        <button className="btn btn-success"
                                                            title="Edit"
                                                            onClick={
                                                                () => handleGetItemEdit(item, currentPage)} >
                                                            <i className="fa fa-pencil-square-o" > </i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }

    const handleClickSearchByRoleAndFullname = () => {
        if (!searchByFullname) {
            window.alert('Chưa nhập tên tìm kiếm !')
            return
        } else {
            if (searchByrole === 'DEFAULT')
                dispatch(getAllUserByFullname(LIMIT_ITEM_ONE_PAGE_ADMIN, 1, searchByFullname))
            else
                dispatch(getAllUserByRoleAndFullname(LIMIT_ITEM_ONE_PAGE_ADMIN, 1, searchByrole, searchByFullname))
        }
    }

    const handleOnChangePage = (data) => {
        if (searchByFullname === '') {
            if (searchByrole === 'DEFAULT')
                dispatch(getAllUser(LIMIT_ITEM_ONE_PAGE_ADMIN, data.selected + 1))
            else
                dispatch(getAllUserByRole(LIMIT_ITEM_ONE_PAGE_ADMIN, data.selected + 1, searchByrole))
        } else {
            if (searchByrole === 'DEFAULT')
                dispatch(getAllUserByFullname(LIMIT_ITEM_ONE_PAGE_ADMIN, data.selected + 1, searchByFullname))
            else
                dispatch(getAllUserByRoleAndFullname(LIMIT_ITEM_ONE_PAGE_ADMIN, data.selected + 1, searchByrole, searchByFullname))
        }

        setCurrentPage(data.selected + 1)
    }

    // ------------------- DELETE TEXT SEARCH-------------------------
    const handleDeleteTextSearch = () => {
        setSearchByFullname(() => {
            if (searchByrole === 'DEFAULT')
                dispatch(getAllUser(LIMIT_ITEM_ONE_PAGE_ADMIN, 1))
            else
                dispatch(getAllUserByRole(LIMIT_ITEM_ONE_PAGE_ADMIN, 1, searchByrole))
            return ''
        })
    }

    return (
        <>
            <div className="d-flex my-5 justify-content-center" >
                <div className="form-group mx-5" >
                    <label> </label> <br />
                    <select className="form-control"
                        value={searchByrole}
                        onChange={(e) => setSearchByRole(e.target.value)} >
                        <option value='DEFAULT' > Mặc định </option>
                        {roles && roles.length > 0 &&
                            roles.map((item, index) => {
                                return (
                                    <option key={index} value={item.keyMap}> {item.valueVi} </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="d-flex align-items-end" >
                    <div className="form-group mx-2" >
                        <label > Tìm kiếm theo tên: </label> <br />
                        <div className='input-text' >
                            < input className="form-control"
                                value={searchByFullname}
                                onChange={(e) => setSearchByFullname(e.target.value)}
                            />
                            {searchByFullname &&
                                <span className='btn-delete-text-search'
                                    onClick={() => handleDeleteTextSearch()}>
                                    &times;
                                </span>
                            }
                        </div>
                    </div>
                    <div >
                        <button className="btn btn-dark"
                            onClick={() => handleClickSearchByRoleAndFullname()} >
                            Tìm kiếm
                        </button>
                    </div>
                </div>
            </div> { /* ---------- */}
            {isLoading === true ?
                <Loading />
                :
                <>
                    <ShowTable />
                </>
            }
            { /* -------- */}
            {sizeUsers && +sizeUsers > 0 ?
                <ReactPaginate
                    previousLabel={'<<'}
                    nextLabel={'>>'}
                    pageCount={Math.ceil(+sizeUsers / LIMIT_ITEM_ONE_PAGE_ADMIN)}
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
                :
                <h4 className="text-center my-3" > KHÔNG CÓ USER NÀO!!! </h4>
            }
        </>
    )
}

export default TableUser