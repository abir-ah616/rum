import React, { useState, useEffect } from 'react';
import { Section } from '../components/Section';
import { Calendar, User, Hash, Trophy, Copy } from 'lucide-react';
import './GamesPage.css';

export const GamesPage: React.FC = () => {
    const [bannerSrc, setBannerSrc] = useState<string | null>(null);

    useEffect(() => {
        // Dynamically import banner from src/assets/game_banners/free_fire
        const modules = import.meta.glob('/src/assets/game_banners/free_fire/*.{png,jpg,jpeg,webp}', { eager: true });

        // Get the first image found
        const firstImage = Object.values(modules)[0] as any;
        if (firstImage) {
            setBannerSrc(firstImage.default);
        }
    }, []);

    return (
        <div style={{ paddingTop: '80px' }}>
            <Section id="games" title="Games I Play 🎮" bgColor="#FFF0F5" pattern>
                <div className="games-container">

                    {/* Free Fire Landscape Card */}
                    <div className="game-card-landscape animate-float">
                        <div
                            className="landscape-banner"
                            style={bannerSrc ? {
                                backgroundImage: `url(${bannerSrc})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            } : {}}
                        >
                            {/* If no banner image, show the default gradient from CSS */}
                            {/* We apply the overlay in CSS ::before, which will sit on top of this bg image */}

                            <div className="game-logo-large">FREE FIRE</div>
                            <div className="status-badge">
                                <span className="pulsing-dot"></span>
                                Active
                            </div>
                        </div>

                        <div className="landscape-content">
                            <div className="main-info">
                                <div className="info-group">
                                    <User className="info-icon" />
                                    <div>
                                        <label>IGN</label>
                                        <span className="highlight-value">FG P4Y3L ✿</span>
                                    </div>
                                </div>

                                <div className="info-group">
                                    <Hash className="info-icon" />
                                    <div>
                                        <label>UID</label>
                                        <span className="mono-value">7651544299</span>
                                    </div>
                                    <Copy size={16} className="copy-icon" />
                                </div>
                            </div>

                            <div className="secondary-info">
                                <div className="mini-stat">
                                    <Calendar size={14} />
                                    <span>1 Year</span>
                                </div>
                                <div className="vertical-divider"></div>
                                <div className="mini-stat">
                                    <Trophy size={14} />
                                    <span>Survivor</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Section>
        </div>
    );
};
