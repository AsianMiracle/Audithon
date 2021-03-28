const $leftLinks = document.querySelectorAll('.left-menu a'),
	$mapLinks = document.querySelectorAll('.map a'),
	$modal = document.getElementById('myModal');

$(document).ready(() => {

	console.log(regionsData);

	var AAAAAAA = false;
	var chartM;
	var chartG;
	var y15 = 0, y16 = 0, y17 = 0, y18 = 0, y19 = 0;

	var params = window
		.location
		.search
		.replace('?', '')
		.split('&')
		.reduce(
			function (p, e) {
				var a = e.split('=');
				p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
				return p;
			},
			{}
		);

	var year = params['year'];

	if (year == null)
		year = "2015";
	console.log(year);
	if (year == "2015") $('#year15').prop('selected', true);
	if (year == "2016") $('#year16').prop('selected', true);
	if (year == "2017") $('#year17').prop('selected', true);
	if (year == "2018") $('#year18').prop('selected', true);
	if (year == "2019") $('#year19').prop('selected', true);

	if (params['C1'] == 'on') $('#C1').prop('checked', true);
	if (params['C2'] == 'on') $('#C2').prop('checked', true);
	if (params['C3'] == 'on') $('#C3').prop('checked', true);
	if (params['C4'] == 'on') $('#C4').prop('checked', true);
	if (params['C5'] == 'on') $('#C5').prop('checked', true);
	if (params['C6'] == 'on') $('#C6').prop('checked', true);
	if (params['C7'] == 'on') $('#C7').prop('checked', true);
	if (params['C8'] == 'on') $('#C8').prop('checked', true);
	if (params['C9'] == 'on') $('#C9').prop('checked', true);
	if (params['C10'] == 'on') $('#C10').prop('checked', true);
	if (params['C11'] == 'on') $('#C11').prop('checked', true);
	if (params['C12'] == 'on') $('#C12').prop('checked', true);
	if (params['C13'] == 'on') $('#C13').prop('checked', true);
	if (params['C14'] == 'on') $('#C14').prop('checked', true);

	console.log(params['C1'] == 'on');

	var delta1 = parseInt("ff", 16) - parseInt("eb", 16);
	var delta2 = parseInt("eb", 16) - parseInt("55", 16);

	function getHex(num) {
		hexString = num.toString(16);
		if (hexString.length % 2) {
			hexString = '0' + hexString;
		}
		return hexString;
	}

	function getColor(value) {
		var resStr;
		if (value < 0.5) {
			value *= 2;
			resStr = "#" + getHex(parseInt("ff", 16) - parseInt(delta1 * value, 10)) + getHex(parseInt("55", 16) + parseInt(delta2 * value, 10)) + "55";
		}
		else {
			value -= 0.5;
			value *= 2;
			resStr = "#" + getHex(parseInt("eb", 16) - parseInt(delta2 * value, 10)) + getHex(parseInt("eb", 16) + parseInt(delta1 * value, 10)) + "55";
		}
		return resStr;
	}

	$('.stop-this-link').on('click', false);



	$leftLinks.forEach(el => {
		el.addEventListener('mouseenter', (e) => {
			let self = e.currentTarget;
			let selfClass = self.getAttribute('href');
			let color = self.dataset.color;
			let currentElement = document.querySelector(`.map a[href="${selfClass}"]`);
			let currentPolygon = currentElement.querySelectorAll('polygon');
			let currentPath = currentElement.querySelectorAll('path');
			if (currentPolygon)
				currentPolygon.forEach(el => el.style.cssText = `transition: 0.4s; fill: #6666ff;`);
			if (currentPath)
				currentPath.forEach(el => el.style.cssText = `transition: 0.4s; fill: #6666ff;`);
			self.classList.add('active');
		});

		el.addEventListener('mouseleave', (e) => {
			let self = e.currentTarget;
			let selfClass = self.getAttribute('href');
			let currentElement = document.querySelector(`.map a[href="${selfClass}"]`);
			let currentPolygon = currentElement.querySelectorAll('polygon');
			let currentPath = currentElement.querySelectorAll('path');
			if (currentPolygon)
				currentPolygon.forEach(el => el.style.cssText = `transition: 0.4s;`);
			if (currentPath)
				currentPath.forEach(el => el.style.cssText = `transition: 0.4s;`);
			self.classList.remove('active');
		});

		el.addEventListener('click', (e) => {
			modalOpen(e);
		});

		let code = el.getAttribute('href').toString().substr(1);
		let currentElement = document.querySelector(`.left-menu a[href="${el.getAttribute('href')}"]`);
		let name = currentElement.innerHTML;
		var strTable = "<tr>";
		var strTable = strTable + "<th scope='row'>" + name + "</th>";
		for (i = 2015; i <= 2019; i++) {
			var value = regionsData[code][i];
			var strTable = strTable + "<td>" + value + "</td>";

			if (i == 2015) y15 += value;
			if (i == 2016) y16 += value;
			if (i == 2017) y17 += value;
			if (i == 2018) y18 += value;
			if (i == 2019) y19 += value;
		}
		var srtTable = strTable + "</tr>";
		$('#rtBody').append(strTable);

	});


	$mapLinks.forEach(el => {
		el.addEventListener('mouseenter', (e) => {
			let self = e.currentTarget;
			let selfClass = self.getAttribute('href');
			let color = self.dataset.color;
			let currentElement = document.querySelector(`.left-menu a[href="${selfClass}"]`);
			let currentPolygon = self.querySelectorAll('polygon');
			let currentPath = self.querySelectorAll('path');
			if (currentPolygon)
				currentPolygon.forEach(el => el.style.cssText = `transition: 0.4s; fill: #6666ff;`);
			if (currentPath)
				currentPath.forEach(el => el.style.cssText = `transition: 0.4s; fill: #6666ff;`);
			currentElement.classList.add('active');
		});

		el.addEventListener('mouseleave', (e) => {
			let self = e.currentTarget;
			let selfClass = self.getAttribute('href');
			let currentElement = document.querySelector(`.left-menu a[href="${selfClass}"]`);
			let currentPolygon = self.querySelectorAll('polygon');
			let currentPath = self.querySelectorAll('path');
			if (currentPolygon)
				currentPolygon.forEach(el => el.style.cssText = `transition: 0.4s;`);
			if (currentPath)
				currentPath.forEach(el => el.style.cssText = `transition: 0.4s;`);
			currentElement.classList.remove('active');
		});

		el.addEventListener('click', (e) => {
			modalOpen(e);
		});

		let code = el.getAttribute('href').toString().substr(1);

		var color = getColor(regionsData[code][year]);

		let currentPolygon = el.querySelectorAll('polygon');
		for (i = 0; i < currentPolygon.length; i++)
			currentPolygon[i].setAttribute('fill', color);
		let currentPath = el.querySelectorAll('path');
		for (i = 0; i < currentPath.length; i++)
			currentPath[i].setAttribute('fill', color);
	});

	function modalOpen(e) {
		console.log($modal);
		$("#myModal").modal('show');

		let self = e.currentTarget;
		let selfClass = self.getAttribute('href');
		let currentElement = document.querySelector(`.left-menu a[href="${selfClass}"]`);
		let name = currentElement.innerHTML;
		let code = selfClass.toString().substr(1);

		document.querySelector(`.modal-title`).innerHTML = name;

		document.querySelector(`.codeL`).innerHTML = selfClass.substr(1);

		var strTable = "<tr>";
		for (i = 2015; i <= 2019; i++) {
			var value = regionsData[code][i];
			var strTable = strTable + "<td>" + value + "</td>";
		}
		var srtTable = strTable + "</tr>";
		$('#ortBody').html("");
		$('#ortBody').append(strTable);
	}

	$('#myModal').on('shown.bs.modal', function (e) {
		if (AAAAAAA == false) {
			let code = document.querySelector(`.codeL`).innerHTML;
			console.log(code);
			var ctx = document.getElementById('myChart').getContext('2d');
			let y5 = regionsData[code]['2015'];
			let y6 = regionsData[code]['2016'];
			let y7 = regionsData[code]['2017'];
			let y8 = regionsData[code]['2018'];
			let y9 = regionsData[code]['2019'];
			chartM = new Chart(ctx, {
				type: 'line',
				data: {
					labels: ['2015', '2016', '2017', '2018', '2019'],
					datasets: [{
						label: 'Инновационное развитие региона',
						backgroundColor: 'rgba(100, 100, 100)',
						borderColor: 'rgb(100, 100, 100)',
						pointRadius: 5,
						pointBackgroundColor: 'rgb(100, 100, 100)',
						fill: false,
						pointHitRadius: 0,
						capBezierPoints: false,
						data: [
							y5,
							y6,
							y7,
							y8,
							y9
						]
					}]
				},
				options: {}
			});
			AAAAAAA = true;
		}
	});
	$('#myModal').on('hide.bs.modal', function (e) {
		AAAAAAA = false;
		chartM.destroy();
	});



	var ctx = document.getElementById('fullChart').getContext('2d');
	chartG = new Chart(ctx, {
		type: 'line',
		data: {
			labels: ['2015', '2016', '2017', '2018', '2019'],
			datasets: [{
				label: 'Инновационное развитие России',
				backgroundColor: 'rgba(100, 100, 100)',
				borderColor: 'rgb(100, 100, 100)',
				pointRadius: 5,
				pointBackgroundColor: 'rgb(100, 100, 100)',
				fill: false,
				data: [
					y15 / 85,
					y16 / 85,
					y17 / 85,
					y18 / 85,
					y19 / 85
				]
			}]
		},
		options: {}
	});
});