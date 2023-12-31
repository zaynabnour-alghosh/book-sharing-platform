import './styles/App.css';
import "./styles/utilities.css";
import Authentication from './Pages/Authentication';

import { BrowserRouter,Route,Routes } from "react-router-dom";
import BookCard from './Components/BookCard';
import BookContainer from './Components/BooksContainer';
import Home from './Pages/Books';
import NewBook from './Pages/NewBook';
import Feed from './Pages/Feed';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState({
		username: ""
	});
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Authentication user={user} setUser={setUser} />} />
      <Route path="/books" element={<Home/>} />
      <Route path="/new" element={<NewBook/>} />
      <Route path="/feed" element={<Feed/>} />

      {/* <Route path="/home" element={<Home/>} />
      <Route path="/search" element={<Search />} />
      <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
       */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
