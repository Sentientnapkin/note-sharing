import React from 'react';
import './styles/App.css';
import router from './router/router';
import {RouterProvider} from "react-router-dom";
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import {Provider} from "react-redux";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={router} />
        </LocalizationProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
