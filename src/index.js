import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DataProvider } from './context/DataContext';
import reducer, { initialState } from './context/reducer'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Patrick Hand',
      'cursive',
    ].join(','),
  },});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <DataProvider initialState={initialState} reducer={reducer}>
        <App />
      </DataProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
