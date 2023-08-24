import './styles/App.css';
import "./styles/utilities.css";
import Authentication from './Pages/Authentication';

import { BrowserRouter,Route,Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Authentication />} />
      {/* <Route path="/home" element={<Home/>} />
      <Route path="/search" element={<Search />} />
      <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
       */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
