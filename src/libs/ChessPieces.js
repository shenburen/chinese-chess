import * as THREE from "three";
import { GetImg } from "./common/tools";
import chess_pieces_color from "../images/chess_pieces_color.png";
import chess_pieces_normal from "../images/chess_pieces_normal.png";
import chess_pieces_roughness from "../images/chess_pieces_roughness.png";
import DefaultChessPieces from "./ChessPieces.Default";

const images = {
  color: null,
  normal: null,
  roughness: null,
};

export default class ChessPieces {
  constructor(_global) {
    this.Global = _global;

    this.ArrayChesses = [];

    this.GroupChesses = new THREE.Group();
    this.GroupChesses.translateX(-45);
    this.GroupChesses.translateY(2.6);
    this.GroupChesses.translateZ(-40);
    this.Global.Scene.add(this.GroupChesses);

    let colorPro = GetImg(chess_pieces_color).then((img) => {
      images.color = img;
    });
    let normalPro = GetImg(chess_pieces_normal).then((img) => {
      images.normal = img;
    });
    let roughnessPro = GetImg(chess_pieces_roughness).then((img) => {
      images.roughness = img;
    });

    Promise.all([colorPro, normalPro, roughnessPro]).then(() => {
      this.InitChessesArray();
      this.CreateChesses();
    });
  }

  InitChessesArray() {
    for (let i = 0; i < 10; i++) {
      this.ArrayChesses[i] = [];
      for (let j = 0; j < 9; j++) {
        this.ArrayChesses[i][j] = {
          isChess: false,
        };
      }
    }
  }

  CreateChesses = () => {
    for (let item of DefaultChessPieces) {
      let group = new THREE.Group();
      group.position.set(item.pos[0] * 10, 0, item.pos[1] * 10);

      Object.assign(this.ArrayChesses[item.pos[0]][item.pos[1]], {
        isChess: true,
        pos: item.pos,
        type: item.type,
        faction: item.faction,
        chess: group,
      });
      group.custom = this.ArrayChesses[item.pos[0]][item.pos[1]];

      if (item.faction == "red") {
        group.rotateY(-Math.PI / 2);
      } else if (item.faction == "black") {
        group.rotateY(Math.PI / 2);
      } else {
        continue;
      }
      this.GroupChesses.add(group);

      // 创建材质
      let materialUp = new THREE.MeshStandardMaterial();
      let materialDown = new THREE.MeshStandardMaterial();
      let materialMiddle = new THREE.MeshStandardMaterial();

      let { text, color, normal, roughness } = this.GetTextures(item);
      materialUp.map = text;
      materialUp.normalMap = normal;
      materialUp.roughness = roughness;
      materialUp.needsUpdate = true;
      materialDown.map = color;
      materialDown.normalMap = normal;
      materialDown.roughnessMap = roughness;
      materialDown.needsUpdate = true;
      let clone = color.clone();
      clone.repeat.set(Math.PI * 2, 1);
      materialMiddle.map = clone;
      clone = normal.clone();
      clone.repeat.set(Math.PI * 2, 1);
      materialMiddle.normalMap = clone;
      clone = roughness.clone();
      clone.repeat.set(Math.PI * 2, 1);
      materialMiddle.roughnessMap = clone;
      materialMiddle.needsUpdate = true;

      // 创建几何
      let geometry = new THREE.CircleGeometry(Math.sqrt(3) * 2.5, 32);
      let circle = new THREE.Mesh(geometry, materialUp);
      circle.rotateX(-Math.PI / 2);
      circle.position.y = 2.5;
      group.add(circle);

      geometry = new THREE.CircleGeometry(Math.sqrt(3) * 2.5, 32);
      circle = new THREE.Mesh(geometry, materialDown);
      circle.rotateX(Math.PI / 2);
      circle.position.y = -2.5;
      group.add(circle);

      geometry = new THREE.SphereGeometry(
        5,
        32,
        16,
        0,
        Math.PI * 2,
        Math.PI / 3,
        Math.PI / 3
      );
      let sphere = new THREE.Mesh(geometry, materialMiddle);
      group.add(sphere);
    }
  };

  GetTextures = (item) => {
    // 文字贴图
    let canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(images.color, 0, 0, 256, 256, 0, 0, 256, 256);
    ctx.drawImage(images.color, 0, 0, 256, 256, 0, 256, 256, 256);
    ctx.drawImage(images.color, 0, 0, 256, 256, 256, 0, 256, 256);
    ctx.drawImage(images.color, 0, 0, 256, 256, 256, 256, 256, 256);

    ctx.font = "420px 楷体";
    ctx.fillStyle = item.faction;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(item.name, 256, 256);

    let text = new THREE.CanvasTexture(canvas);
    text.wrapS = THREE.RepeatWrapping;
    text.wrapT = THREE.RepeatWrapping;
    text.anisotropy = 16;
    text.colorSpace = THREE.SRGBColorSpace;

    // 外观贴图
    let color = new THREE.Texture();
    color.image = images.color;
    color.wrapS = THREE.RepeatWrapping;
    color.wrapT = THREE.RepeatWrapping;
    color.anisotropy = 16;
    color.colorSpace = THREE.SRGBColorSpace;
    color.repeat.set(2, 2);
    color.needsUpdate = true;

    // 法线贴图
    let normal = new THREE.Texture();
    normal.image = images.normal;
    normal.wrapS = THREE.RepeatWrapping;
    normal.wrapT = THREE.RepeatWrapping;
    normal.anisotropy = 16;
    normal.repeat.set(2, 2);
    normal.needsUpdate = true;

    // 粗糙度贴图
    let roughness = new THREE.Texture();
    roughness.image = images.roughness;
    roughness.wrapS = THREE.RepeatWrapping;
    roughness.wrapT = THREE.RepeatWrapping;
    roughness.anisotropy = 16;
    roughness.repeat.set(2, 2);
    roughness.needsUpdate = true;

    return { text, color, normal, roughness };
  };
}
