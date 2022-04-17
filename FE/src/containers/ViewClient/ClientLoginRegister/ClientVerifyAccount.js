import React, { useEffect, useState } from 'react'
import { verifyAccountService } from '../../../services/clientService'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { NavLink } from 'react-router-dom'
import { PATH } from '../../../utilities/const'
import './ClientVerifyAccount.scss'
import PageNotFound from '../PageNotFound'

function ClientVerifyAccount() {
    let urlParams = new URLSearchParams(window.location.search)
    let token = urlParams.get('token')
    let clientId = urlParams.get('clientId')
    let [checkVerify, setCheckVerify] = useState(false)
    useEffect(async () => {
        let res = await verifyAccountService({ token, clientId })
        if (res && res.errCode === 0) {
            setCheckVerify(true)
        }
    }, [])
    return (
        <>
            {/* <Header /> */}
            {checkVerify === true
                ?
                <div className='verify'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <h3 className='verify-heading'>Tài khoản của bạn đã được kích hoạt !</h3>
                                <p className='verify-text'>Hãy đăng nhập để sử dụng các dịch vụ của chúng tôi</p>
                                <NavLink to={PATH.CLIENT_LOGIN} className='verify-link-login'>Đăng nhập</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <PageNotFound />
            }
            {/* <Footer /> */}
        </>
    )
}

export default ClientVerifyAccount