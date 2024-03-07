import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import "./App.css";
import { BookListPage } from "./bookList";
import { BookCreatePage } from "./BookCreatePage";
import { BookDetailsPage } from "./BookSinglePage";
import { BookModPage } from "./BookModPage";
import { BookDeletePage } from "./BookDeletePage";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={`/konyv`} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} end>
                <span className="nav-link">Könyvek</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/uj-konyv`} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                <span className="nav-link">Új könyv</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/konyv" element={<BookListPage />} />  
        <Route path="/konyv/:konyvId" element={<BookDetailsPage />} />
        <Route path="/uj-konyv" element={<BookCreatePage />} />
        <Route path="/konyv-mod/:konyvId" element={<BookModPage />} />
          <Route path="/del-konyv/:konyvId" element={<BookDeletePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
