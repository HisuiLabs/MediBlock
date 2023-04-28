import React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import {Registry} from './page/registry';
import {Confirm} from './page/confirmation';
import { Home } from './page/home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/registry" element={<Registry />} />
        <Route path="/confirm" element={<Confirm />} />
      </Routes>
    </div>
  );
}

export default App;
