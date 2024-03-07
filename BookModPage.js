import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function BookModPage() {
    const param = useParams();
    const navigate = useNavigate();
    const id = param.konyvId;
    const [, setBook] = useState([]);
    const [bookName, setBookName] = useState("");
    const [publicationYear, setPublicationYear] = useState(0);
    const [rating, setRating] = useState(0);
    const [imageFileName, setImageFileName] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`https://localhost:5001/Konyv/${id}`, { credentials: "include" });
                const bookData = await res.json();
                setBook(bookData);
                setBookName(bookData.nev);
                setPublicationYear(bookData.kiadasEve);
                setRating(bookData.ertekeles);
                setImageFileName(bookData.kepneve);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id, bookName, publicationYear, rating, imageFileName]);

    const updateBook = (e) => {
        e.preventDefault();
        fetch(`https://localhost:5001/Konyv/${id}`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify({
                nev: e.target.elements.bookName.value,
                kiadasEve: parseInt(e.target.elements.publicationYear.value),
                ertekeles: parseInt(e.target.elements.rating.value),
                kepneve: e.target.elements.imageFileName.value,
            }),
        })
            .then(() => {
                navigate("/");
            })
            .catch(console.log);
    };

    return (
        <div className='p-5 content bg-lavender text-center'>
            <h2>Könyv módosítás</h2>
            <form onSubmit={updateBook}>
                <div className='form-group row pb-3'>
                    <div>
                        <label htmlFor="bookName" className='col-sm-3 col-form-label'> Név: </label>
                        <input type="text" id="bookName" name="bookName" className="form-control" defaultValue={bookName} onChange={(e) => setBookName(e.target.value)} autoComplete="off"/>
                    </div>
                </div>
                <div className='form-group row pb-3'>
                    <div>
                        <label htmlFor="publicationYear" className='col-sm-3 col-form-label'> Kiadás éve: </label>
                        <input type="number" id="publicationYear" name="publicationYear" className="form-control" defaultValue={publicationYear} onChange={(e) => setPublicationYear(e.target.value)} autoComplete="off"/>
                    </div>
                </div>
                <div className='form-group row pb-3'>
                    <div>
                        <label htmlFor="rating" className='col-sm-3 col-form-label'> Értékelés: </label>
                        <input type="number" id="rating" name="rating" className="form-control" defaultValue={rating} onChange={(e) => setRating(e.target.value)} autoComplete="off" />
                    </div>
                </div>
                <div className='form-group row pb-3'>
                    <div>
                        <label htmlFor="imageFileName" className='col-sm-3 col-form-label'> Kép fájl neve: </label>
                        <input type="text" id="imageFileName" name="imageFileName" className="form-control" defaultValue={imageFileName} onChange={(e) => setImageFileName(e.target.value)} autoComplete="off" />
                    </div>
                </div>
                <button type="submit" className='btn btn-success'>Küldés</button>
            </form>
        </div>
    );
}
