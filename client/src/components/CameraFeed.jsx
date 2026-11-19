import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

const CameraFeed = forwardRef(({ filterStyle, onPhotoTaken }, ref) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [error, setError] = useState(null);
    const [countdown, setCountdown] = useState(null);
    const [flash, setFlash] = useState(false);

    useImperativeHandle(ref, () => ({
        /**
         * Run a capture sequence.
         * @param {number} count - number of photos to take
         * @param {{ countdownSeconds?: number, delayMs?: number }} options
         */
        startSequence: async (count, { countdownSeconds = 3, delayMs = 2000 } = {}) => {
            for (let i = 0; i < count; i++) {
                await runCountdown(countdownSeconds);
                captureFrame();
                // Wait a bit between shots
                if (i < count - 1) await new Promise(r => setTimeout(r, delayMs));
            }
        }
    }));

    const runCountdown = (seconds) => {
        return new Promise(resolve => {
            let count = Math.max(1, seconds);
            setCountdown(count);
            const interval = setInterval(() => {
                count--;
                if (count > 0) {
                    setCountdown(count);
                } else {
                    clearInterval(interval);
                    setCountdown(null); // Flash?
                    resolve();
                }
            }, 1000);
        });
    };

    const captureFrame = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.scale(-1, 1);
            ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/png');
            setFlash(true);
            setTimeout(() => setFlash(false), 150);
            if (onPhotoTaken) onPhotoTaken(dataUrl);
        }
    };

    useEffect(() => {
        let activeStream = null;
        let cancelled = false;
        const initCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: { width: 1920, height: 1080 }
                });
                // Component unmounted while waiting for permission — release immediately
                if (cancelled) {
                    mediaStream.getTracks().forEach(track => track.stop());
                    return;
                }
                activeStream = mediaStream;
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
                setError("Could not access camera. Please ensure it is connected.");
            }
        };
        initCamera();
        return () => {
            cancelled = true;
            // `stream` state would be stale here, so use the local reference
            if (activeStream) activeStream.getTracks().forEach(track => track.stop());
        };
    }, []);

    return (
        <div className="camera-feed" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
            {error && <div className="error-message">{error}</div>}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'scaleX(-1)',
                    transition: 'filter 0.3s ease',
                    ...filterStyle
                }}
            />
            <div style={{
                position: 'absolute', inset: 0, background: 'white', pointerEvents: 'none',
                opacity: flash ? 0.9 : 0, transition: flash ? 'none' : 'opacity 0.35s ease-out'
            }} />
            {countdown && (
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    fontSize: '150px', color: 'white', fontWeight: 'bold', textShadow: '0 0 30px rgba(0,0,0,0.5)'
                }}>
                    {countdown}
                </div>
            )}
        </div>
    );
});

export default CameraFeed;

