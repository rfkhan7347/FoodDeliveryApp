import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-center align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex justify-content-center align-items-center text-center">
          <Link to="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
          </Link>
          <span className="text-muted">© 2024 QuickFood, Inc</span>
        </div>
      </footer>
    </div>
  );
}
