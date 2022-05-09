import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="text-center mt-5">
      <p>
        <small>&copy; all right reserved by H.M Masud {year}</small>
      </p>
    </footer>
  );
};

export default Footer;
