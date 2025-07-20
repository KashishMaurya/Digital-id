import React from "react";
import "../components/css/LandingPage.css";
import { Link } from "react-router-dom";
import Footer from "../components/ui/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doesSessionExist } from "supertokens-auth-react/recipe/session";

const features = [
  {
    title: "QR Code Profiles",
    desc: "Each family member gets a unique QR code with their important information.",
    icon: "🔗",
  },
  {
    title: "Secure & Private",
    desc: "Your family's information is protected and only accessible through secure QR codes.",
    icon: "🔒",
  },
  {
    title: "Family Management",
    desc: "Manage multiple profiles for family members and pets from one dashboard.",
    icon: "👨‍👩‍👧‍👦",
  },
  {
    title: "Easy Access",
    desc: "Simply scan the QR code to access critical information instantly.",
    icon: "📲",
  },
  {
    title: "Print & Share",
    desc: "Print QR codes for ID cards, medical bracelets, or tags.",
    icon: "🖨️",
  },
  {
    title: "Peace of Mind",
    desc: "Know that help can find important information when it's needed most.",
    icon: "💙",
  },
];

const useCases = [
  "Seniors",
  "Special Needs",
  "Children",
  "Pets",
  "Plants",
  "Colleagues",
  "Relatives",
  "Friends",
];

export default function LandingPage() {
    const navigate = useNavigate();

    useEffect(() => {
      async function checkSession() {
        if (await doesSessionExist()) {
          navigate("/dashboard");
        }
      }
      checkSession();
    }, []);

  return (
    <div className="page">
      {/* Header Section */}
      <div className="header">
        <div className="header-content">
          <div className="header-text">
            <h1>💙 CareConnect</h1>
            <div className="header-buttons">
              <Link
                to="/auth?redirectToPath=/dashboard"
                className="btn outline large"
              >
                Login
              </Link>
              <Link
                to="/auth?redirectToPath=/dashboard"
                className="btn primary large"
              >
                Register
              </Link>
            </div>
          </div>
          <div className="header-image">
            <img
              src="/family_with_QR.png"
              alt="Family with QR"
              className="hero-image"
            />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h2>Keep Your Loved Ones Safe</h2>
          <p>
            Create secure QR code profiles for family members with special
            needs, elderly relatives, pets, and children. Access critical
            information instantly when it matters most.
          </p>
          <div className="hero-actions">
            <Link
              to="/auth?redirectToPath=/dashboard"
              className="btn primary large"
            >
              Get Started for free
            </Link>
            <Link to="/learn-more" className="btn outline large">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h3>Why Choose CareConnect?</h3>
        <p className="features-subtext">
          Designed for families caring for vulnerable members — access important
          info when seconds count.
        </p>
        <div className="feature-cards">
          {features.map((f, i) => (
            <div key={i} className="card">
              <div className="card-icon">{f.icon}</div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="use-cases">
        <h1>Perfect For</h1>
        <div className="use-case-grid">
          {useCases.map((item, i) => (
            <div key={i} className="use-case-item">
              {item}
            </div>
          ))}
        </div>
        <Link
          to="/auth?redirectToPath=/dashboard"
          className="btn primary large"
        >
          Create Your First Profile
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
