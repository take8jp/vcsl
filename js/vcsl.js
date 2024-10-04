$(function(){
				function getParam(name, url) {
					if (!url) url = window.location.href;
					name = name.replace(/[\[\]]/g, "\\$&");
					var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
							results = regex.exec(url);
					if (!results) return null;
					if (!results[2]) return '';
					return decodeURIComponent(results[2].replace(/\+/g, " "));
				}
				var search_txt = getParam('search');
				//alert(search_txt);
				$('#search').val(search_txt).quicksearch('#VCSL>.col', {});
				//vtuber名で検索
				var target_artist_name = '#artist_name_tag';
				var csvList_artist_name;
				var insert_artist_name = '';
				//ジャンルで検索
				var target_genre = '#genre_tag';
				var csvList_genre;
				var insert_genre = '';
				//年号で検索
				var target_release_year = '#release_year_tag';
				var csvList_release_year;
				var insert_release_year = '';
				//一覧
				var target_vcsl = '#VCSL';
				var csvList_vcsl;
				var insert_vcsl = '';
				var year = new Date().getFullYear();
				 var month = new Date().getMonth() + 1;
				var date = new Date().getDate();
				var nichiji = year + "" + month + "" + date;
					 
    $.ajax({
			 url: 'csv/VCSL.csv?' + new Date().getTime() +'',
       success: function(data) {
         // csvを配列に格納(vtuber名で検索)
				 csvList_artist_name = $.csv()(data);
				 // 挿入するHTMLを作成(vtuber名で検索)
         for (var i = 1; i < csvList_artist_name.length; i++) {
					 //多言語化
					 params = location.href.split("?");
					 if(params.length>1){
							var url = decodeURI(location.search)
							if(url.indexOf('lang=en') !== -1){
					 insert_artist_name += '<div class="artist_name_list v_name_txt badge text-bg-secondary mx-1 popup-modal-dismiss mb-2" onclick="$(\'#search\').val(\'' + csvList_artist_name[i][13] + '\').quicksearch(\'#VCSL>.col\', {});">' + csvList_artist_name[i][13] + '</div>';
							} else if(url.indexOf('lang=ko') !== -1){
					 insert_artist_name += '<div class="artist_name_list v_name_txt badge text-bg-secondary mx-1 popup-modal-dismiss mb-2" onclick="$(\'#search\').val(\'' + csvList_artist_name[i][14] + '\').quicksearch(\'#VCSL>.col\', {});">' + csvList_artist_name[i][14] + '</div>';
							} else{
					 insert_artist_name += '<div class="artist_name_list v_name_txt badge text-bg-secondary mx-1 popup-modal-dismiss mb-2" onclick="$(\'#search\').val(\'' + csvList_artist_name[i][1] + '\').quicksearch(\'#VCSL>.col\', {});">' + csvList_artist_name[i][1] + '</div>';
							}
						} else{
					 insert_artist_name += '<div class="artist_name_list v_name_txt badge text-bg-secondary mx-1 popup-modal-dismiss mb-2" onclick="$(\'#search\').val(\'' + csvList_artist_name[i][1] + '\').quicksearch(\'#VCSL>.col\', {});">' + csvList_artist_name[i][1] + '</div>';
						}
         };
         // csvを配列に格納(ジャンルで検索)
				 csvList_genre = $.csv()(data);
				 // 挿入するHTMLを作成(ジャンルで検索)
				 for (var i = 1; i < csvList_genre.length; i++) {
					 insert_genre += '<div class="genre_list genre_txt badge text-bg-secondary mx-1 popup-modal-dismiss mb-2" onclick="$(\'#search\').val(\'' + csvList_genre[i][4] + '\').quicksearch(\'#VCSL>.col\', {});">' + csvList_genre[i][4] + '</div>';
         };
         // csvを配列に格納(年号で検索)
				 csvList_release_year = $.csv()(data);
				 // 挿入するHTMLを作成(年号で検索)
				 for (var i = 1; i < csvList_release_year.length; i++) {
					 insert_release_year += '<div class="release_year_list badge text-bg-secondary mx-1 popup-modal-dismiss mb-2" onclick="$(\'#search\').val(\'' + csvList_release_year[i][5] + '\').quicksearch(\'#VCSL>.col\', {});">' + csvList_release_year[i][5] + '</div>';
         };
         // csvを配列に格納(一覧)
         csvList_vcsl = $.csv()(data);
         // 挿入するHTMLを作成
         for (var i = 1; i < csvList_vcsl.length; i++) {
					 var youtubeurl = csvList_vcsl[i][2]; // youtube動画のURL
					 var youtubeid = youtubeurl.split('v=')[1];
					 //多言語化
					 params = location.href.split("?");
					 //alert(youtubeid);
					insert_vcsl += '<div class="col">';
					insert_vcsl += '<div class="card">';
					insert_vcsl += '<div class="thum">';
					//insert_vcsl += '<img src="https://img.youtube.com/vi/' + youtubeid + '/sddefault.jpg" class="card-img-top" alt="...">';
					insert_vcsl += '<img src="Images/loading-buffering.gif" data-src="https://img.youtube.com/vi/' + youtubeid + '/mqdefault.jpg" class="card-img-top lazyload" alt="...">';
          insert_vcsl += '</div>';
					insert_vcsl += '<div class="card-body">';
					insert_vcsl += '<h5 class="card-title mb-1">' + csvList_vcsl[i][3] + '</h5>';
					 if(params.length>1){
							var url = decodeURI(location.search)
							if(url.indexOf('lang=en') !== -1){
								insert_vcsl += '<div class=" mb-1"><a href="' + csvList_vcsl[i][10] + '" target="_blank" class="link-dark link-underline-opacity-0-hover"><i class="bi bi-play-btn-fill"></i><small class=" ms-1 v_name_txt">' + csvList_vcsl[i][13] + '</small></a></div>';
							} else if(url.indexOf('lang=ko') !== -1){
								insert_vcsl += '<div class=" mb-1"><a href="' + csvList_vcsl[i][10] + '" target="_blank" class="link-dark link-underline-opacity-0-hover"><i class="bi bi-play-btn-fill"></i><small class=" ms-1 v_name_txt">' + csvList_vcsl[i][14] + '</small></a></div>';
							} else{
								insert_vcsl += '<div class=" mb-1"><a href="' + csvList_vcsl[i][10] + '" target="_blank" class="link-dark link-underline-opacity-0-hover"><i class="bi bi-play-btn-fill"></i><small class=" ms-1 v_name_txt">' + csvList_vcsl[i][1] + '</small></a></div>';
							}
						} else{
								insert_vcsl += '<div class=" mb-1"><a href="' + csvList_vcsl[i][10] + '" target="_blank" class="link-dark link-underline-opacity-0-hover"><i class="bi bi-play-btn-fill"></i><small class=" ms-1 v_name_txt">' + csvList_vcsl[i][1] + '</small></a></div>';
						}
					 insert_vcsl += '<div class="card-text">';
					if(csvList_vcsl[i][4]==""){}else{
					 insert_vcsl += '<div class=" small"><span class="badge text-bg-secondary mx-1 title_genre">ジャンル</span><span class="small genre_txt">' + csvList_vcsl[i][4] + '</span></div>';
					};
          insert_vcsl += '</div>';
          insert_vcsl += '<div class="d-flex justify-content-between align-items-center mt-2">';
          insert_vcsl += '<div class="btn-group">';
          insert_vcsl += '<a href="' + csvList_vcsl[i][2] + '" target="_blank" class="btn btn-sm btn-outline-secondary woy">Youtubeで見る</a>';
          insert_vcsl += '<a href="#exampleModal' + i + '" class="btn btn-sm btn-outline-secondary popup-modal details_btn">詳細</a>';
          insert_vcsl += '</div>';
					 if(csvList_vcsl[i][5]==""){}else{
          insert_vcsl += '<small class="text-body-secondary">' + csvList_vcsl[i][5] + '</small>';
					};
					insert_vcsl += '<div id="exampleModal' + i + '" class="mfp-hide modal_bg">';
          insert_vcsl += '<h5 class="card-title mb-3 text-center">' + csvList_vcsl[i][3] + '</h5>';
          insert_vcsl += '<div class="row row-cols-1 row-cols-sm-2">';
          insert_vcsl += '<div class="col">';
					insert_vcsl += '<div class="youtube mb-2 ">';
					 if(params.length>1){
							var url = decodeURI(location.search)
							if(url.indexOf('lang=en') !== -1){
								insert_vcsl += '<div class="youtube_playon" style="background-image:url(Images/youtubeload_en.png),url(https://img.youtube.com/vi/' + youtubeid + '/mqdefault.jpg);">' + youtubeid + '</div>';
							} else if(url.indexOf('lang=ko') !== -1){
								insert_vcsl += '<div class="youtube_playon" style="background-image:url(Images/youtubeload_ko.png),url(https://img.youtube.com/vi/' + youtubeid + '/mqdefault.jpg);">' + youtubeid + '</div>';
							} else{
								insert_vcsl += '<div class="youtube_playon" style="background-image:url(Images/youtubeload.png),url(https://img.youtube.com/vi/' + youtubeid + '/mqdefault.jpg);">' + youtubeid + '</div>';
							}
						} else{
								insert_vcsl += '<div class="youtube_playon" style="background-image:url(Images/youtubeload.png),url(https://img.youtube.com/vi/' + youtubeid + '/mqdefault.jpg);">' + youtubeid + '</div>';
						}
//					insert_vcsl += '<iframe src="https://www.youtube.com/embed/' + youtubeid + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
					insert_vcsl += '</div>';
					 if(params.length>1){
							var url = decodeURI(location.search)
							if(url.indexOf('lang=en') !== -1){
					insert_vcsl += '<div class=" mb-1"><a href="' + csvList_vcsl[i][10] + '" target="_blank" class="link-dark link-underline-opacity-0-hover"><i class="bi bi-play-btn-fill"></i><small class=" ms-1 v_name_txt">' + csvList_vcsl[i][13] + '</small></a></div>';
							} else if(url.indexOf('lang=ko') !== -1){
					insert_vcsl += '<div class=" mb-1"><a href="' + csvList_vcsl[i][10] + '" target="_blank" class="link-dark link-underline-opacity-0-hover"><i class="bi bi-play-btn-fill"></i><small class=" ms-1 v_name_txt">' + csvList_vcsl[i][14] + '</small></a></div>';
							}else{
					insert_vcsl += '<div class=" mb-1"><a href="' + csvList_vcsl[i][10] + '" target="_blank" class="link-dark link-underline-opacity-0-hover"><i class="bi bi-play-btn-fill"></i><small class=" ms-1 v_name_txt">' + csvList_vcsl[i][1] + '</small></a></div>';
							}
						} else{
					insert_vcsl += '<div class=" mb-1"><a href="' + csvList_vcsl[i][10] + '" target="_blank" class="link-dark link-underline-opacity-0-hover"><i class="bi bi-play-btn-fill"></i><small class=" ms-1 v_name_txt">' + csvList_vcsl[i][1] + '</small></a></div>';
						}
					insert_vcsl += '</div>';
          insert_vcsl += '<div class="col">';
					insert_vcsl += '<table class="table table-sm">';
					insert_vcsl += '<tbody>';
					if(csvList_vcsl[i][4]==""){}else{
						insert_vcsl += '<tr><th class="small table_th01 title_genre">ジャンル</th><td class="genre_txt">' + csvList_vcsl[i][4] + '</td></tr>';
					};
					 if(csvList_vcsl[i][5]==""){}else{
					insert_vcsl += '<tr><th class="small table_th01 title_release">公開年</th><td>' + csvList_vcsl[i][5] + '</td></tr>';
					};
					 if(csvList_vcsl[i][6]==""){}else{
					insert_vcsl += '<tr><th class="small table_th01 title_belonging">所属</th><td>' + csvList_vcsl[i][6] + '</td></tr>';
					};
					 if(csvList_vcsl[i][7]==""){}else{
					insert_vcsl += '<tr><th class="small table_th01">MIX</th><td>' + csvList_vcsl[i][7] + '</td></tr>';
					};
					 if(csvList_vcsl[i][8]==""){}else{
					insert_vcsl += '<tr><th class="small table_th01 title_lyrics">アーティスト名</th><td>' + csvList_vcsl[i][8] + '</td></tr>';
					};
					 if(csvList_vcsl[i][9]==""){}else{
					insert_vcsl += '<tr><th class="small table_th01">SNS</th><td><a href="' + csvList_vcsl[i][9] + '" target="_blank"><img loading="lazy" src="Images/x_logo.svg" width="20"></a></td></tr>';
					};
					insert_vcsl += '</tbody>';
					insert_vcsl += '</table>';
					 
					 if(csvList_vcsl[i][11]==""){}else{
					insert_vcsl += '<p>' + csvList_vcsl[i][11] + '</p>';
					};
					 if(csvList_vcsl[i][12]=="ある"){
						 insert_vcsl += '<div class="text-center"><a href="https://take8jp.github.io/vosl/?search=' + csvList_vcsl[i][1] + '" target="_blank" class="btn text-bg-secondary mx-1 original_linkbtn">関連するオリジナル曲はこちら</a></div>';
					 }else{};
					insert_vcsl += '<div class="search_only">' + csvList_vcsl[i][1] + '' + csvList_vcsl[i][13] + '' + csvList_vcsl[i][14] + '</div>';
					insert_vcsl += '</div>';
					insert_vcsl += '</div>';
          insert_vcsl += '</div>';
          insert_vcsl += '</div>';
          insert_vcsl += '</div>';
					insert_vcsl += '</div>';
					insert_vcsl += '</div>';
					insert_vcsl += '</div>';
         };
				 //表示
         $(target_artist_name).append(insert_artist_name);
         $(target_genre).append(insert_genre);
				 $(target_release_year).append(insert_release_year);
         $(target_vcsl).append(insert_vcsl);
				 const texts_release_year = new Set();
				 for (let li of document.querySelectorAll(".release_year_list")) {
						const string = li.textContent;
						texts_release_year.has(string) ? li.remove() : texts_release_year.add(string);
					}
				 const texts_artist_name = new Set();
				 for (let li of document.querySelectorAll(".artist_name_list")) {
						const string = li.textContent;
						texts_artist_name.has(string) ? li.remove() : texts_artist_name.add(string);
					}
				 const texts_genre = new Set();
				 for (let li of document.querySelectorAll(".genre_list")) {
						const string = li.textContent;
						texts_genre.has(string) ? li.remove() : texts_genre.add(string);
					}
				 //ランダム表示
          var bool = [1, -1];
          $('#artist_name_tag').html(
            $('#artist_name_tag>.artist_name_list').sort(function (a, b) {
              return bool[Math.floor(Math.random() * bool.length)];
            })
          );
				 //ランダム表示
          var bool = [1, -1];
          $('#genre_tag').html(
            $('#genre_tag>.genre_list').sort(function (a, b) {
              return bool[Math.floor(Math.random() * bool.length)];
            })
          );
				 //画像load
  				$(".lazyload").lazyload({
  					effect: 'fadeIn'
  				});
				 //検索
         	$(function search() {
						$('#search').quicksearch('#VCSL>.col', {
							'noResults': '#noresults',//検索該当無しの場合表示する対象
						});
					});
					$("#search").keydown(function (e) {
						if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
							return false;
						} else {
							return true;
						}
					});
    			//ランダム表示
          var bool = [1, -1];
          $('#VCSL').html(
            $('#VCSL>.col').sort(function (a, b) {
              return bool[Math.floor(Math.random() * bool.length)];
            })
          );
					//popup
					$('.popup-modal').magnificPopup({
						type: 'inline',
						preloader: false
					});
					//閉じるリンクの設定
					$(document).on('click', '.popup-modal-dismiss', function (e) {
						e.preventDefault();
						$.magnificPopup.close();
					});
				 	$(".youtube_playon").click(function(){
						//alert($(this).html());
						youtubeid = $(this).html()
						//クリックで置き換え
						$(this).after('<iframe src="https://www.youtube.com/embed/' + youtubeid + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>');
      		});
					 //多言語化
						if(params.length>1){
							var url = decodeURI(location.search)
					 		var genre_txt = $('.genre_txt').html();
					 		var v_name_txt = $('.v_name_txt').html();
							if(url.indexOf('lang=en') !== -1){
								//alert("en");
								$('html').attr('lang', 'en');
								$("body").addClass("lang_en");
								$(".info_txt").html("This site is a collection of Vtuber cover songs.<br/>We are looking forward to hearing from you.");//info
								$(".form_btn").text("Open the form in a separate tab");//別タブでフォームを開く
								$(".woy").text("Youtube");//Youtubeで見る
								$(".details_btn").text("Details");//詳細
								$(".search_btn01").text("Search by Vtuber name");//Vtuber名で検索
								$(".search_btn02").text("Search by Release Year");//リリース年で検索
								$(".search_btn03").text("Search by Genre");//ジャンルで検索
								$("#noresults").text("Not found.");//見つかりませんでした
								$(".title_genre").text("Genre");//ジャンル
								$(".title_release").text("Release year");//リリース年
								$(".title_belonging").text("belonging");//所属
								$(".title_lyrics").text("Artist Name");//アーティスト名
								$(".original_linkbtn").text("Related original songs");//関連するオリジナル曲はこちら
								
								$(".clear_txt").text("clear");//クリア
								$(".share_btn").text("Share on X");//Xでシェアする
								$("#search").attr("placeholder","Enter search words");//検索ワードを入力
								$('.genre_txt').each(function(){
									var genre_txt = $(this).html();
									$(this).html(
										genre_txt.replace(/ベース/g,'base').replace(/ロック/g,'ROCK').replace(/フィーチャー/g,'Fture ').replace(/ハイテック/g,'High-Tech').replace(/ダブステップ/g,'Dobstep').replace(/コア/g,'Core').replace(/和風/g,'Japanese-style ').replace(/メロ/g,'Melodic ')
									);
								});
							}else if(url.indexOf('lang=ko') !== -1){
								//alert("en");
								$('html').attr('lang', 'ko');
								$("body").addClass("lang_ko");
								$(".info_txt").html("이 사이트는 Vtuber의 커버곡을 모은 사이트입니다.<br/>여러분으로부터의 정보를 기다리고 있습니다.");//info
								$(".form_btn").text("다른 탭에서 양식 열기");//別タブでフォームを開く
								$(".woy").text("Youtube");//Youtubeで見る
								$(".details_btn").text("상세");//詳細
								$(".search_btn01").text("Vtuber 이름으로 검색");//Vtuber名で検索
								$(".search_btn02").text("출시년도 검색");//リリース年で検索
								$(".search_btn03").text("장르로 검색");//ジャンルで検索
								$("#noresults").text("찾을 수 없음");//見つかりませんでした
								$(".title_genre").text("장르");//ジャンル
								$(".title_release").text("출시년도");//リリース年
								$(".title_belonging").text("소속");//所属
								$(".title_lyrics").text("아티스트 이름");//アーティスト名
								$(".original_linkbtn").text("관련 오리지널 곡은 이쪽");//関連するオリジナル曲はこちら
								$(".clear_txt").text("클리어");//クリア
								$(".share_btn").text("X로 공유");//Xでシェアする
								$("#search").attr("placeholder","검색어 입력");//検索ワードを入力
								$('.genre_txt').each(function(){
									var genre_txt = $(this).html();
									$(this).html(
										genre_txt.replace(/ベース/g,'base').replace(/ロック/g,'ROCK').replace(/フィーチャー/g,'Fture ').replace(/ハイテック/g,'High-Tech').replace(/ダブステップ/g,'Dobstep').replace(/コア/g,'Core').replace(/和風/g,'Japanese-style ')
									);
								});
							}
						}
       		}
     		});
				$(".share_btn").click(function(){
					if(getParam('lang') == null){
						var share_btn_link = "https://twitter.com/share?url=https://take8jp.github.io/vcsl/&hashtags=vcslist";
						window.open(share_btn_link, "_blank");
					} else{
						var share_btn_link = "https://twitter.com/share?url=https://take8jp.github.io/vcsl/?lang=" + getParam('lang') + "&hashtags=vcslist";
						window.open(share_btn_link, "_blank");
					}
				});
			});
			//■page topボタン
      $(function () {
        var topBtn = $('#pageTop');
        topBtn.hide();

        //◇ボタンの表示設定
        $(window).scroll(function () {
          if ($(this).scrollTop() > 80) {
            //---- 画面を80pxスクロールしたら、ボタンを表示する
            topBtn.fadeIn();
          } else {
            //---- 画面が80pxより上なら、ボタンを表示しない
            topBtn.fadeOut();
          }
        });

        // ◇ボタンをクリックしたら、スクロールして上に戻る
        topBtn.click(function () {
          $('body,html').animate({
            scrollTop: 0
          }, 500);
          return false;
        });
      });
			
			window.onload = function() {
				const spinner = document.getElementById('loading');
				spinner.classList.add('loaded');
			};