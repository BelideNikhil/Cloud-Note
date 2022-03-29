import { signupErrorActionTypes } from "../Context/actionTypes";

const {
    SET_FIRSTNAME_ERROR,
    SET_LASTNAME_ERROR,
    SET_EMAIL_ERROR,
    SET_CONFIRM_PASSWORD_ERROR,
    SET_PASSWORD_ERROR,
    SET_AGREE_ERROR,
} = signupErrorActionTypes;

export function signupFormValidator(user, signupErrorDispatch) {
    const { firstName, lastName, email, password, confirmPassword, agreeTo } = user;
    let errorFlag = false;
    if (firstName.trim() === "" || !/^[a-zA-Z]+(\s*\w*)*$/.test(firstName)) {
        signupErrorDispatch({ type: SET_FIRSTNAME_ERROR, payload: { error: "Please enter valid First name" } });
        errorFlag = true;
    }
    if (lastName.trim() === "" || !/^[a-zA-Z]+(\s*\w*)*$/.test(lastName)) {
        signupErrorDispatch({ type: SET_LASTNAME_ERROR, payload: { error: "Please enter valid Last name" } });
        errorFlag = true;
    }
    if (email === "" || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        signupErrorDispatch({ type: SET_EMAIL_ERROR, payload: { error: "Please enter valid email id" } });
        errorFlag = true;
    }
    if (password === "" || !/^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,})$/.test(password)) {
        signupErrorDispatch({
            type: SET_PASSWORD_ERROR,
            payload: {
                error: "Password should be 8 char's long & have one Capital letter, one Number, one Symbol.",
            },
        });
        errorFlag = true;
    }
    if (confirmPassword === "" || password !== confirmPassword) {
        signupErrorDispatch({ type: SET_CONFIRM_PASSWORD_ERROR, payload: { error: "Passwords do not match." } });
        errorFlag = true;
    }
    if (!agreeTo) {
        signupErrorDispatch({ type: SET_AGREE_ERROR, payload: { error: "Please agree to T & C." } });
        errorFlag = true;
    }
    return errorFlag;
}
