import { ThunkConfig } from 'app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserType } from 'shared/types/user';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { catchHandler } from 'shared/error/catchHandler';

export const getUserById = createAsyncThunk<UserType, void, ThunkConfig<string>>(
    'user/getUserById',
    async (_, { extra, rejectWithValue }) => {
        try {
            const id = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY) || '');
            if (!id) throw new Error('No ID');

            const data = await extra.api.getUserById(id);

            if (!data) throw new Error('There are no user');
            return data;
        } catch (error) {
            return rejectWithValue(catchHandler(error));
        }
    },
);
