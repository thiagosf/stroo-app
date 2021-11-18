import Joi from 'joi'

const folderSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .required(),
  content: Joi.string()
    .required(),
})

export default folderSchema
