import { ThunkConfig } from 'app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignUpType, UserType } from 'shared/types/user';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { catchHandler } from 'shared/error/catchHandler';
import { ERROR_MESSAGES } from 'shared/const/errorMessages';
import { setLocalStorage } from 'shared/lib/localstorage';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export const signUp = createAsyncThunk<UserType, SignUpType, ThunkConfig<string>>(
    'user/signUp',
    async (formData, { extra, rejectWithValue }) => {
        try {
            const data = await extra.api.signUp(formData);
            if (!data) throw new Error(ERROR_MESSAGES.noData);
            setLocalStorage(USER_LOCALSTORAGE_KEY, data._id);
            extra.navigate?.(RoutePath.main);
            return data;
        } catch (error) {
            return rejectWithValue(catchHandler(error));
        }
    },
);
