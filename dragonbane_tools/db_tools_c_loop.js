function loop() {
  let status = [document.getElementById("skill").value, document.getElementById("conditions").value, 0, 0, document.getElementById("willP").value, document.getElementById("healthP").value, [0,0]];
  document.getElementById("results").innerHTML = `You have ${status[4]} will points and ${status[5]} health points.<br>Object is charged with ${status[6][0]} will points for the next ${status[6][1]} minutes.<br>You have ${status[2]} conditions and ${status[3]} hours have passed.`;
}

function cast(spell, status) {                                                  //spell = [name, casting time, level, success]; status = [casting skill, max conditions number, actual condition number, time, WP, HP, [WPc, duration]]
  let check = Math.floor(Math.random()*21);                                     //d20 roll
  let boon = Math.floor(Math.random()*21);                                      //boon roll
  status[3] = status[3] + spell[1]                                              //time update
  status[4] = status[4] - (2*spell[2]);                                         //WP update
  if (check <= status[0]) {                                                     //roll successfull
    spell[3] = 1;
  } else if (check > status[0] && boon <= status[0] && status[1] > status[2]) { //boon successfull
    status[1] = status[1] + 1;                                                  //conditions update
    spell[3] = 1;
  } else {
    spell[3] = 0;                                                               //spell failed
  }
  return(spell, status)
}
