import './App.css';
import Login from './components/Login';
import Main from './components/Main';
import AuthenticationSection from "./components/AuthenticationSection";

function App() {
  return (
    <div className="App">
        <AuthenticationSection/>
        <Main />
    </div>
  );
}

export default App;
