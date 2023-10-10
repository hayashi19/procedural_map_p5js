function generateFlowFieldNoise(offsets, frequency, amplitude, octave, lacunarity, persistence, noiseScale, cellSize) {
    const widthCells = Math.floor(width / cellSize);
    const heightCells = Math.floor(height / cellSize);

    const noiseGrid = Array.from({length: widthCells}, () => Array(heightCells).fill({x: 0, y: 0}));

    for (let x = 0; x < widthCells; x++) {
        for (let y = 0; y < heightCells; y++) {
            let angle = fractalNoise(x, y, 0, offsets, noiseScale, frequency, amplitude, lacunarity, persistence, octave) * Math.PI * 2;
            let v = {x: Math.cos(angle), y: Math.sin(angle)};
            noiseGrid[x][y] = v;
        }
    }

    return noiseGrid;
}
