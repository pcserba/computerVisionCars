function showData(res) {
	//update the text
	//build the string
	txt = 'We detected a <B>' + res[0].results[0].mh + ' </B> <B>'+res[0].results[0].Cn_short+'</B> with <B>'+Math.round(fromCarnet[0].probability*100)+'%</B> confidence.<P><B>Registrations in Europe ('+res[0].results[0].year+'):</B> '+res[0].results[0].countVIN+' vehicles<P><B>Average specific CO<sub>2</sub> Emissions</B>: '+res[0].results[0].avgEWLTP+' g/km<P><B>Average engine capacity:</B> '+res[0].results[0].avgEc+'cm<sup>3</sup><P><B>Average engine power:</B> '+res[0].results[0].avgEp+'kwh<P><B>Average mass in running order:</B> '+res[0].results[0].avgM+'kg';
document.getElementById('caption TL').innerHTML=txt;
//document.getElementById('caption BR').innerHTML='<a href=#>[Registrations by year]</A></P></div>';
document.getElementById('caption BR2').innerHTML='<a href=#>[Registrations by country]</A></P></div>';
//document.getElementById('caption BR3').innerHTML='<a href=#>[Avg Ewltp for '+res[0].results[0].mh+' by year]</A></P></div>';

document.getElementById('caption BR').addEventListener('click', function(){
   showYear(res[2].results);  });
document.getElementById('caption BR2').addEventListener('click', function(){
   showMS(res[1].results);  });
document.getElementById('caption BR3').addEventListener('click', function(){
   showManufacturer(res[3].results);  });


	//transition opacity
	document.getElementById('caption TL').classList.toggle('show');
	document.getElementById('caption BR').classList.toggle('show');
	document.getElementById('caption BR2').classList.toggle('show');
	document.getElementById('caption BR3').classList.toggle('show');
	};


function showMS(res) {
	chartByCountry(res);
	//transition opacity
	document.getElementById('caption BL').classList.toggle('show');

}

function showYear(res) {
	chartByYear(res);
	//transition opacity
	document.getElementById('caption BL').classList.toggle('show');

}

function showManufacturer(res) {
	chartByManufacturer(res);
	//transition opacity
	document.getElementById('caption BL').classList.toggle('show');

}

function showAll() {
	showData();
	showYear();	
}
