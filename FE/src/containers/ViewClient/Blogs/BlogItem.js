import React from 'react'
import { Buffer } from 'buffer'
import './BlogItem.scss'
import { useNavigate } from 'react-router-dom'

function BlogItem({ blog }) {

    const navigate = useNavigate()

    let blogImageURL = ''
    if (blog.image) {
        blogImageURL = Buffer.from(blog.image, 'base64').toString('binary');
    }

    const handleRedirectDetail = (blogSeo) => {
        navigate(`/detail-blog/${blogSeo}`)
    }

    return (
        <>
            <div className="blog-item" title={blog.name}>
                <img src={blogImageURL} alt='avatar' className="blog-image"
                    onClick={() => handleRedirectDetail(blog.seo)}
                />
                <div className="blog-title"
                    onClick={() => handleRedirectDetail(blog.seo)}
                >{blog.name}</div>
                <div className="blog-date">{blog.timeCreate}</div>
            </div>
        </>
    )
}

export default BlogItem