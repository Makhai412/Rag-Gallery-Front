import React from 'react'
import { useRoutes } from 'react-router-dom'; 
import Chat from '../pages/chat/Chat';
import Visualisation from '../pages/visualisation/Visualisation';
import AboutUs from '../pages/aboutus/AboutUs';

const AppRoutes = () => {
    let routes = useRoutes([
        { path: '/', element: <Chat /> },
        { path: '/aboutus', element: <AboutUs /> },
        //{ path: '/*', element: <NotFound /> }
        { path: '/visualisation', element: <Visualisation /> },
        

    ])

    return routes
}

export default AppRoutes;