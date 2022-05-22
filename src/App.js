import './App.css';
import Navbar from "./components/Navbar";
import React, { useState } from 'react';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"

const App = () => {
  const ps = 12;
  const apiKey = 'd8344f148be2417e837ab60a95d03be9'


  const [progress, setProgress] = useState(0)


    return (
      <div>
        <Router>
          <Navbar></Navbar>
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <Routes>
            <Route exact path='/' element={<News setProgress={setProgress} apiKey={apiKey} key='general' pagesize={ps} country="in" category="general"></News>} />
            <Route exact path='/general' element={<News setProgress={setProgress} apiKey={apiKey} key='general' pagesize={ps} country="in" category="general"></News>} />
            <Route exact path='/business' element={<News setProgress={setProgress} apiKey={apiKey} key='business' pagesize={ps} country="in" category="business"></News>} />
            <Route exact path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key='entertainment' pagesize={ps} country="in" category="entertainment"></News>} />
            <Route exact path='/health' element={<News setProgress={setProgress} apiKey={apiKey} key='health' pagesize={ps} country="in" category="health"></News>} />
            <Route exact path='/science' element={<News setProgress={setProgress} apiKey={apiKey} key='science' pagesize={ps} country="in" category="science"></News>} />
            <Route exact path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} key='sports' pagesize={ps} country="in" category="sports"></News>} />
            <Route exact path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} key='technology' pagesize={ps} country="in" category="technology"></News>} />
          </Routes>
        </Router>
      </div>
    )
}

export default App