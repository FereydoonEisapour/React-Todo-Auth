import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import Header from './components/layout/Header';
import Routes from './routes/Routes';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div className="App">
      <Toaster />
      <BrowserRouter>
      <Header />
        {Routes.map((route, i) => (
          <Route {...route} key={i} />
        ))}
      </BrowserRouter>
    </div>
  );
}
export default App;
