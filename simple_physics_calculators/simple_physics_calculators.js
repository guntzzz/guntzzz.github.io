function getInput() {
  let x = document.getElementById("spitDis").value;
  let l = x;
  let g = 9.8;
  let h_0 = 1.6;
  let th = 0.67;
  let v_0 = Math.sqrt( g/2 * l**2/Math.cos(th)**2 *  1/(h_0+Math.tan(th)*l)  );
  let distance = outerPlan(v_0,h_0);
  let escVels = escVel();
  for (let i = 0; i < escVels.length; i++) {
    if (v_0 > escVels[i][1]) {
      document.getElementById("outSp").innerHTML = `Your spit successfully escaped ${escVels[i][0]}\'s gravity well and ventured into outer space!`;
      console.log(v_0,escVels[i][1]);
      break;
    } else {
      document.getElementById("outSp").innerHTML = "Your spit can't even escape the gravity well of a small comet";
    }
  }
  document.getElementById("ans").innerHTML = `Starting spit velocity: ${Math.round(v_0*100)/100} m/s
                                          <br>Mercury: ${Math.round(distance[0]*100)/100} m
                                          <br>Venus: ${Math.round(distance[1]*100)/100} m
                                          <br>Earth: ${l} m
                                          <br>Mars: ${Math.round(distance[3]*100)/100} m
                                          <br>Jupiter: ${Math.round(distance[4]*100)/100} m
                                          <br>Saturn: ${Math.round(distance[5]*100)/100} m
                                          <br>Uranus: ${Math.round(distance[6]*100)/100} m
                                          <br>Neptune: ${Math.round(distance[7]*100)/100} m`;
}

function search() {
	let srcStr = document.getElementById("srcStr").value;
  const dlt = document.getElementsByClassName("temp");
  console.log(dlt.length)

  while(dlt.length) {                                                           //studiare questa parte di codice
    var parent = dlt[0].parentNode;
    while( dlt[0].firstChild ) {
      parent.insertBefore( dlt[0].firstChild, dlt[0]);
    }
    parent.removeChild( dlt [0]);
  }

  srcStr = srcStr.toLowerCase();
  let pCont = document.getElementById("main_cont");
  pCont = pCont.innerHTML;
  let rCont = pCont.toLowerCase();
  let indices = [];
  let flag = 0;
  while(true) {
    if (flag == 0) {
      var index = rCont.indexOf(srcStr);
      if (index == -1) {
        break;
      } else {
        indices.push(index);
        flag = 1;
      }
    } else {
      var index = rCont.indexOf(srcStr,index + srcStr.length);
      if (index == -1) {
        break;
      } else {
        indices.push(index);
      }
    }
  }

  let indicesLeft = [];
  let indicesRight = [];
  while(true) {
    if (flag == 0) {
      var index = rCont.indexOf("<");
      if (index == -1) {
        break;
      } else {
        indicesLeft.push(index);
        flag = 1;
      }
    } else {
      var index = rCont.indexOf("<",index + 1);
      if (index == -1) {
        break;
      } else {
        indicesLeft.push(index);
      }
    }
  }
  while(true) {
    if (flag == 0) {
      var index = rCont.indexOf(">");
      if (index == -1) {
        break;
      } else {
        indicesRight.push(index);
        flag = 1;
      }
    } else {
      var index = rCont.indexOf(">",index + 1);
      if (index == -1) {
        break;
      } else {
        indicesRight.push(index);
      }
    }
  }
  let indicesClean = [];
  for (j = 0; j < indices.length; j++) {
    flag = 0;
    for (i = 0; i < indicesLeft.length; i++) {
      if (indices[j] > indicesLeft[i] && indices[j] < indicesRight[i]) {
        flag = 1;
      }
    }
    if (flag == 0) {
      indicesClean.push(indices[j]);
    }
  }
  indices = indicesClean;
  const leftTag = "<span style=\"background-color:yellow\" class=\"temp\">";
  const rightTag = "</span>";
  for (i = 0; i < indices.length; i++) {
    var highl = pCont.slice(0,indices[i]+i*(leftTag.length+rightTag.length)) + leftTag + pCont.slice(indices[i]+i*(leftTag.length+rightTag.length),indices[i]+i*(leftTag.length+rightTag.length) + srcStr.length) + rightTag + pCont.slice(indices[i]+i*(leftTag.length+rightTag.length) + srcStr.length);
    pCont = highl;
    document.getElementById("main_cont").innerHTML = highl;
    }
  console.log(indices.length);
}


