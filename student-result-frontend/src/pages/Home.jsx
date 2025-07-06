import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const heroBg = "https://www.teacherhorizons.com/static/mediav2/schools/2426/images/824534_main.jpg";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const features = [
    {
      icon: "💡",
      title: "Innovative Teaching Methods",
      description: "Empowering students through modern, interactive techniques.",
    },
    {
      icon: "👥",
      title: "Experienced Faculty",
      description: "Teachers who foster an environment of academic and personal success.",
    },
    {
      icon: "🏢",
      title: "Modern Infrastructure",
      description: "State-of-the-art learning environment and digital tools.",
    },
    {
      icon: "➕",
      title: "Personalized Attention",
      description: "Tailored learning for every student's unique needs.",
    },
    {
      icon: "🏆",
      title: "Extracurricular Excellence",
      description: "A range of activities to support holistic development.",
    },
  ];

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero Section */}
      <div
        className="text-white d-flex align-items-center hero-section"
        data-aos="fade-up"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "70vh",
          padding: "3rem 2rem",
        }}
      >
        <div className="container text-center text-dark bg-white bg-opacity-75 rounded p-4">
          <h1 className="fw-bold display-5">Welcome to EduSphere</h1>
          <p className="lead">Nurturing brilliance through innovation and care</p>
        </div>
      </div>

      {/* Features Section */}
      <div className="container my-5" data-aos="fade-up">
        <h2 className="text-center mb-4">Why Choose Our School</h2>
        <div className="row g-4 justify-content-center">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="col-lg-4 col-md-6 col-12"
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
            >
              <div className="card h-100 shadow-sm text-center p-4">
                <div style={{ fontSize: "2.5rem", color: "#003366" }}>{feature.icon}</div>
                <h5 className="card-title fw-bold">{feature.title}</h5>
                <p className="card-text">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ backgroundColor: "#173e93", padding: "40px 0" }} data-aos="fade-up">
        <div className="container text-white text-center">
          <div className="row">
            {[
              { icon: "fa-graduation-cap", label: "Students", count: "2000+" },
              { icon: "fa-award", label: "Years of Excellence", count: "25+" },
              { icon: "fa-clock", label: "Digital Lab", count: "10+" },
              { icon: "fa-users", label: "Expert Faculty", count: "150+" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="col-md-3 col-6 mb-4"
                data-aos="fade-up"
                data-aos-delay={100 * idx}
              >
                <i className={`fas ${stat.icon} fa-2x mb-2`} style={{ color: "#f1c40f" }}></i>
                <h3 className="fw-bold">{stat.count}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Parent Reviews Section */}
      <div className="container my-5" data-aos="fade-up">
        <h2 className="text-center mb-4">What Parents Say</h2>
        <div className="row g-4">
          {[
            {
              name: "Mrs. Anjali Sharma",
              child: "Grade 6",
              quote: "Positive growth with a personal approach by teachers.",
            },
            {
              name: "Mr. Rajesh Verma",
              child: "Grade 9",
              quote: "My daughter is confident and happy thanks to this school.",
            },
            {
              name: "Mrs. Sneha Patil",
              child: "Grade 4",
              quote: "Innovative teaching + great environment = success!",
            },
          ].map((review, idx) => (
            <div
              key={idx}
              className="col-md-4"
              data-aos={idx === 0 ? "fade-right" : idx === 2 ? "fade-left" : "fade-up"}
            >
              <div className="card h-100 shadow-sm p-3 border-0">
                <h6 className="fw-bold">{review.name}</h6>
                <p className="text-muted mb-2">Parent of {review.child} Student</p>
                <p>“{review.quote}”</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
