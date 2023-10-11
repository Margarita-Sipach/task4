import { AnyAction, AsyncThunk } from '@reduxjs/toolkit';
import { SliceNames } from 'shared/redux/sliceNames';

enum RequestStates{
    pending = 'pending',
    rejected = 'rejected',
    fulfilled = 'fulfilled',
}

export interface ReduxSchema{
    isLoading?: boolean
    error?: string
}

export type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

export type PendingAction = ReturnType<GenericAsyncThunk[RequestStates.pending]>
export type RejectedAction = ReturnType<GenericAsyncThunk[RequestStates.rejected]>
export type FulfilledAction = ReturnType<GenericAsyncThunk[RequestStates.fulfilled]>

export type Action = PendingAction | RejectedAction | FulfilledAction

function whatAction<stateType extends Action>(state: RequestStates) {
    return (sliceName: SliceNames) => (action: stateType) => action.type.endsWith(state) && action.type.startsWith(sliceName);
}

export const isPendingAction = whatAction<PendingAction>(RequestStates.pending);

export const isFulfilledAction = whatAction<RejectedAction>(RequestStates.fulfilled);

export const isRejectedAction = whatAction<RejectedAction>(RequestStates.rejected);
