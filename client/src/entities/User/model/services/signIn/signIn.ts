import { ThunkConfig } from 'app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignInType, UserType } from 'shared/types/user';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { catchHandler } from 'shared/error/catchHandler';

export const signIn = createAsyncThunk<UserType, SignInType, ThunkConfig<string>>(
    'user/signIn',
    async (formData, { extra, rejectWithValue }) => {
        try {
            const data = await extra.api.signIn(formData);
            if (!data) throw new Error();
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(data._id));
            extra.navigate?.('/');
            return data;
        } catch (error) {
            return rejectWithValue(catchHandler(error));
        }
    },
);
