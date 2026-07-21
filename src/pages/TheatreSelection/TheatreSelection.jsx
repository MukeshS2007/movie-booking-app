import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import theatres from "../../data/theatres";
import "./TheatreSelection.css";
import { useNavigate } from "react-router-dom";
function TheatreSelection() {
  const { id } = useParams();
const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <div className="theatre-page">
        <h1>Select Theatre</h1>

        <p>Movie ID: {id}</p>

        {theatres.map((theatre) => (
          <div className="theatre-card" key={theatre.id}>
            <h2>{theatre.name}</h2>

            <p>{theatre.location}</p>

            <div className="timings">
              {theatre.timings.map((time) => (
                <button
    key={time}
    onClick={() =>
        navigate(
            `/seats/${id}/${theatre.id}/${encodeURIComponent(time)}`
        )
    }
>
    {time}
</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TheatreSelection;