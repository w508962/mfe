import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthState } from '@yeti/models';

const AUTH_KEY = 'auth';

export const selectAuthState = createFeatureSelector<IAuthState>(AUTH_KEY);

export const selectUserOrgGroup = createSelector(
	selectAuthState,
	(state: IAuthState) => state.orgGroup
);
