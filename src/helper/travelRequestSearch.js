import db from '../models'

export function findTravelRequest(res,query){
    const resultSet = [];
    db.TravelRequest.findAndCountAll({where:query, offset:0, limit:10})
        .then(tRequestDataSet => {
            if(tRequestDataSet.rows.length > 0){
                console.log("TravelRequest")
                var counter = tRequestDataSet.rows.length
                tRequestDataSet.rows.forEach((tRequestData) => {
                    db.Trip.findOne({where:{tripId:tRequestData.tripId}})
                        .then(tripData => {
                            counter -=1
                            if(tripData != null){
                                console.log("TravelRequest")
                                const allData = Object.assign(
                                    {},
                                    
                                    tRequestData.get({ plain: true }), 
                                    {Trip:tripData.get({ plain: true })},
                                    )
                                resultSet.push(allData)
                                if(counter == 0){res.json(resultSet);}
                            }
                        })
                        .catch(err => {
                            res.json(err)
                            console.log(err)
                        })
                });
            }else{
                    res.status(404).json({message:"Record Not Found"})
                }
            try{
                
                // res.json(tRequestData)
            }catch(err){res.json(err); console.log(err.message)}
        })
        .catch(err => {
            res.json(err)
            console.log(err)
        })
}