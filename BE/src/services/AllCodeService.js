import db from '../models/index'

let getAllCode = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!typeInput) {
                data = {
                    errCode: 1,
                    message: 'Các trường không được trống !'
                }
            } else {
                let allCode = await db.Allcode.findAll({
                    where: { type: typeInput, },
                })
                data = {
                    errCode: 0,
                    message: 'Get all code thành công !',
                    allCode
                }
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllCode
}