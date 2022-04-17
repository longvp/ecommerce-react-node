import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { clientLogin } from "../../../store/actions/clientAction"
import { PATH } from "../../../utilities/const"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import './ClientLoginRegister.scss'
import _ from 'lodash'

function ClientLogin() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const clientLoginInfo = useSelector(state => state.clientReducer.clientLoginInfo)
    useEffect(() => {
        if (!_.isEmpty(clientLoginInfo)) {
            navigate(PATH.HOMEPAGE)
        }
    }, [clientLoginInfo])

    const handleLogin = () => {
        dispatch(clientLogin(email, password))
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
                                        <li>Đăng nhập</li>
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
                                    <div className="heading-title">LOGIN</div>
                                    <NavLink to={PATH.CLIENT_REGISTER} className="register">Đăng ký</NavLink>
                                </div>
                                <div className="form">
                                    <label>Email <span className="required">*</span></label>
                                    <input type='email' className="input" value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form">
                                    <label>Mật khẩu <span className="required">*</span></label>
                                    <input
                                        type={showPassword === true ? 'text' : 'password'}
                                        className="input" value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span className="eye-icon"
                                        onClick={() => setShowPassword(!showPassword)}>
                                        <i className={showPassword === true ? "fa fa-eye" : "fa fa-eye-slash"} ></i>
                                    </span>
                                </div>
                                <div className="form form-submit">
                                    <button type="button" className="btn-submit"
                                        onClick={() => handleLogin()}
                                    >Đăng nhập</button>
                                    <a href="#" className="forgot">Quyên mật khẩu ?</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default ClientLogin