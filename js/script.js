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
	titresSm,
	article,
	articles,
	articlesSm,
	lien,
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
				lien = liens[j];
				titresSm = titres[j].split(' ', 2).join(' ');
				$('#title' + (j+1)).append(titresSm);
				article = articles[j];
				articlesSm = articles[j].split(' ', 4).join(' ') + '...';
				$('#text' + (j+1)).append(articlesSm);
				
			}
			$('.linkS').on('click', function() {
					$('#ansSRowDiv').prepend($('#answer3').attr('class', 'col-md-3').attr('id', ' '));
					var newL3Title = $('#link3 h2').text().split('-').join(' ').split(' ', 2).join(' ');
					var newL3Text = $('#link3 p').text().split('-').join(' ').split(' ', 4).join(' ');
					$('#link3 h2').html(newL3Title);
					$('#link3 p').html(newL3Text);
					$('#link3').removeAttr('href');
					$('#link3').attr('role', 'button');
					$('#link3').addClass('linkS');
					$('#link3').attr('id', $(this).attr('id'));
					$('#link2').attr('id', 'link3');
					$('#answer2').attr('id', 'answer3');
					$('#link1').attr('id', 'link2');
					$('#answer1').attr('id', 'answer2');
					
					$(this).parent().attr('class', 'col-md-6 col-md-offset-3');
					$(this).parent().attr('id', 'answer1');
					$('#answersL').prepend($(this).parent());
					$(this).attr('id', 'link1')					
					$(this).children('p').html(article);
					$(this).on('click', function() {
						$(this).attr('href', lien);
					});
				});
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