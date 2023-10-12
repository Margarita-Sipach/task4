import { type Request, type Response } from 'express'
import { Result, ValidationError } from 'express-validator'
import { ERROR_MESSAGES } from '../const/errorMessages'

export const messageHandler = (e: any) => {
	if (e instanceof Error) {
        return e.message
      }
      return ERROR_MESSAGES.unexpected
}

export const errorHandler = (res: Response, status: number, message: string | object) => {
	return res.status(status).json({message})
}

export const serverErrorHandler = (res: Response, e: any) => {
	return errorHandler(res, 500, messageHandler(e))
}

export const clientErrorHandler = (res: Response, message: Result<ValidationError>) => {
	return errorHandler(res, 400, (message as any).errors.map(({msg}: {msg: string}) => msg).join(' | '))
}