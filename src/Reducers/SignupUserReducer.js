import { signupUserActiontypes } from "../Context/actionTypes";

const {
    SET_FIRSTNAME,
    SET_LASTNAME,
    SET_PASSWORD,
    SET_CONFIRM_PASSWORD,
    SET_EMAIL,
    SET_AGREE_TO,
    RESET_NEW_USER_DATA,
} = signupUserActiontypes;

export function SignupUserReducer(signupUserState, { type, payload }) {
    switch (type) {
        case SET_FIRSTNAME:
            return { ...signupUserState, firstName: payload.value };
        case SET_LASTNAME:
            return { ...signupUserState, lastName: payload.value };
        case SET_EMAIL:
            return { ...signupUserState, email: payload.value };
        case SET_PASSWORD:
            return { ...signupUserState, password: payload.value };
        case SET_CONFIRM_PASSWORD:
            return { ...signupUserState, confirmPassword: payload.value };
        case SET_AGREE_TO:
            return { ...signupUserState, agreeTo: payload.value };
        case RESET_NEW_USER_DATA:
            return { ...payload };
        default:
            return signupUserState;
    }
}
