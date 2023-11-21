import * as THREE from "three";
import TWEEN from "./third/tween.module";
import ChessesType from "./ChessPieces.Type";
import RoutesAnalysis from "./ChessActives.Analysis";

export default class ChessActives {
  constructor(_global, _chesses) {
    this.Global = _global;
    this.Chesses = _chesses;

    this.Clock = new THREE.Clock();
    this.NowChess = null;
    this.Raycaster = new THREE.Raycaster();

    this.GroupRoutes = new THREE.Group();
    this.GroupRoutes.translateX(-45);
    this.GroupRoutes.translateY(8);
    this.GroupRoutes.translateZ(-40);
    this.Global.Scene.add(this.GroupRoutes);

    this.Global.Container.addEventListener("click", this.DocumentClick);
    this.Global.FunctionMap.set("routes", this.RoutesAnimate);
  }

  DocumentClick = (event) => {
    let mouse = new THREE.Vector2();
    mouse.x = (event.clientX / this.Global.Container.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / this.Global.Container.clientHeight) * 2 + 1;

    this.Raycaster.setFromCamera(mouse, this.Global.Camera);

    let intersects = this.Raycaster.intersectObjects([
      ...this.GroupRoutes.children,
      ...this.Chesses.GroupChesses.children,
    ]);

    if (intersects.length > 0) {
      let obj = intersects[0].object.parent;
      this.DestroyRoutes();
      if (obj.custom) {
        this.NowChess = obj;
        this.CreateRoutes(this.GetRoutes());
      } else {
        this.MoveChess(intersects[0].object.parent);
      }
    }
  };

  GetRoutes = () => {
    let chesses = this.Chesses.ArrayChesses;
    let chess =
      chesses[this.NowChess.custom.pos[0]][this.NowChess.custom.pos[1]];

    switch (chess.type) {
      case ChessesType.BOSS:
        return RoutesAnalysis.GetBoss(chess, chesses);
      case ChessesType.SHI:
        return RoutesAnalysis.GetShi(chess, chesses);
      case ChessesType.XIANG:
        return RoutesAnalysis.GetXiang(chess, chesses);
      case ChessesType.MA:
        return RoutesAnalysis.GetMa(chess, chesses);
      case ChessesType.JU:
        return RoutesAnalysis.GetJu(chess, chesses);
      case ChessesType.PAO:
        return RoutesAnalysis.GetPao(chess, chesses);
      case ChessesType.DIDI:
        return RoutesAnalysis.GetDidi(chess, chesses);
    }
  };

  CreateRoutes = (routes) => {
    for (let i = 0; i < routes.routesMove.length; i++) {
      this.CreateCone(routes.routesMove[i], {
        type: "move",
        color: 0x67c23a,
        height: 0,
      });
    }
    for (let i = 0; i < routes.routesAttack.length; i++) {
      this.CreateCone(routes.routesAttack[i], {
        type: "attack",
        color: 0xf56c6c,
        height: 5,
      });
    }
    for (let i = 0; i < routes.routesProtection.length; i++) {
      this.CreateCone(routes.routesProtection[i], {
        color: 0x409eff,
        height: 5,
      });
    }
  };

  CreateCone = (pos, { type = "", color = 0xffffff, height = 0 }) => {
    let group = new THREE.Group();
    group.position.set(pos[0] * 10, height, pos[1] * 10);
    group.customPos = pos;
    group.customType = type;
    this.GroupRoutes.add(group);

    const geometry = new THREE.ConeGeometry(4, 5, 3, 1, true);
    const material = new THREE.MeshLambertMaterial({
      color: color,
      opacity: 0.7,
      transparent: true,
    });

    const cone1 = new THREE.Mesh(geometry, material);
    cone1.position.set(0, 0, 0);

    const cone2 = new THREE.Mesh(geometry, material);
    cone2.position.set(0, -5, 0);
    cone2.rotateZ(Math.PI);

    group.add(cone1);
    group.add(cone2);
  };

  DestroyRoutes = () => {
    while (this.GroupRoutes.children.length > 0) {
      this.GroupRoutes.children[0].removeFromParent();
    }
  };

  MoveChess = (obj) => {
    let chesses = this.Chesses.ArrayChesses;

    if (obj.customType == "move") {
      this.MoveAnimate(obj);
    } else if (obj.customType == "attack") {
      this.MoveAnimate(obj, () => {
        chesses[obj.customPos[0]][obj.customPos[1]].chess.removeFromParent();
        chesses[obj.customPos[0]][obj.customPos[1]] = {
          isChess: false,
        };
      });
    }
  };

  MoveAnimate = (obj, callback) => {
    let flag = true;
    let chesses = this.Chesses.ArrayChesses;

    let start = new THREE.Vector3(
      this.NowChess.position.x,
      0,
      this.NowChess.position.z
    );
    let end = new THREE.Vector3(
      obj.customPos[0] * 10,
      0,
      obj.customPos[1] * 10
    );

    let tweenUp = new TWEEN.Tween({ num: 0 });
    tweenUp.to({ num: 1 }, 500);
    tweenUp.easing(TWEEN.Easing.Exponential.InOut);
    tweenUp.onUpdate(({ num }) => {
      this.NowChess.position.set(start.x, num * 10, start.z);
    });

    let tweenMove = new TWEEN.Tween(start);
    tweenMove.to(end, 500);
    tweenMove.easing(TWEEN.Easing.Exponential.InOut);
    tweenMove.onUpdate(({ x, z }) => {
      this.NowChess.position.set(x, 10, z);
    });

    let tweenDown = new TWEEN.Tween({ num: 1 });
    tweenDown.to({ num: 0 }, 500);
    tweenDown.easing(TWEEN.Easing.Exponential.InOut);
    tweenDown.onUpdate(({ num }) => {
      this.NowChess.position.set(end.x, num * 10, end.z);

      if (flag && num < 0.05) {
        if (callback) callback();
        flag = false;
      }
    });
    tweenDown.onComplete(() => {
      Object.assign(
        chesses[obj.customPos[0]][obj.customPos[1]],
        chesses[this.NowChess.custom.pos[0]][this.NowChess.custom.pos[1]]
      );
      chesses[obj.customPos[0]][obj.customPos[1]].pos = obj.customPos;

      chesses[this.NowChess.custom.pos[0]][this.NowChess.custom.pos[1]] = {
        isChess: false,
      };
      this.NowChess.custom = chesses[obj.customPos[0]][obj.customPos[1]];
    });

    tweenUp.chain(tweenMove);
    tweenMove.chain(tweenDown);
    tweenUp.start();
  };

  RoutesAnimate = () => {
    TWEEN.update();
    let delta = this.Clock.getDelta();
    for (let i = 0; i < this.GroupRoutes.children.length; i++) {
      this.GroupRoutes.children[i].rotateY(delta * Math.PI);
    }
  };
}
