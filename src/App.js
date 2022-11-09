import './App.css';
import Blog from './components/Blog';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Singlepage } from './components/Singlepage';
import { Infinit } from './components/Infi';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" >
        <Route index element={<Blog/>} />
        <Route path="blog/:slug" element={< Singlepage/>} />
        <Route path="infinite" element={<Infinit/>}/>
        <Route path ="/:uid" element={<Blog/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
