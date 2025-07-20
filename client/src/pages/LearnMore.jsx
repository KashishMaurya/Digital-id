// learn more - details about product

import React from "react";
import "../components/css/LearnMore.css";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

export default function LearnMore() {
  return (
    <>
      <Navbar />
      <div className="learnmore-page">
        <div className="learnmore-header">
          <h1>Everything You Need to Know About CareConnect</h1>
          <p>
            CareConnect is designed to bridge the communication gap when
            vulnerable individuals cannot speak for themselves. Our QR code
            system ensures that critical information is instantly accessible to
            those who need it most.
          </p>
          <button className="primary-btn">Get Started Now</button>
        </div>

        <section className="section">
          <h2>How It Works</h2>
          <p className="section-subtext">
            Simple, secure, and effective. Here's how CareConnect keeps your
            loved ones safe.
          </p>
          <div className="steps">
            <div className="step">
              <h3>1. Create Profiles</h3>
              <p>
                Add family members, pets, or individuals under your care.
                Include medical conditions, emergency contacts, and special
                instructions.
              </p>
            </div>
            <div className="step">
              <h3>2. Generate QR Codes</h3>
              <p>
                Each profile automatically generates a unique QR code that can
                be printed and attached to ID cards, medical bracelets, or pet
                tags.
              </p>
            </div>
            <div className="step">
              <h3>3. Instant Access</h3>
              <p>
                When scanned, the QR code instantly displays critical
                information to emergency responders, caregivers, or anyone who
                needs to help.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Powerful Features</h2>
          <p className="section-subtext">
            Everything you need to keep your loved ones safe and connected.
          </p>
          <div className="feature-grid">
            <div className="feature">
              <h4>Unique QR Codes</h4>
              <p>
                Each profile generates a unique, secure QR code that can be
                printed on ID cards, medical bracelets, pet tags, or clothing
                labels.
              </p>
            </div>
            <div className="feature">
              <h4>Privacy & Security</h4>
              <p>
                Your family's information is encrypted and stored securely. Only
                those with the QR code can access the information.
              </p>
            </div>
            <div className="feature">
              <h4>Multi-Profile Management</h4>
              <p>
                Manage multiple profiles from a single account. Perfect for
                families with many members needing care.
              </p>
            </div>
            <div className="feature">
              <h4>Mobile-First Design</h4>
              <p>
                Optimized for all devices. Emergency responders can quickly scan
                QR codes using any smartphone.
              </p>
            </div>
            <div className="feature">
              <h4>Print & Share</h4>
              <p>
                Generate printable QR codes in various sizes. Perfect for ID
                cards, pet tags, and more.
              </p>
            </div>
            <div className="feature">
              <h4>Instant Access</h4>
              <p>
                Critical information is available instantly when scanned. Works
                with any QR code scanner.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Who Can Benefit</h2>
          <p className="section-subtext">
            CareConnect is designed for anyone who cares for vulnerable
            individuals who may not be able to communicate in emergencies.
          </p>
          <div className="benefit-grid">
            <div className="benefit">
              <h4>Elderly & Seniors</h4>
              <p>
                Medical conditions, medications, emergency contacts, and care
                instructions for seniors with dementia or Alzheimer's.
              </p>
            </div>
            <div className="benefit">
              <h4>Special Needs Individuals</h4>
              <p>
                Communication preferences, behavioral triggers, and caregiver
                instructions for autism and other conditions.
              </p>
            </div>
            <div className="benefit">
              <h4>Children</h4>
              <p>
                Parent contact information, allergies, and emergency
                instructions for kids who can't communicate these details.
              </p>
            </div>
            <div className="benefit">
              <h4>Pets</h4>
              <p>
                Owner contact info, veterinary details, and medical conditions
                for beloved pets.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Why Choose CareConnect</h2>
          <p className="section-subtext">
            The benefits of having critical information instantly available when
            it matters most.
          </p>
          <div className="why-grid">
            <div className="why">
              <h4>Peace of Mind</h4>
              <p>
                Know that help can access critical information when it's needed
                most.
              </p>
            </div>
            <div className="why">
              <h4>Organized Information</h4>
              <p>
                Keep all important details in one secure, easily accessible
                place.
              </p>
            </div>
            <div className="why">
              <h4>Secure Access</h4>
              <p>Information is only accessible through the unique QR code.</p>
            </div>
            <div className="why">
              <h4>Emergency Ready</h4>
              <p>Information is available to emergency responders instantly.</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

