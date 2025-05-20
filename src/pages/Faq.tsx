import React, { useRef } from 'react';
import '../styles/Faq.css';
import { faqSections } from './data/faqData';

const FaqPage: React.FC = () => {
    const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    const section = e.currentTarget;  // the section that was opened

    // Handle only if section (not question) was opened
    if (e.target !== e.currentTarget || !section.open) return;
    
    const container = section.closest('.faq-box');  // closest container with faq-box class
    if (container) {
      const containerTop = container.getBoundingClientRect().top; // top coord of scrollable container
      const sectionTop = section.getBoundingClientRect().top; // top coord of section being opened
      const offset = sectionTop - containerTop - 20; // scroll with padding

      container.scrollBy({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="faq-wrapper">
      <div className="faq-box">
        <h2 className="faq-title">FAQs</h2>

        {faqSections.map((section, idx) => (
          <details key={idx} className="faq-section" onToggle={handleToggle}>
            <summary className="faq-section-summary">
              {section.title.toUpperCase()}
            </summary>

            {section.questions.map((item, i) => (
              <details key={i} className="faq-item">
                <summary>{item.q}</summary>
                {typeof item.a === 'string' ? <p>{item.a}</p> : item.a}
              </details>
            ))}
          </details>
        ))}

        <a href="/" className="back-link">← Back to Game</a>
      </div>
    </div>
  );
};

export default FaqPage;
