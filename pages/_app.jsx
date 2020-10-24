import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useStore } from '../redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import ThemeWrapper from '../layouts/themeWrapper';
import AuthWrapper from '../middleware/auth';
import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading</div>} persistor={persistor}>
        <ThemeWrapper>
          <AuthWrapper>
            <Component {...pageProps} />
          </AuthWrapper>
        </ThemeWrapper>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
