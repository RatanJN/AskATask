import { useContext } from "react";
import { createContext, useState } from "react";

const RefreshContext = createContext();

const RefreshProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);
  return (
    <RefreshContext.Provider value={{ refresh, setRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};
export const useRefresh = () => useContext(RefreshContext);

export default RefreshProvider;
