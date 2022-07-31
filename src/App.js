import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import Header from './pages/layout/Header';
import Routes from './routes/Routes';
import { Toaster } from 'react-hot-toast';
import Footer from "./pages/layout/Footer";
import useDarkMode from "./hooks/DarkMode";

const App = () => {

  const [theme, toggleTheme] = useDarkMode()

  return (
    <main
      className={`${theme} App`}
    >
      <Toaster />
      <BrowserRouter>
        <Header toggleTheme={e => toggleTheme(e.target.value)} theme={theme} />
        {Routes.map((route, i) => (
          <Route {...route} key={i}  theme={theme}/>
        ))}
        <Footer theme={theme} />
      </BrowserRouter>
    </main >
  );
}
export default App;
