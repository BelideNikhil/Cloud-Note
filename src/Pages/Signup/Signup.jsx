import { useState, useReducer } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context";
import { signupErrorActionTypes, signupUserActiontypes } from "../../Context/actionTypes";
import { signupFormValidator } from "../../Utils/SignupValidator";
import { signupErrorReducer, SignupUserReducer } from "../../Reducers";
const { RESET_SIGNUP_ERRORS } = signupErrorActionTypes;
const {
    SET_FIRSTNAME,
    SET_LASTNAME,
    SET_PASSWORD,
    SET_CONFIRM_PASSWORD,
    SET_EMAIL,
    RESET_NEW_USER_DATA,
    SET_AGREE_TO,
} = signupUserActiontypes;
const initialNewUser = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "", agreeTo: false };
const initialSignUpError = {
    firstNameError: "",
    lastNameError: "",
    passwordError: "",
    confirmPasswordError: "",
    agreeToError: "",
};
export function Signup() {
    const [togglePassword, setTogglePassword] = useState({ password: false, confirmPassword: false });
    const [signupErrState, signupErrorDispatch] = useReducer(signupErrorReducer, initialSignUpError);
    const [signupUserState, signupUserDispatch] = useReducer(SignupUserReducer, initialNewUser);
    const { authState, signupHandler } = useAuth();

    function signupFormSubmitHandler(e) {
        e.preventDefault();
        signupErrorDispatch({ type: RESET_SIGNUP_ERRORS, payload: initialSignUpError });
        if (!signupFormValidator(signupUserState, signupErrorDispatch)) {
            signupHandler(signupUserState);
            signupUserDispatch({ type: RESET_NEW_USER_DATA, payload: initialNewUser });
        }
    }
    return (
        <div className="user-form-wrapper">
            <h2 style={{ textAlign: "center" }}>SIGN UP</h2>
            <form className="user-form pa-24" onSubmit={signupFormSubmitHandler}>
                <div className="form-control">
                    <label className="form-label form-input-required" htmlFor="input">
                        First Name
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="input"
                        placeholder="first Name"
                        value={signupUserState.firstName}
                        onChange={(e) =>
                            signupUserDispatch({ type: SET_FIRSTNAME, payload: { value: e.target.value } })
                        }
                    />
                    {signupErrState.firstNameError ? (
                        <div className="form-error">
                            <i className="fas fa-exclamation-circle"></i>
                            {signupErrState.firstNameError}
                        </div>
                    ) : null}
                </div>
                <div className="form-control">
                    <label className="form-label form-input-required" htmlFor="input">
                        Last Name
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="input"
                        placeholder="last Name"
                        value={signupUserState.lastName}
                        onChange={(e) => signupUserDispatch({ type: SET_LASTNAME, payload: { value: e.target.value } })}
                    />
                    {signupErrState.lastNameError ? (
                        <div className="form-error">
                            <i className="fas fa-exclamation-circle"></i>
                            {signupErrState.lastNameError}
                        </div>
                    ) : null}
                </div>
                <div className="form-control">
                    <label className="form-label form-input-required" htmlFor="input">
                        Email Address
                    </label>
                    <input
                        className="form-input"
                        type="email"
                        name="input"
                        placeholder="enter Email"
                        value={signupUserState.email}
                        onChange={(e) => signupUserDispatch({ type: SET_EMAIL, payload: { value: e.target.value } })}
                    />
                    {signupErrState.emailError ? (
                        <div className="form-error">
                            <i className="fas fa-exclamation-circle"></i>
                            {signupErrState.emailError}
                        </div>
                    ) : null}
                </div>
                <div className="form-control">
                    <label className="form-label form-input-required" htmlFor="password">
                        Password
                    </label>
                    <div className="input-toggle-wrapper">
                        <input
                            className="form-input"
                            type={togglePassword.password ? "text" : "password"}
                            name="input"
                            placeholder="enter Password"
                            value={signupUserState.password}
                            onChange={(e) =>
                                signupUserDispatch({ type: SET_PASSWORD, payload: { value: e.target.value } })
                            }
                        />
                        <button
                            type="button"
                            className="btn-icon btn-icon-sm input-toggle-btn"
                            onClick={() => setTogglePassword((prev) => ({ ...prev, password: !prev.password }))}
                        >
                            <i className={togglePassword.password ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                        </button>
                    </div>
                    {signupErrState.passwordError ? (
                        <div className="form-error">
                            <i className="fas fa-exclamation-circle"></i>
                            {signupErrState.passwordError}
                        </div>
                    ) : null}
                </div>
                <div className="form-control">
                    <label className="form-label form-input-required" htmlFor="confirm password">
                        Confirm Password
                    </label>
                    <div className="input-toggle-wrapper">
                        <input
                            className="form-input"
                            type={togglePassword.confirmPassword ? "text" : "password"}
                            name="input"
                            placeholder="Confirm Password"
                            value={signupUserState.confirmPassword}
                            onChange={(e) =>
                                signupUserDispatch({ type: SET_CONFIRM_PASSWORD, payload: { value: e.target.value } })
                            }
                        />
                        <button
                            type="button"
                            className="btn-icon btn-icon-sm input-toggle-btn"
                            onClick={() =>
                                setTogglePassword((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }))
                            }
                        >
                            <i className={togglePassword.confirmPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                        </button>
                    </div>
                    {signupErrState.confirmPasswordError ? (
                        <div className="form-error">
                            <i className="fas fa-exclamation-circle"></i>
                            {signupErrState.confirmPasswordError}
                        </div>
                    ) : null}
                </div>
                <div className="form-control mt-8">
                    <label className="form-label">
                        <input
                            type="checkbox"
                            className="form-input mr-8"
                            checked={signupUserState.agreeTo}
                            onChange={(e) =>
                                signupUserDispatch({ type: SET_AGREE_TO, payload: { value: e.target.checked } })
                            }
                        />
                        I agree to all terms and conditions
                        {signupErrState.agreeToError ? (
                            <div className="form-error">
                                <i className="fas fa-exclamation-circle"></i>
                                {signupErrState.agreeToError}
                            </div>
                        ) : null}
                    </label>
                </div>
                <div className="form-actions mt-24">
                    <button className="btn btn-solid-primary" type="submit">
                        Sign Up
                    </button>
                    {authState.signupError ? (
                        <div className="form-error">
                            <i className="fas fa-exclamation-circle"></i>
                            {authState.signupError}
                        </div>
                    ) : null}
                    <div>
                        <Link to="/login">
                            <button className="primary-accent" style={{ fontWeight: "600", cursor: "pointer" }}>
                                <span>Login Instead? </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
