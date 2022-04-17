import React, { useEffect, useState } from "react"
import './Footer.scss'

function Footer() {
    const [showGoToTop, setShowGoToTop] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setShowGoToTop(window.scrollY >= 300)
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleGoToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <>
            {showGoToTop && (
                <div className="go-to-top" onClick={() => handleGoToTop()}>
                    <i className="fa fa-chevron-up go-to-top-icon"></i>
                </div>
            )}
            <div className="footer">
                <div className="containter-fluid">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-item">
                                    <div className="footer-title">HƯỚNG DẪN</div>
                                    <ul>
                                        <li>
                                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                                            <span>Hướng dẫn sử dụng</span>
                                        </li>
                                        <li>
                                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                                            <span>Hướng dẫn thanh toán</span>
                                        </li>
                                        <li>
                                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                                            <span>Hướng dẫn đổi trả hàng</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-item">
                                    <div className="footer-title">CHÍNH SÁCH</div>
                                    <ul>
                                        <li>
                                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                                            <span>Chính sách giao hàng</span>
                                        </li>
                                        <li>
                                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                                            <span>Chính sách đổi trả</span>
                                        </li>
                                        <li>
                                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                                            <span>Chính sách bảo hành</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-item">
                                    <div className="footer-title">CHĂM SÓC KHÁCH HÀNG</div>
                                    <ul>
                                        <li>
                                            <span>Email: admin@gmail.com</span>
                                        </li>
                                        <li>
                                            <span>Giờ làm việc: 8h30 - 19h</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-item">
                                    <div className="footer-title">ĐỊA CHỈ MUA HÀNG</div>
                                    <ul>
                                        <li>
                                            <span>Mộ Lao, Hà Đông, Hà Nội</span>
                                        </li>
                                        <li>
                                            <span>Điện thoại: 0123456789</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="copy-right">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="content">
                                <i className="fa fa-copyright"></i>
                                <span className="title">Copyright by</span>
                                <span className="author">Pham Viet Long</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer