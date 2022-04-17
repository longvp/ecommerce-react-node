import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminHeader from '../AdminHeader/AdminHeader'
import { createProduct, editProduct } from './../../../store/actions/productActions'
import { getAllCategory } from './../../../store/actions/categoryActions'
import { getAllCode } from "../../../store/actions/allcodeActions"
import TableProduct from './TableProduct'
import { getBase64 } from './../../../utilities/getBase64'
import { CRUD_ACTIONS } from '../../../utilities/const'
import { Buffer } from 'buffer'

import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
const mdParser = new MarkdownIt(/* Markdown-it options */)

function ManageProduct() {

    const dispatch = useDispatch()
    const categories = useSelector(state => state.categoryReducer.categories)
    const products = useSelector(state => state.productReducer.products)

    const [name, setName] = useState('')
    const [priceOrigin, setPriceOrigin] = useState(1)
    const [priceSale, setPriceSale] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(1)
    const [image, setImage] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [categoryId, setCategroyId] = useState('')
    const [categorySeo, setCategorySeo] = useState('')
    const [specific_HTML, setSpecific_HTML] = useState('')
    const [specific_Markdown, setSpecific_Markdown] = useState('')
    const [descript_HTML, setDescript_HTML] = useState('')
    const [descript_Markdown, setDescript_Markdown] = useState('')

    const [crudAction, setCrudAction] = useState('')
    const [idItemEdit, setIdItemEdit] = useState('')
    const [currentPage, setCurrentPage] = useState('')

    useEffect(() => {
        dispatch(getAllCategory())
        dispatch(getAllCode())
    }, [])

    useEffect(() => {
        if (categories && categories.length > 0) {
            setCategroyId(categories[0].id)
            setCategorySeo(categories[0].seo)
        }
    }, [categories])

    useEffect(() => {
        if (categories && categories.length > 0) {
            for (let i = 0; i < categories.length; i++) {
                if (categories[i].id == categoryId) {
                    setCategorySeo(categories[i].seo)
                }
            }
        }
    }, [categoryId])

    useEffect(() => {
        return () => {
            imageURL && URL.revokeObjectURL(imageURL)
        }
    }, [imageURL])

    useEffect(() => {
        setName('')
        setPriceOrigin(1)
        setPriceSale(0)
        setTotalQuantity(1)
        setImage('')
        setImageURL('')
        setSpecific_HTML('')
        setSpecific_Markdown('')
        setDescript_HTML('')
        setDescript_Markdown('')
        setCrudAction(CRUD_ACTIONS.CREATE)
    }, [products])

    const handleOnChangeImage = async (e) => {
        let file = e.target.files[0]
        if (file) {
            let base64 = await getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            setImage(base64)
            setImageURL(objectUrl)
        }
    }

    const handleOnChangeSpecific = ({ html, text }) => {
        setSpecific_HTML(html)
        setSpecific_Markdown(text)
    }

    const handleOnChangeDescript = ({ html, text }) => {
        setDescript_HTML(html)
        setDescript_Markdown(text)
    }

    const handleGetItemEditFromParent = (itemEdit, currentPage) => {
        let imageURL = ''
        if (itemEdit.image) {
            imageURL = Buffer.from(itemEdit.image, 'base64').toString('binary')
        }
        setName(itemEdit.name)
        setPriceOrigin(itemEdit.priceOrigin)
        setPriceSale(itemEdit.priceSale)
        setTotalQuantity(itemEdit.totalQuantity)
        setCategroyId(itemEdit.categoryId)
        setCategorySeo(itemEdit.categorySeo)
        setSpecific_HTML(itemEdit.specific_HTML)
        setSpecific_Markdown(itemEdit.specific_Markdown)
        setDescript_HTML(itemEdit.descript_HTML)
        setDescript_Markdown(itemEdit.descript_Markdown)
        setImageURL(imageURL)
        setCrudAction(CRUD_ACTIONS.EDIT)
        setIdItemEdit(itemEdit.id)
        setCurrentPage(currentPage)
    }

    const handleSave = () => {
        if (crudAction === CRUD_ACTIONS.CREATE) {
            dispatch(createProduct({
                name,
                priceOrigin,
                priceSale,
                totalQuantity,
                image, categoryId, categorySeo, specific_HTML, specific_Markdown, descript_HTML, descript_Markdown
            }))
        }
        if (crudAction === CRUD_ACTIONS.EDIT) {
            dispatch(editProduct(
                {
                    id: idItemEdit,
                    name, priceOrigin, priceSale, totalQuantity, image,
                    categoryId, categorySeo, specific_HTML, specific_Markdown, descript_HTML, descript_Markdown
                },
                currentPage
            ))
        }
    }

    return (
        <>
            {/* <AdminHeader /> */}
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="text-center mb-3 title-heading-manage">QUẢN LÝ PRODUCTS</h4>
                    </div>
                    <div className="form-group mb-3 col-lg-6 col-md-6 col-sm-12">
                        <label>Loại sản phẩm</label>
                        <select className='form-control' style={{ textTransform: 'capitalize' }}
                            value={categoryId}
                            onChange={(e) => setCategroyId(e.target.value)}>
                            {categories && categories.length > 0
                                ?
                                categories.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    )
                                })
                                :
                                <option>Chưa có category nào !</option>
                            }
                        </select>
                    </div>
                    <div className="form-group mb-3 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="name">Tên sản phẩm</label>
                        <input type="text" className="form-control" id="name"
                            value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group mb-3 col-lg-3 col-md-3 col-sm-12">
                        <label htmlFor="priceOrigin">Giá gốc</label>
                        <input type="number" className="form-control" id="priceOrigin" min={1}
                            value={priceOrigin} onChange={(e) => setPriceOrigin(e.target.value)} />
                    </div>
                    <div className="form-group mb-3 col-lg-3 col-md-3 col-sm-12">
                        <label htmlFor="priceSale">Giá sale</label>
                        <input type="number" className="form-control" id="priceSale" min={0}
                            value={priceSale} onChange={(e) => setPriceSale(e.target.value)} />
                    </div>
                    <div className="form-group mb-3 col-lg-3 col-md-3 col-sm-12">
                        <label>Số lượng sản phẩm</label>
                        <input type="number" className="form-control" min={1}
                            value={totalQuantity} onChange={(e) => setTotalQuantity(e.target.value)} />
                    </div>
                    <div className="form-group mb-3 col-lg-3 col-md-3 col-sm-12">
                        <label>Hình ảnh</label>
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
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                        <label>Thông số kỹ thuật</label>
                        <MdEditor style={{ height: '200px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={handleOnChangeSpecific}
                            value={specific_Markdown}
                        />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                        <label>Mô tả: </label>
                        <MdEditor style={{ height: '200px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={handleOnChangeDescript}
                            value={descript_Markdown}
                        />
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
            <TableProduct onGetItemEditFromParent={handleGetItemEditFromParent} />
        </>
    )
}

export default ManageProduct