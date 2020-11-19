import BadRequestError from "../utils/badRequestError";
import getDataFromToken from "../helper/tokenToData"
import {createTravelComment} from "../services/createTravelRequestComment"

export const TravelRequestComment = async (req, res, next) => {
    try{
        const decoded = await getDataFromToken(req, res, next);
        const request_id = req.params.travelId
        const comment = req.body.comment
        if(request_id){
            if(comment){
                const commentBody = {
                    userId: decoded.id,
                    travelId: request_id,
                    comment: comment
                }
                try{
                    createTravelComment(req, res, commentBody, next)
                }catch(err){
                    next(err)
                }
            }else{
                throw new BadRequestError("You must provide comment")
            }
        }else{
            throw new BadRequestError("You must provide request id")
        }
    }catch(err){
        next(err)
    }
    
}