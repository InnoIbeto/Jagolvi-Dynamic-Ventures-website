import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => observer.observe(reveal));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="container-fluid p-0 fade-in">
      {/* Hero Section */}
      <div className="about-row-1 section-padding text-center text-white mb-0" style={{ borderRadius: '0' }}>
        <div className="container">
          <div className="row reveal">
            <div className="col-lg-8 mx-auto">
              <h2 className="display-4 fw-bold mb-4">Our Legacy of Excellence</h2>
              <p className="fs-5 opacity-90 mb-4 leading-relaxed">
                Jagolvi Dynamic Ventures (JDV) stands at the forefront of Nigeria's heavy-duty logistics infrastructure.
                We are the bridge between world-class engineering and local operational efficiency.
              </p>
              <div className="fst-italic fs-4 text-primary">"Precision. Performance. Provenance."</div>
            </div>
          </div>
        </div>
      </div>

      {/* Expertise Section */}
      <div className="bg-white section-padding">
        <div className="container">
          <div className="row gy-5 align-items-center">
            <div className="col-lg-6 reveal">
              <div className="pe-lg-5">
                <h2 className="display-5 fw-bold mb-4">Engineering Trust</h2>
                <p className="fs-5 text-muted mb-4">
                  Our sourcing philosophy is built on direct relationships with global leaders in truck manufacturing.
                  By eliminating intermediaries, we ensure every component is a testament to authenticity.
                </p>
                <div className="p-4 bg-light rounded-4 border-start border-primary border-4 shadow-sm">
                  <p className="mb-0 fs-5 fst-italic">
                    "At JDV, we don't just sell parts; we provide the reliability that keeps the nation's economy moving."
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 reveal">
              <div className="position-relative">
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-5 rounded-5 transform-offset" style={{ zIndex: -1 }}></div>
                <img src="/images/images/PwSupplier.jpg" className="img-fluid rounded-5 shadow-lg w-100 object-fit-cover" alt="Supplier" style={{ height: '450px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logistics Section */}
      <div className="bg-dark text-white section-padding">
        <div className="container">
          <div className="row gy-5 align-items-center flex-row-reverse">
            <div className="col-lg-6 reveal">
              <div className="ps-lg-5">
                <h2 className="display-5 fw-bold mb-4">The JDV Advantage</h2>
                <p className="fs-5 opacity-75 mb-4">
                  From high-security military zones to bustling metropolitan centers, JDV’s reach is as diverse as the clients we serve.
                  Our logistics framework ensures that critical components reach their destination with zero compromise on safety.
                </p>
                <ul className="list-unstyled">
                  <li className="mb-3 d-flex align-items-center"><i className="bi bi-shield-check text-primary me-3 fs-3"></i><span>Strict Quality Inspection</span></li>
                  <li className="mb-3 d-flex align-items-center"><i className="bi bi-truck text-primary me-3 fs-3"></i><span>Real-time Supply Chain Management</span></li>
                  <li className="mb-3 d-flex align-items-center"><i className="bi bi-globe2 text-primary me-3 fs-3"></i><span>International Sourcing Standards</span></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 reveal">
              <img src="/images/images/PwCustomer.jpg" className="img-fluid rounded-5 shadow-lg w-100 object-fit-cover" alt="Logistics" style={{ height: '450px' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Shipment Video Section */}
      <div className="bg-white section-padding">
        <div className="container">
          <div className="row reveal">
            <div className="col-12 text-center mb-5">
              <h2 className="display-5 fw-bold">Witness the Influx</h2>
              <p className="text-muted">Direct importation from global manufacturing hubs to our Abuja headquarters.</p>
            </div>
            <div className="col-lg-10 mx-auto">
              <div className="ratio ratio-16x9 rounded-5 overflow-hidden shadow-2xl border">
                <video controls src="/images/images/PwShipment.mp4" className="w-100 h-100 object-fit-cover"></video>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Section */}
      <div className="about-row-3 section-padding">
        <div className="container">
          <div className="row gy-5 align-items-center">
            <div className="col-lg-5 reveal">
              <h2 className="display-4 fw-bold mb-4">Visionary Leadership</h2>
              <p className="fs-5 mb-4 leading-relaxed">
                Ibeto Kingsley Ikemefuna, a graduate of Economics, orchestrates JDV with a blend of academic rigor and industrial grit.
                His vision transcends traditional commerce, aiming to revolutionize the spare parts ecosystem in Africa.
              </p>
              <div className="d-flex align-items-center gap-4 mt-5">
                <div>
                  <h4 className="fw-bold mb-0">Ibeto K. I.</h4>
                  <p className="text-primary mb-0">Founder & CEO</p>
                </div>
              </div>
            </div>
            <div className="col-lg-7 reveal">
              <div className="position-relative">
                <img src="/images/images/ceo.JPG" className="img-fluid rounded-5 shadow-2xl w-100 object-fit-cover" alt="CEO" style={{ height: '600px', filter: 'contrast(1.1)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="section-padding text-center bg-light">
        <div className="container reveal">
          <h3 className="display-6 fw-bold mb-4">Join the Network of Excellence</h3>
          <Link to="/pages/products" className="btn btn-primary btn-lg px-5 shadow-lg rounded-pill">View Inventory</Link>
        </div>
      </div>
    </main>
  )
}

export default About
