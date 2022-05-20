import './App.css';
import Navbar from "./components/Navbar";
import React, { Component } from 'react';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"

export default class App extends Component {
  ps = 12;

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({progress: progress})
  }


  render() {
    return (
      <div>
        <Router>
          <Navbar></Navbar>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path='/General' element={<News setProgress={this.setProgress}  key='general' pagesize={this.ps} country="in" category="general"></News>} />
            <Route exact path='/Business' element={<News setProgress={this.setProgress}  key='business' pagesize={this.ps} country="in" category="business"></News>} />
            <Route exact path='/Entertainment' element={<News setProgress={this.setProgress}  key='entertainment' pagesize={this.ps} country="in" category="entertainment"></News>} />
            <Route exact path='/Health' element={<News setProgress={this.setProgress}  key='health' pagesize={this.ps} country="in" category="health"></News>} />
            <Route exact path='/Science' element={<News setProgress={this.setProgress}  key='science' pagesize={this.ps} country="in" category="science"></News>} />
            <Route exact path='/Sports' element={<News setProgress={this.setProgress}  key='sports' pagesize={this.ps} country="in" category="sports"></News>} />
            <Route exact path='/Technology' element={<News setProgress={this.setProgress}  key='technology' pagesize={this.ps} country="in" category="technology"></News>} />
          </Routes>
        </Router>
      </div>
    )
  }
}

