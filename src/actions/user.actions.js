import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../history';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
};

// Thunk async actions
function login(username, password) {
    return (dispatch)=> {
        dispatch(requestLogin({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(successLogin(user));
                    history.push('/');
                },
                error => {
                    dispatch(failureLogin(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function requestLogin(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function successLogin(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failureLogin(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return (dispatch) => {
        dispatch(requestRegister(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(successRegister());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failureRegister(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function requestRegister(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function successRegister(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failureRegister(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return (dispatch) => {
        dispatch(requestGetAll());

        userService.getAll()
            .then(
                users => dispatch(successGetAll(users)),
                error => dispatch(failureGetAll(error.toString()))
            );
    };

    function requestGetAll() { return { type: userConstants.GETALL_REQUEST } }
    function successGetAll(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failureGetAll(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return (dispatch) => {
        dispatch(requestDelete(id));

        userService.delete(id)
            .then(
                user => dispatch(successDelete(id)),
                error => dispatch(failureDelete(id, error.toString()))
            );
    };

    function requestDelete(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function successDelete(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failureDelete(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}