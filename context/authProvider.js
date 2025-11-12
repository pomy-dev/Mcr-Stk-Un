import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '../env';

export const AuthContext = createContext();

const auth0Config = {
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
};

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      const userInfo = await AsyncStorage.getItem('user');
      if (token && userInfo) {
        setAccessToken(token);
        setUser(JSON.parse(userInfo));
      }
      setLoading(false);
    };
    loadSession();
  }, []);

  const socialLogin = async (connection) => {
    try {
      const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

      const authUrl = `https://${auth0Config.domain}/authorize?` +
        `client_id=${auth0Config.clientId}` +
        `&response_type=token` +
        `&connection=${connection}` +
        `&scope=openid profile email` +
        `&redirect_uri=${redirectUri}`;

      const result = await AuthSession.startAsync({
        authUrl,
        returnUrl: redirectUri
      });

      if (result.type === 'success') {
        const decodedToken = jwtDecode(result.params.id_token);

        setAccessToken(result.params.access_token);
        setUser(decodedToken);

        await AsyncStorage.setItem('accessToken', result.params.access_token);
        await AsyncStorage.setItem('user', JSON.stringify(decodedToken));

        return result;
      }
    } catch (error) {
      console.error(`Social login (${connection}) failed:`, error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await WebBrowser.openAuthSessionAsync(
        `https://${auth0Config.domain}/v2/logout?client_id=${auth0Config.clientId}`,
        'exp://localhost:19000'
      );

      setAccessToken(null);
      setUser(null);
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const value = { socialLogin, logout, accessToken, user, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};