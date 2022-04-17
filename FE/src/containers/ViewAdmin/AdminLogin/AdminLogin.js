import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from "react-router-dom"
import _ from "lodash"
import './AdminLogin.scss'
import { adminLogin } from "../../../store/actions/userActions"
import { PATH } from '../../../utilities/const'

function AdminLogin() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const adminLoginInfo = useSelector(state => state.userReducer.adminLoginInfo)

    useEffect(() => {
        if (!_.isEmpty(adminLoginInfo)) {
            navigate(PATH.MANAGE_USER)
        }
    }, [adminLoginInfo])

    const handleLogin = () => {
        dispatch(adminLogin(email, password))
    }

    return (
        <>
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='email'
                                id='email'
                                placeholder='Enter email ...'
                                className='form-control'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label htmlFor='password'>Password</label>
                            <div className='custom-input-password'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id='password'
                                    placeholder='Enter password ...'
                                    className='form-control'
                                    name='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <i className={showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'}
                                    onClick={() => setShowPassword(!showPassword)}>
                                </i>
                            </div>
                        </div>
                        <div className='col-12'>
                            <button
                                type='button'
                                className='btn-login'
                                onClick={() => handleLogin()}
                            >
                                Log in
                            </button>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span>Or login with: </span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fa fa-google-plus"></i>
                            <i className='fa fa-facebook-f'></i>
                        </div>
                        <div className='col-12'>
                            <div className="register">
                                <span className="register-title">You don't have account:  </span>
                                <NavLink to={PATH.ADMIN_REGISTER} className='register-link'>
                                    Register
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLogin