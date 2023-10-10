function calculateSeaLevel(elevationGrid, seaLevelFactor = 0.5) {
    const flattenedElevation = elevationGrid.flat();
    const sortedElevation = [...flattenedElevation].sort((a, b) => a - b);

    // Calculate the sea level as a percentage of the elevation range
    const seaLevelIndex = Math.floor(sortedElevation.length * seaLevelFactor);
    const seaLevel = sortedElevation[seaLevelIndex];

    return seaLevel;
}

// DRAW MAP
function colorMap(noiseValue, seaLevel, isColored = false) {
    if (isColored) {
        if (noiseValue < (seaLevel - 0.08)) fill('#213555');  // Below sea level
        else if (noiseValue < (seaLevel)) fill('#4F709C');
        else if (noiseValue < (seaLevel + 0.12)) fill('#DAC0A3');
        else if (noiseValue < (seaLevel + 0.24)) fill('#EADBC8');
        else fill('#F8F0E5');
    } else {
        let gray = map(noiseValue, 0, 1, 0, 255);
        fill(gray);
    }
}

function drawNoise(noiseGrid, cellSize, seaLevel, isColored = false) {
    const widthCells = Math.floor(width / cellSize);
    const heightCells = Math.floor(height / cellSize);

    for (let x = 0; x < widthCells; x++) {
        for (let y = 0; y < heightCells; y++) {

            colorMap(
                noiseValue = noiseGrid[x][y],
                seaLevel = seaLevel,
                isColored = isColored
            );

            square(x * cellSize, y * cellSize, cellSize);

            noStroke();
            smooth();
        }
    }
}