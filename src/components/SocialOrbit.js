import React from "react";
import {
  FaInstagram,
  FaWhatsapp,
  FaFacebookF,
  FaYoutube,
  FaGoogle,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import "../styles/SocialOrbit.css";

export default function SocialOrbit() {
  return (
    <div className="orbit-master-container">
      <div className="orbit-scene">
        
        {/* ============================================================
            CONCENTRIC ORBIT RINGS (Visual Guide Lines)
        ============================================================ */}
        <div className="orbit-rings-background">
          <div className="orbit-ring-line ring-inner-line" />
          <div className="orbit-ring-line ring-middle-line" />
          <div className="orbit-ring-line ring-outer-line" />
        </div>

        {/* ============================================================
            CENTER CORE (Brand 3D Metallic Badge)
        ============================================================ */}
        <div className="orbit-center-core" title="DigitalGrow">
          <div className="core-ambient-glow" />
          <div className="core-pulse-ring ring-1" />
          <div className="core-pulse-ring ring-2" />
          <div className="core-inner-badge">
            <div className="core-glass-reflection" />
            <span className="core-logo-text">DG</span>
            <span className="core-sub-text">GROW</span>
          </div>
        </div>

        {/* ============================================================
            1. INNER ORBIT ICONS (Radius: 70px, Clockwise 20s Loop)
            Always 100% Straight & Upright!
        ============================================================ */}
        <div className="orbit-mover mover-whatsapp">
          <a
            href="https://whatsapp.com"
            target="_blank"
            rel="noreferrer"
            className="realistic-social-badge whatsapp-realistic"
            aria-label="WhatsApp"
          >
            <div className="badge-specular-shine" />
            <div className="badge-3d-bevel" />
            <FaWhatsapp className="realistic-icon" />
            <span className="realistic-tooltip">Chat on WhatsApp</span>
          </a>
        </div>

        <div className="orbit-mover mover-linkedin">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="realistic-social-badge linkedin-realistic"
            aria-label="LinkedIn"
          >
            <div className="badge-specular-shine" />
            <div className="badge-3d-bevel" />
            <FaLinkedinIn className="realistic-icon" />
            <span className="realistic-tooltip">Connect on LinkedIn</span>
          </a>
        </div>

        {/* ============================================================
            2. MIDDLE ORBIT ICONS (Radius: 115px, Counter-Clockwise 28s Loop)
            Always 100% Straight & Upright!
        ============================================================ */}
        <div className="orbit-mover mover-instagram">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="realistic-social-badge instagram-realistic"
            aria-label="Instagram"
          >
            <div className="badge-specular-shine" />
            <div className="badge-3d-bevel" />
            <FaInstagram className="realistic-icon" />
            <span className="realistic-tooltip">@DigitalGrow</span>
          </a>
        </div>

        <div className="orbit-mover mover-facebook">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="realistic-social-badge facebook-realistic"
            aria-label="Facebook"
          >
            <div className="badge-specular-shine" />
            <div className="badge-3d-bevel" />
            <FaFacebookF className="realistic-icon" />
            <span className="realistic-tooltip">Facebook Page</span>
          </a>
        </div>

        {/* ============================================================
            3. OUTER ORBIT ICONS (Radius: 155px, Clockwise 36s Loop)
            Always 100% Straight & Upright!
        ============================================================ */}
        <div className="orbit-mover mover-google">
          <a
            href="https://google.com"
            target="_blank"
            rel="noreferrer"
            className="realistic-social-badge google-realistic"
            aria-label="Google"
          >
            <div className="badge-specular-shine" />
            <div className="badge-3d-bevel" />
            <FaGoogle className="realistic-icon google-icon-color" />
            <span className="realistic-tooltip">5.0★ Google Reviews</span>
          </a>
        </div>

        <div className="orbit-mover mover-youtube">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="realistic-social-badge youtube-realistic"
            aria-label="YouTube"
          >
            <div className="badge-specular-shine" />
            <div className="badge-3d-bevel" />
            <FaYoutube className="realistic-icon" />
            <span className="realistic-tooltip">Watch Showreel</span>
          </a>
        </div>

        {/* Top: Twitter */}
        <div className="orbit-mover mover-twitter">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="realistic-social-badge twitter-realistic"
            aria-label="Twitter"
          >
            <div className="badge-specular-shine" />
            <div className="badge-3d-bevel" />
            <FaTwitter className="realistic-icon" />
            <span className="realistic-tooltip">Follow on Twitter</span>
          </a>
        </div>

      </div>
    </div>
  );
}
