import { Action, createSelector } from '@ngrx/store';
import { ACTIONS } from './app.actions';

import { AppService } from './app.service';
import { MemoizedSelector } from '@ngrx/store/src/selector';

const initialState: any = AppService.getInitialState();

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

export const selectState = (state: any) => state;
export const selectData: MemoizedSelector<any, any> = createSelector(selectState, (state: any) => state.data);
