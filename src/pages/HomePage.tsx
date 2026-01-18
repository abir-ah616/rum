import React from 'react';
import { Hero } from '../components/Hero';
import { Section } from '../components/Section';
import { Heart, MapPin, GraduationCap, Music, Cat, Mic2, Guitar, Gamepad2, Plane } from 'lucide-react';

export const HomePage: React.FC = () => {
    return (
        <>
            <Hero />
            <Section id="about" title="About Me 🌸" bgColor="white">
                <div className="about-container" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '30px',
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>

                    <div className="profile-card animate-float" style={{
                        background: 'linear-gradient(135deg, #FFF0F5 0%, #FFFFFF 100%)',
                        padding: '40px',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-md)',
                        width: '100%',
                        border: '2px solid white'
                    }}>
                        <div className="profile-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
                            <h3 style={{ fontSize: '2rem', color: 'var(--color-text)', marginBottom: '10px' }}>Rumiee / Payel</h3>
                            <div className="tags" style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                <span className="tag">17 Years Old</span>
                                <span className="tag">SSC 2026</span>
                            </div>
                        </div>

                        <div className="stats-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '20px'
                        }}>
                            <div className="stat-item">
                                <MapPin className="stat-icon" color="#FFB7C5" />
                                <div>
                                    <label>Lives in</label>
                                    <p>Pabna</p>
                                </div>
                            </div>

                            <div className="stat-item">
                                <GraduationCap className="stat-icon" color="#B5EAD7" />
                                <div>
                                    <label>Education</label>
                                    <p>SSC 2026 Batch</p>
                                </div>
                            </div>

                            <div className="stat-item">
                                <Heart className="stat-icon" color="#FFD1DC" />
                                <div>
                                    <label>Loves</label>
                                    <p>Cats, Music, Drama</p>
                                </div>
                            </div>

                            <div className="stat-item">
                                <Music className="stat-icon" color="#E0BBE4" />
                                <div>
                                    <label>Interests</label>
                                    <p>Guitar, Singing, Roaming</p>
                                </div>
                            </div>

                            <div className="stat-item">
                                <Gamepad2 className="stat-icon" color="#B5EAD7" />
                                <div>
                                    <label>Fav Game</label>
                                    <p>Free Fire</p>
                                </div>
                            </div>

                            <div className="stat-item">
                                <Plane className="stat-icon" color="#FFD1DC" />
                                <div>
                                    <label>Goal</label>
                                    <p>Going Abroad</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="interests-icons" style={{ display: 'flex', gap: '20px', color: 'var(--color-tertiary)' }}>
                        <Cat size={32} className="animate-bounce" />
                        <Guitar size={32} className="animate-wiggle" />
                        <Mic2 size={32} className="animate-pulse" />
                    </div>

                </div>
            </Section>

            <style>{`
        .tag {
          background: white;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 0.9rem;
          color: var(--color-primary);
          font-weight: 700;
          box-shadow: var(--shadow-sm);
        }
        
        .stat-item {
          display: flex;
          align-items: center;
          gap: 15px;
          background: white;
          padding: 15px;
          border-radius: var(--radius-md);
          transition: transform 0.2s ease;
        }

        .stat-item:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-sm);
        }

        .stat-icon {
          width: 24px;
          height: 24px;
        }

        .stat-item label {
          display: block;
          font-size: 0.8rem;
          color: var(--color-text-light);
          font-weight: 600;
          text-transform: uppercase;
        }

        .stat-item p {
          font-weight: 700;
          color: var(--color-text);
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .profile-card {
            padding: 20px !important;
          }
          
          .stats-grid {
             grid-template-columns: 1fr !important;
          }

          .about-container {
             padding: 0 15px;
          }
           
          h3 {
             font-size: 1.5rem !important;
          }
        }
      `}</style>
        </>
    );
};
