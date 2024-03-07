import { useNavigate } from "react-router-dom";

export function BookCreatePage() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:5001/Konyv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nev: e.target.elements.name.value,
          kiadasEve: parseInt(e.target.elements.year.value),
          ertekeles: parseInt(e.target.elements.rating.value),
          kepneve: e.target.elements.imageName.value,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/");
      } else {
        console.error("Sikertelen küldés:", data);
      }
    } catch (error) {
      console.error("Hiba:", error);
    }
  };

  return (
    <div className="p-5 content bg-whitesmoke text-center">
      <h2>Új könyv</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Név:</label>
          <div className="col-sm-9">
            <input type="text" name="name" className="form-control" />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Kiadás éve:</label>
          <div className="col-sm-9">
            <input type="number" name="year" className="form-control" />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Értékelés:</label>
          <div className="col-sm-9">
            <input type="number" name="rating" className="form-control" />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Kép neve:</label>
          <div className="col-sm-9">
            <input type="text" name="imageName" className="form-control" />
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          Küldés
        </button>
      </form>
    </div>
  );
}
