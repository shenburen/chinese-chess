import * as THREE from "three";
import { OrbitControls } from "./third/OrbitControls";

export default class ChessInit {
  FunctionMap = new Map();

  constructor() {
    this.Container = document.querySelector("#container");

    this.Camera = new THREE.PerspectiveCamera(
      45,
      this.Container.clientWidth / this.Container.clientHeight,
      0.1,
      10000
    );
    this.Camera.position.set(-100, 100, 0);

    this.Ambient = new THREE.AmbientLight();

    this.Direction = new THREE.DirectionalLight();
    this.Direction.position.set(0, 1, -1);

    this.Renderer = new THREE.WebGLRenderer({ antialias: true });
    this.Renderer.setSize(
      this.Container.clientWidth,
      this.Container.clientHeight
    );
    this.Renderer.setPixelRatio(window.devicePixelRatio);
    this.Container.appendChild(this.Renderer.domElement);

    this.Scene = new THREE.Scene();
    this.Scene.add(this.Ambient);
    this.Scene.add(this.Direction);

    this.Render();

    window.addEventListener("resize", this.Resize);

    new OrbitControls(this.Camera, this.Renderer.domElement);
  }

  Render = () => {
    for (let func of this.FunctionMap) {
      if (func[1] instanceof Function) {
        func[1]();
      }
    }
    this.Renderer.render(this.Scene, this.Camera);
    requestAnimationFrame(this.Render);
  };

  Resize = () => {
    this.Camera.aspect =
      this.Container.clientWidth / this.Container.clientHeight;
    this.Camera.updateProjectionMatrix();

    this.Renderer.setSize(
      this.Container.clientWidth,
      this.Container.clientHeight
    );
  };
}
