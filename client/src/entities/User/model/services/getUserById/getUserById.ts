import { ThunkConfig } from 'app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserType } from 'shared/types/user';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { catchHandler } from 'shared/error/catchHandler';
import { ERROR_MESSAGES } from 'shared/const/errorMessages';
import { getLocalStorage, removeLocalStorage } from 'shared/lib/localstorage';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export const getUserById = createAsyncThunk<UserType, void, ThunkConfig<string>>(
    'user/getUserById',
    async (_, { extra, rejectWithValue }) => {
        try {
            const id = getLocalStorage(USER_LOCALSTORAGE_KEY);
            if (!id) throw new Error(ERROR_MESSAGES.noId);
            const data = await extra.api.getUserById(id);
            if (!data) throw new Error(ERROR_MESSAGES.noData);
            return data;
        } catch (error) {
			extra.navigate?.(RoutePath.sign_in);
			removeLocalStorage(USER_LOCALSTORAGE_KEY)
            return rejectWithValue(catchHandler(error));
        }
    },
);
