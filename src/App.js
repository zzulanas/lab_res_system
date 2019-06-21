import React from 'react';
import Search from './components/Search'
import Helmet from 'react-helmet';
import 'bulma';

function App(){
    return (
      <div className="container">
      <Helmet>
        <style>{'body { background: linear-gradient(335deg, #00d2ff 0%, #3a47d5 100%)}'}</style>
      </Helmet>
        <Search/>
      </div>
    );
}

export default App;
