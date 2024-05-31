import React from 'react';
import Body from './components/Body';
import { Provider } from 'react-redux';
import appReduxStore  from './utils/appReduxStore.js';

function App() {
  return (
    <Provider store={appReduxStore}>
       <Body/>
     </Provider>
  );
}

export default App;
