import { ERROR_MESSAGES } from 'shared/const/errorMessages';

export const catchHandler = (error: any) => error.response.data.message || ERROR_MESSAGES.unexpected;
