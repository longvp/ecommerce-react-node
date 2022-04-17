import React from "react"
import Footer from "./Footer/Footer"
import Header from "./Header/Header"

function PageNotFound() {
    return (
        <>
            {/* <Header /> */}
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '30px', color: 'red' }}>
                            Page Not Found
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default PageNotFound