/* 주요 함수 1.
- 호출되고 한번 실행된다. 프로젝트의 기본값을 설정하는데 사용할 수 있다.  

*/
function setup() {
    // 캔버스 그리기
    createCanvas(600, 400, WEBGL); // WEBGL은 0,0이 중앙에 위치한다.
    // createCanvas(600, 400); // 0,0이 좌측 상단에 위치한다.
}

/* 주요 함수 2.
- setup() 함수를 초당 60회씩 프로그램이 중지되거나 noLoop() 함수가 호출될 때까지 직접 호출되어 
*/
function draw() {
    // 배경색. int, float, color, string, image, p5.Color 객체를 받을 수 있다.
    const c1 = color(135, 206, 235, 255);
    const c2 = color(135, 206, 235, 100);
    if (mouseIsPressed) {
        background(c1);
    } else {
        background(c2);
    }

    if (mouseIsPressed) {
        fill('red');
    } else {
        fill('green');
    }

    // 원 그리기
    circle(mouseX, mouseY, 100);

    if (mouseIsPressed) {
        // 테두리 색상 조정
        stroke('black');
        // 테두리 두께 조정
        strokeWeight(20);
    } else {
        // 테두리 없애기
        noStroke();
    }

    // 사각형 그리기
    square(30, 10, 1);
    square(70, 80, 55);

    // 프레임 카운트를 이용해 움직이는 사각형 그리기
    const x = frameCount % 200;
    let y;
    if (mouseIsPressed) {
        y = (frameCount % 300) + 10;
    } else {
        y = (frameCount % 200) + 10;
    }

    fill('yellow');
    // quad(x1, y1, x2, y2, x3, y3, x4, y4, [detailX], [detailY]
    // quad(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4, [detailX], [detailY])
    // detailX, detailY는 세부 수준을 설정하고, 세부 수준이 높을 수록 도형이 더 부드럽고 정교하게 보인다.
    quad(x, y, x + 50, y, x + 30, y + 20, x, y + 20);

    // 회전 추가
    rotateY(frameCount * 0.01);

    // 사각형 그리기
    fill('red');
    quad(-30, -30, 0, 30, -30, 0, 30, 30, 20, -30, 30, -20);

    // 선 그리기
    stroke('blue');
    strokeWeight(4);
    line(-30, -80, 100, 120);

    // 구체 그리기
    fill('purple');
    noStroke();
    sphere(10);

    // arc 그리기
    fill('orange');
    stroke('black');
    arc(50, 50, 80, 80, 0, PI + HALF_PI);

    rotateY(frameCount * 0.02);
    fill('aqua');
    arc(50, 50, 80, 80, 0, PI + HALF_PI, OPEN);

    rotateY(frameCount * 0.03);
    fill('pink');
    arc(50, 50, 80, 80, 0, PI + HALF_PI, CHORD);

    rotateY(frameCount * 0.04);
    fill('gray');
    arc(50, 50, 80, 80, 0, PI + HALF_PI, PIE);

    rotateY(frameCount * 0.015);
    fill('brown');
    arc(50, 50, 80, 80, 0, PI + HALF_PI, PIE, 5); // 5는 각도의 정밀도를 나타낸다.

    rotateY(0);
    noStroke();
    fill('yellow');
    const biteSize = PI / 16;
    const startAngle = biteSize * sin(frameCount * 0.1) + biteSize;
    const endAngle = TWO_PI - startAngle;
    arc(-200, -200, -100, -100, startAngle, endAngle, PIE);

    // 텍스트 작성
    textSize(75);
    text('Hello p5', 100, 150);

    // 캔버스에 대한 스크린 리더가 접근할 수 있는 설명을 만든다?
    describe(
        `One Circle, two squares on a sky blue background. The circle follows the mouse. The squares are fixed.\n
        Now One yellow quad moves at a constant speed((0,200) -> (${x}, ${y})).\n
        The red quad rotates around the y-axis(Not WEBGL) OR center(WEBGL).\n
        A blue line is drawn from (-30, -80) to (100, 120).\n
        A purple sphere is drawn at the center of the canvas.`,
        LABEL,
    );
}
