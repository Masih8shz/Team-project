import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/Home.css";
import "../../Styles/Items.css";
import heroes from "../../data/heroes.json"; 
import { useEffect, useState } from "react";

const Home = () => {
 
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 3) % heroes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroes.length]);

  const visibleHeroes = heroes.slice(currentIndex, currentIndex + 3);
  if (visibleHeroes.length < 3) {
    visibleHeroes.push(...heroes.slice(0, 3 - visibleHeroes.length));
  }

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
          <div className="row justify-content-center fade-slider">
            {visibleHeroes.map((hero, index) => (
              <div key={index} className="col-md-4 mb-4 fade-slide">
                <div className="card hero-card">
                  <img src={hero.img} className="card-img-top" alt={hero.name} />
                  <div className="card-body">
                    <h5 className="card-title">{hero.name}</h5>
                    <p className="card-text">{hero.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

   
      <section className="items-section py-5">
        <div className="container text-center">
          <h2 className="section-title mb-5">Items</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="item-card">
                <img src="/imgs/aa.jpg" alt="Black King Bar" className="item-img" />
                <div className="item-info">
                  <h5>Black King Bar</h5>
                  <p>dispel mikone.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="item-card">
                <img src="/imgs/am.jpg" alt="Butterfly" className="item-img" />
                <div className="item-info">
                  <h5>Butterfly</h5>
                  <p>miss mide.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="item-card">
                <img src="/imgs/void.jpg" alt="Heart of Tarrasque" className="item-img" />
                <div className="item-info">
                  <h5>Heart of Tarrasque</h5>
                  <p>jon mide.</p>
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
                <img src="/ring.jpg" className="card-img-top" alt="Tournament" />
                <div className="card-body">
                  <h5 className="card-title">International</h5>
                  <p className="card-text">mosabeghe alaki pol midan.</p>
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