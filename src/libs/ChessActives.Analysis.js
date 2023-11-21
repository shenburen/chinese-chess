const RoutesAnalysis = {};

const BoundaryHome = (pos, now) => {
  if (now.faction == "red") {
    if (pos[0] > 2 || pos[0] < 0 || pos[1] > 5 || pos[1] < 3) {
      return false;
    } else {
      return true;
    }
  } else if (now.faction == "black") {
    if (pos[0] > 9 || pos[0] < 7 || pos[1] > 5 || pos[1] < 3) {
      return false;
    } else {
      return true;
    }
  }
};

const BoundaryHalf = (pos, now) => {
  if (now.faction == "red") {
    if (pos[0] > 4 || pos[0] < 0 || pos[1] > 8 || pos[1] < 0) {
      return false;
    } else {
      return true;
    }
  } else if (now.faction == "black") {
    if (pos[0] > 9 || pos[0] < 5 || pos[1] > 8 || pos[1] < 0) {
      return false;
    } else {
      return true;
    }
  }
};

const BoundaryAll = (pos) => {
  if (pos[0] > 9 || pos[0] < 0 || pos[1] > 8 || pos[1] < 0) {
    return false;
  } else {
    return true;
  }
};

const Check = (pos, all) => {
  if (!BoundaryAll(pos)) {
    return false;
  }
  let chess = all[pos[0]][pos[1]];
  if (chess.isChess) {
    return false;
  } else {
    return true;
  }
};

const Find = (pos, now, all, routesMove, routesAttack, routesProtection) => {
  let chess = all[pos[0]][pos[1]];
  if (chess.isChess) {
    if (chess.faction != now.faction) {
      routesAttack.push([pos[0], pos[1]]);
    } else if (chess.faction == now.faction) {
      routesProtection.push([pos[0], pos[1]]);
    }
    return false;
  } else {
    routesMove.push([pos[0], pos[1]]);
    return true;
  }
};

const FindPao = (
  pos,
  now,
  all,
  routesMove,
  routesAttack,
  routesProtection,
  flag
) => {
  let chess = all[pos[0]][pos[1]];
  if (flag) {
    if (chess.isChess) {
      return false;
    } else {
      routesMove.push([pos[0], pos[1]]);
      return true;
    }
  } else {
    if (chess.isChess) {
      if (chess.faction != now.faction) {
        routesAttack.push([pos[0], pos[1]]);
      } else if (chess.faction == now.faction) {
        routesProtection.push([pos[0], pos[1]]);
      }
      return false;
    } else {
      return true;
    }
  }
};

RoutesAnalysis.GetBoss = (now, all) => {
  let routesMove = [];
  let routesAttack = [];
  let routesProtection = [];

  let pos = [...now.pos];
  pos[0]++;
  if (BoundaryHome(pos, now)) {
    Find(pos, now, all, routesMove, routesAttack, routesProtection);
  }

  pos = [...now.pos];
  pos[0]--;
  if (BoundaryHome(pos, now)) {
    Find(pos, now, all, routesMove, routesAttack, routesProtection);
  }

  pos = [...now.pos];
  pos[1]++;
  if (BoundaryHome(pos, now)) {
    Find(pos, now, all, routesMove, routesAttack, routesProtection);
  }

  pos = [...now.pos];
  pos[1]--;
  if (BoundaryHome(pos, now)) {
    Find(pos, now, all, routesMove, routesAttack, routesProtection);
  }

  return { routesMove, routesAttack, routesProtection };
};

