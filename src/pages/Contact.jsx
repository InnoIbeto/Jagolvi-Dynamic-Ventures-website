import React, { useState, useEffect } from 'react'

const Contact = () => {
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        email: '',
        phoneNumber: '',
        message: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id === 'last-name' ? 'lastName' :
                id === 'first-name' ? 'firstName' :
                    id === 'phonenumber' ? 'phoneNumber' : id]: value
        }));
    };

    const sendToWhatsApp = (event) => {
        event.preventDefault();
        const { firstName, lastName, email, phoneNumber, message } = formData;
        const whatsappMessage = `Hello, I am ${firstName} ${lastName}. My email is ${email}, and my phone number is ${phoneNumber}. Message: ${message}`;
        const targetPhone = "2348069481873";
        const whatsappURL = `https://wa.me/${targetPhone}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappURL, "_blank");
    };

    return (
        <main className="container section-padding fade-in">
            <div className="row text-center mb-5">
                <div className="col-12">
                    <h1 className="display-4 fw-bold">Let's <span className="text-primary">Connect</span></h1>
                    <p className="lead text-muted">We're here to support your truck maintenance and parts needs.</p>
                </div>
            </div>

            <div className="row g-4 justify-content-center">
                <div className="col-lg-4">
                    <div className="bg-light contact-card shadow-sm h-100">
                        <h2 className="fs-3 fw-bold mb-4 text-center text-lg-start">Contact Info</h2>
                        <div className="d-flex align-items-center mb-3 contact-info-item bg-white shadow-sm">
                            <div className="bg-primary-subtle p-2 rounded-circle me-3">
                                <i className="bi bi-telephone text-primary fs-4"></i>
                            </div>
                            <div>
                                <div className="text-muted small">Hotline</div>
                                <div className="fw-bold fs-6">+234 902-992-6061</div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center mb-3 contact-info-item bg-white shadow-sm">
                            <div className="bg-primary-subtle p-2 rounded-circle me-3">
                                <i className="bi bi-whatsapp text-primary fs-4"></i>
                            </div>
                            <div>
                                <div className="text-muted small">WhatsApp</div>
                                <div className="fw-bold fs-6">+234 806-948-1873</div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center contact-info-item bg-white shadow-sm">
                            <div className="bg-primary-subtle p-2 rounded-circle me-3">
                                <i className="bi bi-envelope text-primary fs-4"></i>
                            </div>
                            <div>
                                <div className="text-muted small">Email Address</div>
                                <div className="fw-bold fs-6">info@jdv.com</div>
                            </div>
                        </div>

                        <div className="mt-4 pt-3 border-top">
                            <h5 className="fw-bold mb-3">Our Socials</h5>
                            <div className="d-flex gap-2">
                                <a href="https://www.instagram.com/k_ibeto?igsh=MTl4bG1sazlqYzQ3dA==" target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-dark rounded-circle">
                                    <i className="bi bi-instagram"></i>
                                </a>
                                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-dark rounded-circle">
                                    <i className="bi bi-facebook"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="bg-white contact-card shadow-lg border h-100">
                        <h2 className="fs-3 fw-bold mb-4">Quick Inquiry</h2>
                        <form onSubmit={sendToWhatsApp}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold small">Last Name</label>
                                    <input type="text" className="form-control form-control-compact bg-light border-0" id="last-name" placeholder="Doe" onChange={handleChange} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold small">First Name</label>
                                    <input type="text" className="form-control form-control-compact bg-light border-0" id="first-name" placeholder="John" onChange={handleChange} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold small">Email</label>
                                    <input type="email" className="form-control form-control-compact bg-light border-0" id="email" placeholder="john.doe@example.com" onChange={handleChange} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold small">Phone Number</label>
                                    <input type="text" className="form-control form-control-compact bg-light border-0" id="phonenumber" placeholder="+234 123 456 7890" onChange={handleChange} />
                                </div>
                                <div className="col-12">
                                    <label className="form-label fw-semibold small">Message</label>
                                    <textarea className="form-control form-control-compact bg-light border-0" id="message" rows="3" placeholder="Tell us more about what you need..." onChange={handleChange}></textarea>
                                </div>
                                <div className="col-12 mt-4">
                                    <button type="submit" className="btn btn-primary btn-lg w-100 shadow-sm py-2 fw-bold">Send Message</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="row mt-5 pt-3 justify-content-center">
                <div className="col-lg-10 text-center">
                    <h2 className="fs-3 fw-bold mb-4">Visit Our Headquarters</h2>
                    <p className="text-muted mb-4 small">Zuba Plaza, Old Motor Spare Parts Association, Abuja.</p>
                    <div className="rounded-5 overflow-hidden shadow-sm border" style={{ height: '350px' }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246.23251435067735!2d7.215673351160404!3d9.089231014224618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e78f13eaaaaab%3A0xae79269c65d725c5!2sNew%20Motor%20Spare%20Parts%20Market%2C%20Zuba!5e0!3m2!1sen!2sng!4v1741270437827!5m2!1sen!2sng"
                            width="100%" height="100%"
                            style={{ border: 0 }}
                            allowFullScreen="" loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Contact
