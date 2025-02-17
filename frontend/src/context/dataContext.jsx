import { createContext, useContext, useState } from "react";

const DataContext = createContext();

//* export context for consumers
export const useDataContext = () => useContext(DataContext);

//* export context for provider
export const DataContextProvider = ({ children }) => {
  const serverUrl = import.meta.env.VITE_SERVER_FULL_URL;

  const [allWords, setAllWords] = useState([]);
  const [randomWord, setRandomWord] = useState("");

  const isUserLogged = false;
  const userId = "67b34c9169f87e51a8599ecf";

  /* Fetch Get All Words  */
  const fetchGetAllWords = () => {
    console.log("Fetch all words");

    /*     fetch(`${serverUrl}/api/words`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userId}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setAllWords(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      }); */
  };

  /* Fetch Get A Random Word  */
  const fetchGetRandomWord = () => {
    console.log("Fetch random words");

    /*     
      fetch(`${serverUrl}/api/practice`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userId}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setAllWords(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      }); */
  };

  /* Fetch Login  */
  const fetchLogin = (userForm) => {
    console.log("Login Function", userForm);

    /*     
      fetch(`${serverUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userForm),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setAllWords(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      }); */
  };

  const userLogin = {
    isUserLogged,
    fetchLogin,
  };

  const dataContext = {
    allWords,
    randomWord,
    fetchGetAllWords,
    fetchGetRandomWord,
    userLogin,
  };

  return (
    <DataContext.Provider value={dataContext}>{children}</DataContext.Provider>
  );
};
