// UI
function createCustomLabel(text, xP, yP) {
    let stylePadding = 16;
    let label = createSpan(text);
    // label.style('color', 'white');
    label.style('font-family', 'Arial');
    // label.position(xP + stylePadding, yP + stylePadding);

    return label;
}

function uiSetup() {
    if (xPostLabel) xPostLabel.remove();
    xPostLabel = createCustomLabel(`X Post: ${noiseXOff}`, xp = 0, yP = 0);
    if (yPostLabel) yPostLabel.remove();
    yPostLabel = createCustomLabel(`Y Post: ${noiseYOff}`, xp = 0, yP = 24);

    if (seaLevelLabel) seaLevelLabel.remove();
    seaLevelLabel = createCustomLabel(`Sea level: ${seaLevelV}`, xp = 0, yP = 48);
}