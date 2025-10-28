import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/Home.css";

const Home = () => {
  return (
    <div className="home-page">
    
      <section
  className="hero-section text-white d-flex align-items-center"
  style={{
    backgroundImage: "url('/lina.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
  }}
>

  <div className="container text-center">
    <div className="info-box mx-auto p-4 p-md-6">
      <h1 className="hero-title mb-3">welcome to dota</h1>
      <p className="hero-description mb-4">
  never dont play dota to if u wand play first drink vodka and play dota
      </p>
      <div className="hero-buttons">
        <button className="btn btn-primary me-3">Heroes</button>
        <button className="btn btn-outline-light">tornoments</button>
      </div>
    </div>
  </div>
  
</section>

     
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="section-title mb-5">Heroes</h2>
          <div className="row justify-content-center">
            <div className="col-md-4 mb-4">
              <div className="card hero-card">
                <img
                  src="/dotawallpapers.com-wei-the-anti-mage-from-dota-2-3d-image-3840x2160 (1).jpg"
                  className="card-img-top"
                  alt="Hero 1"
                />
                <div className="card-body">
                  <h5 className="card-title">Phantom Assassin</h5>
                  <p className="card-text">
                    kabos suport ha va back lane.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card hero-card">
                <img
                  src="/lina2.jpg"
                  className="card-img-top"
                  alt="Hero 2"
                />
                <div className="card-body">
                  <h5 className="card-title">Invoker</h5>
                  <p className="card-text">
                    bayad aval piano yad begiri.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <section className="py-5">
        <div className="container text-center">
          <h2 className="section-title mb-5">Tournaments</h2>
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="card tournament-card">
                <img
                  src="/ring.jpg"
                  className="card-img-top"
                  alt="Tournament"
                />
                <div className="card-body">
                  <h5 className="card-title">International</h5>
                  <p className="card-text">
                    mosabeghe alaki pol midan.
                  </p>
                  <button className="btn btn-primary">View Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;