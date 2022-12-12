import { Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import Index from './components/main/Index';
import TopBar from './components/parcials/TopBar';


  

function App() {
  
  
  return (
    <>
   
      {
        //<Login />
      }
      <TopBar/>
      <Routes>
        <Route exact path="/"
          element={
            <Index/>
          }
        />
      </Routes>
    </>

  );
}

export default App;
