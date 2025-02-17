import { createContext, useContext } from "react";

const DataContext = createContext();

//* export context for consumers
export const useDataContext = () => useContext(DataContext);

//* export context for provider
export const DataContextProvider = ({ children }) => {
  const isLoggedIn = false;

  const userLogin = {
    isLoggedIn,
  };

  const dataContext = {
    userLogin,
  };

  return (
    <DataContext.Provider value={dataContext}>{children}</DataContext.Provider>
  );
};
