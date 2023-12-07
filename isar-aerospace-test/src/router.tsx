import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageOne from './pages/AssignmentOne/GroundControlOne.container';
import PageTwo from './pages/AssignmentTwo/GroundControlTwo.container';

import Navbar from './components/Navbar/Navbar';


const Application: React.FunctionComponent = () => {
    return (
            <BrowserRouter>
                <Routes>
                    <Route element={<Navbar />}>
                        <Route index element={<PageOne />} />
                        <Route path="assignment-b" element={<PageTwo />} />
                    </Route>
                </Routes>
            </BrowserRouter>
    );
};

export default Application;