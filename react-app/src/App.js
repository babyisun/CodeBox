import React, { Component } from 'react';
// import Mock from 'mockjs';
import './mock'
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import './css/a.scss';

class App extends Component {
  /* constructor() {
    super();
    // console.log('object :', process.env.NODE_ENV);
  } */
  componentWillMount() {
    console.log(axios.defaults);


    // console.log(JSON.stringify(data, null, 4))
    var instance = axios.create({
      baseURL: 'https://api.example.com',
      transformResponse: [(data) => {
        // 对 data 进行任意转换处理
        //var rdata=data.data;
        // console.log('object :', data);
        return data;
      }],
    });
    instance.interceptors.response.use((response) => {
      return response;
    }, (error) => {
      console.log('object :', error);
      if (401 === error.response.status) {
        window.location = '/login';
      } else {
        return Promise.reject(error);
      }
    });

    instance.get("/test").then(res => {
      console.log(res);
    })

    fetch('/test') // 返回一个Promise对象
      .then((res) => {
        console.log(res);
      })

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src='./Dollar.png' alt=""/>
          <h1 className="App-title">Welcome to React!!</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div><i className="iconfont icon-CI"></i></div>
      </div>
    );
  }

  componentDidMount() { }
}

export default App;
