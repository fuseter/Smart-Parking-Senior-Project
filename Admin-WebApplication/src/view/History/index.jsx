import React from 'react'

import Table from './Table'

export default function Contact() {
    return (
        <Table />
        // <Switch>
        //   <Route exact path="/apps/contact">
        //     <Table />
        //   </Route>

        //   {
        //     !selectedUser ? (
        //       <Redirect to="/apps/contact" />
        //     ) : (
        //       <Route path="/apps/contact/contact-detail/:id">
        //         <Detail selectedUser={selectedUser} />
        //       </Route>
        //     )
        //   }
        // </Switch>
    )
}