RoutesAnalysis.GetShi = (now, all) => {
  let routesMove = [];
  let routesAttack = [];
  let routesProtection = [];

  let pos = [...now.pos];
  pos[0]++, pos[1]++;
  if (BoundaryHome(pos, now)) {
    Find(pos, now, all, routesMove, routesAttack, routesProtection);
  }

  pos = [...now.pos];
  pos[0]--, pos[1]--;
  if (BoundaryHome(pos, now)) {
    Find(pos, now, all, routesMove, routesAttack, routesProtection);
  }

  pos = [...now.pos];
  pos[0]++, pos[1]--;
  if (BoundaryHome(pos, now)) {
    Find(pos, now, all, routesMove, routesAttack, routesProtection);
  }

  pos = [...now.pos];
  pos[0]--, pos[1]++;
  if (BoundaryHome(pos, now)) {
    Find(pos, now, all, routesMove, routesAttack, routesProtection);
  }

  return { routesMove, routesAttack, routesProtection };
};

RoutesAnalysis.GetXiang = (now, all) => {
  let routesMove = [];
  let routesAttack = [];
  let routesProtection = [];

  let pos = [...now.pos];
  pos[0]++, pos[1]++;
  if (Check(pos, all)) {
    pos[0]++, pos[1]++;
    if (BoundaryHalf(pos, now)) {
      Find(pos, now, all, routesMove, routesAttack, routesProtection);
    }
  }

  pos = [...now.pos];
  pos[0]--, pos[1]--;
  if (Check(pos, all)) {
    pos[0]--, pos[1]--;
    if (BoundaryHalf(pos, now)) {
      Find(pos, now, all, routesMove, routesAttack, routesProtection);
    }
  }

  pos = [...now.pos];
  pos[0]++, pos[1]--;
  if (Check(pos, all)) {
    pos[0]++, pos[1]--;
    if (BoundaryHalf(pos, now)) {
      Find(pos, now, all, routesMove, routesAttack, routesProtection);
    }
  }

  pos = [...now.pos];
  pos[0]--, pos[1]++;
  if (Check(pos, all)) {
    pos[0]--, pos[1]++;
    if (BoundaryHalf(pos, now)) {
      Find(pos, now, all, routesMove, routesAttack, routesProtection);
    }
  }

  return { routesMove, routesAttack, routesProtection };
};

RoutesAnalysis.GetMa = (now, all) => {
  let routesMove = [];
  let routesAttack = [];
  let routesProtection = [];

  let pos = [...now.pos];
  pos[0]++;
  if (Check(pos, all)) {
    pos[0]++, pos[1]++;
    Find(pos, now, all, routesMove, routesAttack, routesProtection);
  }

  pos = [...now.pos];
  pos[0]++;
  if (Check(pos, all)) {
    pos[0]++, pos[1]--;
    Find(pos, now, all, routesMove, routesAttack, routesProtection);
  }

  pos = [...now.pos];
  pos[0]--;
  if (Check(pos, all)) {
    pos[0]--, pos[1]--;
    Find(pos, now, all, routesMove, routesAttack, routesProtection);
  }

  pos = [...now.pos];
  pos[0]--;
  if (Check(pos, all)) {
    pos[0]--, pos[1]++;
    Find(pos, now, all, routesMove, routesAttack, routesProtection);
  }

  pos = [...now.pos];
  pos[1]++;
  if (Check(pos, all)) {
    pos[0]++, pos[1]++;
    Find(pos, now, all, routesMove, routesAttack, routesProtection);
  }

  pos = [...now.pos];
  pos[1]++;
  if (Check(pos, all)) {
    pos[0]--, pos[1]++;
    Find(pos, now, all, routesMove, routesAttack, routesProtection);
  }

  pos = [...now.pos];
  pos[1]--;
  if (Check(pos, all)) {
    pos[0]--, pos[1]--;
    Find(pos, now, all, routesMove, routesAttack, routesProtection);
  }

  pos = [...now.pos];
  pos[1]--;
  if (Check(pos, all)) {
    pos[0]++, pos[1]--;
    Find(pos, now, all, routesMove, routesAttack, routesProtection);
  }

  return { routesMove, routesAttack, routesProtection };
};

