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

function invertDivs() {
	$('.linkS').on('click', function () {
		function convertAnswersL() {
			old3link = $('#3link').clone();
			$('#ansSRowDiv').prepend($('#answer3').attr('class', 'col-md-3').removeAttr('id'));
			oldLink = $('#3link').attr('href');
			oldTitle = $('#3link h2').text();
			oldText = $('#3link p').text();
			newTitle = $('#3link h2').text().split('-').join(' ').split(' ', 2).join(' ');
			newText = $('#3link p').text().split('-').join(' ').split(' ', 4).join(' ');
			$('#3link h2').html(newTitle);
			$('#3link p').html(newText);
			$('#3link').removeAttr('href');
			$('#3link').attr('role', 'button');
			$('#3link').addClass('newLinkS');
			$('#3link').attr('id', $(this).attr('id'));
			$('#2link').attr('id', '3link');
			$('#answer2').attr('id', 'answer3');
			$('#1link').attr('id', '2link');
			$('#answer1').attr('id', 'answer2');
		}
		convertAnswersL();

		$(this).parent().attr('class', 'col-md-6 col-md-offset-3');
		$(this).parent().attr('id', 'answer1');
		$('#answersL').prepend($(this).parent());
		val = parseInt($(this).attr('id')) - 1;
		$(this).attr('id', '1link');
		articlesLg = articlesArr[val];
		$(this).children('p').html(articlesLg);
		$(this).on('click', function () {
			$(this).attr('href', lien);
		});

		/*$('.newLinkS').on('click', function () {
			convertAnswersL();
			$(this).parent().attr('class', 'col-md-6 col-md-offset-3');
			$(this).parent().attr('id', 'answer1');
			$(this).parent().html(old3link);
			$('#answersL').prepend($(this).parent());
			$(this).children('h2').html(oldTitle);
			$(this).children('p').html(oldText);
			$('#answersL').prepend($(this).parent());
			$(this).parent().attr('class', 'col-md-6 col-md-offset-3');
			$(this).parent().attr('id', 'answer1');
			$(this).children('h2').html(oldTitle);
			$(this).children('p').html(oldText);
			$(this).on('click', function () {
				$(this).attr('href', oldLink);
			});
		});*/
	});
}

var datas,
	titres,
	titresSm,
	articles,
	articlesSm,
	articlesLg,
	articlesArr = [],
	lien,
	liens,
	newTitle,
	newText,
	old3link,
	oldTitle,
	oldText,
	oldLink,
	val;

function grabDatas() {
	$.ajax({
		type: 'GET',
		url: apiUrl,
		dataType: 'jsonp',
		success: function (data) {
			titres = data[1];
			articles = data[2];
			liens = data[3];
			for (var k = 0; k < articles.length; k++) {
				articlesArr.push(articles[k]);
			}
			for (var i = 0; i < 3; i++) {
				$('#' + (i + 1) + 'link').attr('href', liens[i]);
				$('#title' + (i + 1)).append(titres[i]);
				$('#text' + (i + 1)).append(articles[i]);
			}
			for (var j = 3; j < titres.length; j++) {
				lien = liens[j];
				titresSm = titres[j].split(' ', 2).join(' ');
				$('#title' + (j + 1)).append(titresSm);
				articlesSm = articles[j].split(' ', 4).join(' ') + '...';
				$('#text' + (j + 1)).append(articlesSm);
			}
		},
		error: function () {
			console.log('Request Failed');
		}
	});
}

$(function () {
	$('#searchArticleBtn').on('click', function () {
		$('#searchDiv').append('<input type="text" id="searchBox" /><div id="searchBtns"><button class="btn" id="searchValid">OK</button><button class="btn" id="searchReset">Annuler</button></div>');
		$('#searchValid').on('click', function () {
			test();
			$('#answersL').show('slow');
			$('#answersS').show('slow');
			oldLink = $('#3link').attr('href');
			console.log(oldLink);
			console.log($('#3link').attr('href'));
			invertDivs();
		});
	});
});