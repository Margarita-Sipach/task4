import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserType } from 'shared/types/user';
import { InfoSchema } from '../types/infoSchema';
import { fetchUsers } from '../services/fetchUsers/fetchUsers';
import { deleteUsers } from '../services/deleteUsers/deleteUsers';
import { updateUsers } from '../services/updateUsers/updateUsers';

const initialState: InfoSchema = {
    checkedIds: [],
    isAllChecked: false,
    error: undefined,
    users: [],
    isLoading: false,
};

export const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        checkAll: (state, action: PayloadAction<boolean>) => {
            state.isAllChecked = action.payload;
            state.checkedIds = state.isAllChecked ? state.users.map((item) => item._id) : [];
        },
        checkOne: (state, action: PayloadAction<string>) => {
            const ids = state.checkedIds; const
                id = action.payload;
            state.checkedIds = ids.includes(id)
                ? ids.filter((item) => item !== id)
                : [...ids, id];
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
                state.users = [];
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserType[]>) => {
                state.users = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteUsers.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(deleteUsers.fulfilled, (state) => {
                state.isLoading = false;
                state.users = state.users
                    .filter(({ _id }) => !state.checkedIds.includes(_id));
                state.checkedIds = [];
            })
            .addCase(deleteUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateUsers.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(updateUsers.fulfilled, (state, action: PayloadAction<boolean>) => {
                state.users = state.users.map((item) => {
                    const isActive = state.checkedIds.includes(item._id)
                        ? action.payload
                        : item.isActive;
                    return { ...item, isActive };
                });
                state.isLoading = false;
            })
            .addCase(updateUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: infoActions, reducer: infoReducer } = infoSlice;
