import axios from 'axios';

export const catchHandler = (error: any) => error.response.data.message
|| error.response.data.errors.reduce((acc: string, { msg }: any) => acc + msg, '') || 'Unexpected error';
