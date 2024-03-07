import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

export function BookDeletePage() {
    const navigate = useNavigate();
    const param = useParams();
    const id = param.konyvId;
    const [book, setBook] = useState({});
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        (async () => {
            try {
                const res = await fetch(`https://localhost:5001/Konyv/${id}`, { credentials: 'include' });
                const bookData = await res.json();
                setBook(bookData[0]);
            } catch (error) {
                console.log(error);
            } finally {
                setPending(false);
            }
        })();
    }, [id]);

    return (
        <div className='p-5 m-auto text-center content bg-lavender'>
            {isPending || !book.id ? (
                <div className='spinner-border'></div>
            ) : (
                <div>
                    <h2>Könyv törlése</h2>
                    <div className='card p-3'>
                        <div className='card-body'>
                            <h4>{book.nev}</h4>
                            <p>Kiadás éve: {book.kiadasEve}</p>
                            <p>Értékelés: {book.ertekeles}</p>
                            <img
                                className='img-fluid rounded'
                                style={{ maxHeight: '500px' }}
                                alt='hiányzik a képed innen!'
                                src={book.kepneve ? book.kepneve : 'https://via.placeholder.com/400x800'}
                            />
                        </div>
                        <form
                            onSubmit={async (e) => {
                                try {
                                    e.preventDefault();
                                    await fetch(`https://localhost:5001/Konyv/${id}`, {
                                        method: 'DELETE',
                                        credentials: 'include',
                                    });
                                    navigate('/');
                                } catch (error) {
                                    console.log(error);
                                }
                            }}
                        >
                            <div>
                                <NavLink to={'/'}>
                                    <button className='bi bi-backspace btn btn-warning rounded'>Mégsem</button>
                                </NavLink>
                                <button className='bi bi-trash3 btn btn-danger rounded'>Törlés</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
