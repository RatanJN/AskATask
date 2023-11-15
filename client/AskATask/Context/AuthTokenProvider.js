import { useContext } from 'react';
import { createContext, useState } from 'react';

const AuthTokenContext = createContext();

const AuthTokenProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState('');
  return (
    <AuthTokenContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthTokenContext.Provider>
  );
};
export const useAuthToken = () => useContext(AuthTokenContext);
export default AuthTokenProvider;
