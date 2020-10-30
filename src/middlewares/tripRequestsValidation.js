import Joi from 'joi';

export default function (req, res, next) {
    const schema = Joi.object({
        status: Joi.string(),
        trip:Joi.array().items(
            Joi.object({
                originCity: Joi.string().required(),
                destination: Joi.string().required(),
                tripDate: Joi.date().required(),
                returnDate: Joi.date(),
                accommodationID: Joi.string().required(),
                userId: Joi.string().required(),
                // managerId: Joi.string().required(),
                reason: Joi.string().required()
            })
        ).required()
    })
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}