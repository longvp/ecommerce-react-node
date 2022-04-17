import React, { useState, useEffect, useRef } from 'react'
import './Header.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from './../../../store/actions/categoryActions'
import { NavLink, useNavigate } from 'react-router-dom'
import { PATH } from './../../../utilities/const'
import _ from 'lodash'
import { clientLogout } from '../../../store/actions/clientAction'
import { Buffer } from "buffer"

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categoryReducer.categories)
    const carts = useSelector(state => state.cartReducer.carts)
    const clientLoginInfo = useSelector(state => state.clientReducer.clientLoginInfo)
    const [avatarURL, setAvatarURL] = useState('')

    const [productName, setProductName] = useState('')

    useEffect(() => {
        if (!_.isEmpty(clientLoginInfo)) {
            let avatarURL = ''
            if (clientLoginInfo.image) {
                avatarURL = Buffer.from(clientLoginInfo.image, 'base64').toString('binary')
            }
            setAvatarURL(avatarURL)
        }
    }, [clientLoginInfo])

    useEffect(() => {
        dispatch(getAllCategory())
    }, [])

    const [showMenu, setShowMenu] = useState(false)

    const handleLogout = () => {
        let checkConfirm = window.confirm('Bạn muốn đăng xuất ?')
        if (checkConfirm) {
            dispatch(clientLogout())
        }
    }

    const handleRedirectPageSearch = (productName) => {
        if (productName === '') {
            return
        }
        navigate(`/search/${productName}`)
    }

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='navbar'>
                            <NavLink to={PATH.HOMEPAGE} className='logo'>
                                <img src='/assets/logo.png' className='logo-image' alt='avatar' />
                            </NavLink>
                            <div className='search'>
                                <input className='search-input' placeholder='Tìm kiếm ...'
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)} />
                                <span className='search-icon' onClick={() => handleRedirectPageSearch(productName)}>
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div className='user'>
                                {_.isEmpty(clientLoginInfo)
                                    ?
                                    <NavLink to={PATH.CLIENT_LOGIN} title='Đăng nhập' className='user-info user-info--login'>
                                        <i className="fa fa-user-circle-o user-icon" aria-hidden="true"></i>
                                        <span>Đăng nhập</span>
                                    </NavLink>
                                    :
                                    <>
                                        <NavLink to={PATH.ACCOUNT} className='user-info user-info--logined'>
                                            <img src={avatarURL} alt='avatar' />
                                            <span>{clientLoginInfo.fullname}</span>
                                        </NavLink>
                                        <span className='user-log-out' title='Đăng xuất'
                                            onClick={() => handleLogout()}>
                                            <i className="fa fa-sign-out" aria-hidden="true"></i>
                                        </span>
                                    </>
                                }
                            </div>
                            <div className='cart'>
                                <NavLink to={PATH.CART} title='Giỏ hàng' className='cart-link'>
                                    <i className="fa fa-shopping-cart cart-icon" aria-hidden="true"></i>
                                    <span>({carts.length})</span>
                                </NavLink>
                            </div>
                            <span className='btn-show-menu'
                                onClick={() => setShowMenu(true)}>
                                <i className="fa fa-bars" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='menu-bg'>
                <div className='container-fluid'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='menu'>
                                    <ul className={showMenu === true ? 'list-menu-link show' : 'list-menu-link'}>
                                        <li className='user-login-mobile'>
                                            {_.isEmpty(clientLoginInfo)
                                                ?
                                                <NavLink to={PATH.CLIENT_LOGIN} title='Đăng nhập' className='menu-link'>
                                                    <i className="fa fa-user-circle-o user-icon" aria-hidden="true"></i>
                                                    <span>Đăng nhập</span>
                                                </NavLink>
                                                :
                                                <NavLink to={PATH.ACCOUNT} className='menu-link'>
                                                    <img src={avatarURL} alt='avatar' />
                                                    <span>{clientLoginInfo.fullname}</span>
                                                </NavLink>
                                            }
                                        </li>
                                        {!_.isEmpty(clientLoginInfo) &&
                                            <li className='sign-out-mobile'>
                                                <span className='menu-link' onClick={() => handleLogout()}>
                                                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                                                </span>
                                            </li>
                                        }
                                        <li><NavLink to={PATH.HOMEPAGE} className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}>Trang chủ</NavLink></li>
                                        {categories && categories.length > 0 &&
                                            categories.map((category) => (
                                                <li key={category.id}>
                                                    <NavLink to={`/category/${category.seo}`} className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}>{category.name}</NavLink>
                                                </li>
                                            ))
                                        }
                                        <li><NavLink to={PATH.BLOG} className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}>Blog</NavLink></li>
                                        <li><NavLink to={PATH.CONTACT} className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}>Liên hệ</NavLink></li>
                                        <li>
                                            <span className='btn-close-menu' onClick={() => setShowMenu(false)}>
                                                <i className="fa fa-window-close close-icon" aria-hidden="true"></i>
                                            </span>
                                        </li>
                                        <li className='cart-mobile'>
                                            <NavLink to={PATH.CART} title='Giỏ hàng' className='menu-link'>
                                                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                                <span>({carts.length})</span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
