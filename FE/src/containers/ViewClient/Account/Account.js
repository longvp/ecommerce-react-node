import React, { useEffect, useState } from "react"
import Header from "../Header/Header"
import './Account.scss'
import Footer from './../Footer/Footer'
import _ from "lodash"
import { Buffer } from "buffer"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { PATH } from '../../../utilities/const'
import { getAllCode } from './../../../store/actions/allcodeActions'
import { getBase64 } from "../../../utilities/getBase64"
import { clientChangeInfo, getAllOrderByUserId } from "../../../store/actions/clientAction"
import OrderItem from "./OrderItem"

function Account() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const genders = useSelector(state => state.allcodeReducer.genders)
    const clientLoginInfo = useSelector(state => state.clientReducer.clientLoginInfo)
    const ordersByUserId = useSelector(state => state.clientReducer.ordersByUserId)

    const [id, setId] = useState('')
    const [fullname, setFullname] = useState('')
    const [address, setAddress] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [gender, setGender] = useState('')
    const [image, setImage] = useState('')
    const [imageURL, setImageURL] = useState('')

    useEffect(() => {
        if (!_.isEmpty(clientLoginInfo)) {
            let imageURL = ''
            if (clientLoginInfo.image) {
                imageURL = Buffer.from(clientLoginInfo.image, 'base64').toString('binary')
            }
            setId(clientLoginInfo.id)
            setFullname(clientLoginInfo.fullname)
            setAddress(clientLoginInfo.address)
            setPhonenumber(clientLoginInfo.phonenumber)
            setGender(clientLoginInfo.gender)
            setImageURL(imageURL)
            dispatch(getAllOrderByUserId(clientLoginInfo.id))
        }
        if (_.isEmpty(clientLoginInfo)) {
            navigate(PATH.HOMEPAGE)
        }
    }, [clientLoginInfo])

    useEffect(() => {
        dispatch(getAllCode())
    }, [])

    useEffect(() => {
        return () => {
            imageURL && URL.revokeObjectURL(imageURL)
        }
    }, [imageURL])

    const handleOnChangeImage = async (e) => {
        let file = e.target.files[0]
        if (file) {
            let base64 = await getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            setImage(base64)
            setImageURL(objectUrl)
        }
    }

    const handleSaveChange = () => {
        dispatch(clientChangeInfo({ id, fullname, address, phonenumber, gender, image }))
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
                                        <li>Account</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="account">
                <div className="container">
                    <div className="row">
                        {!_.isEmpty(clientLoginInfo) &&
                            <div className="col-lg-5 col-md-12 col-sm-12">
                                <div className="form">
                                    <label>Email <span className="required">*</span></label>
                                    <input type='email' className="input" disabled={true}
                                        value={clientLoginInfo.email}
                                    />
                                </div>
                                <div className="form">
                                    <label>Họ tên <span className="required">*</span></label>
                                    <input type='text' className="input"
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                    />
                                </div>
                                <div className="form">
                                    <label>Address <span className="required">*</span></label>
                                    <input type='text' className="input"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                                <div className="form">
                                    <label>SĐT <span className="required">*</span></label>
                                    <input type='text' className="input"
                                        value={phonenumber}
                                        onChange={(e) => setPhonenumber(e.target.value)}
                                    />
                                </div>
                                <div className="form">
                                    <label>Giới tính<span className="required">*</span></label>
                                    <select type='text' className="input" value={gender}
                                        onChange={(e) => setGender(e.target.value)} >
                                        {genders && genders.length > 0 &&
                                            genders.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form d-flex align-items-center">
                                    <label htmlFor="image">Ảnh đại diện
                                        <span className="required required-image"><i className="fa fa-cloud-upload" aria-hidden="true"></i></span>
                                    </label>
                                    <input type='file' hidden className="input" id="image"
                                        onChange={(e) => handleOnChangeImage(e)} />
                                    <img src={imageURL} className="avartar" alt='avatar' />
                                </div>
                                <div className="text-center">
                                    <button type="button" className="btn-save"
                                        onClick={() => handleSaveChange()}
                                    >LƯU Thay Đổi</button>
                                </div>
                            </div>
                        }
                        <div className="col-lg-7 col-md-12 col-sm-12">
                            <div className="history-right">
                                <div className="history-heading">Lịch sử đặt hàng</div>
                                {ordersByUserId && ordersByUserId.length > 0
                                    ?
                                    ordersByUserId.map((order, index) => (
                                        <OrderItem order={order} key={index} />
                                    ))
                                    :
                                    <div className="order-empty">Chưa có đơn hàng nào !</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default Account