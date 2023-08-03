import React, { useState } from 'react';
//
import { Layout, Row, Col, Input, Button } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
import GS1Prod from './Production/index';


export default function App() {

  return (
    <Router>
      <Routes>
        
        <Route path="/syncfonia" element={<GS1Prod/>} />
  
      </Routes>

    </Router>
  )
}
