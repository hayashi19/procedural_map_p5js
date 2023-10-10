// UI
let seaLevelLabel, xPostLabel, yPostLabel;

// MASK
let maskXOff = 0;
let maskYOff = 0;
const MASK_WIDTH = 2.24;
const MASK_HEIGHT = 1;
const MASK_SCALE = 200;
const SMOOTHNESS = 0.5;

// TERRAIN
const SEED = 0;
const CELL_SIZE = 2;
const OCTAVE = 3;
const LACUNARITY = 2;
const PERSISTENCE = 0.36;
const NOISE_SCALE = 56;
let OFFESTS, MASK_OFFSETS;

const SEA_LEVEL_FACTOR = 0.8;
let seaLevelV = 0;

const PARTICLE_SPEED_FACTOR = 5;

// MAP
let islandMaskNoise, elevationNoise, riverNoise, erosionNoise, heighMap = [];

function setup() {
  createCanvas(windowWidth * 0.5, windowHeight * 0.5);

  noiseSeed(SEED);
  noiseDetail(LACUNARITY, PERSISTENCE);

  OFFESTS = createVector(0, 0, 0);
  MASK_OFFSETS = createVector(0, 0, 0);

  islandMaskNoise = generateIslandMaskNoise(
    CELL_SIZE,
    MASK_OFFSETS,
    MASK_WIDTH,
    MASK_HEIGHT,
    MASK_SCALE,
    SMOOTHNESS
  );

  for (let i = 0; i < num; i++) particles.push(createVector(random(width), random(height)));

  angelT = createP('Angle: ');
  frameRateT = createP('Framerate: ');
  iterationCountT = createP('Iteration: ');

  // noLoop();

  // OFFESTS.set(10, OFFESTS.y, OFFESTS.z);
}

function draw() {
  elevationNoise = generateElevationNoise(
    OFFESTS, 1, 1, OCTAVE, LACUNARITY, PERSISTENCE, NOISE_SCALE, CELL_SIZE
  );

  // erosionNoise = generateErosionNoise(
  //   offsets = OFFESTS,
  //   frequency = 1,
  //   amplitude = 1,
  //   octave = 2,
  //   lacunarity = 2,
  //   persistence = 0.1,
  //   noiseScale = NOISE_SCALE * 0.8,
  //   cellSize = CELL_SIZE
  // );

  for (let i = 0; i < islandMaskNoise.length; i++) {
    heighMap[i] = islandMaskNoise[i].map((value, j) => value * elevationNoise[i][j]);
  }

  seaLevelV = calculateSeaLevel(
    elevationNoise = heighMap,
    seaLevelFactor = SEA_LEVEL_FACTOR
  );

  drawNoise(
    noiseGrid = heighMap,
    cellSize = CELL_SIZE,
    seaLevel = seaLevelV,
    isColored = true
  );

  for (let i = 0; i < num; i++) {
    let p = particles[i];

    let xIndex = Math.floor(p.x / CELL_SIZE);
    let yIndex = Math.floor(p.y / CELL_SIZE);

    let n = heighMap[xIndex][yIndex];
    let magnitude = map(n, 0, 1, TWO_PI, HALF_PI);
    let latitude = map(p.y, 0, height, 90, -90);
    
    let ns = map(latitude, -90, 90, -n, n) * TWO_PI;
    let l = map(n, 0, 1, PI, PI + ns * (PI / 4));
    let a = map(latitude, -35, 35, l, l);

    angle = a;

    let c = map(Math.abs(latitude), 0, 90, 255, 0);
    stroke(c, 0, 50)

    p.x += magnitude * cos(a);
    p.y += magnitude * sin(a);

    if (!onScreen(p)) {
      // p.x = random(width * 0.9, width);
      p.x = random(width);
      // p.x = width - 1;
      p.y = random(height);
    }

    strokeWeight(3);
    point(p.x, p.y);
  }
  iterationCount++;

  if (frameCount % 6 == 0) {
    angelT.html(`Angle: ${angle}`);
    frameRateT.html(`Framerate: ${floor(frameRate())}`);
  }
  iterationCountT.html(`Iteration: ${iterationCount}`);
}

let frameRateT, iterationCountT, angelT;

let particles = [];
const num = 1000;
const limitIteration = 1000;
let iterationCount = 0;
let angle = 0;

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}
