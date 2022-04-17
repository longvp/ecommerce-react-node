import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { PATH } from "../../../utilities/const"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import './Contact.scss'
import { EMAIL_FORMAT } from "../../../utilities/const"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import _ from "lodash"

function Contact() {
    const [email, setEmail] = useState('')
    const [fullname, setFullname] = useState('')
    const [message, setMessage] = useState('')

    const clientLoginInfo = useSelector(state => state.clientReducer.clientLoginInfo)

    useEffect(() => {
        if (!_.isEmpty(clientLoginInfo)) {
            setEmail(clientLoginInfo.email)
            setFullname(clientLoginInfo.fullname)
        } else {
            setEmail('')
            setFullname('')
        }
    }, [clientLoginInfo])

    const handleSendMessage = () => {
        if (!email || !fullname || !message) {
            toast.error('Các trường không được trống !')
            return
        }
        if (!email.match(EMAIL_FORMAT)) {
            toast.error('Email không hợp lệ !')
            return
        }
        toast.success('Chúng tôi cảm ơn sự phản hồi của bạn !')
        if (_.isEmpty(clientLoginInfo)) {
            setEmail('')
            setFullname('')
            setMessage('')
        } else {
            setMessage('')
        }
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
                                        <li>Liên hệ</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contact">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="contact-left">
                                <div className="contact-heading">Liên hệ với chúng tôi</div>
                                <div className="form">
                                    <label>Email <span className="required">*</span></label>
                                    <input type='email' className="input" value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form">
                                    <label>Họ tên <span className="required">*</span></label>
                                    <input type='text' className="input" value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                    />
                                </div>
                                <div className="form">
                                    <label>Tin nhắn <span className="required">*</span></label>
                                    <textarea className="textarea" value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </div>
                                <button type="button" className="send-message"
                                    onClick={() => handleSendMessage()}
                                >Gửi
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="contact-right">
                                <iframe className="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3132.591866895146!2d105.7860350385913!3d20.98058670152966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135accdd8a1ad71%3A0xa2f9b16036648187!2zSOG7jWMgdmnhu4duIEPDtG5nIG5naOG7hyBCxrB1IGNow61uaCB2aeG7hW4gdGjDtG5n!5e0!3m2!1svi!2s!4v1648467687824!5m2!1svi!2s" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default Contact