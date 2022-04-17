import AllCodeService from '../services/AllCodeService'

let getAllCode = async (req, res) => {
    let data = {}
    try {
        let { typeInput } = req.query
        data = await AllCodeService.getAllCode(typeInput)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

module.exports = {
    getAllCode
}