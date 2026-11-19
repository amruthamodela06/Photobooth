export const patterns = [
    // Solids
    { id: 'solid-white', name: 'Clean White', style: { background: '#FFFFFF' } },
    { id: 'solid-pink', name: 'Pastel Pink', style: { background: '#FFB7B2' } },
    { id: 'solid-lavender', name: 'Lavender', style: { background: '#C9B8E8' } },
    { id: 'solid-mint', name: 'Mint', style: { background: '#B5EAD7' } },
    { id: 'solid-peach', name: 'Peach', style: { background: '#FFDAB9' } },
    { id: 'solid-sky', name: 'Sky Blue', style: { background: '#AED6F1' } },
    { id: 'solid-black', name: 'Classic Black', style: { background: '#1a1a1a' } },
    { id: 'solid-cream', name: 'Cream', style: { background: '#FFF8E7' } },

    // Gradients
    { id: 'grad-aurora', name: 'Aurora', style: { background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' } },
    { id: 'grad-candy', name: 'Candy', style: { background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' } },
    { id: 'grad-ocean', name: 'Ocean', style: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' } },
    { id: 'grad-rose', name: 'Rose Gold', style: { background: 'linear-gradient(135deg, #f5a7a7 0%, #e8d5b7 100%)' } },
    { id: 'grad-midnight', name: 'Midnight', style: { background: 'linear-gradient(135deg, #232526 0%, #414345 100%)' } },
    { id: 'grad-spring', name: 'Spring', style: { background: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)' } },
    // New gradient frames
    { id: 'grad-sunset', name: 'Sunset', style: { background: 'linear-gradient(135deg, #f83600 0%, #f9d423 100%)' } },
    { id: 'grad-berry', name: 'Berry', style: { background: 'linear-gradient(135deg, #6a3093 0%, #a044ff 100%)' } },
    { id: 'grad-peach-cream', name: 'Peach Cream', style: { background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' } },
    { id: 'grad-ice', name: 'Ice Blue', style: { background: 'linear-gradient(135deg, #e0f7fa 0%, #80deea 100%)' } },
    { id: 'grad-dusk', name: 'Dusk', style: { background: 'linear-gradient(135deg, #2c3e50 0%, #fd746c 100%)' } },

    // Patterns
    {
        id: 'check-pink', name: 'Pink Check', style: {
            backgroundColor: '#FFE5E5',
            backgroundImage: `repeating-linear-gradient(45deg, #FFB7B2 25%, transparent 25%, transparent 75%, #FFB7B2 75%, #FFB7B2), repeating-linear-gradient(45deg, #FFB7B2 25%, #FFE5E5 25%, #FFE5E5 75%, #FFB7B2 75%, #FFB7B2)`,
            backgroundPosition: '0 0, 10px 10px',
            backgroundSize: '20px 20px'
        }
    },
    {
        id: 'plaid-blue', name: 'Blue Plaid', style: {
            backgroundColor: '#E0F7FA',
            backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.1) 50%, transparent 50%), linear-gradient(rgba(0,0,0,0.1) 50%, transparent 50%)`,
            backgroundSize: '20px 20px'
        }
    },
    {
        id: 'stripe-pastel', name: 'Pastel Stripes', style: {
            backgroundColor: '#fff',
            backgroundImage: `repeating-linear-gradient(90deg, #FFB7B2 0px, #FFB7B2 10px, #fff 10px, #fff 20px, #B5EAD7 20px, #B5EAD7 30px, #fff 30px, #fff 40px, #C9B8E8 40px, #C9B8E8 50px, #fff 50px, #fff 60px)`
        }
    },
    {
        id: 'dots-white', name: 'Polka Dots', style: {
            backgroundColor: '#fff',
            backgroundImage: `radial-gradient(circle, #FFB7B2 2px, transparent 2px)`,
            backgroundSize: '18px 18px'
        }
    },
    {
        id: 'dots-bw', name: 'B&W Dots', style: {
            backgroundColor: '#fff',
            backgroundImage: `radial-gradient(circle, #222 2px, transparent 2px)`,
            backgroundSize: '18px 18px'
        }
    },
];

export const stickerCategories = [
    {
        label: '💕 Classics',
        stickers: [
            { id: 'heart', emoji: '❤️' },
            { id: 'sparkles', emoji: '✨' },
            { id: 'crown', emoji: '👑' },
            { id: 'cat', emoji: '🐱' },
            { id: 'bunny', emoji: '🐰' },
            { id: 'flower', emoji: '🌸' },
            { id: 'star', emoji: '⭐' },
            { id: 'sunglasses', emoji: '😎' },
            { id: 'kiss', emoji: '💋' },
            { id: 'bow', emoji: '🎀' },
        ]
    },
    {
        label: '🌈 Nature',
        stickers: [
            { id: 'rainbow', emoji: '🌈' },
            { id: 'butterfly', emoji: '🦋' },
            { id: 'cherry', emoji: '🍒' },
            { id: 'sunflower', emoji: '🌻' },
            { id: 'clover', emoji: '🍀' },
            { id: 'rose', emoji: '🌹' },
            { id: 'snowflake', emoji: '❄️' },
            { id: 'moon', emoji: '🌙' },
            { id: 'shooting-star', emoji: '🌟' },
            { id: 'mushroom', emoji: '🍄' },
        ]
    },
    {
        label: '🎉 Party',
        stickers: [
            { id: 'camera', emoji: '📷' },
            { id: 'fire', emoji: '🔥' },
            { id: 'diamond', emoji: '💎' },
            { id: 'balloon', emoji: '🎈' },
            { id: 'ghost', emoji: '👻' },
            { id: 'purple-heart', emoji: '💜' },
            { id: 'lightning', emoji: '⚡' },
            { id: 'cake', emoji: '🎂' },
            { id: 'bear', emoji: '🐻' },
            { id: 'alien', emoji: '👾' },
            { id: 'peace', emoji: '✌️' },
            { id: 'confetti', emoji: '🎊' },
            { id: 'party-popper', emoji: '🎉' },
            { id: 'disco-ball', emoji: '🪩' },
            { id: 'microphone', emoji: '🎤' },
        ]
    },
    {
        label: '🍕 Food & Fun',
        stickers: [
            { id: 'pizza', emoji: '🍕' },
            { id: 'donut', emoji: '🍩' },
            { id: 'ice-cream', emoji: '🍦' },
            { id: 'bubble-tea', emoji: '🧋' },
            { id: 'strawberry', emoji: '🍓' },
            { id: 'watermelon', emoji: '🍉' },
            { id: 'lemon', emoji: '🍋' },
            { id: 'avocado', emoji: '🥑' },
            { id: 'cookie', emoji: '🍪' },
            { id: 'candy', emoji: '🍬' },
        ]
    }
];

// Flat sticker list (backwards compatibility)
export const stickers = stickerCategories.flatMap(cat => cat.stickers);
