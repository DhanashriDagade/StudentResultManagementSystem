import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import dhanashri from "../assets/dhanashridagade.jpeg";
import sundnyan from "../assets/sundnyan.jpeg";
import priyanka from "../assets/priyanka.jpeg";

export default function AboutUs() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const teamMembers = [
    {
      name: "Sundnyan Pal",
      role: "Frontend Developer",
      description:
        "Expert in React, Vite, and building modern UIs with Bootstrap and responsive design.",
      image: sundnyan,
    },
    {
      name: "Dhanashri Dagade",
      role: "Backend Developer",
      description:
        "Specializes .net, REST APIs, database design, and secure authentication.",
      image: dhanashri,
    },
    {
      name: "Priyanka Mandade",
      role: "UI/UX Designer",
      description:
        "Focused on intuitive UX, wireframes, and modern design aesthetics for seamless user experience.",
      image: priyanka,
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        className="hero-section d-flex align-items-center text-white"
        style={{
          backgroundImage:
            'url("https://www.teachermagazine.com/assets/images/teacher/Photo-story-QLD-Yeronga-State-School.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          minHeight: "60vh",
        }}
      >
        <div className="container text-center" data-aos="fade-down">
          <h1 className="display-4 fw-bold" style={{ color: "black" }}>
            About Edusphere
          </h1>
          <p className="lead mt-3 fw-bold text-dark">
           "Empowering Students for a Brighter Tomorrow."
          </p>
        </div>
      </section>
{/* Mission & Vision */}
<section className="py-5 bg-light">
  <div className="container">
    <div className="row text-center">
      <div className="col-md-6" data-aos="fade-right">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2721/2721286.png"
          alt="Mission"
          style={{ width: "80px" }}
        />
        <h3 className="mt-3">Our Mission</h3>
        <p>
          To provide a nurturing environment that encourages curiosity, creativity,
          and a lifelong love of learning. We aim to develop responsible, confident,
          and well-rounded individuals.
        </p>
      </div>
      <div className="col-md-6" data-aos="fade-left">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
          alt="Vision"
          style={{ width: "80px" }}
        />
        <h3 className="mt-3">Our Vision</h3>
        <p>
          To be a leading institution that empowers students with knowledge, values,
          and skills to thrive in a rapidly changing world and become global citizens.
        </p>
      </div>
    </div>
  </div>
</section>
{/* Core Features */}
<section className="py-5">
  <div className="container text-center">
    <h2 className="mb-5" data-aos="fade-down">
      What Makes Our School Special
    </h2>
    <div className="row">
      <div className="col-md-4 mb-4" data-aos="zoom-in">
        <i className="bi bi-book-half fs-1 text-primary"></i>
        <h5 className="mt-3">Holistic Learning</h5>
        <p>
          We focus on academic excellence along with character building,
          creativity, and critical thinking for well-rounded development.
        </p>
      </div>
      <div className="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay="200">
        <i className="bi bi-people fs-1 text-warning"></i>
        <h5 className="mt-3">Inclusive Community</h5>
        <p>
          A supportive and inclusive environment where every student feels
          valued, heard, and motivated to achieve their full potential.
        </p>
      </div>
      <div className="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay="400">
        <i className="bi bi-mortarboard fs-1 text-success"></i>
        <h5 className="mt-3">Future-Ready Education</h5>
        <p>
          Integrating modern technology and innovative teaching methods to
          prepare students for tomorrow’s challenges and opportunities.
        </p>
      </div>
    </div>
  </div>



        <section
          className="py-5 bg-secondary text-white text-center"
          data-aos="fade-up"
        >
          <p className="mt-2">
            Driven by innovation and passion, our team crafts powerful project
            management solutions that transform how work gets done. We believe
            every project deserves clarity, collaboration, and control — so we
            build tools that inspire productivity, spark teamwork, and make
            deadlines feel effortless. From seamless task tracking to real-time
            insights, our platform empowers teams to break down barriers,
            unleash creativity, and deliver outstanding results — because great
            projects start with great people and the right technology.
          </p>
        </section>
      </section>

      {/* Meet the Team */}
      <section className="py-5 bg-light" data-aos="fade-up">
        <div className="container text-center">
          <h2 className="mb-5">Meet Our Team</h2>
          <div className="row justify-content-center">
            {teamMembers.map((member, index) => (
              <div
                className="col-md-4 mb-4"
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 200}
              >
                <div
                  className="card h-100 shadow border-0 rounded-4"
                  style={{
                    transition:
                      "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 20px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 10px rgba(0,0,0,0.1)";
                  }}
                >
                  <div className="d-flex justify-content-center mt-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        border: "4px solid #0d6efd",
                        boxShadow:
                          "0 4px 8px rgba(13, 110, 253, 0.3)",
                      }}
                    />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold">{member.name}</h5>
                    <p
                      className="text-primary fst-italic mb-2"
                      style={{ fontWeight: "600" }}
                    >
                      {member.role}
                    </p>
                    <p className="card-text fst-italic text-secondary">
                      {member.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
