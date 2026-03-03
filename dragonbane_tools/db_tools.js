function dbInitiative() {
	document.getElementById("results").innerHTML = "";
	let data = document.getElementById("combPart").value;
	data = data.split("\n");
	cards = [1,2,3,4,5,6,7,8,9,10];
	shuffleArray(cards);
	var res = [];
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
		document.getElementById("results").innerHTML = document.getElementById("results").innerHTML + `${res[i][0]} ${res[i][1]}<br>`;
	}
	console.log(res);
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
