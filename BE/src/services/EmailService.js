require('dotenv').config()

const nodemailer = require('nodemailer')

//  VERIFY EMAIL
let sendEmailRegisterAccount = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    })
    let mailContent = {
        from: '"Shop for you 👻👻👻" <shopfforyou@gmail.com>',
        to: dataSend.recipient,
        subject: "Xác thực tài khoản ✔",
        text: "Cảm ơn bạn đã đăng tin tưởng dịch vụ của chúng tôi.",
        html: `
                    <h3>Xin chào, ${dataSend.fullname} !</h3>
                    <p>Bạn nhận được email này vì đã đăng ký tài khoản trên shop</p>
                    <p>
                        Mong bạn hãy click vào link bên dưới để kích hoạt tài khoản.
                    </p>
                    <a href=${dataSend.redirectLink} target='_blank'>Click here</a>
                    <div>Xin chân thành cảm ơn !</div>
                `,
    }
    let info = await transporter.sendMail(mailContent)
}

// --------------------------------------------------------------------------------------------

//  ORDER EMAIL
let sendEmailOrder = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    })

    let trProducts = dataSend.products.map((product) => {
        return `
                <tr>
                    <td style='border: 1px solid #dddddd;'>${product.name}</td>
                    <td style='border: 1px solid #dddddd;'>${product.quantity}</td>
                    <td style='border: 1px solid #dddddd;'>${product.priceUnit}</td>
                </tr>
            `
    })

    trProducts = trProducts.join("")

    let mailContent = {
        from: '"Shop for you 👻👻👻" <shopfforyou@gmail.com>',
        to: dataSend.recipient,
        subject: "Bạn đã đặt hàng thành công ✔",
        text: "Cảm ơn bạn đã đăng tin tưởng dịch vụ của chúng tôi.",
        html: `
                    <h3>Xin chào, ${dataSend.fullname} !</h3>
                    <p><b>Thông tin đặt hàng: </b></p>
                    <table style='text-align: center; border-collapse: collapse; width: 80%;'>
                        <tr>
                            <th style='border: 1px solid #dddddd;'>Tên sản phẩm</th>
                            <th style='border: 1px solid #dddddd;'>Số lượng</th>
                            <th style='border: 1px solid #dddddd;'>Tổng giá</th>
                        </tr>
                        ${trProducts}
                    </table>
                    <h2>Tổng: <span style='color:red;'>${dataSend.totalPrice}</span></h2>
                    <p>Chúng tôi sẽ sớm gửi hàng cho bạn. Cảm ơn bạn đã tin tưởng dịch vụ của chúng tôi.</p>
                    <div>Xin chân thành cảm ơn !</div>
                `,
    }
    let info = await transporter.sendMail(mailContent)
}

// --------------------------------------------------------------------------------------------
// SEND EMAIL ORDER DONE ()
let sendEmailOrderDone = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    })
    let mailContent = {
        from: '"Shop for you 👻👻👻" <shopfforyou@gmail.com>',
        to: dataSend.recipient,
        subject: "Giao hàng thành công ✔",
        text: "Cảm ơn bạn đã đăng tin tưởng dịch vụ của chúng tôi.",
        html: `
                    <h3>Xin chào, ${dataSend.fullname} !</h3>
                    <p>Cảm ơn bạn đã mua hàng của shop</p>
                    <p>Mong bạn luôn ủng hộ, lan tỏa các sản phẩm của shop đến với mọi người.</p>
                    <div>Xin chân thành cảm ơn !</div>
                `,
    }
    let info = await transporter.sendMail(mailContent)
}

module.exports = {
    sendEmailRegisterAccount,
    sendEmailOrder,
    sendEmailOrderDone
}