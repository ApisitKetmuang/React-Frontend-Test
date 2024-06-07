import React from "react";
import { Routes, Route } from "react-router-dom";

import Post from "./pages/Post";
import Draft from "./pages/Draft";
import Edit from "./pages/Edit";
import Create from "./pages/Create";

import { Toaster } from 'react-hot-toast';

const App = () => {
  return (

    <div>
      <Toaster position="top-right" />
      <Routes>
        <Route 
        path="/" element={<Post />}>
        </Route>
        <Route 
        path="/draft" element={<Draft />}>
        </Route>
        <Route 
        path="/create" element={<Create />}>
        </Route>
        <Route 
        path="/edit/:id" element={<Edit />}>
        </Route>
      </Routes>
    </div>
    
  );
};

export default App;
