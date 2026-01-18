import React, { useState, useRef, useEffect } from 'react';
import { Section } from '../components/Section';
import { Play, Pause, SkipBack, SkipForward, Disc, List, Music as MusicIcon } from 'lucide-react';
import './MusicPage.css';

interface Track {
    id: number;
    title: string;
    artist: string;
    src: string;
    color: string;
}

export const MusicPage: React.FC = () => {
    const [playlist, setPlaylist] = useState<Track[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Dynamically import audio from src/assets/songs
        const modules = import.meta.glob('/src/assets/songs/*.{mp3,wav,ogg}', { eager: true });

        const loadedTracks = Object.entries(modules).map(([path, mod]: any, index) => {
            const filename = path.split('/').pop()?.split('.')[0] || `Track ${index + 1}`;
            let title = filename;
            let artist = "Unknown Artist";

            if (filename.includes(' - ')) {
                const parts = filename.split(' - ');
                title = parts[0].trim();
                artist = parts[1].trim();
            }

            return {
                id: index + 1,
                title: title.replace(/[-_]/g, ' '),
                artist: artist,
                src: mod.default,
                color: ['#FFB7C5', '#B5EAD7', '#E0BBE4', '#FFD1DC', '#FFF5BA'][index % 5]
            };
        });
        setPlaylist(loadedTracks);
    }, []);

    const currentTrack = playlist[currentTrackIndex];

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Play error:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrackIndex]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 0);
        }
    };

    const handleEnded = () => {
        handleNext();
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
        setIsPlaying(true);
    };

    const handlePrev = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
        setIsPlaying(true);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = Number(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{ paddingTop: '80px' }}>
            <Section id="music" title="My Playlist 🎵" bgColor="#FFF0F5" pattern>
                {playlist.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-light)' }}>
                        <p>No songs found! Add mp3 files to <code>src/assets/songs</code> 🎶</p>
                    </div>
                ) : (
                    <div className="music-container">
                        <audio
                            ref={audioRef}
                            src={currentTrack?.src}
                            onTimeUpdate={handleTimeUpdate}
                            onEnded={handleEnded}
                            onLoadedMetadata={handleTimeUpdate} // Ensure duration is set on load
                        />

                        {/* Player Card */}
                        <div className="player-card">
                            <div className={`album-art ${isPlaying ? 'animate-spin-slow' : ''}`} style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}>
                                <MusicIcon size={60} color="white" />
                            </div>

                            <div className="track-info">
                                <h3>{currentTrack?.title}</h3>
                                <p>{currentTrack?.artist}</p>
                            </div>

                            <div className="progress-container">
                                <input
                                    type="range"
                                    min="0"
                                    max={duration || 100}
                                    value={currentTime}
                                    onChange={handleSeek}
                                    className="seek-slider"
                                    style={{
                                        backgroundSize: `${(currentTime / duration) * 100}% 100%`
                                    }}
                                />
                                <div className="time-info">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>

                            <div className="controls">
                                <button onClick={handlePrev} className="control-btn"><SkipBack size={24} /></button>
                                <button onClick={handlePlayPause} className="control-btn play-btn" style={{ backgroundColor: currentTrack?.color }}>
                                    {isPlaying ? <Pause size={24} color="white" /> : <Play size={24} color="white" fill="white" />}
                                </button>
                                <button onClick={handleNext} className="control-btn"><SkipForward size={24} /></button>
                            </div>
                        </div>

                        {/* Playlist */}
                        <div className="playlist-card">
                            <div className="playlist-header">
                                <List size={20} />
                                <h3>Up Next</h3>
                            </div>
                            <ul className="playlist-tracks">
                                {playlist.map((track, index) => (
                                    <li
                                        key={track.id}
                                        className={`playlist-item ${index === currentTrackIndex ? 'playing' : ''}`}
                                        onClick={() => { setCurrentTrackIndex(index); setIsPlaying(true); }}
                                    >
                                        <div className="track-mini-icon" style={{ backgroundColor: track.color }}>
                                            <Disc size={14} color="white" />
                                        </div>
                                        <div className="track-mini-info">
                                            <span className="track-title">{track.title}</span>
                                            {/* <span className="track-artist">{track.artist}</span> */}
                                        </div>
                                        {index === currentTrackIndex && <div className="playing-indicator animate-bounce-sm">🎵</div>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </Section>

            <style>{`
        .animate-spin-slow {
            animation: spin 8s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .seek-slider {
            -webkit-appearance: none;
            width: 100%;
            height: 6px;
            background: #f0f0f0;
            border-radius: 5px;
            background-image: linear-gradient(var(--color-primary), var(--color-primary));
            background-repeat: no-repeat;
            cursor: pointer;
        }
        
        .seek-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 15px;
            width: 15px;
            border-radius: 50%;
            background: var(--color-primary);
            cursor: pointer;
            box-shadow: 0 0 2px 0 #555;
            transition: background .3s ease-in-out;
        }
      `}</style>
        </div>
    );
};
