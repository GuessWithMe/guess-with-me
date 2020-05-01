/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

<script src="http://localhost:8097"></script>;

import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Button} from 'react-native';
import Config from 'react-native-config';
import Hashes from 'jshashes';
import randomString from 'random-string';

import Main from './views/Main';

function sha256base64urlencode(str: string) {
  // https://tools.ietf.org/html/rfc7636#appendix-A
  // https://tools.ietf.org/html/rfc4648#section-5
  return new Hashes.SHA256()
    .b64(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+/g, '');
}

// import ws from './lib/ws';

// https://medium.com/@zachrach/spotify-web-api-authorization-with-react-native-expo-6ee1a290b2b0

const App = () => {
  const [user, setUser] = useState(null);

  const handleMessage = React.useCallback((data) => {
    console.log(data);
  }, []);

  const handleLogin = useCallback(() => {
    const redirect_uri = `${Config.API_URL}/auth/spotify/callback`;
    const response_type = 'code';
    const code_challenge_method = 'S256';

    //  - Protect against other apps who register our application url scheme
    const code_verifier = code_challenge_method && randomString({length: 40});
    const code_challenge =
      code_challenge_method && sha256base64urlencode(code_verifier);

    // Protect against rogue web pages that try redirect the user to authorize (XSRF)
    const state = randomString();

    const params = {
      client_id,
      redirect_uri,
      response_type,
      scope,
      state,
      code_challenge_method,
      code_challenge,
    };
    const authorizationUrl =
      authorization_endpoint + '?' + qs.stringify(params);

    Promise.all([
      AsyncStorage.setItem('code_verifier', code_verifier || ''),
      AsyncStorage.setItem('state', state),
    ])
      .then(() => {
        console.log(authorizationUrl);
        Linking.openURL(authorizationUrl);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  useEffect(() => {
    console.log(process.env.NODE_ENV);

    const ws = new WebSocket('ws://10.0.2.2:8080');
    // setIsConnecting(true);
    ws.onopen = async () => {
      console.warn('open');
      // setIsConnecting(false);
    };
    ws.onmessage = handleMessage;
    ws.onerror = (err) => {
      console.warn('onerror', {err});
      // setIsConnecting(false);
    };

    ws.onclose = () => {
      console.warn('closed');
      // setIsConnecting(false);
    };

    setInterval(() => {
      // ws.send('Test message');
      ws.send(new Int16Array());
    }, 1000);

    return ws.close.bind(ws);
  }, []);

  return (
    <>
      {user ? (
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={styles.safeArea}>
            <Main></Main>
          </SafeAreaView>
        </>
      ) : (
        <Button title="Login" onPress={handleLogin}></Button>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