RoutesAnalysis.GetJu = (now, all) => {
  let routesMove = [];
  let routesAttack = [];
  let routesProtection = [];

  let pos = [...now.pos];
  for (pos[0]++; pos[0] < 10; pos[0]++) {
    if (!Find(pos, now, all, routesMove, routesAttack, routesProtection)) break;
  }

  pos = [...now.pos];
  for (pos[0]--; pos[0] >= 0; pos[0]--) {
    if (!Find(pos, now, all, routesMove, routesAttack, routesProtection)) break;
  }

  pos = [...now.pos];
  for (pos[1]++; pos[1] < 9; pos[1]++) {
    if (!Find(pos, now, all, routesMove, routesAttack, routesProtection)) break;
  }

  pos = [...now.pos];
  for (pos[1]--; pos[1] >= 0; pos[1]--) {
    if (!Find(pos, now, all, routesMove, routesAttack, routesProtection)) break;
  }

  return { routesMove, routesAttack, routesProtection };
};

RoutesAnalysis.GetPao = (now, all) => {
  let routesMove = [];
  let routesAttack = [];
  let routesProtection = [];

  let flag = true;
  let pos = [...now.pos];
  for (pos[0]++; pos[0] < 10; pos[0]++) {
    if (flag) {
      flag = FindPao(
        pos,
        now,
        all,
        routesMove,
        routesAttack,
        routesProtection,
        flag
      );
    } else {
      if (
        !FindPao(
          pos,
          now,
          all,
          routesMove,
          routesAttack,
          routesProtection,
          flag
        )
      )
        break;
    }
  }

  flag = true;
  pos = [...now.pos];
  for (pos[0]--; pos[0] >= 0; pos[0]--) {
    if (flag) {
      flag = FindPao(
        pos,
        now,
        all,
        routesMove,
        routesAttack,
        routesProtection,
        flag
      );
    } else {
      if (
        !FindPao(
          pos,
          now,
          all,
          routesMove,
          routesAttack,
          routesProtection,
          flag
        )
      )
        break;
    }
  }

  flag = true;
  pos = [...now.pos];
  for (pos[1]++; pos[1] < 9; pos[1]++) {
    if (flag) {
      flag = FindPao(
        pos,
        now,
        all,
        routesMove,
        routesAttack,
        routesProtection,
        flag
      );
    } else {
      if (
        !FindPao(
          pos,
          now,
          all,
          routesMove,
          routesAttack,
          routesProtection,
          flag
        )
      )
        break;
    }
  }

  flag = true;
  pos = [...now.pos];
  for (pos[1]--; pos[1] >= 0; pos[1]--) {
    if (flag) {
      flag = FindPao(
        pos,
        now,
        all,
        routesMove,
        routesAttack,
        routesProtection,
        flag
      );
    } else {
      if (
        !FindPao(
          pos,
          now,
          all,
          routesMove,
          routesAttack,
          routesProtection,
          flag
        )
      )
        break;
    }
  }

  return { routesMove, routesAttack, routesProtection };
};

RoutesAnalysis.GetDidi = (now, all) => {
  let routesMove = [];
  let routesAttack = [];
  let routesProtection = [];

  let pos = [...now.pos];
  if (now.faction == "red") {
    pos[0]++;
    if (BoundaryAll(pos, now)) {
      Find(pos, now, all, routesMove, routesAttack, routesProtection);
    }
  } else if (now.faction == "black") {
    pos[0]--;
    if (BoundaryAll(pos, now)) {
      Find(pos, now, all, routesMove, routesAttack, routesProtection);
    }
  }
  if (!BoundaryHalf(now.pos, now)) {
    pos = [...now.pos];
    pos[1]++;
    if (BoundaryAll(pos, now)) {
      Find(pos, now, all, routesMove, routesAttack, routesProtection);
    }

    pos = [...now.pos];
    pos[1]--;
    if (BoundaryAll(pos, now)) {
      Find(pos, now, all, routesMove, routesAttack, routesProtection);
    }
  }

  return { routesMove, routesAttack, routesProtection };
};

export default RoutesAnalysis;
