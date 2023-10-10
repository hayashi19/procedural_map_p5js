function generateErosionNoise(offsets, frequency, amplitude, octave, lacunarity, persistence, noiseScale, cellSize) {
    const widthCells = Math.floor(width / cellSize);
    const heightCells = Math.floor(height / cellSize);
    let minNoiseHeight = Infinity;
    let maxNoiseHeight = -Infinity;

    const noiseGrid = Array.from({length: widthCells}, () => Array(heightCells).fill(0));

    for (let x = 0; x < widthCells; x++) {
        for (let y = 0; y < heightCells; y++) {
            let noiseXOff = fractalNoise(x, y, 0, offsets, noiseScale, frequency, amplitude, lacunarity, persistence, octave);
            let noiseYOff = fractalNoise(x + 5, y + 2, 0, offsets, noiseScale, frequency, amplitude, lacunarity, persistence, octave);
            let noiseValue = fractalNoise(x * noiseXOff, y * noiseYOff, 0, offsets, noiseScale, frequency, amplitude, lacunarity, persistence, octave);

            minNoiseHeight = Math.min(minNoiseHeight, noiseValue);
            maxNoiseHeight = Math.max(maxNoiseHeight, noiseValue);

            if (noiseValue < 0.42) noiseValue = map(noiseValue, 0, 0.42, 0.4, 0.48);
            else noiseValue = map(noiseValue, 0.42, 1, 0.48, 1);

            noiseGrid[x][y] = noiseValue;
        }
    }

    // Normalize the noise values
    for (let x = 0; x < widthCells; x++) {
        for (let y = 0; y < heightCells; y++) {
            noiseGrid[x][y] = map(noiseGrid[x][y], minNoiseHeight, maxNoiseHeight, 0, 1);
        }
    }

    return noiseGrid;
}
