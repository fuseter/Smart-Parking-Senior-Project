import React from 'react'
import { BrowserRouter as AppRouter, Route, Switch } from 'react-router-dom'
import { Routes } from './routes'
import VerticalLayout from '../layout/VerticalLayout'
import FullLayout from '../layout/FullLayout'
import Login from '../view/login'
import ProtectedRoute from '../ProtectedRoute'

export default function Router() {
    const DefaultLayout = null
    const Layouts = { VerticalLayout, FullLayout }

    const LayoutRoutesAndPaths = (layout) => {
        const LayoutRoutes = []
        const LayoutPaths = []
        if (Routes) {
            Routes.filter(
                (route) =>
                    (route.layout === layout || DefaultLayout === layout) &&
                    (LayoutRoutes.push(route), LayoutPaths.push(route.path))
            )
        }
        return { LayoutRoutes, LayoutPaths }
    }

    const ResolveRoutes = () => {
        return Object.keys(Layouts).map((layout, index) => {
            const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout)
            const LayoutTag = Layouts[layout]

            return (
                <Route path={LayoutPaths} key={index}>
                    <LayoutTag>
                        <Switch>
                            {LayoutRoutes.map((route) => {
                                return (
                                    <ProtectedRoute
                                        key={route.path}
                                        path={route.path}
                                        exact={route.exact === true}
                                        component={route.component}
                                    />
                                )
                            })}
                        </Switch>
                    </LayoutTag>
                </Route>
            )
        })
    }

    return (
        <AppRouter>
            <Switch>
                {ResolveRoutes()}

                <Route exact path={'/'} render={() => { return <Login /> }} />

                <Route path="*">
                    <div> Page Not Found</div>
                </Route>
            </Switch>
        </AppRouter>
    )
}
