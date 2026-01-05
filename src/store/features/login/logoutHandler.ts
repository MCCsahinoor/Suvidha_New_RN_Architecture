import { AppDispatch } from '../../app/store'; // Adjust the path according to your project structure

export const LOGOUT = 'LOGOUT';

export const logoutUser = () => (dispatch: AppDispatch) => {
    dispatch({ type: LOGOUT });
};