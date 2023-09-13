import React from "react";
import { BsTwitter, BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const SocialMedia = () => (
  <div className="app__social">
    <a
      href="https://www.linkedin.com/in/umer-rauf-953689176/"
      target="_blank"
      rel="noreferrer"
    >
      <div>
        <BsLinkedin />
      </div>
    </a>
    <a
      target="_blank"
      href="https://www.facebook.com/skumer143/"
      rel="noreferrer"
    >
      <div>
        <FaFacebookF />
      </div>
    </a>
    <a target="_blank" href="https://twitter.com/_skumer" rel="noreferrer">
      <div>
        <BsTwitter />
      </div>
    </a>
    <a
      href="https://www.instagram.com/_skumer/"
      target="_blank"
      rel="noreferrer"
    >
      <div>
        <BsInstagram />
      </div>
    </a>
  </div>
);

export default SocialMedia;
