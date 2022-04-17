import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import AdminHeader from "../AdminHeader/AdminHeader"
import { createCategory, editCategory } from "../../../store/actions/categoryActions";
import TableCategory from './TableCategory';
import { getBase64 } from './../../../utilities/getBase64';
import { CRUD_ACTIONS } from "../../../utilities/const";
import { Buffer } from 'buffer'

function ManageCategory() {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categoryReducer.categories)

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [crudAction, setCrudAction] = useState('')
    const [idItemEdit, setIdItemEdit] = useState('')

    useEffect(() => {
        return () => {
            imageURL && URL.revokeObjectURL(imageURL)
        }
    }, [imageURL])

    useEffect(() => {
        setName('')
        setImage('')
        setImageURL('')
        setCrudAction(CRUD_ACTIONS.CREATE)
    }, [categories])

    const handleOnChangeImage = async (e) => {
        let file = e.target.files[0]
        if (file) {
            let base64 = await getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            setImage(base64)
            setImageURL(objectUrl)
        }
    }

    const handleGetItemEditFromParent = (itemEdit) => {
        let imageURL = '';
        if (itemEdit.image) {
            imageURL = Buffer.from(itemEdit.image, 'base64').toString('binary');
        }
        setName(itemEdit.name)
        setImageURL(imageURL)
        setCrudAction(CRUD_ACTIONS.EDIT)
        setIdItemEdit(itemEdit.id)
    }

    const handleSave = () => {
        if (crudAction === CRUD_ACTIONS.CREATE) {
            dispatch(createCategory({ name, image }))
        }
        if (crudAction === CRUD_ACTIONS.EDIT) {
            dispatch(editCategory({ id: idItemEdit, name, image }))
        }
    }

    return (
        <>
            {/* <AdminHeader /> */}
            <div className="container" >
                <div className="row" >
                    <div className="col-md-12" >
                        <h4 className="text-center mb-3 title-heading-manage" > QUẢN LÝ CATEGORIES </h4>
                    </div>
                    <div className="col-lg-3" > </div>
                    <div className="form-group mb-3 col-lg-4 col-md-6 col-sm-12" >
                        <label htmlFor="phonenumber" > Tên categories </label>
                        <input type="text" style={{ textTransform: 'capitalize' }}
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
                    <div className="col-md-12 text-center mb-5" >
                        <button className={crudAction === CRUD_ACTIONS.CREATE ? "btn btn-primary" : "btn btn-warning"}
                            onClick={() => handleSave()}>{crudAction === CRUD_ACTIONS.CREATE ? "LƯU" : "LƯU THAY ĐỔI"}
                        </button>
                    </div>
                </div>
            </div>
            <hr />
            <TableCategory onGetItemEditFromParent={handleGetItemEditFromParent} />
        </>
    )
}

export default ManageCategory