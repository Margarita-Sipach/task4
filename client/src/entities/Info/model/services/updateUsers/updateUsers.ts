import { ThunkConfig } from 'app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserType } from 'shared/types/user';
import { catchHandler } from 'shared/error/catchHandler';
import { ERROR_MESSAGES } from 'shared/const/errorMessages';

export const updateUsers = createAsyncThunk<UserType[], boolean, ThunkConfig<string>>(
    'info/updateUsers',
    async (changedIsActive, { extra, rejectWithValue, getState }) => {
        try {
            const { info } = getState();
            if (!info.checkedIds.length) throw new Error(ERROR_MESSAGES.noCheckbox);
            const data = await extra.api.updateUsers(info.checkedIds, changedIsActive);
			if (!data) throw new Error(ERROR_MESSAGES.noData);
            return data;
        } catch (error) {
            return rejectWithValue(catchHandler(error));
        }
    },
);
