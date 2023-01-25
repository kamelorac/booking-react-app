import React from 'react'
import "./Contact.css";

const Contact = () => {
    return (
    <div class="navbar-header">
    <div class="contact">
    <div class="background">
    <h2>Contact Us</h2>
    <a href="tel:18475309221" className="btn btn-success">Call Us!</a>
    <br>
    </br>
    <a href="sms:18475309221" className="btn btn-warning">Text Us!</a>
    </div>
     </div>
    </div>
    )
}

export default Contact;