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
			for (var i = 0; i < 3; i++) {
				$('#link' + (i+1)).attr('href', liens[i]);
				$('#title' + (i+1)).append(titres[i]);
				$('#text' + (i+1)).append(articles[i]); 
			}
			for (var j = 3; j < titres.length; j++) {
				$('#link' + (j+1)).attr('href', liens[j]);
				$('#title' + (j+1)).append(titres[j]);
				$('#text' + (j+1)).append(articles[j]);
			}
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
			$('#answersL').show('slow');
			$('#answersS').show('slow');
		});
	});
	
});