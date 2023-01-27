import { detoxesActions } from '../detoxes';
import { selectedDetoxActions } from '../selectedDetox';
import { themeActions } from '../theme';

export const createDetox = detoxesActions.createDetox;
export const deleteDetox = detoxesActions.deleteDetox;
export const newRelapse = detoxesActions.newRelapse;
export const editRelapse = detoxesActions.editRelapse;
export const deleteRelapse = detoxesActions.deleteRelapse;
export const setCurrentStreakStartDate = detoxesActions.setCurrentStreakStartDate;
export const setSelectedDetox = selectedDetoxActions.setSelectedDetox;
export const toggleTheme = themeActions.toggleTheme;
