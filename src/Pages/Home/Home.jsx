import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/Home.css";

const Home = () => {
    return (
        <>
    <div className="home-container d-flex align-items-center justify-content-center text-center text-white">
      <div className="overlay"></div>

      <div className="container position-relative z-3">
        <h1 className="display-4 fw-bold mb-3">be konde khone khosh amadid</h1>
        <p className="lead mb-4">
          konian
        </p>
        <button className="btn btn-danger btn-lg shadow">dokme alaki</button>
      </div>
    </div>
    </>
  );
}
 export default Home;
