import React from "react"
import './Section.scss'

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import ProductItem from "../ProductItem/ProductItem"

function Section(props) {
    const category = props.category
    const products = props.products

    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        autoplay: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    return (
        <>
            <div className="section-home-page">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-header">
                                <div className="section-category">{category.name}</div>
                            </div>
                        </div>
                    </div>
                    {products && products.length > 0 ?
                        <div className="row">
                            <div className="col-md-12">
                                <Slider {...settings}>
                                    {products.map((product) => (
                                        <ProductItem product={product} key={product.id} />
                                    ))}
                                </Slider>
                            </div>
                        </div>
                        : <h4 className="text-center">KHÔNG CÓ SẢN PHẨM NÀO !!! </h4>
                    }
                </div>
            </div>
        </>
    )
}

export default Section