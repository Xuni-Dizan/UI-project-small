let progress = 0; // Biến kiểm soát độ tiến của chữ
let targetProgress = 0; // Tiến độ mục tiêu để làm mượt chuyển động
let signatureDrawn = false; // Đảm bảo chỉ vẽ khi phần tử vào viewport

let isScrolling = false; // Cờ để kiểm tra khi nào người dùng cuộn trang

function setup() {
    const canvas = createCanvas(240, 190); // Tạo canvas
    canvas.parent('footer-signature'); // Gắn canvas vào div có id là 'footer-signature'
    
    // Di chuyển canvas ra chính giữa (khi canvas có kích thước 240x190 và container có kích thước 400x400)
    canvas.position((400 - 240) / 2, (400 - 190) / 2); // Căn giữa canvas

    noFill();
    strokeWeight(2);
    stroke(0);
    frameRate(60); // Cải thiện hiệu suất vẽ với tốc độ 60 FPS
}


function draw() {
    background(0, 0); // Đặt nền trong suốt

    // Tăng tiến độ
    targetProgress += 0.005; // Tăng dần
    progress = lerp(progress, targetProgress, 0.1); // Làm mượt tiến độ

    if (progress > 1) progress = 1; // Giới hạn tiến độ

    // Vẽ từng chữ dựa trên tiến độ
    if (progress >= 0.1) drawD();
    if (progress >= 0.2) drawI();
    if (progress >= 0.4) drawZ();
    if (progress >= 0.6) drawA();
    if (progress >= 0.8) drawN();
}

// Các hàm vẽ chữ (giữ nguyên các hàm này như cũ)

function drawD() {
    curve(334, 16, 31 + 22, 117 + 0, 41 + 22, 119 + 0, 174, -180);
    curve(63, 135, 48 + 22, 117 + 0, 66 + 22, 139 + 0, 80, 198);
    curve(-80, 285, 40 + 22, 121 + 0, -12 + 22, 125 + 0, -18, 212);
    curve(0, 0, 66 + 22, 139 + 0, 6 + 22, 184 + 0, 0, 107);
    curve(360, 325, 12 + 22, 186 + 0, 16 + 22, 176 + 0, 201, 0);
    curve(-5, 193, 11 + 22, 180 + 0, 58 + 22, 127 + 0, 264, 0);
    curve(-17, 200, 80 + 22, 144 + 0, 55 + 22, 130 + 0, -77, 273);
    curve(0, 174, 19 + 22, 123 + 0, 54 + 22, 120 + 0, 73, 160);
}

function drawI() {
    strokeWeight(2);
    curve(250, 29, 68 + 22, 162 + 0, 68 + 22, 180 + 0, 210, 103);
    strokeWeight(3);
    ellipse(95, 158, 1, 1);
    strokeWeight(1);
    curve(178, 48, 84 + 22, 165 + 0, 52 + 22, 179 + 0, 147, 103);
}

function drawZ() {
    strokeWeight(2);
    curve(158, 101, 83 + 22, 162 + 0, 94 + 22, 162 + 0, 68, 171);
    line(95, 187, 119, 162);
    curve(-79, 328, 73 + 22, 187 + 0, 98 + 22, 176 + 0, 310, 10);
}

function drawA() {
    strokeWeight(2);
    beginShape();
    vertex(140, 173);
    bezierVertex(133, 140, 96, 209, 138, 178);
    endShape();
    curve(402, -153, 122 + 22, 164 + 0, 201 + 22, 185 + 0, 490, 398);
}

function drawN() {
    strokeWeight(2);
    curve(57, 311, 120 + 22, 185 + 0, 138 + 22, 188 + 0, -6, 446);
    curve(57, 392, 144 + 22, 177 + 0, 165 + 22, 187 + 0, -6, 180);
}


// Kiểm tra nếu footer nằm trong viewport
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
}

// Lắng nghe sự kiện cuộn
document.addEventListener('scroll', function () {
    const footer = document.querySelector('.footer-signature');

    // Kiểm tra nếu footer vào trong viewport và chưa bắt đầu vẽ lại
    if (isInViewport(footer)) {
        if (!isScrolling) { // Kiểm tra để tránh lặp lại quá nhiều lần
            isScrolling = true; // Đánh dấu là đang cuộn
            signatureDrawn = false; // Cho phép vẽ lại
            progress = 0; // Đặt lại tiến độ về 0
            targetProgress = 0; // Đặt lại mục tiêu tiến độ về 0
            loop(); // Bắt đầu vẽ lại
        }
    } else {
        isScrolling = false; // Đặt lại cờ khi footer không còn trong viewport
    }
});
