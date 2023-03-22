import { Routes, Route } from 'react-router-dom';
import Index from "./components/main/Index";
import PeopleRegister from './components/main/PeopleRegister';
import UsersRegister from './components/main/UsersRegister';
import { useState } from 'react';

function App() {
  const [person, setPerson] = useState();

  return (
    <Routes>

      <Route
        exact
        path='/'
        element={
          <Index />
        }
      />

      <Route
        path='/peopleRegister'
        element={
          <PeopleRegister setPerson={setPerson} />
        }
      />

      <Route
        path='/usersRegister'
        element={
          <UsersRegister person={person} />
        }
      />

    </Routes>

  );
}

export default App;
