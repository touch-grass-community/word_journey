/* import { useState } from "react"; */
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";

import { DataContextProvider } from "./context/dataContext";

import Homepage from "./pages/HomePage";
import AddWordsPage from "./pages/AddWordsPage";
import YourWordsPage from "./pages/YourWordsPage";
import LearnPage from "./pages/LearnPage";
import QuizPage from "./pages/QuizPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <DataContextProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route index path="/" Component={Homepage} />
              <Route index path="/homepage" Component={Homepage} />
              <Route index path="/add-words" Component={AddWordsPage} />
              <Route path="/your-words" Component={YourWordsPage} />
              <Route path="/learn" Component={LearnPage} />
              <Route path="/quiz" Component={QuizPage} />
              <Route path="/register" Component={RegisterPage} />
              <Route path="/login" Component={LoginPage} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataContextProvider>
    </>
  );
}

export default App;
