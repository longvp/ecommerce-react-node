import actionTypes from './actionTypes'
import { getAllCodeService } from '../../services/allcodeService'

export const getAllCode = () => {
    return async (dispatch) => {
        let resRole = await getAllCodeService('ROLE')
        let resGender = await getAllCodeService('GENDER')
        let resStatusOrder = await getAllCodeService('STATUS_ORDER')
        if (resRole.errCode === 0 && resGender.errCode === 0) {
            let data = {
                dataRole: resRole.allCode,
                dataGender: resGender.allCode,
                dataStatusOrder: resStatusOrder.allCode
            }
            dispatch({
                type: actionTypes.GET_ALL_CODE,
                data
            })
        }
    }
}