import joi from 'joi'

export const choiceSchema = joi.object({
  title: joi.string().required()
})