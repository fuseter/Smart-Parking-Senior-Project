import React, { Suspense } from 'react'
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => (
                <Suspense fallback={null}>
                    <Component {...props} />
                </Suspense>
            )}
        />
    )
}

export default PublicRoute
