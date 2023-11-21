import * as THREE from "three";
import { GetImg } from "./common/tools";
import sky_texture from "../images/sky_pink.png";
import chess_board_color from "../images/chess_board_color.png";
import chess_board_normal from "../images/chess_board_normal.png";
import chess_board_roughness from "../images/chess_board_roughness.png";

const images = {
  sky: null,
  color: null,
  normal: null,
  roughness: null,
};

export default class ChessBoard {
  constructor(_global) {
    this.Global = _global;

    this.GroupBoard = new THREE.Group();
    this.Global.Scene.add(this.GroupBoard);

    this.GroupGrid = new THREE.Group();
    this.GroupGrid.translateX(-45);
    this.GroupGrid.translateY(0.1);
    this.GroupGrid.translateZ(-40);
    this.Global.Scene.add(this.GroupGrid);

    let skyPro = GetImg(sky_texture).then((img) => {
      images.sky = img;
    });
    let colorPro = GetImg(chess_board_color).then((img) => {
      images.color = img;
    });
    let normalPro = GetImg(chess_board_normal).then((img) => {
      images.normal = img;
    });
    let roughnessPro = GetImg(chess_board_roughness).then((img) => {
      images.roughness = img;
    });

    Promise.all([skyPro, colorPro, normalPro, roughnessPro]).then(() => {
      this.CreateSky();
      this.CreateBoard();
      this.CreateGrid();
    });
  }

  CreateSky = () => {
    let material = new THREE.MeshBasicMaterial({
      side: THREE.BackSide,
    });

    let texture = new THREE.Texture();
    texture.image = images.sky;
    texture.anisotropy = 16;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    material.map = texture;
    material.needsUpdate = true;

    let geometry = new THREE.SphereGeometry(200, 64, 32);

    let sphere = new THREE.Mesh(geometry, material);

    this.GroupBoard.add(sphere);
  };

  CreateBoard = () => {
    let material = new THREE.MeshStandardMaterial();

    let color = new THREE.Texture();
    color.image = images.color;
    color.wrapS = THREE.RepeatWrapping;
    color.wrapT = THREE.RepeatWrapping;
    color.anisotropy = 16;
    color.colorSpace = THREE.SRGBColorSpace;
    color.repeat.set(10, 9);
    color.needsUpdate = true;
    material.map = color;

    let normal = new THREE.Texture();
    normal.image = images.normal;
    normal.wrapS = THREE.RepeatWrapping;
    normal.wrapT = THREE.RepeatWrapping;
    normal.anisotropy = 16;
    normal.repeat.set(10, 9);
    normal.needsUpdate = true;
    material.normalMap = normal;

    let roughness = new THREE.Texture();
    roughness.image = images.roughness;
    roughness.wrapS = THREE.RepeatWrapping;
    roughness.wrapT = THREE.RepeatWrapping;
    roughness.anisotropy = 16;
    roughness.repeat.set(10, 9);
    roughness.needsUpdate = true;
    material.roughnessMap = roughness;

    material.needsUpdate = true;

    let geometry = new THREE.PlaneGeometry(100, 90);
    let plane = new THREE.Mesh(geometry, material);
    plane.rotateX(-Math.PI / 2);

    this.GroupBoard.add(plane);
  };

  CreateGrid = () => {
    // 外边框
    let points = [];
    points.push(new THREE.Vector3(0, 0, 0));
    points.push(new THREE.Vector3(90, 0, 0));
    points.push(new THREE.Vector3(90, 0, 80));
    points.push(new THREE.Vector3(0, 0, 80));
    points.push(new THREE.Vector3(0, 0, 0, 0));
    this.CreateLine(points);

    // 横线
    for (let i = 1; i < 9; i++) {
      points = [];
      points.push(new THREE.Vector3(i * 10, 0, 0));
      points.push(new THREE.Vector3(i * 10, 0, 80));
      this.CreateLine(points);
    }

    // 直线
    for (let i = 1; i < 8; i++) {
      points = [];
      points.push(new THREE.Vector3(0, 0, i * 10));
      points.push(new THREE.Vector3(40, 0, i * 10));
      this.CreateLine(points);

      points = [];
      points.push(new THREE.Vector3(50, 0, i * 10));
      points.push(new THREE.Vector3(90, 0, i * 10));
      this.CreateLine(points);
    }

    // 九宫
    points = [];
    points.push(new THREE.Vector3(0, 0, 30));
    points.push(new THREE.Vector3(20, 0, 50));
    this.CreateLine(points);

    points = [];
    points.push(new THREE.Vector3(0, 0, 50));
    points.push(new THREE.Vector3(20, 0, 30));
    this.CreateLine(points);

    points = [];
    points.push(new THREE.Vector3(70, 0, 30));
    points.push(new THREE.Vector3(90, 0, 50));
    this.CreateLine(points);

    points = [];
    points.push(new THREE.Vector3(70, 0, 50));
    points.push(new THREE.Vector3(90, 0, 30));
    this.CreateLine(points);

    // ※
    this.CreateStar([30, 0], "side1");
    this.CreateStar([30, 20], "all");
    this.CreateStar([30, 40], "all");
    this.CreateStar([30, 60], "all");
    this.CreateStar([30, 80], "side2");
    this.CreateStar([20, 10], "all");
    this.CreateStar([20, 70], "all");
    this.CreateStar([60, 0], "side1");
    this.CreateStar([60, 20], "all");
    this.CreateStar([60, 40], "all");
    this.CreateStar([60, 60], "all");
    this.CreateStar([60, 80], "side2");
    this.CreateStar([70, 10], "all");
    this.CreateStar([70, 70], "all");
  };

  CreateStar = (pos, type) => {
    let points = [];
    if (type == "all" || type == "side1") {
      points = [];
      points.push(new THREE.Vector3(pos[0] + 3, 0, pos[1] + 1));
      points.push(new THREE.Vector3(pos[0] + 1, 0, pos[1] + 1));
      points.push(new THREE.Vector3(pos[0] + 1, 0, pos[1] + 3));
      this.CreateLine(points);

      points = [];
      points.push(new THREE.Vector3(pos[0] - 3, 0, pos[1] + 1));
      points.push(new THREE.Vector3(pos[0] - 1, 0, pos[1] + 1));
      points.push(new THREE.Vector3(pos[0] - 1, 0, pos[1] + 3));
      this.CreateLine(points);
    }
    if (type == "all" || type == "side2") {
      points = [];
      points.push(new THREE.Vector3(pos[0] + 3, 0, pos[1] - 1));
      points.push(new THREE.Vector3(pos[0] + 1, 0, pos[1] - 1));
      points.push(new THREE.Vector3(pos[0] + 1, 0, pos[1] - 3));
      this.CreateLine(points);

      points = [];
      points.push(new THREE.Vector3(pos[0] - 3, 0, pos[1] - 1));
      points.push(new THREE.Vector3(pos[0] - 1, 0, pos[1] - 1));
      points.push(new THREE.Vector3(pos[0] - 1, 0, pos[1] - 3));
      this.CreateLine(points);
    }
  };

  CreateLine = (points) => {
    let geometry = new THREE.BufferGeometry().setFromPoints(points);
    let material = new THREE.LineBasicMaterial({
      color: 0xe6a23c,
    });
    let line = new THREE.Line(geometry, material);
    this.GroupGrid.add(line);
  };
}
