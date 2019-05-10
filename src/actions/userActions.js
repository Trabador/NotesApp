import { LOG_USER, LOGOUT_USER }  from './types';

export const logUser = (user) => dispatch => {
    dispatch({
        type: LOG_USER,
        payload: user
    });
}

export const logOutUSer = () => dispatch => {
    dispatch({
        type: LOGOUT_USER
    });
}