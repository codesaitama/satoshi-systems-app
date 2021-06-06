import { Route, Redirect, useLocation } from "react-router-dom";
import { accountAuth } from '../tools/utils.js';

function PrivateRoute({ children, ...rest }) {
    //const {state} = useLocation();

    return (
        <Route {...rest} render={({ location }) => {
            return accountAuth.isAuthenticated
                ?
                children
                :
                <Redirect to={{
                    pathname: '/sign-in',
                    state: { from: location }
                }} />
        }} />
    )
}

export default PrivateRoute;