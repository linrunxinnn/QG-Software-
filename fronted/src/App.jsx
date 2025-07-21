
import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Header from './component/Header/Header';
import Home from './pages/home/home';
import './App.css';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <Header />  
        <Home />
      </div>
    </ConfigProvider>
  );
}

export default App;