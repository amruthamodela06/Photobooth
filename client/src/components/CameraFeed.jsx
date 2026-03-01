import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

const CameraFeed = forwardRef(({ filterStyle, onPhotoTaken }, ref) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [error, setError] = useState(null);
    const [countdown, setCountdown] = useState(null);

    useImperativeHandle(ref, () => ({
        startSequence: async (count) => {
            for (let i = 0; i < count; i++) {
                await runCountdown();
                captureFrame();
                // Wait a bit between shots
                if (i < count - 1) await new Promise(r => setTimeout(r, 2000));
            }
        }
    }));

    const runCountdown = () => {
        return new Promise(resolve => {
            let count = 3;
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
            if (onPhotoTaken) onPhotoTaken(dataUrl);
        }
    };

    useEffect(() => {
        const initCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: { width: 1920, height: 1080 }
                });
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
            if (stream) stream.getTracks().forEach(track => track.stop());
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

