import React, { Suspense } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                Cookies.get('access-token') ? (
                    <Suspense fallback={null}>
                        <Component {...props} />
                    </Suspense>
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    )
}

export default ProtectedRoute
