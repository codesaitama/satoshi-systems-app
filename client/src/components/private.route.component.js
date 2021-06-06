import { Route, Redirect } from "react-router-dom";
import { accountAuth } from '../tools/utils.js';

function PrivateRoute({ children, ...rest }) {

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