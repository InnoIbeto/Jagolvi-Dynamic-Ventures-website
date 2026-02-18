import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
        }
      })
    }, { threshold: 0.1 })

    reveals.forEach(reveal => observer.observe(reveal))

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <main className="container-fluid p-0 fade-in">
      {/* Hero Section */}
      <div className="position-relative overflow-hidden" style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
        minHeight: '60vh'
      }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}></div>
        
        <div className="container py-4 py-md-5 position-relative" style={{ zIndex: 1 }}>
          <div className="row min-vh-50 min-vh-md-60 align-items-center">
            <div className="col-lg-8 mx-auto text-center text-white">
              <div className="reveal">
                <span className="badge bg-primary bg-opacity-25 text-primary-emphasis border border-primary border-opacity-25 px-3 px-md-4 py-2 rounded-pill mb-3 mb-md-4">
                  Trusted Since 2014
                </span>
              </div>
              <h1 className="display-4 display-md-3 fw-bold mb-3 mb-md-4 reveal">Powering Nigeria's <span className="text-primary">Heavy-Duty Logistics</span></h1>
              <p className="fs-5 fs-md-4 opacity-75 mb-4 mb-md-5 lead reveal">
                Jagolvi Dynamic Ventures bridges world-class engineering with local operational excellence.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-2 gap-md-3 reveal">
                <Link to="/pages/products" className="btn btn-primary btn-sm btn-lg px-3 px-md-5 shadow-lg">Explore Products</Link>
                <Link to="/pages/contact" className="btn btn-outline-light btn-sm btn-lg px-3 px-md-5">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="position-absolute bottom-0 start-0 w-100" style={{ height: '80px', background: 'linear-gradient(to top, #ffffff, transparent)' }}></div>
      </div>

      {/* About Content */}
      <div className="bg-light section-padding">
        <div className="container">
          <div className="row gy-5 align-items-center">
            <div className="col-lg-6 reveal">
              <div className="pe-lg-5">
                <span className="text-primary fw-semibold text-uppercase ls-2" style={{ fontSize: '0.85rem', letterSpacing: '2px' }}>Who We Are</span>
                <h2 className="display-5 fw-bold mb-4 mt-2">Engineering Trust Since 2014</h2>
                <p className="fs-5 text-muted mb-4">
                  JDV stands as Nigeria's premier destination for genuine truck spare parts. 
                  Our direct partnerships with global manufacturers ensure authenticity in every component we supply.
                </p>
                <div className="d-flex flex-column gap-3">
                  {[
                    'Authorized dealer for leading truck brands',
                    'Strict quality inspection protocols',
                    'Nationwide delivery network'
                  ].map((item, idx) => (
                    <div className="d-flex align-items-center" key={idx}>
                      <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '24px', height: '24px' }}>
                        <i className="bi bi-check text-success fs-6"></i>
                      </div>
                      <span className="fw-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-6 reveal">
              <div className="position-relative">
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-10 rounded-5 transform-offset" style={{ zIndex: -1, transform: 'translate(20px, 20px)' }}></div>
                <img src="/images/images/PwSupplier.jpg" className="img-fluid rounded-5 shadow-lg w-100" alt="Supplier" style={{ height: '450px', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="bg-white section-padding">
        <div className="container">
          <div className="text-center mb-5 reveal">
            <span className="text-primary fw-semibold text-uppercase" style={{ fontSize: '0.85rem', letterSpacing: '2px' }}>What We Offer</span>
            <h2 className="display-5 fw-bold mt-2">Comprehensive Solutions</h2>
          </div>
          <div className="row g-4">
            {[
              { icon: 'bi-tools', title: 'Service Parts', desc: 'Genuine components for routine maintenance and repairs', color: 'primary' },
              { icon: 'bi-wrench-adjustable', title: 'Repair Parts', desc: 'High-quality replacement parts for all truck models', color: 'warning' },
              { icon: 'bi-droplet-half', title: 'Consumables', desc: 'Oils, filters, and fluids for optimal performance', color: 'success' }
            ].map((service, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="card h-100 border-0 shadow-sm p-4 reveal" style={{ borderRadius: '1rem', transition: 'transform 0.3s' }}>
                  <div className={`bg-${service.color} bg-opacity-10 d-inline-flex align-items-center justify-content-center rounded-3 mb-4`} style={{ width: '60px', height: '60px' }}>
                    <i className={`bi ${service.icon} text-${service.color} fs-3`}></i>
                  </div>
                  <h4 className="fw-bold mb-2">{service.title}</h4>
                  <p className="text-muted mb-0">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* JDV Advantage */}
      <div className="bg-dark text-white section-padding" style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)'
      }}>
        <div className="container">
          <div className="row gy-5 align-items-center flex-row-reverse">
            <div className="col-lg-6 reveal">
              <div className="ps-lg-5">
                <span className="text-primary fw-semibold text-uppercase" style={{ fontSize: '0.85rem', letterSpacing: '2px' }}>Why Choose JDV</span>
                <h2 className="display-5 fw-bold mb-4 mt-2">The JDV Advantage</h2>
                <p className="fs-5 opacity-75 mb-4">
                  From high-security zones to metropolitan centers, our logistics framework ensures critical components reach their destination safely.
                </p>
                <div className="d-flex flex-column gap-4">
                  {[
                    { icon: 'bi-shield-check', title: 'Strict Quality Inspection', desc: 'Every part undergoes rigorous verification' },
                    { icon: 'bi-truck', title: 'Real-time Tracking', desc: 'Supply chain visibility from order to delivery' },
                    { icon: 'bi-globe2', title: 'Global Sourcing', desc: 'Direct partnerships with international manufacturers' }
                  ].map((item, idx) => (
                    <div className="d-flex align-items-start" key={idx}>
                      <div className="bg-primary bg-opacity-25 rounded-2 d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '50px', height: '50px' }}>
                        <i className={`bi ${item.icon} text-primary fs-4`}></i>
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1">{item.title}</h5>
                        <p className="opacity-75 mb-0">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-6 reveal">
              <div className="position-relative">
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-10 rounded-5" style={{ transform: 'translate(-20px, 20px)' }}></div>
                <img src="/images/images/PwCustomer.jpg" className="img-fluid rounded-5 shadow-lg w-100" alt="Logistics" style={{ height: '500px', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-light section-padding">
        <div className="container">
          <div className="row reveal">
            <div className="col-12 text-center mb-5">
              <span className="text-primary fw-semibold text-uppercase" style={{ fontSize: '0.85rem', letterSpacing: '2px' }}>Our Operations</span>
              <h2 className="display-5 fw-bold mt-2">Direct from Source to You</h2>
              <p className="text-muted fs-5">Watch our importation process from global manufacturing hubs to Abuja</p>
            </div>
            <div className="col-lg-10 mx-auto">
              <div className="position-relative rounded-5 overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}>
                <video controls className="w-100 h-100" style={{ objectFit: 'cover' }}>
                  <source src="/images/images/PwShipment.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Section */}
      <div className="section-padding" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)' }}>
        <div className="container">
          <div className="row gy-5 align-items-center">
            <div className="col-lg-5 reveal">
              <span className="text-primary fw-semibold text-uppercase" style={{ fontSize: '0.85rem', letterSpacing: '2px' }}>Leadership</span>
              <h2 className="display-4 fw-bold mb-4 mt-2 text-white">Visionary Leadership</h2>
              <p className="fs-5 mb-4 opacity-75 text-white">
                Ibeto Kingsley Ikemefuna combines academic rigor with industrial expertise to revolutionize 
                the spare parts ecosystem in Africa.
              </p>
              <div className="d-flex align-items-center gap-4 mt-5">
                <img src="/images/images/ceo.JPG" alt="CEO" className="rounded-circle shadow-lg" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                <div>
                  <h4 className="fw-bold text-white mb-0">Ibeto K. I.</h4>
                  <p className="text-primary mb-0">Founder & CEO</p>
                </div>
              </div>
            </div>
            <div className="col-lg-7 reveal">
              <div className="position-relative">
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-10 rounded-5" style={{ transform: 'translate(20px, 20px)' }}></div>
                <img src="/images/images/ceo.JPG" className="img-fluid rounded-5 shadow-2xl w-100" alt="CEO" style={{ height: '550px', objectFit: 'cover', filter: 'contrast(1.1)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white section-padding text-center">
        <div className="container reveal">
          <h3 className="display-6 fw-bold mb-4">Ready to Partner with Excellence?</h3>
          <p className="text-muted fs-5 mb-4">Join hundreds of satisfied clients who trust JDV for their truck parts needs.</p>
          <Link to="/pages/products" className="btn btn-primary btn-lg px-5 shadow-lg rounded-pill">Browse Inventory</Link>
        </div>
      </div>
    </main>
  )
}

export default About
