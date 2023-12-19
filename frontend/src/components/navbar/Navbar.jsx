import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Assurez-vous d'avoir importé Bootstrap dans votre application React

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Ft_transcendence</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link" href="/">Home</a>
            <a className="nav-link" href="/play/">Play</a>
            <a className="nav-link" href="/tournament/">Tournament</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;