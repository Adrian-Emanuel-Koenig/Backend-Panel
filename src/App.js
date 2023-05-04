import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import NotFound from "./pages/NotFound";
import Layout from "./components/Navbar";
import Orders from "./pages/Orders";
import Support from "./pages/Support";

function App() {
  return (

    <div className="App">
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route path="/" element={<Home/>}/>
              <Route path="productos" element={<Productos/>}/>
              <Route path="orders" element={<Orders/>}/>
              <Route path="soporte" element={<Support/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Route>
          </Routes>
    </div>
  );
}

export default App;
