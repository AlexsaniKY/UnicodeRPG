let maxfps = 60;
let frame_length = 1000./ maxfps;
let last_frame_stamp = 0;
let frame_delta = frame_length;
let _context;
let _width;
let _height;
let _tilesetCanvas;

export function setContext(context, width, height){
    _context = context;
    _width = width;
    _height = height;
}

export function setTilesetCanvas(canvas){
    _tilesetCanvas = canvas;
}

export function gameLoop(timestamp) {
    frame_delta = last_frame_stamp + frame_length;
    if (timestamp < frame_delta) {
        //console.log(last_frame_stamp + frame_length - timestamp);
        requestAnimationFrame(gameLoop);
        return;
    }
    last_frame_stamp = timestamp;

    _context.fillStyle = "#F00";
    _context.fillRect(0, 0, _width, _height);
    _context.drawImage(_tilesetCanvas, 0, 0);
    _context.fillStyle = "#000";
    _context.fillRect(32, 48, 16, 16);

    requestAnimationFrame(gameLoop);
}