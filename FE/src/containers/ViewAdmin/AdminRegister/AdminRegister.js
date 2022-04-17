import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllCode } from '../../../store/actions/allcodeActions'
import { getBase64 } from '../../../utilities/getBase64'
import { adminRegisterService } from '../../../services/userService'
import { PATH } from '../../../utilities/const'
import { toast } from 'react-toastify'
import _ from 'lodash'

function AdminRegister() {
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

    const adminLoginInfo = useSelector(state => state.userReducer.adminLoginInfo)

    useEffect(() => {
        if (!_.isEmpty(adminLoginInfo)) {
            navigate(PATH.MANAGE_USER)
        }
    }, [adminLoginInfo])

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

    const handleRegister = async () => {
        let res = await adminRegisterService({
            email, password, fullname, address, phonenumber, gender, image
        })
        if (res && res.errCode === 0) {
            alert('Bạn đã đăng ký thành công')
            setEmail('')
            setPassword('')
            setFullname('')
            setAddress('')
            setPhonenumber('')
            setImage('')
            setImageURL('')
            navigate(PATH.ADMIN_LOGIN)
        } else {
            toast.error(res.message)
        }
    }

    return (
        <>
            <div className='login-background'>
                <div className='login-container login-container--register'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Register</div>
                        <div className='col-6 form-group login-input'>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='email'
                                id='email'
                                placeholder='Email ...'
                                className='form-control'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='col-6 form-group login-input'>
                            <label htmlFor='password'>Password</label>
                            <div className='custom-input-password'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id='password'
                                    placeholder='Password ...'
                                    className='form-control'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <i className={showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'}
                                    onClick={() => setShowPassword(!showPassword)}>
                                </i>
                            </div>
                        </div>
                        <div className='col-6 form-group login-input'>
                            <label htmlFor='fullname'>Fullname</label>
                            <input
                                type='text'
                                id='fullname'
                                placeholder='Fullname ...'
                                className='form-control'
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)} />
                        </div>
                        <div className='col-6 form-group login-input'>
                            <label htmlFor='address'>Address</label>
                            <input
                                type='text'
                                id='address'
                                placeholder='Address ...'
                                className='form-control'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className='col-6 form-group login-input'>
                            <label htmlFor='phonenumber'>Phone number</label>
                            <input
                                type='text'
                                id='phonenumber'
                                placeholder='Phone number ...'
                                className='form-control'
                                value={phonenumber}
                                onChange={(e) => setPhonenumber(e.target.value)} />
                        </div>
                        <div className='col-6 form-group login-input'>
                            <label htmlFor='gender'>Gender</label>
                            <select
                                id='gender'
                                className='form-control'
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
                        <div className="col-12 form-group">
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
                        <div className='col-12'>
                            <button
                                type='button'
                                className='btn-login'
                                onClick={() => handleRegister()}
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminRegister