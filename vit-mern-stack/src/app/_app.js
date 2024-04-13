// pages/_app.js
import { Provider } from 'react-redux';
import { store } from '../store'; // Adjust the path as per your project structure

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
