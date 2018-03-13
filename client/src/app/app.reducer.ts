import { Action, createSelector } from '@ngrx/store';
import { MemoizedSelector } from '@ngrx/store/src/selector';

import { ACTIONS } from './app.actions';
import { AppService, IUser } from './app.service';

export interface IAppState {
  authenticated: boolean;
  data: IUser & { error: string };
}

export const initialState: IAppState = {
  authenticated: false,
  data: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkins: [],
    points: 0,
    error: '',
  }
};

// pure function
export function appReducer(state: any = initialState, action: any) {
  switch (action.type) {

    case ACTIONS.REGISTER_SUCCESS:
    case ACTIONS.LOGIN_SUCCESS:
      return { ...state, authenticated: true, data: { ...state.data, ...action.payload } };

    case ACTIONS.NEEDS_TO_REGISTER:
      return { ...state, data: { ...state.data, ...action.payload } };

    default:
      return state;
  }
}

// selectors for accessing the store
export const selectState = (state: IAppState) => state;
export const selectData: MemoizedSelector<any, any> = createSelector(selectState, (state: IAppState) => state.data);
