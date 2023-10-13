import { ThunkConfig } from 'app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserType } from 'shared/types/user';
import { catchHandler } from 'shared/error/catchHandler';
import { ERROR_MESSAGES } from 'shared/const/errorMessages';

export const updateUsers = createAsyncThunk<UserType[], boolean, ThunkConfig<string>>(
    'info/updateUsers',
    async (changedIsActive, { extra, rejectWithValue, getState }) => {
        try {
            const { info, user } = getState();
			if(!user.data?._id) throw new Error(ERROR_MESSAGES.noUser);
            if (!info.checkedIds.length) throw new Error(ERROR_MESSAGES.noCheckbox);
            const data = await extra.api.updateUsers(user.data?._id, info.checkedIds, changedIsActive);
            if (!data) throw new Error(ERROR_MESSAGES.noData);
            return data;
        } catch (error) {
            return rejectWithValue(catchHandler(error));
        }
    },
);