function outerPlan(v_0,h_0) {
  let mercuryMR = [0.055,0.38];
  let venusMR = [0.81,0.95];
  let earthMR = [1,1];
  let marsMR = [0.11,0.53];
  let jupiterMR = [317.8,10.96];
  let saturnMR = [95.2,9.14];
  let uranusMR = [14.54,3.98];
  let neptuneMR = [17.15,3.86];
  const planets = [mercuryMR,venusMR,earthMR,marsMR,jupiterMR,saturnMR,uranusMR,neptuneMR];
  let distance = [];
  for (let i = 0; i < planets.length; i++) {
    let g = planets[i][0]/planets[i][1]**2*9.8;
    console.log(g)
    let th = Math.asin(v_0/Math.sqrt(2*(v_0**2+g*h_0)))
    distance.push(v_0*Math.cos(th)*((-v_0*Math.sin(th)-Math.sqrt(v_0**2*Math.sin(th)**2+2*g*h_0))/-g));
  }
  console.log(distance);
  return distance;
}


function escVel() {
  let escVelocities = [];
  let objectsMR = [ ["<a href=\"https://en.wikipedia.org/wiki/1036_Ganymed\">Ganymed</a>", "1036", 18.838, 167, "Amor asteroid type S"],
["<a href=\"https://en.wikipedia.org/wiki/Linus_(moon)\">Linus</a>", "Kalliope I", 14, 60, "asteroid moon of 22 Kalliope"],
["<a href=\"https://en.wikipedia.org/wiki/951_Gaspra\">Gaspra</a>", "951", 6.266, 20, "belt asteroid type S"],
["<a href=\"https://en.wikipedia.org/wiki/Hippocamp_(moon)\">Hippocamp</a>", "Neptune XIV", 17.4, 50, "moon of Neptune"],
["<a href=\"https://en.wikipedia.org/wiki/243_Ida\">Ida</a>", "243", 15.7, 42, "belt asteroid type S binary"],
["<a href=\"https://en.wikipedia.org/wiki/Kerberos_(moon)\">Kerberos</a>", "Pluto IV", 6.333, 16, "moon of Pluto"],
["<a href=\"https://en.wikipedia.org/wiki/Hydra_(moon)\">Hydra</a>", "Pluto III", 19.65, 48, "moon of Pluto"],
["<a href=\"https://en.wikipedia.org/wiki/Nix_(moon)\">Nix</a>", "Pluto II", 19.017, 45, "moon of Pluto"],
["<a href=\"https://en.wikipedia.org/wiki/Styx_(moon)\">Styx</a>", "Pluto V", 5.5, 7.65, "moon of Pluto"],
["<a href=\"https://en.wikipedia.org/wiki/Phobos_(moon)\">Phobos</a>", "Mars I", 11.1, 10.659, "moon of Mars"],
["<a href=\"https://it.wikipedia.org/wiki/433_Eros\">Eros</a>", "433", 8.42, 6.687, "Amor asteroid type S"],
["<a href=\"https://en.wikipedia.org/wiki/Atlas_(moon)\">Atlas</a>", "Saturn XV", 15.1, 6.6, "moon of Saturn"],
["<a href=\"https://en.wikipedia.org/wiki/Pan_(moon)\">Pan</a>", "Saturn XVIII", 14.1, 4.95, "moon of Saturn"],
["<a href=\"https://en.wikipedia.org/wiki/Deimos_(moon)\">Deimos</a>", "Mars II", 6.2, 1.476, "moon of Mars"],
["<a href=\"https://en.wikipedia.org/wiki/3749_Balam\">Balam</a>", "3749", 2.332, 0.51, "belt asteroid type S trinary"],
["<a href=\"https://en.wikipedia.org/wiki/Halley%27s_Comet\">Halley's Comet</a>", "1P", 5.75, 0.22, "comet"],
["<a href=\"https://en.wikipedia.org/wiki/3122_Florence\">Florence</a>", "3122", 2.201, 0.079, "Amor asteroid type S trinary"],
["<a href=\"https://en.wikipedia.org/wiki/4179_Toutatis\">Toutatis</a>", "4179", 1.516, 0.0505, "Apollo asteroid type S"],
["<a href=\"https://en.wikipedia.org/wiki/Daphnis_(moon)\">Daphnis</a>", "Saturn XXXV", 3.8, 0.077, "moon of Saturn"],
["<a href=\"https://en.wikipedia.org/wiki/(153591)_2001_SN263\">2001 SN263</a>", "153591", 1.315, 0.00951, "Amor asteroid type C trinary"],
["<a href=\"https://en.wikipedia.org/wiki/67P/Churyumov%E2%80%93Gerasimenko\">Churyumov&#8722Gerasimenko</a>", "67P", 2, 0.00998, "Jupiter-family comet"] ];
  for (let i = 0; i < objectsMR.length; i++) {
    escVelocities.push([objectsMR[i][0],Math.sqrt(2*objectsMR[i][3]*66743/(1000*objectsMR[i][2]))]);
    console.log(escVelocities[i]);
  }
  return escVelocities;
}
