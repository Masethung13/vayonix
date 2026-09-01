import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Abt from './components/Abt';
import Services from './components/Services';
import Whatwedo from './components/Whatwedo';
import Workingprocess from './components/Workingprocess';
import Whychooseus from './components/Whychooseus';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Abt />
      <Services />
      <Whatwedo />
      <Workingprocess />
      <Whychooseus />
      <Footer />
    </div>
  );
}

export default App;
