import React from "react";
import Sketch from "react-p5";
import { Typography } from "@mui/material";

const RESOLUTION = 720;
const CIRCLE_RADIUS = RESOLUTION / 3;
const CIRCLE_DIAMETER = (RESOLUTION / 3) * 2;
const SQUARE_SIZE = RESOLUTION / 2;

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

class GeneratorDiv extends React.Component<{
  BACKGROUND_TYPE: number;
  SHAPE_TYPE: number;
  SHAPE_BORDER: number;
  SEED_STRING: string;
}> {
  points: any[];
  r1: number;
  r2: number;
  g1: number;
  g2: number;
  b1: number;
  b2: number;
  mult: any;
  angle_func_a: Function;
  angle_func_b: Function;
  SEED_NUMBER: number;
  SEED_STRING: string;

  constructor(props: any) {
    super(props);
    this.points = [];
    this.r1 = 0;
    this.r2 = 0;
    this.g1 = 0;
    this.g2 = 0;
    this.b1 = 0;
    this.b2 = 0;
    this.mult = 0;
    this.angle_func_a = () => {};
    this.angle_func_b = () => {};
    var seedrandom = require("seedrandom");
    this.SEED_STRING = props.SEED_STRING;
    this.SEED_NUMBER = seedrandom(props.SEED_STRING).int32();
  }

  // @ts-ignore
  setup = (p5, canvasParentRef) => {
    p5.createCanvas(RESOLUTION, RESOLUTION).parent(canvasParentRef);
    p5.smooth();
    p5.angleMode(p5.DEGREES);
    p5.frameRate(160);
    p5.randomSeed(this.SEED_NUMBER);
    p5.noiseSeed(this.SEED_NUMBER);

    const NOISE_FACTORS = [0.5, 1, 1.5, 2, 2.5, 3];
    const REVERSED_NOISE_FACTORS = NOISE_FACTORS.reverse();
    p5.noiseDetail(p5.random(NOISE_FACTORS), p5.random(REVERSED_NOISE_FACTORS));
    const ANGLE_FUNC_OPTIONS = [
      "sin",
      "cos",
      "tan",
      "inverse_sin",
      "inverse_cos",
      "inverse_tan",
    ];
    const REVERSED_ANGLE_FUNC_OPTIONS = ANGLE_FUNC_OPTIONS.reverse();
    this.angle_func_a = get_angle_function_from_string(
      p5.random(ANGLE_FUNC_OPTIONS),
      p5
    );
    this.angle_func_b = get_angle_function_from_string(
      p5.random(REVERSED_ANGLE_FUNC_OPTIONS),
      p5
    );

    const DENSITY = p5.random(500, 1500);
    var space = p5.width / DENSITY;

    // Initial points in pixel
    for (var x = 0; x < p5.width; x += space) {
      for (var y = 0; y < p5.height; y += space) {
        var p = p5.createVector(x + p5.random(-10, 10), y + p5.random(-10, 10));
        // @ts-ignore
        this.points.push(p);
      }
    }
    p5.shuffle(this.points, true);
    this.r1 = p5.random(255);
    this.r2 = p5.random(255);
    this.g1 = p5.random(255);
    this.g2 = p5.random(255);
    this.b1 = p5.random(255);
    this.b2 = p5.random(255);
    p5.background(0);

    if (this.props.BACKGROUND_TYPE === 1) {
      p5.background(40);
      var c1 = p5.color(0);
      var c2 = p5.color(
        p5.floor(this.r1 - 60),
        p5.floor(this.g1 - 60),
        p5.floor(this.b1 - 60)
      );
      var c3 = p5.color(
        p5.floor(this.r1 - 60),
        p5.floor(this.g2 - 60),
        p5.floor(this.b2 - 60)
      );

      for (let y = 0; y < p5.height; y++) {
        var n = p5.map(y, 0, p5.height, 0, 1);
        var selected_color = 0;
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

    this.mult = p5.random(0.0005, 0.01);

    p5.fill(15, 25);
    if (this.props.SHAPE_BORDER === 0) {
      // draw circle (color, alpha value(transparency))
      // border around shape if no stroke is on
      p5.noStroke();
    }
    // create shadow for circle
    p5.drawingContext.shadowOffsetX = 5;
    p5.drawingContext.shadowOffsetY = -5;
    p5.drawingContext.shadowBlur = 10;
    p5.drawingContext.shadowColor = "black";

    // draw shape
    if (this.props.SHAPE_TYPE === 1) {
      p5.circle(p5.width / 2, p5.height / 2, CIRCLE_DIAMETER);
    } else if (this.props.SHAPE_TYPE === 2) {
      p5.rect(p5.width / 4, p5.height / 4, SQUARE_SIZE, SQUARE_SIZE);
    }
    p5.drawingContext.shadowOffsetX = 0;
    p5.drawingContext.shadowOffsetY = 0;
    p5.drawingContext.shadowBlur = 0;
  };

  // @ts-ignore
  draw = (p5) => {
    if (p5.frameCount > 1500) {
      p5.noLoop();
    }

    p5.noStroke();
    var max = 0;
    if (p5.frameCount * 2 <= this.points.length) {
      max = p5.frameCount * 2;
    } else {
      max = this.points.length;
    }

    for (var i = 0; i < max; i++) {
      var r = p5.map(this.points[i].x, 0, p5.width, this.r1, this.r2);
      var g = p5.map(this.points[i].y, 0, p5.height, this.g1, this.g2);
      var b = p5.map(this.points[i].x, 0, p5.width, this.b1, this.b2);

      var alpha;
      if (this.props.SHAPE_TYPE === 0) {
        alpha = p5.map(
          p5.dist(
            p5.width / 2,
            p5.height / 2,
            this.points[i].x,
            this.points[i].y
          ),
          0,
          RESOLUTION,
          700,
          0
        );
      } else if (this.props.SHAPE_TYPE === 1) {
        alpha = p5.map(
          p5.dist(
            p5.width / 2,
            p5.height / 2,
            this.points[i].x,
            this.points[i].y
          ),
          0,
          CIRCLE_RADIUS,
          700,
          0
        );
      } else if (this.props.SHAPE_TYPE === 2) {
        alpha = p5.map(
          p5.dist(
            p5.width / 2,
            p5.height / 2,
            this.points[i].x,
            this.points[i].y
          ),
          0,
          SQUARE_SIZE,
          700,
          0
        );
      }

      p5.fill(r, g, b, alpha);

      var angle = p5.map(
        p5.noise(this.points[i].x * this.mult, this.points[i].y * this.mult),
        0,
        1,
        0,
        720
      );
      this.points[i].add(
        p5.createVector(this.angle_func_a(angle), this.angle_func_b(angle))
      );

      if (this.props.SHAPE_TYPE === 0) {
        p5.ellipse(this.points[i].x, this.points[i].y, 1, p5.random(3));
      } else if (this.props.SHAPE_TYPE === 1) {
        if (
          p5.dist(
            p5.width / 2,
            p5.height / 2,
            this.points[i].x,
            this.points[i].y
          ) < CIRCLE_DIAMETER
        ) {
          p5.ellipse(this.points[i].x, this.points[i].y, 1, p5.random(3));
        }
      } else if (this.props.SHAPE_TYPE === 2) {
        if (
          this.points[i].x > SQUARE_SIZE - SQUARE_SIZE / 2 &&
          this.points[i].x < SQUARE_SIZE + SQUARE_SIZE / 2 &&
          this.points[i].y > SQUARE_SIZE - SQUARE_SIZE / 2 &&
          this.points[i].y < SQUARE_SIZE + SQUARE_SIZE / 2
        ) {
          p5.ellipse(this.points[i].x, this.points[i].y, 1, p5.random(3));
        }
      }
    }
  };

  render() {
    return (
      <>
        <Typography align="center">{`Seed: ${this.SEED_STRING}`}</Typography>
        <br />
        <div
          className="gradient-border"
          style={{
            width: "720px",
            height: "720px",
            margin: "0 auto",
          }}
        >
          <Sketch setup={this.setup} draw={this.draw} />
        </div>
      </>
    );
  }
}

export default GeneratorDiv;
