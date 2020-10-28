import { findTravelRequest } from "../helper/travelRequestSearch";
import { getDataFromToken } from '../helper/tokenToData';

const getTravelRequest = async (req, res) => {
    const decoded = await getDataFromToken(req, res)
    try{
        const id = req.params.requestId
        const userid = decoded.id.toString()
        const offset = req.query.from
        const limit = req.query.to
        var pagination = {offset, limit}
        if(id){     // get a specific travel request
            var query = {userId:userid, travelId:id}
        }else{      // get all travel request
            var query = {userId:userid}
        }
        findTravelRequest(res, query, pagination)
    }catch(err){
        console.log("session error")
    }
}
export default getTravelRequest