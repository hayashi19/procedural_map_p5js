// MASK
function smoothstep(minSmooth, maxSmooth, value) {
    const x = Math.max(0, Math.min(1, (value - minSmooth) / (maxSmooth - minSmooth)));
    return x * x * (3 - 2 * x);
}

function generateIslandMaskNoise(cellSize, offsets, maskWidth = 1, maskHeight = 1, maskScale = 100, smoothness = 0.5) {
    const noiseGrid = [];
    const widthCells = Math.floor(width / cellSize);
    const heightCells = Math.floor(height / cellSize);

    const centerX = Math.floor(widthCells * 0.5);
    const centerY = Math.floor(heightCells * 0.5);

    smoothness = smoothness * (maskScale * 0.49999);
    if (smoothness > (maskScale * 0.49999)) {
        smoothness = (maskScale * 0.49999);
    }

    for (let x = 0; x < widthCells; x++) {
        noiseGrid[x] = [];
        for (let y = 0; y < heightCells; y++) {
            let resampleX = ((x - centerX - offsets.x) * (1 / maskWidth)) ** 2;
            let resampleY = ((y - centerY - offsets.y) * (1 / maskHeight)) ** 2;

            let distanceToCenter = Math.sqrt(resampleX + resampleY);
            let noiseValue = 0;

            if (distanceToCenter <= maskScale * 0.5) {
                noiseValue = smoothstep(maskScale * 0.5, smoothness, distanceToCenter);
            }

            noiseGrid[x][y] = noiseValue;
        }
    }
    return noiseGrid;
}