import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import './ManageUser.scss'
import AdminHeader from "../AdminHeader/AdminHeader"
import { getAllCode } from "../../../store/actions/allcodeActions"
import { createUser, editUser } from '../../../store/actions/userActions'
import TableUser from "./TableUser"
import { getBase64 } from './../../../utilities/getBase64'
import { CRUD_ACTIONS } from "../../../utilities/const"
import { Buffer } from 'buffer'
import { editInfoAdminLogin } from './../../../store/actions/userActions'
import _ from "lodash"

function ManageUser() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.userReducer.users)
    const genders = useSelector(state => state.allcodeReducer.genders)
    const roles = useSelector(state => state.allcodeReducer.roles)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullname, setFullname] = useState('')
    const [address, setAddress] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [gender, setGender] = useState('')
    const [role, setRole] = useState('')
    const [image, setImage] = useState('')
    const [imageURL, setImageURL] = useState('')

    const [crudAction, setCrudAction] = useState('')
    const [idItemEdit, setIdItemEdit] = useState('')
    const [currentPage, setCurrentPage] = useState('')

    const adminLoginInfo = useSelector(state => state.userReducer.adminLoginInfo)
    const [idAdminLogin, setIdAdminLogin] = useState('')

    useEffect(() => {
        if (!_.isEmpty(adminLoginInfo)) {
            setIdAdminLogin(adminLoginInfo.id)
        }
    }, [adminLoginInfo])

    useEffect(() => {
        dispatch(getAllCode())
    }, [])

    useEffect(() => {
        if (genders && genders.length > 0) {
            setGender(genders[0].keyMap)
        }
        if (roles && roles.length > 0) {
            setRole(roles[0].keyMap)
        }
    }, [genders, roles])

    useEffect(() => {
        return () => {
            imageURL && URL.revokeObjectURL(imageURL)
        }
    }, [imageURL])

    useEffect(() => {
        setEmail('')
        setPassword('')
        setFullname('')
        setAddress('')
        setPhonenumber('')
        setImage('')
        setImageURL('')
        setCrudAction(CRUD_ACTIONS.CREATE)
    }, [users])

    const handleOnChangeImage = async (e) => {
        let file = e.target.files[0]
        if (file) {
            let base64 = await getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            setImage(base64)
            setImageURL(objectUrl)
        }
    }

    const handleGetItemEditFromParent = (itemEdit, currentPage) => {
        let imageURL = '';
        if (itemEdit.image) {
            imageURL = Buffer.from(itemEdit.image, 'base64').toString('binary');
        }
        setEmail(itemEdit.email)
        setPassword('HARDCODE')
        setFullname(itemEdit.fullname)
        setAddress(itemEdit.address)
        setPhonenumber(itemEdit.phonenumber)
        setGender(itemEdit.gender)
        setRole(itemEdit.role)
        setImageURL(imageURL)
        setCrudAction(CRUD_ACTIONS.EDIT)
        setIdItemEdit(itemEdit.id)
        setCurrentPage(currentPage)
    }

    const handleSave = () => {
        if (crudAction === CRUD_ACTIONS.CREATE) {
            dispatch(createUser({ email, password, fullname, address, phonenumber, gender, role, image }))
        }
        if (crudAction === CRUD_ACTIONS.EDIT) {
            if (idAdminLogin && idAdminLogin === idItemEdit) {
                dispatch(editInfoAdminLogin(
                    { id: idItemEdit, fullname, address, phonenumber, gender, role, image },
                    currentPage
                ))
            }
            else {
                dispatch(editUser(
                    { id: idItemEdit, fullname, address, phonenumber, gender, role, image },
                    currentPage
                ))
            }
        }
    }

    return (
        <>
            {/* <AdminHeader /> */}
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="text-center mb-3 title-heading-manage">QUẢN LÝ USERS</h4>
                    </div>
                    <div className="form-group mb-3 col-lg-4 col-md-6 col-sm-12">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control"
                            id="email" disabled={crudAction === CRUD_ACTIONS.EDIT ? true : false}
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group mb-3 col-lg-4 col-md-6 col-sm-12">
                        <label htmlFor="password">Mật khẩu</label>
                        <input type="password" className="form-control"
                            id="password" disabled={crudAction === CRUD_ACTIONS.EDIT ? true : false}
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group mb-3 col-lg-4 col-md-6 col-sm-12">
                        <label htmlFor="fullname">Họ tên</label>
                        <input type="text" className="form-control" id="fullname"
                            value={fullname} onChange={(e) => setFullname(e.target.value)} />
                    </div>
                    <div className="form-group mb-3 col-lg-4 col-md-6 col-sm-12">
                        <label htmlFor="address">Địa chỉ</label>
                        <input type="text" className="form-control" id="address"
                            value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="form-group mb-3 col-lg-4 col-md-6 col-sm-12">
                        <label htmlFor="phonenumber">SĐT</label>
                        <input type="text" className="form-control" id="phonenumber"
                            value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
                    </div>
                    <div className="form-group mb-3 col-lg-4 col-md-6 col-sm-12">
                        <label>Giới tính</label>
                        <select className='form-control'
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}>
                            {genders && genders.length > 0 &&
                                genders.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group mb-3 col-lg-4 col-md-6 col-sm-12">
                        <label>Vai trò</label>
                        <select className='form-control'
                            value={role}
                            onChange={(e) => setRole(e.target.value)}>
                            {roles && roles.length > 0 &&
                                roles.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group mb-3 col-lg-4 col-md-6 col-sm-12">
                        <label>Avatar</label>
                        <div className="d-flex">
                            <label htmlFor="image" className="upload-image">
                                <i className="fa fa-cloud-upload upload-icon" aria-hidden="true"></i>
                            </label>
                            <input type="file" hidden className="form-control" id="image"
                                onChange={(e) => handleOnChangeImage(e)}
                            />
                            {imageURL &&
                                <img src={imageURL} className="avatar" alt='avatar' />
                            }
                        </div>
                    </div>
                    <div className="col-md-12 text-center mb-3">
                        <button className={crudAction === CRUD_ACTIONS.CREATE ? "btn btn-primary" : "btn btn-warning"}
                            onClick={() => handleSave()}
                        >
                            {crudAction === CRUD_ACTIONS.CREATE ? "LƯU" : "LƯU THAY ĐỔI"}
                        </button>
                    </div>
                </div>
            </div>
            <hr />
            <TableUser onGetItemEditFromParent={handleGetItemEditFromParent} />
        </>
    )
}

export default ManageUser