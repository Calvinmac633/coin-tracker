import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, {Component} from 'react';
import Header from "./Components/Header";
import Homepage from "./Pages/Homepage";
import Coinpage from "./Pages/Coinpage";

//Styling: https://mui.com/material-ui/getting-started/usage/
//Browser Router: https://v5.reactrouter.com/web/api/BrowserRouter

// heroku + firebase
//https://medium.com/swlh/walkthrough-deploying-an-app-with-heroku-and-firebase-bonus-connecting-a-custom-domain-adb9f4f37e06

//to push
//git push -u origin main

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className='app'>
                <Header/>
                <Routes>
                    <Route exact path="/" element={<Homepage/>} />
                    <Route exact path="/coin/:id" element={<Coinpage/>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
