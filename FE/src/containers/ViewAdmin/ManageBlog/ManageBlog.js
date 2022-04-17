import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminHeader from '../AdminHeader/AdminHeader'
import { createBlog, editBlog, } from "../../../store/actions/blogActions"
import TableBlog from './TableBlog'
import { getBase64 } from './../../../utilities/getBase64'
import { CRUD_ACTIONS } from "../../../utilities/const"
import { Buffer } from 'buffer'
import moment from 'moment'

import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
const mdParser = new MarkdownIt(/* Markdown-it options */)


function ManageBlog() {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogReducer.blogs)

    const [name, setName] = useState('')
    const [content_HTML, setContent_HTML] = useState('')
    const [content_Markdown, setContent_Markdown] = useState('')
    const [image, setImage] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [crudAction, setCrudAction] = useState('')
    const [idItemEdit, setIdItemEdit] = useState('')
    const [currentPage, setCurrentPage] = useState('')

    useEffect(() => {
        return () => {
            imageURL && URL.revokeObjectURL(imageURL)
        }
    }, [imageURL])

    useEffect(() => {
        setName('')
        setContent_HTML('')
        setContent_Markdown('')
        setImage('')
        setImageURL('')
        setCrudAction(CRUD_ACTIONS.CREATE)
    }, [blogs])

    const handleOnChangeImage = async (e) => {
        let file = e.target.files[0]
        if (file) {
            let base64 = await getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            setImage(base64)
            setImageURL(objectUrl)
        }
    }

    const handleOnChangeContent = ({ html, text }) => {
        setContent_HTML(html)
        setContent_Markdown(text)
    }

    const handleGetItemEditFromParent = (itemEdit, currentPage) => {
        let imageURL = '';
        if (itemEdit.image) {
            imageURL = Buffer.from(itemEdit.image, 'base64').toString('binary');
        }
        setName(itemEdit.name)
        setContent_HTML(itemEdit.content_HTML)
        setContent_Markdown(itemEdit.content_Markdown)
        setImageURL(imageURL)
        setCrudAction(CRUD_ACTIONS.EDIT)
        setIdItemEdit(itemEdit.id)
        setCurrentPage(currentPage)
    }

    const handleSave = () => {
        if (crudAction === CRUD_ACTIONS.CREATE) {
            dispatch(createBlog({
                name, image, content_HTML, content_Markdown,
                timeCreate: moment(new Date()).format("DD/MM/YYYY")
            }))
        }
        if (crudAction === CRUD_ACTIONS.EDIT) {
            dispatch(editBlog(
                {
                    id: idItemEdit, name, image, content_HTML, content_Markdown,
                    timeCreate: moment(new Date()).format("DD/MM/YYYY")
                },
                currentPage
            ))
        }
    }

    return (
        <>
            {/* <AdminHeader /> */}
            <div className="container" >
                <div className="row" >
                    <div className="col-md-12" >
                        <h4 className="text-center mb-3 title-heading-manage" > QUẢN LÝ BLOGS </h4>
                    </div>
                    <div className="col-lg-3" > </div>
                    <div className="form-group mb-3 col-lg-4 col-md-6 col-sm-12" >
                        <label htmlFor="phonenumber">Tên blogs </label>
                        <input type="text"
                            className="form-control"
                            id="phonenumber"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3 col-lg-5 col-md-6 col-sm-12" >
                        <label > Hình ảnh </label>
                        <label htmlFor="image" className="upload-image" >
                            <i className="fa fa-cloud-upload upload-icon" aria-hidden="true" > </i>
                        </label>
                        <input type="file"
                            hidden className="form-control"
                            id="image"
                            onChange={(e) => handleOnChangeImage(e)}
                        />
                        {imageURL &&
                            <img src={imageURL} className="avatar" alt='avatar' />
                        }
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                        <label>Mô tả: </label>
                        <MdEditor style={{ height: '200px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={handleOnChangeContent}
                            value={content_Markdown}
                        />
                    </div>
                    <div className="col-md-12 text-center mb-5" >
                        <button className={crudAction === CRUD_ACTIONS.CREATE ? "btn btn-primary" : "btn btn-warning"}
                            onClick={() => handleSave()}>{crudAction === CRUD_ACTIONS.CREATE ? "LƯU" : "LƯU THAY ĐỔI"}
                        </button>
                    </div>
                </div>
            </div>
            <hr />
            <TableBlog onGetItemEditFromParent={handleGetItemEditFromParent} />
        </>
    )
}

export default ManageBlog