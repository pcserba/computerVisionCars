function showData() {
	//update the text
	//build the string
	txt = 'We detected a <B>' + data.results[0].Mh + ' </B> <B>'+data.results[0].Cn_short+'</B> with <B>99%</B> confidence.<P><B>Registrations in Europe ('+discomap1Result.results[0].year+'):</B> '+data.results[0].countVIN+' vehicles<P><B>Average specific CO<sub>2</sub> Emissions</B>: '+data.results[0].avgEWLTP+' g/km<P><B>Average engine capacity:</B> '+data.results[0].avgEc+'cm<sup>3</sup><P><B>Average engine power:</B> '+data.results[0].avgEp+'kwh<P><B>Average mass in running order:</B> '+data.results[0].avgM+'kg';
document.getElementById('caption TL').innerHTML=txt;
document.getElementById('caption BR').innerHTML='<a href=# onclick="showYear();">[Registrations by year]</A><a href=# onclick="showMS();">[Registrations by MS]</A><a href=# onclick="showManufacturer();">[Ewltp evolution of the manufacturer]</A><P> Source: <a href=#>EEA</A></P></div>';
	//transition opacity
	document.getElementById('caption TL').classList.toggle('show');
	document.getElementById('caption BR').classList.toggle('show');
	};


function showMS() {
	chartByCountry();
	//transition opacity
	document.getElementById('caption BL').classList.toggle('show');

}

function showYear() {
	chartByYear();
	//transition opacity
	document.getElementById('caption BL').classList.toggle('show');

}

function showManufacturer() {
	chartByManufacturer();
	//transition opacity
	document.getElementById('caption BL').classList.toggle('show');

}

function showAll() {
	showData();
	showYear();	
}
