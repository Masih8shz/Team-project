import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/Home.css";
import { useEffect, useState } from "react";

const Home = () => {
  // لیست ۱۵ تصویر
  const heroes = [
    { name: "Phantom Assassin", img: "/heroes/pa.jpg", text: "Kabos support ha va back lane." },
    { name: "Invoker", img: "/heroes/invoker.jpg", text: "Bayad aval piano yad begiri." },
    { name: "Lina", img: "/heroes/lina.jpg", text: "Fire lady az jahan e flame." },
    { name: "Juggernaut", img: "/heroes/juggernaut.jpg", text: "Bepich to spin ta hame bemiran." },
    { name: "Drow Ranger", img: "/heroes/drow.jpg", text: "Kasi seda nemishe beshne." },
    { name: "Crystal Maiden", img: "/heroes/cm.jpg", text: "Ma mage support haro dust darim." },
    { name: "Anti Mage", img: "/heroes/am.jpg", text: "Mana destroy mikonam!" },
    { name: "Pudge", img: "/heroes/pudge.jpg", text: "Hook kon ya bemir!" },
    { name: "Sven", img: "/heroes/sven.jpg", text: "Storm hammer be saret!" },
    { name: "Tinker", img: "/heroes/tinker.jpg", text: "Rearm hamishe!" },
    { name: "Shadow Fiend", img: "/heroes/sf.jpg", text: "Soul ezafe kardam." },
    { name: "Legion Commander", img: "/heroes/lc.jpg", text: "Duel mikonim!" },
    { name: "Axe", img: "/heroes/axe.jpg", text: "Axe likes battle!" },
    { name: "Sniper", img: "/heroes/sniper.jpg", text: "Headshot ro faramos nakon." },
    { name: "Queen of Pain", img: "/heroes/qop.jpg", text: "Scream of pain!" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // هر ۵ ثانیه تغییر بده
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 3) % heroes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroes.length]);

  // سه تصویر فعلی
  const visibleHeroes = heroes.slice(currentIndex, currentIndex + 3);
  if (visibleHeroes.length < 3) {
    visibleHeroes.push(...heroes.slice(0, 3 - visibleHeroes.length));
  }

  return (
    <div className="home-page">
      {/* ===== HERO SECTION ===== */}
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

      {/* ===== HEROES SECTION ===== */}
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

      {/* ===== TOURNAMENT SECTION ===== */}
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