import {
    CombinedState,
    Reducer,
    ReducersMapObject, configureStore, getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { api } from 'shared/api/api';
import { NavigateFunction } from 'react-router-dom';
import { userReducer } from 'entities/User';
import { infoReducer } from 'entities/Info';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';

export const createReduxStore = (
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    navigate?: NavigateFunction,
) => {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        info: infoReducer,
    };

    const ReducerManager = createReducerManager(rootReducers);

    const extraArgument: ThunkExtraArg = {
        api,
        navigate,
    };

    const store = configureStore({
        reducer: ReducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: { extraArgument },
        }),
    });

    // @ts-ignore
    store.ReducerManager = ReducerManager;

    return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
