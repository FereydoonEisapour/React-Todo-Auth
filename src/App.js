import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Header from "./pages/layout/Header";
import Routes from "./routes/Routes";
import { Toaster } from "react-hot-toast";
import Footer from "./pages/layout/Footer";
import useDarkMode from "./hooks/DarkMode";
import { getCookie } from "./hooks/cookies";
import { useDispatch } from "react-redux";
import { setActiveUser } from "./features/userSlics";
const App = ({ styleClass }) => {
  const [theme, toggleTheme] = useDarkMode();
  const dispatch = useDispatch()

  React.useEffect(() => {
    const userCookie = getCookie('user')
    if (userCookie !== "") {
      dispatch(setActiveUser({
        userEmail: userCookie
      }))
    }
  }, [dispatch])
  return (
    <main className={`${theme} App p-1`}>
      <Toaster />
      <BrowserRouter>
        <Header
          toggleTheme={(e) => toggleTheme(e.target.value)}
          theme={theme}
        />
        {Routes.map((route, i) => (
          <Route {...route} key={i} theme={theme} />
        ))}
        <Footer theme={theme} />
      </BrowserRouter>
    </main>
  );
};
export default App;
