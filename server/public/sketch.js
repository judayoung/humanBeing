/* 주요 함수 1.
- 호출되고 한번 실행된다. 프로젝트의 기본값을 설정하는데 사용할 수 있다.  

*/
let font;
const canvasWidth = 400;
const canvasHeight = 600;

function preload() {
    font = loadFont('/font/Inconsolata.otf');
}

function setup() {
    // 캔버스 그리기
    createCanvas(canvasWidth, canvasHeight, WEBGL); // WEBGL은 0,0이 중앙에 위치한다.
    // createCanvas(600, 400); // 0,0이 좌측 상단에 위치한다.
}

/* 주요 함수 2.
- setup() 함수를 초당 60회씩 프로그램이 중지되거나 noLoop() 함수가 호출될 때까지 직접 호출되어 
*/
function draw() {
    const backgroundColor = color(135, 206, 235, 255);
    background(backgroundColor);

    const division = 10;
    const divisionWidth = canvasWidth / division;
    const divisionHeight = canvasHeight / division;
    console.log('divisionHeight', divisionHeight);

    // 전체 캔버스 높이를 division으로 나누어서 점을 찍는다.
    const pointColor = 'gray';
    fill(pointColor);
    textFont(font);
    textSize(20);
    for (let i = 0; i < division + 1; i++) {
        const y = 0 - canvasHeight / 2 + divisionHeight * i;
        const xStart = 0 - canvasWidth / 2;
        let x = xStart;

        text(`${i}`, x + 10, y);

        for (let j = 0; j < division + 1; j++) {
            x = xStart + divisionWidth * j;
            circle(x, y, 5);
        }
    }

    const skinColor = color(255, 213, 196);
    fill(skinColor);

    const headY = 0 - canvasHeight / 2 + divisionHeight * 1.5; // 1.5 번째 높이의 점
    const headHeight = divisionHeight;
    const neckWidth = divisionWidth / 2.5;
    const neckHeight = divisionHeight / 3;
    const upperBodyWidth = divisionWidth * 2;
    const upperBodyHeight = divisionHeight * 2.5;
    const groinWidth = divisionWidth * 2.2;
    const groinHeight = divisionHeight * 1;
    const legWidth = divisionWidth * 0.85;
    // 전체 divisionHeight * 8에서 headHeight, neckHeight, upperBodyHeight, groinHeight를 뺀다.
    const legHeight =
        divisionHeight * 8 -
        headHeight -
        neckHeight -
        upperBodyHeight -
        groinHeight;
    const armWidth = divisionWidth * 0.5;
    const armHeight = divisionHeight * 3;
    const armAngle = (2 * PI) / 16;

    // 몸이 이어지게 그린다.
    const head = circle(0, headY, headHeight); //
    const neck = rect(
        0 - neckWidth / 2,
        headY + divisionHeight / 2,
        neckWidth,
        neckHeight,
    );
    const upperBody = rect(
        0 - upperBodyWidth / 2,
        headY + divisionHeight / 2 + neckHeight,
        upperBodyWidth,
        upperBodyHeight,
    );
    const groin = rect(
        0 - groinWidth / 2,
        headY + divisionHeight / 2 + neckHeight + upperBodyHeight,
        groinWidth,
        groinHeight,
    );
    const leftLeg = rect(
        0 - groinWidth / 2,
        headY + divisionHeight / 2 + neckHeight + upperBodyHeight + groinHeight,
        legWidth,
        legHeight,
    );
    const rightLeg = rect(
        0 + groinWidth / 2 - legWidth,
        headY + divisionHeight / 2 + neckHeight + upperBodyHeight + groinHeight,
        legWidth,
        legHeight,
    );
    const leftArm = rect(
        0 - upperBodyWidth / 2 - armWidth,
        headY + divisionHeight / 2 + neckHeight,
        armWidth,
        armHeight,
    );
    const rightArm = rect(
        0 + upperBodyWidth / 2,
        headY + divisionHeight / 2 + neckHeight,
        armWidth,
        armHeight,
    );
}
