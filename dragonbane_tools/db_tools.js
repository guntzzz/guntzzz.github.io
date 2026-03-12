function dbInitiative() {
	document.getElementById("results").innerHTML = "";
	let data = document.getElementById("combPart").value;
	data = data.split("\n");
	cards = [1,2,3,4,5,6,7,8,9,10];
	var res = [];
	var rem = [];
	for (i = 0; i < data.length; i++) {
		let kpTurn = [];
		kpTurn = data[i].split(",");
		if (kpTurn.length > 2) {
			for (let j = 1; j < kpTurn.length-1; j++) {
				kpTurn[0] = `${kpTurn[0]}` + `, ${kpTurn[j]}`;
			}
			kpTurn.splice(1,kpTurn.length-2);
		}
		if (kpTurn.length == 2 && kpTurn[1] <= 10 && kpTurn[1] > 0) {
			res.push([parseInt(kpTurn[1]),kpTurn[0]]);
			rem.push(data[i]);
		}
	}
	for (i = 0; i < rem.length; i++) {
		cards.splice(cards.indexOf(parseInt(rem[i].split(",")[1])),1);
		data.splice(data.indexOf(rem[i]),1);
	}
	shuffleArray(cards);
	for (let i = 0; i < data.length; i++) {
		res.push([cards[i],data[i]]);
	}
	let flag = 0;
	for (let i = 0; i < res.length; i++) {
		flag = 0;
		for (let j = 0; j < res.length - i - 1; j++) {
			if (res[j][0] > res[j+1][0]) {
				[res[j], res[j+1]] = [res[j+1], res[j]];
				flag = 1;
			}
		}
		if (flag === 0) break;
	}
	for (let i = 0; i < res.length; i++) {
		document.getElementById("results").innerHTML = document.getElementById("results").innerHTML + `<input type="checkbox" id="${i}"> ${res[i][0]} ${res[i][1]}<br>`;
	}
	document.getElementById("swapB").innerHTML = "<button type=\"button\" id=\"swap\"i onclick=\"swapTurns()\":w>Swap</button>";
	console.log(res);
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

function swapTurns() {
	document.getElementById("swapB").innerHTML = "<button type=\"button\" id=\"swap\"i onclick=\"swapTurns()\":w>Swap</button>";
	let data = document.getElementById("results").innerText;
	data = data.split("\n");
	var swap = [];
	for (let i = 0; i < data.length-1; i++) {
		data[i] = data[i].split(" ");
		if (data[i][data[i].length-1] != "*") {
			for (let j = 3; j < data[i].length; j++) {
				data[i][2] = `${data[i][2]}` + ` ${data[i][j]}`;
			}
			data[i].splice(3,data[i].length-3);
		}else if (data[i][data[i].length-1] == "*") {
			for (let j = 3; j < data[i].length-1; j++) {
				data[i][2] = `${data[i][2]}` + ` ${data[i][j]}`;
			}
			data[i].splice(3,data[i].length-4);
		}
		if (document.getElementById(`${i}`).checked == true) {
			data[i].push(i);
			swap.push(data[i]);
		}
	}
	if (swap.length != 2) {
		error();
	} else {
		for (let i = 0; i < swap.length; i++) {
			if (swap[i].length > 4) {
				error();
				break;
			} else if (i == swap.length - 1) {
				[data[swap[0][3]][2],data[swap[1][3]][2]] = [data[swap[1][3]][2],data[swap[0][3]][2]];
				// data[swap[0][3]].splice(3,1,"*");
				data[swap[1][3]].splice(3,1,"*");
				break;
			}
		}
	}
	document.getElementById("results").innerHTML = "";
	for (let i = 0; i < data.length - 1; i++) {
		if (data[i].length == 3 || data[i][3] != "*") {
			document.getElementById("results").innerHTML = document.getElementById("results").innerHTML + `<input type="checkbox" id="${i}"> ${data[i][1]} ${data[i][2]}<br>`;
		} else {
			document.getElementById("results").innerHTML = document.getElementById("results").innerHTML + `<input type="checkbox" id="${i}"> ${data[i][1]} ${data[i][2]} ${data[i][3]}<br>`;
		}
	}
	console.log(data);
}

function error() {
	r = Math.floor(Math.random() * 256);
	g = Math.floor(Math.random() * 256);
	b = Math.floor(Math.random() * 256);
	document.getElementById("swapB").innerHTML = "<button type=\"button\" id=\"swap\"i onclick=\"swapTurns()\":w>Swap</button>" + ` <span style="color:rgb(${r},${g},${b})"> Invalid Swap</span>`;
}
