export const filters = [
    { name: 'Original', class: '', style: {} },
    { name: 'B&W', class: 'filter-bw', style: { filter: 'grayscale(100%)' } },
    { name: 'Soft', class: 'filter-soft', style: { filter: 'brightness(108%) saturate(85%) contrast(95%)' } },
    { name: 'Golden', class: 'filter-golden', style: { filter: 'sepia(40%) saturate(130%) brightness(105%) hue-rotate(-10deg)' } },
    { name: 'Airy', class: 'filter-airy', style: { filter: 'brightness(115%) saturate(75%) contrast(90%)' } },
    { name: 'Moody', class: 'filter-moody', style: { filter: 'brightness(88%) contrast(115%) saturate(85%)' } },
    { name: 'Dreamy', class: 'filter-dreamy', style: { filter: 'brightness(110%) saturate(70%) contrast(88%) sepia(20%)' } },
    { name: 'Film', class: 'filter-film', style: { filter: 'contrast(110%) brightness(95%) saturate(80%) sepia(15%)' } },
    // New presets
    { name: 'Vintage', class: 'filter-vintage', style: { filter: 'sepia(60%) hue-rotate(-15deg) saturate(140%) brightness(90%) contrast(105%)' } },
    { name: 'Neon', class: 'filter-neon', style: { filter: 'saturate(200%) hue-rotate(20deg) contrast(120%) brightness(105%)' } },
    { name: 'Retro', class: 'filter-retro', style: { filter: 'sepia(30%) saturate(120%) contrast(95%) brightness(100%) hue-rotate(10deg) invert(5%)' } },
];
