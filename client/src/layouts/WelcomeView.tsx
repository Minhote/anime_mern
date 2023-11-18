import { Header, Main } from "../components";
import "../styles/Welcome.css";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Main>
        <div className="welcome">
          <h2 className="welcome__title">Bienvenido</h2>
          <p className="welcome__para">
            Una app en la que puedes organizar y tener un seguimiento de los
            animes que has visto, deseas ver y ya has completado
          </p>
          <div className="welcome__actions">
            <button
              className="welcome__actions__sign_up"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
            <button
              className="welcome__actions__log_in"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          </div>
        </div>
      </Main>
    </>
  );
}
