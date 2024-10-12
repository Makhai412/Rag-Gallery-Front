import React from 'react'
import { useRoutes } from 'react-router-dom'; 
import Chat from '../pages/Chat';

const AppRoutes = () => {
    let routes = useRoutes([
        { path: '/', element: <Chat /> },
        //{ path: '/aboutus', element: <AboutUs /> },
        //{ path: '/*', element: <NotFound /> }


    ])

    return routes
}

export default AppRoutes;