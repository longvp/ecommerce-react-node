import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getAllCode } from "../../../store/actions/allcodeActions"
import { PATH } from "../../../utilities/const"
import { getBase64 } from "../../../utilities/getBase64"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import { toast } from 'react-toastify'
import './ClientLoginRegister.scss'
import { clientRegisterService } from "../../../services/clientService"
import { useNavigate } from "react-router-dom"
import Loading from './../../../components/Loading/Loading'
import _ from 'lodash'

function ClientRegister() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const genders = useSelector(state => state.allcodeReducer.genders)

    const [showPassword, setShowPassword] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullname, setFullname] = useState('')
    const [address, setAddress] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [gender, setGender] = useState('')
    const [image, setImage] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [rePassword, setRePassword] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        dispatch(getAllCode())
    }, [])

    useEffect(() => {
        if (genders && genders.length > 0) {
            setGender(genders[0].keyMap)
        }
    }, [genders])

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

    const handleSave = async () => {
        if (rePassword !== password) {
            toast.error('Mật khẩu xác nhận không trùng khớp !')
            return
        }
        setIsLoading(true)
        let res = await clientRegisterService({
            email, password, fullname, address, phonenumber, gender, image
        })
        if (res && res.errCode === 0) {
            setIsLoading(false)
            alert('Bạn đã đăng ký thành công. Chúng tôi sẽ gửi mail để bạn xác thực tài khoản !')
            setEmail('')
            setPassword('')
            setRePassword('')
            setFullname('')
            setAddress('')
            setPhonenumber('')
            setImage('')
            setImageURL('')
            navigate(PATH.HOMEPAGE)
        } else {
            setIsLoading(false)
            toast.error(res.message)
        }
    }

    const clientLoginInfo = useSelector(state => state.clientReducer.clientLoginInfo)
    useEffect(() => {
        if (!_.isEmpty(clientLoginInfo)) {
            navigate(PATH.HOMEPAGE)
        }
    }, [clientLoginInfo])

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
                                        <li>Đăng ký</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="login-register">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="login-register-box">
                                <div className="heading">
                                    <div className="heading-title">Register</div>
                                </div>
                                <div className="form">
                                    <label>Email <span className="required">*</span></label>
                                    <input type='email' className="input" value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form">
                                    <label>Họ tên <span className="required">*</span></label>
                                    <input type='text' className="input" value={fullname}
                                        onChange={(e) => setFullname(e.target.value)} />
                                </div>
                                <div className="form">
                                    <label>Địa chỉ <span className="required">*</span></label>
                                    <input type='text' className="input" value={address}
                                        onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                <div className="form">
                                    <label>Số điện thoại <span className="required">*</span></label>
                                    <input type='text' className="input" value={phonenumber}
                                        onChange={(e) => setPhonenumber(e.target.value)} />
                                </div>
                                <div className="gender-image">
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
                                    <div className="form">
                                        <label >Avatar<span className="required">*</span></label>
                                        <div className="form-image">
                                            <label htmlFor="image" className="upload-image">
                                                <i className="fa fa-cloud-upload upload-icon" aria-hidden="true"></i>
                                            </label>
                                            <input type="file" hidden id="image"
                                                onChange={(e) => handleOnChangeImage(e)}
                                            />
                                            {imageURL &&
                                                <img src={imageURL} className="avatar" alt='avatar' />
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="form">
                                    <label>Mật khẩu <span className="required">*</span></label>
                                    <input type={showPassword === true ? 'text' : 'password'} className="input"
                                        value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <span className="eye-icon"
                                        onClick={() => setShowPassword(!showPassword)}>
                                        <i className={showPassword === true ? "fa fa-eye" : "fa fa-eye-slash"} ></i>
                                    </span>
                                </div>
                                <div className="form">
                                    <label>Xác nhận mật khẩu <span className="required">*</span></label>
                                    <input type={showPassword === true ? 'text' : 'password'} className="input"
                                        value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
                                    <span className="eye-icon"
                                        onClick={() => setShowPassword(!showPassword)}>
                                        <i className={showPassword === true ? "fa fa-eye" : "fa fa-eye-slash"} ></i>
                                    </span>
                                </div>
                                {isLoading === true
                                    ?
                                    <Loading />
                                    :
                                    <div className="form form-submit">
                                        <button
                                            type="button"
                                            className="btn-submit"
                                            onClick={() => handleSave()}
                                        >Đăng ký</button>
                                    </div>
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

export default ClientRegister