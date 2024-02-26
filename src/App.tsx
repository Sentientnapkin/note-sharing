import React from 'react';
import './styles/App.css';
import router from './router/router';
import {RouterProvider} from "react-router-dom";
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import {Provider} from "react-redux";


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
