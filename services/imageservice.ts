import { IMAGE_FILE_LOCATION } from "../server";

const p5Import = require("node-p5");
const seedrandom = require("seedrandom");

export module ImageService {
  export const generateArt = (
    seedString: String,
    artConfig: any,
    uploadCallBack: Function
  ) => {
    const config = {
      STRING_SEED: seedString,
      BACKGROUND_TYPE: artConfig.BackgroundType,
      SHAPE_BORDER: artConfig.borderType,
      SHAPE_TYPE: artConfig.ShapeType,
    };
    p5Import.registerMethod("getConfig", () => {
      return config;
    });
    p5Import.registerMethod("uploadFunction", (val: String) => {
      uploadCallBack(val);
    });

    const sketch = (p5: any) => {
      let Cfg: any;
      var points: any[] = [];
      var r1 = 0;
      var r2 = 0;
      var g1 = 0;
      var g2 = 0;
      var b1 = 0;
      var b2 = 0;
      const RESOLUTION = 1080;
      const CIRCLE_RADIUS = RESOLUTION / 3;
      const CIRCLE_DIAMETER = (RESOLUTION / 3) * 2;
      const SQUARE_SIZE = RESOLUTION / 2;
      var mult = 0;
      var canvas: any;
      var angle_func_a: any;
      var angle_func_b: any;

      const get_angle_function_from_string = (value: string, p5: any) => {
        switch (value) {
          case "tan":
            return (angle: any) => p5.tan(angle);
          case "sin":
            return (angle: any) => p5.sin(angle);
          case "cos":
            return (angle: any) => p5.cos(angle);
          case "inverse_tan":
            return (angle: any) => 1 / p5.tan(angle);
          case "inverse_sin":
            return (angle: any) => 1 / p5.sin(angle);
          case "inverse_cos":
            return (angle: any) => 1 / p5.cos(angle);
        }
        return (angle: any) => p5.sin(angle);
      };

      // @ts-ignore
      function shuffleArray(array: any[]) {
        for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      }

      p5.setup = () => {
        canvas = p5.createCanvas(RESOLUTION, RESOLUTION);
        Cfg = p5.getConfig();
        p5.smooth();
        p5.angleMode(p5.DEGREES);
        p5.frameRate(160);
        const NUMBER_SEED = seedrandom(Cfg.STRING_SEED + "\0").int32();
        p5.randomSeed(NUMBER_SEED);
        p5.noiseSeed(NUMBER_SEED);

        const NOISE_FACTORS = [0.5, 1, 1.5, 2, 2.5, 3];
        const REVERSED_NOISE_FACTORS = NOISE_FACTORS.reverse();
        p5.noiseDetail(
          p5.random(NOISE_FACTORS),
          p5.random(REVERSED_NOISE_FACTORS)
        );

        const ANGLE_FUNC_OPTIONS = [
          "sin",
          "cos",
          "tan",
          "inverse_sin",
          "inverse_cos",
          "inverse_tan",
        ];
        const REVERSED_ANGLE_FUNC_OPTIONS = ANGLE_FUNC_OPTIONS.reverse();
        angle_func_a = get_angle_function_from_string(
          p5.random(ANGLE_FUNC_OPTIONS),
          p5
        );
        angle_func_b = get_angle_function_from_string(
          p5.random(REVERSED_ANGLE_FUNC_OPTIONS),
          p5
        );

        const DENSITY = p5.random(500, 1500);
        var space = p5.width / DENSITY;

        // Initial points in pixel
        for (var x = 0; x < p5.width; x += space) {
          for (var y = 0; y < p5.height; y += space) {
            var p = p5.createVector(
              x + p5.random(-10, 10),
              y + p5.random(-10, 10)
            );
            points.push(p);
          }
        }
        shuffleArray(points);
        // p5.shuffle(points, true);
        r1 = p5.random(255);
        r2 = p5.random(255);
        g1 = p5.random(255);
        g2 = p5.random(255);
        b1 = p5.random(255);
        b2 = p5.random(255);
        p5.background(0);
        // Background Gradient
        if (Cfg.BACKGROUND_TYPE === 1) {
          p5.background(40);
          let c1 = p5.color(0);
          let c2 = p5.color(
            p5.floor(r1 - 60),
            p5.floor(g1 - 60),
            p5.floor(b1 - 60)
          );
          let c3 = p5.color(
            p5.floor(r1 - 60),
            p5.floor(g2 - 60),
            p5.floor(b2 - 60)
          );

          for (let y = 0; y < p5.height; y++) {
            let n = p5.map(y, 0, p5.height, 0, 1);
            let selected_color = 0;
            if (y % 2) {
              selected_color = c2;
            } else {
              selected_color = c3;
            }
            let newc = p5.lerpColor(selected_color, c1, n);
            p5.stroke(newc);
            p5.line(0, y, p5.width, y);
          }
        }

        mult = p5.random(0.0005, 0.01);

        if (Cfg.SHAPE_BORDER === 0) {
          // no border around shape if no stroke is on
          p5.noStroke();
        }

        // draw shape
        p5.fill(15, 15, 15, 25);
        if (Cfg.SHAPE_TYPE === 1) {
          p5.circle(p5.width / 2, p5.height / 2, CIRCLE_DIAMETER);
        } else if (Cfg.SHAPE_TYPE === 2) {
          p5.rect(p5.width / 4, p5.height / 4, SQUARE_SIZE, SQUARE_SIZE);
        }
        
      };

      p5.draw = () => {
        if (p5.frameCount > 1500) {
          p5.noLoop();
          p5.saveCanvas(
            canvas,
            `${IMAGE_FILE_LOCATION}/${Cfg.STRING_SEED}`,
            "png"
          ).then(() => {
            p5.uploadFunction(`${IMAGE_FILE_LOCATION}/${Cfg.STRING_SEED}.png`);
          });
        }

        p5.noStroke();
        var max = 0;
        if (p5.frameCount * 2 <= points.length) {
          max = p5.frameCount * 2;
        } else {
          max = points.length;
        }

        for (var i = 0; i < max; i++) {
          var r = p5.map(points[i].x, 0, p5.width, r1, r2);
          var g = p5.map(points[i].y, 0, p5.height, g1, g2);
          var b = p5.map(points[i].x, 0, p5.width, b1, b2);

          var alpha;
          if (Cfg.SHAPE_TYPE === 0) {
            alpha = p5.map(
              p5.dist(p5.width / 2, p5.height / 2, points[i].x, points[i].y),
              0,
              Cfg.RESOLUTION,
              700,
              0
            );
          } else if (Cfg.SHAPE_TYPE === 1) {
            alpha = p5.map(
              p5.dist(p5.width / 2, p5.height / 2, points[i].x, points[i].y),
              0,
              CIRCLE_RADIUS,
              700,
              0
            );
          } else if (Cfg.SHAPE_TYPE === 2) {
            alpha = p5.map(
              p5.dist(p5.width / 2, p5.height / 2, points[i].x, points[i].y),
              0,
              SQUARE_SIZE,
              700,
              0
            );
          }

          p5.fill(r, g, b, alpha);

          var angle = p5.map(
            p5.noise(points[i].x * mult, points[i].y * mult),
            0,
            1,
            0,
            720
          );

          // tan makes straight vectors, sin/cos make curvy ones
          points[i].add(
            p5.createVector(angle_func_a(angle), angle_func_b(angle))
          );

          if (Cfg.SHAPE_TYPE === 0) {
            p5.ellipse(points[i].x, points[i].y, 1, p5.random(3));
          } else if (Cfg.SHAPE_TYPE === 1) {
            if (
              p5.dist(p5.width / 2, p5.height / 2, points[i].x, points[i].y) <
              CIRCLE_DIAMETER
            ) {
              p5.ellipse(points[i].x, points[i].y, 1, p5.random(3));
            }
          } else if (Cfg.SHAPE_TYPE === 2) {
            if (
              points[i].x > (SQUARE_SIZE - SQUARE_SIZE / 2)+2 &&
              points[i].x < (SQUARE_SIZE + SQUARE_SIZE / 2)-2 &&
              points[i].y > (SQUARE_SIZE - SQUARE_SIZE / 2)+2 &&
              points[i].y < (SQUARE_SIZE + SQUARE_SIZE / 2)-2
            ) {
              p5.ellipse(points[i].x, points[i].y, 1, p5.random(3));
            }
          }
        }
      };
    };
    p5Import.createSketch(sketch);
  };
}
