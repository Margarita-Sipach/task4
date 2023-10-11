import { ThunkConfig } from 'app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignUpType, UserType } from 'shared/types/user';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { catchHandler } from 'shared/error/catchHandler';

export const signUp = createAsyncThunk<UserType, SignUpType, ThunkConfig<string>>(
    'user/signUp',
    async (formData, { extra, rejectWithValue }) => {
        try {
            const data = await extra.api.signUp(formData);
            if (!data) throw new Error('Fields are empty');
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(data._id));
            extra.navigate?.('/');
            return data;
        } catch (error) {
            return rejectWithValue(catchHandler(error));
        }
    },
);
