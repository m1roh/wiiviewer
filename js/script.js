var apiUrl = 'https://en.wikipedia.org/w/api.php?';
var parameters = {
	action: 'opensearch',
	limit: '11',
	namespace: '0',
	format: 'json'
};

function test() {
	var search = $('#searchBox').val();
	parameters.search = search;
	buildApiUrl();
	grabDatas();
}

function buildApiUrl() {
	apiUrl += $.param(parameters);
}

var datas,
	titres,
	articles,
	liens;

function grabDatas() {
	console.log(apiUrl);
	$.ajax({
		type: 'GET',
		url: apiUrl,
		dataType: 'jsonp',
		success: function(data) {
			titres = data[1];
			articles = data[2];
			liens = data[3];
			for (var i = 0; i < titres.length; i++) {
				$('#answers').append('<div class="row" id="answer' + (i + 1) + '"><a class="btn btn-default" href="' + liens[i] + '" id ="link' + i + '"><h2 id="title' + (i + 1) + '">' + titres[i] + '</h2><p id="text' + (i + 1) + '" style="white-space: initial">' + articles[i] + '</p></a></div>');
			}
			$('#answer1').attr('class', 'col-md-6 col-md-offset-3');
			$('#answer2').attr('class', 'col-md-6 col-md-offset-3');
			$('#answer3').attr('class', 'col-md-6 col-md-offset-3');
			$('#answer4').attr('class', 'col-md-2 col-md-offset-1');
			$('#answer5').attr('class', 'col-md-2 col-md-offset-1');
			$('#answer6').attr('class', 'col-md-2 col-md-offset-1');
			$('#answer7').attr('class', 'col-md-2 col-md-offset-1');
			$('#answer8').attr('class', 'col-md-2 col-md-offset-1');
			$('#answer9').attr('class', 'col-md-2 col-md-offset-1');
			$('#answer10').attr('class', 'col-md-2 col-md-offset-1');
			$('#answer11').attr('class', 'col-md-2 col-md-offset-1');
		},
		error: function() {
			console.log('Request Failed');
		}
	});
}

$(function() {
	$('#searchArticleBtn').on('click', function() {
		$('#searchDiv').append('<input type="text" id="searchBox" /><div id="searchBtns"><button class="btn" id="searchValid">OK</button><button class="btn" id="searchReset">Annuler</button></div>');
		$('#searchValid').on('click', function() {
			test();
		});
	});
	
});