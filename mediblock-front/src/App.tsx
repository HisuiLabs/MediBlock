import React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import {Registry} from './page/registry';
import {Confirm} from './page/confirmation';

function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="border border-gray-400 rounded-2xl p-2 m-2 flex justify-around items-center">
          <h1 className="text-3xl font-bold">TOP PAGE</h1>
        </div>
        <div>
        <Link to="/registry">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            登録
            </button>
          </Link>
          <br />
          <Link to="/confirm">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              確認
            </button>
          </Link>
        </div>
        <Routes>
          <Route path="/registry" element={<Registry />} />
          <Route path="/confirm" element={<Confirm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
