const start_color = "FFFFFF"
const middle_color = "ffb702"
const end_color = "#ff3902"
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        }
        : null;
}
// returns an array of startColor, colors between according to steps, and endColor
function getRamp(startColor, endColor, steps) {
    var ramp = [];

    ramp.push(startColor);

    var startColorRgb = hexToRgb(startColor);
    var endColorRgb = hexToRgb(endColor);

    var rInc = Math.round((endColorRgb.r - startColorRgb.r) / (steps + 1));
    var gInc = Math.round((endColorRgb.g - startColorRgb.g) / (steps + 1));
    var bInc = Math.round((endColorRgb.b - startColorRgb.b) / (steps + 1));

    for (var i = 0; i < steps; i++) {
        startColorRgb.r += rInc;
        startColorRgb.g += gInc;
        startColorRgb.b += bInc;

        ramp.push(rgbToHex(startColorRgb.r, startColorRgb.g, startColorRgb.b));
    }
    ramp.push(endColor);

    return ramp;
}


const firstHalf = getRamp(start_color, middle_color, 48)
const secondHalf = getRamp(middle_color, end_color, 48)

// console.log([...firstHalf, ...secondHalf])

const list_colors = [
    '#FFFFFF',
    '#fffefa',
    '#fffdf5',
    '#fffcf0',
    '#fffbeb',
    '#fffae6',
    '#fff9e1',
    '#fff8dc',
    '#fff7d7',
    '#fff6d2',
    '#fff5cd',
    '#fff4c8',
    '#fff3c3',
    '#fff2be',
    '#fff1b9',
    '#fff0b4',
    '#ffefaf',
    '#ffeeaa',
    '#ffeda5',
    '#ffeca0',
    '#ffeb9b',
    '#ffea96',
    '#ffe991',
    '#ffe88c',
    '#ffe787',
    '#ffe682',
    '#ffe57d',
    '#ffe478',
    '#ffe373',
    '#ffe26e',
    '#ffe169',
    '#ffe064',
    '#ffdf5f',
    '#ffde5a',
    '#ffdd55',
    '#ffdc50',
    '#ffdb4b',
    '#ffda46',
    '#ffd941',
    '#ffd83c',
    '#ffd737',
    '#ffd632',
    '#ffd52d',
    '#ffd428',
    '#ffd323',
    '#ffd21e',
    '#ffd119',
    '#ffd014',
    '#ffcf0f',
    '#ffb702',
    '#ffb702',
    '#ffb402',
    '#ffb102',
    '#ffae02',
    '#ffab02',
    '#ffa802',
    '#ffa502',
    '#ffa202',
    '#ff9f02',
    '#ff9c02',
    '#ff9902',
    '#ff9602',
    '#ff9302',
    '#ff9002',
    '#ff8d02',
    '#ff8a02',
    '#ff8702',
    '#ff8402',
    '#ff8102',
    '#ff7e02',
    '#ff7b02',
    '#ff7802',
    '#ff7502',
    '#ff7202',
    '#ff6f02',
    '#ff6c02',
    '#ff6902',
    '#ff6602',
    '#ff6302',
    '#ff6002',
    '#ff5d02',
    '#ff5a02',
    '#ff5702',
    '#ff5402',
    '#ff5102',
    '#ff4e02',
    '#ff4b02',
    '#ff4802',
    '#ff4502',
    '#ff4202',
    '#ff3f02',
    '#ff3c02',
    '#ff3902',
    '#ff3602',
    '#ff3302',
    '#ff3002',
    '#ff2d02',
    '#ff2a02',
    '#ff2702',
    '#ff3902',
    '#ff0202']

const colors = {}
for (const color in list_colors) {
    colors[color] = list_colors[color]
}
export { colors }
