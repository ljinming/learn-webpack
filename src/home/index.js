import css from './style/index.less';
import ReactDom from 'react-dom';
import React from 'react';

function App() {
  return <div>hello jsx</div>;
}

ReactDom.render(<App />, document.getElementById('home'));
