import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer style={{
            padding: '40px 20px',
            textAlign: 'center',
            backgroundColor: 'white',
            borderTop: '1px solid var(--color-bg)'
        }}>
            <p style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                color: 'var(--color-text-light)',
                fontWeight: 600
            }}>
                Made with <Heart size={16} fill="var(--color-primary)" color="var(--color-primary)" /> by Rumie
            </p>
        </footer>
    );
};
