import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export function BookListPage() {
  const [books, setBooks] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);

  useEffect(() => {
    setFetchPending(true);
    fetch("https://localhost:5001/Konyv")
      .then((res) => res.json())
      .then((response) => setBooks(response))
      .catch(console.log)
      .finally(() => {
        setFetchPending(false);
      });
  }, []);

  return (
    <div className="p-5 m-auto text-center content bg-ivory">
      {isFetchPending ? (
        <div className="spinner-border"></div>
      ) : (
        <div>
          <h2>Könyvek:</h2>
          <div className="row">
            {books.map((book) => (
              <div key={book.id} className="col-sm-4">
                <NavLink to={"/Konyv/" + book.id} className="text-decoration-none">
                  <div className="card m-1 p-2">
                    <h6 className="text-muted">{book.nev}</h6>
                    <div>
                      <img
                        className="img-fluid"
                        style={{ maxHeight: 200, marginBottom: "10px" }}
                        src={book.kepneve ? book.kepneve : "https://via.placeholder.com/400x800"}
                        alt={book.nev}
                      />
                    </div>
                    <div className="card-body">
                      <div>Kiadás éve: {book.kiadasEve}</div>
                      <div>Értékelés: {book.ertekeles}</div>
                    </div>
                  </div>
                </NavLink>
                <NavLink key={book.id+1} to={"/mod-konyv/" + book.id}>
                        <i className="bi bi-pencil-square mx-1">Módosítás</i>
                    </NavLink>
                    <NavLink key={book.id+2} to={"/del-konyv/" + book.id} className={"text-danger"}>
                        <i className="bi bi-trash3">Törlés</i>
                    </NavLink>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
