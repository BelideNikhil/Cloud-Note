import "./NotFound.css";
import { Link } from "react-router-dom";
export function NotFound() {
    return (
        <div className="not-found-wrapper flex-clmn-center-center">
            <h3 className="mb-12">Oops!</h3>
            <h2 className="mb-12">Looks like you lost your way.</h2>
            <Link to="/home">
                <button className="btn btn-solid-primary">Go Back Home</button>
            </Link>
        </div>
    );
}
