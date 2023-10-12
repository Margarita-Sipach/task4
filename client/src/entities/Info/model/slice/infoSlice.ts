import {
    PayloadAction, createSlice,
} from '@reduxjs/toolkit';
import {
    SliceNames, isFulfilledAction, isPendingAction, isRejectedAction,
} from 'shared/types/redux';
import { InfoSchema } from '../types/infoSchema';

const initialState: InfoSchema = {
    checkedIds: [],
    isAllChecked: false,
    error: undefined,
    users: [],
    isLoading: false,
};

export const infoSlice = createSlice({
    name: SliceNames.info,
    initialState,
    reducers: {
        checkAll: (state, action: PayloadAction<boolean>) => {
            state.isAllChecked = action.payload;
            state.checkedIds = state.isAllChecked ? state.users.map((item) => item._id) : [];
        },
        checkOne: (state, action: PayloadAction<string>) => {
            const ids = state.checkedIds; const
                chengedId = action.payload;
            state.checkedIds = ids.includes(chengedId)
                ? ids.filter((id) => id !== chengedId)
                : [...ids, chengedId];
        },
    },

    extraReducers: (builder) => {
        builder
            .addMatcher(isPendingAction(SliceNames.info), (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addMatcher(isRejectedAction(SliceNames.info), (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addMatcher(isFulfilledAction(SliceNames.info), (state, action) => {
                state.isLoading = false;
                state.checkedIds = [];
                state.isAllChecked = false;
                state.users = action.payload;
            });
    },
});

export const { actions: infoActions, reducer: infoReducer } = infoSlice;
