var canvas = document.createElement("canvas"),
  width = (canvas.width = window.innerWidth),
  height = (canvas.height = window.innerHeight / 2),
  halfWidth = width / 2,
  halfHeight = height / 4,
  fov = 200,
  offsetX = 0,
  offsetY = 0,
  mouseX = 0,
  mouseY = 0;

var context = canvas.getContext("2d");
document.body.appendChild(canvas);

// set up an grid of 3D Pixels in undulating waves
var pixels = [];

amount_of_pixels = 200;

for (var x = -amount_of_pixels; x < amount_of_pixels; x += 6) {
  for (var z = -amount_of_pixels; z < amount_of_pixels; z += 6) {
    var zOscillation = Math.sin(z * ((Math.PI * 4) / amount_of_pixels));
    var xOscillation = Math.sin((x + z) * ((Math.PI * 2) / amount_of_pixels));
    max = 255;
    min = 1;
    // Custom to make the site look cooler with Blue and Green
    const pixel_r = Math.floor(Math.random() * (50 - 0 + 1)) + 0;
    const pixel_g = Math.floor(Math.random() * (max - min + 1)) + min;
    const pixel_b = Math.floor(Math.random() * (max - min + 1)) + min;
    var pixel = new Pixel3D(
      x,
      (zOscillation + xOscillation) * 14 + 30,
      z,
      pixel_r,
      pixel_g,
      pixel_b
    );
    pixels.push(pixel);
  }
}

// call the render function 30 times a second
setInterval(render, 1000 / 45);

function render() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight / 2;
  (halfWidth = width / 2),
    (halfHeight = height / 4),
    // clear the canvas
    context.clearRect(0, 0, width, height);
  // and get the imagedata out of it

  var imagedata = context.getImageData(0, 0, canvas.width, canvas.height);

  // iterate through every point in the array
  var i = pixels.length;
  while (i--) {
    var pixel = pixels[i];

    // here's the 3D to 2D formula, first work out
    // scale for that pixel's z position (distance from
    // camera)
    var scale = fov / (fov + pixel.z);
    // and multiply our 3D x and y to get our
    // 2D x and y. Add halfWidth and halfHeight
    // so that our 2D origin is in the middle of
    // the screen.
    var x2d = (pixel.x + offsetX) * scale + halfWidth;
    var y2d = (pixel.y + offsetY) * scale + halfHeight;

    // and set that 2D pixel to be green
    setPixel(imagedata, x2d, y2d, pixel);

    // add 1 to the z position to bring it a little
    // closer to the camera each frame
    pixel.z -= 1;
    // if it's now too close to the camera,
    // move it to the back
    if (pixel.z < -fov) pixel.z += fov * 2;
  }

  // and write all those pixel values into the canvas
  context.putImageData(imagedata, 0, 0);
}

function setPixel(imagedata, x, y, pixel) {
  if (x < 0 || x > width || y < 0 || y > width) return;

  var i = ((y >> 0) * imagedata.width + (x >> 0)) * 4;

  imagedata.data[i] = pixel.r;
  imagedata.data[i + 1] = pixel.g;
  imagedata.data[i + 2] = pixel.b;
  imagedata.data[i + 3] = 255;
}

function Pixel3D(x, y, z, r, g, b) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.r = r;
  this.g = g;
  this.b = b;
}
