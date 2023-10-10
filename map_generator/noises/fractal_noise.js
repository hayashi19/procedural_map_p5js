function fractalNoise(x, y, z, offsets, noiseScale, frequency, amplitude, lacunarity, persistence, octaves) {
    let noiseVal = 0;
    for (let i = 0; i < octaves; i++) {
        const sampleX = (x / noiseScale * frequency) + offsets.x;
        const sampleY = (y / noiseScale * frequency) + offsets.y;
        const sampleZ = (z / noiseScale * frequency) + offsets.z;

        noiseVal += noise(sampleX * frequency, sampleY * frequency, 0) * amplitude;
        frequency *= lacunarity;
        amplitude *= persistence;
    }
    return noiseVal;
}