import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";

export function BookDetailsPage() {
  const param = useParams();
  const id = param.konyvId;
  const [book, setBook] = useState({});
  const [isFetchPending, setFetchPending] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://localhost:5001/Konyv/${id}`);
        if (!response.ok) {
          throw new Error("A könyv részleteinek lekérése sikertelen.");
        }

        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error(error);
      } finally {
        setFetchPending(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  return (
    <div className="p-5 m-auto text-center content bg-ivory">
      {isFetchPending ? (
        <div className="spinner-border"></div>
      ) : (
        <div>
          <h2>{book.nev}</h2>
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
        </div>
      )}
    </div>
  );
}
