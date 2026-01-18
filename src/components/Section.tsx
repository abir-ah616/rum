import React from 'react';

interface SectionProps {
    id: string;
    title: string;
    children?: React.ReactNode;
    bgColor?: string;
    pattern?: boolean;
}

export const Section: React.FC<SectionProps> = ({ id, title, children, bgColor = 'white', pattern }) => {
    const style: React.CSSProperties = {
        backgroundColor: bgColor,
        padding: '80px 20px',
        minHeight: '80vh',
        position: 'relative',
        backgroundImage: pattern ? 'radial-gradient(var(--color-secondary) 2px, transparent 2px)' : 'none',
        backgroundSize: pattern ? '30px 30px' : 'auto',
    };

    return (
        <section id={id} style={style}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{
                    textAlign: 'center',
                    fontSize: '2.5rem',
                    marginBottom: '40px',
                    color: 'var(--color-primary)'
                }}>
                    {title}
                </h2>
                {children}
            </div>
        </section>
    );
};
