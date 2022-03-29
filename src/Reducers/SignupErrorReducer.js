import { signupErrorActionTypes } from "../Context/actionTypes";
const {
    RESET_SIGNUP_ERRORS,
    SET_FIRSTNAME_ERROR,
    SET_LASTNAME_ERROR,
    SET_EMAIL_ERROR,
    SET_CONFIRM_PASSWORD_ERROR,
    SET_PASSWORD_ERROR,
    SET_AGREE_ERROR,
} = signupErrorActionTypes;
export function signupErrorReducer(signupErrState, { type, payload }) {
    switch (type) {
        case SET_FIRSTNAME_ERROR:
            return { ...signupErrState, firstNameError: payload.error };
        case SET_LASTNAME_ERROR:
            return { ...signupErrState, lastNameError: payload.error };
        case SET_EMAIL_ERROR:
            return { ...signupErrState, emailError: payload.error };
        case SET_PASSWORD_ERROR:
            return { ...signupErrState, passwordError: payload.error };
        case SET_CONFIRM_PASSWORD_ERROR:
            return { ...signupErrState, confirmPasswordError: payload.error };
        case SET_AGREE_ERROR:
            return { ...signupErrState, agreeToError: payload.error };
        case RESET_SIGNUP_ERRORS:
            return { ...payload };
        default:
            return signupErrState;
    }
}
