import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./assets/styles/App.css";
import Header from "./pages/layout/Header";
import Routes from "./routes/Routes";
import { Toaster } from "react-hot-toast";
import Footer from "./pages/layout/Footer";
import { getCookie } from "./hooks/cookies";
import { useDispatch } from "react-redux";
import { setActiveUser } from "./features/userSlics";
const App = () => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    const userCookie = getCookie('user')
    if (userCookie !== "") { dispatch(setActiveUser({ userEmail: userCookie })) }
  }, [dispatch])
  return (
    <main className='App App-container p-1 '>
      <Toaster />
      <BrowserRouter>
        <Header />
        {Routes.map((route, i) => (<Route {...route} key={i} />))}
        <Footer />
      </BrowserRouter>
    </main>
  );
};
export default App;
