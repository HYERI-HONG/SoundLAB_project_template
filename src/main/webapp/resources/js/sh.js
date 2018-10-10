"use strict";
var sh = sh || {};
sh = (()=>{
     var $ctx,$js,$css,$img,w,state;
     var setState =x=>{state=x};
     var init =()=>{
         console.log('sh.init ::');
         $ctx = $.ctx();
         $js = $.js();
         $css = $.css();
         $img = $.img();
         w = $('#wrapper');
         $.when(
            $.getScript(sh.js()+'/compo.js'),
            $.getScript(sh.js()+'/sj.js'),
            $.getScript(sh.js()+'/ls.js'),
            $.getScript(sh.js()+'/jt.js')
         ).done(d=>{
        	 home(); 
         });
         
     };
     var home =()=>{
         console.log('sh.home ::');
	     w.html(nav()+banner()+cloud()+topFive()+footer());
	     $('#bannerItem').carousel({
	    	 interval: 2000
	     });
	     ui.btn({ id : 'admin', txt : '관리자테스트', at : $('userBox')});
         if($.cookie("loginID") != null){
              console.log('sh.home::priv::memberId = '+$.cookie("loginID"));
              $('#loginBtn').attr('id','logoutBtn').text('logout').click(()=>{
                  alert('logout::');
                  $.removeCookie("loginID");
                  home();
              });
              $('#joinBtn').attr('id','myPageBtn').text('My page').click(()=>{
                  alert('mypage::');
                  //sh.service.join();
              });
         }
         $('#logoImg').click(()=>{
              alert('logo::');
              home();
         });
         $('#loginBtn').click(()=>{
              sh.service.login();
         });
         $('#joinBtn').click(()=>{
              sh.service.join();
         });
        
         $('#searchBtn').click(e=>{
    		 jt.search();
    		 fn.scroll($("#search"));
    	 });
    	 $('#searchInput').keyup(e=>{
    		 if(e.keyCode == 13) { 
    			 jt.search();
    			 fn.scroll($("#search"));
    		 } 
    	 });
         
    	 $('#chartBtn').click(e=>{
			 ls.chart();
         });
         $('#albumBtn').click(e=>{
      		 ls.album();
         });
         $('#djBtn').click(e=>{
    		 sj.dj();
         });
         $('#forBtn').click(e=>{
			 $.ajax({
	    		 url : sh.ctx()+'/member/forYou',
		       	  method : 'get',
		       	  success : d=>{
		       		alert('인증완료');
		       		sj.forYou();
		       	  },
		       	  error : m=>{
		       		alert('로그인먼저해주세요');
		       		/*if(m.status == 401){
		       			alert('m 401 :: '+m.status);
		       			$('#wrapper').html('<img src="${context}/resources/img/Error-404.gif" alt="error404" style="width: 100%;height: 100%;"/>');
		       		}*/
	    			sh.service.login();
		       	  }
	    	 });
         });

     };
     var nav =()=> '<header id="header" class="header">'
     + '<div id="navBox" class="header_menu text-center affix" data-spy="affix" data-offset-top="50" >'
     /* container */
     + '<div class="container-fluid">'
     /* nav */
     + '<nav class="navbar navbar-default zero_mp ">'
     +'<div class="row">'
     +'<div id="navLB" class="col-md-1">'
     /*--여백--*/
     +'</div>'
     +'<div class="col-md-2" id="logoBox">'
     +'<img src="'+$img+'/logo.png" id="logoImg" class="logoImg">'
     +'</div>'
     +'<div class="col-md-3" id="searchBox">'
     /* searchBox */
     +'<div id="searchBox" class="searchBox">'
     +'<input id="searchInput" type="text" placeholder="검색어 입력"/>'
     +'<button id="searchBtn" type="button"/>'
     +'</div>'
     /*--searchBox--*/
     +'</div>'
     +'<div class="col-md-5">'
     /* 삼선 */
     + '<div id="samsun" class="navbar-header">'
     + '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".collapseNav" aria-expanded="false">'
     + '<span class="sr-only">Toggle navigation</span>'
     + '<span class="icon-bar"></span>'
     + '<span class="icon-bar"></span>'
     + '<span class="icon-bar"></span>'
     + '</button>'
     + '<a class="navbar-brand custom_navbar-brand" href="#"></a>'
     + '</div>'
     /*--삼선--*/
     /* userBox */
     + '<div class="collapse navbar-collapse collapseNav" id="userBox">'
     + '<ul class="nav navbar-nav navbar-right main_menu">'
     + '<li><a id ="loginBtn" href="#" class="loginBtn">LOGIN</a></li>'
     + '<li><a id ="joinBtn" href="#" class="joinBtn">회원가입</a></li>'
     + '</ul>'
     + '</div>'
     /*--userBox--*/
     /* serviceBox */
     + '<!-- /.navbar-collapse -->'
     + '<!-- Collect the nav links, forms, and other content for toggling -->'
     + '<div class="collapse navbar-collapse collapseNav" id="serviceBox">'
     + '<ul class="nav nav-justified navbar-right main_menu">'
     + '<li class="chartBtn"><a id="chartBtn" href="#chartBtn" class="chartBtn">차트 <span class="sr-only">(current)</span></a></li>'
     + '<li class="albumBtn"><a id="albumBtn" href="#albumBtn" class="albumBtn">최신앨범</a></li>'
     + '<li class="djBtn"><a id="djBtn" href="#djBtn" class="djBtn">뮤직DJ</a></li>'
     + '<li class="forBtn"><a id="forBtn" href="#forBtn" class="forBtn">FOR YOU</a></li>'
     + '</ul>'
     + '</div>'
     /*--serviceBox--*/
     +'</div>'
     +'<div id="navRB" class="col-md-1">'
     /*--여백--*/
     +'</div>'
     +'</div>'
     + '<!-- /.navbar-collapse -->'
     + '</nav>'
     /*--nav--*/
     + '</div>'
     /*--container--*/
     //+ '</div>'
     + '<!--End of header menu-->'
     + '</header>'
    +'<!--Scroll to top-->'
    +'<a href="#" id="back-to-top" title="Back to top" class="show">↑</a>'
    +'<!--End of Scroll to top-->'
    +'<div id="contents">';
var banner =()=> '<section id="banner" class="banner">'
		+'<div id="bannerItem" class="carousel slide" data-ride="carousel" data-interval="2000">'
		+'<ol class="carousel-indicators">'
		  +'<li data-target="#bannerItem" data-slide-to="0" class="active"></li>'
		  +'<li data-target="#bannerItem" data-slide-to="1" class=""></li>'
		  +'<li data-target="#bannerItem" data-slide-to="2" class=""></li>'
		+'</ol>'
		+'<div class="carousel-inner" role="listbox">'
		  +'<div class="item active">'
		    +'<img class="d-block img-fluid" src="'+$img+'/gmf2018_poster.jpg" alt="First slide">'
		    +'<div class="carousel-caption">'
			+'<h2>2018 Grand Mint Festival</h2>'
			+'<h3>일시 : 2018년 10월 20일(토요일)- 10월 21일(일요일)</h3>'
			+'<h3>위치 : 올림픽 공원 (서울 송파구 올림픽로 424 올림픽공원)</h3>'
		    +'</div>'
		  +'</div>'
		  +'<div class="item">'
		    +'<img class="d-block img-fluid" src="'+$img+'/starlight2018_poster.jpg" alt="Second slide">'
		    +'<div class="carousel-caption">'
		    +'<h2>2018 스타라이트 뮤지컬 페스티벌</h2>'
			+'<h3>일시 : 2018년 10월 20일(토요일)-10월 21일(일요일)</h3>'
			+'<h3>위치 : 인천 파라다이스 시티 호텔 (인천광역시 중구 영종해안남로321번길 186)</h3>'
		    +'</div>'
		  +'</div>'
		  +'<div class="item">'
		    +'<img class="d-block img-fluid" src="'+$img+'/seoulfashion2018_poster.jpg" alt="Third slide">'
		    +'<div class="carousel-caption">'
		    +'<h2>할로윈 레드문 서울 패션 페스티벌 2018</h2>'
			+'<h3>일시 : 2018년 10월 27일(토요일)</h3>'
		    +'</div>'  
		  +'</div>'
		+'</div>'
		+'<a class="left carousel-control" href="#bannerItem" role="button" data-slide="prev">'
		  +'<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>'
		  +'<span class="sr-only">Previous</span>'
		+'</a>'
		+'<a class="right carousel-control" href="#bannerItem" role="button" data-slide="next">'
		  +'<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'
		  +'<span class="sr-only">Next</span>'
		+'</a>'
		+'</div>'
     +'</section>';
var cloud =()=> '<section id="cloud" class="cloud" style="text-align:center">'
     +'</br>'
     +'</br>'
     +'</br>'
     +'</br>'
     +'</br>'
     +'</br>'
     +'<h1>단어구름</h1>'
     +'</section>';
var topFive =()=>'<section id="topFive" class="topFive" style="text-align:center">'
     +'</br>'
     +'</br>'
     +'</br>'
     +'</br>'
     +'</br>'
     +'</br>'
     +'<h1>topFive</h1>'
     +'</section>';
var footer =()=> '</div>'
     +'<section id="footer"  style="text-align:center">'
     +'</br>'
     +'</br>'
     +'</br>'
     +'</br>'
     +'</br>'
     +'</br>'
     +'<ul>'
     +'<li style="list-style:none"><a href="http://www.bugscorp.co.kr?wl_ref=M_footer_03_01" target="_blank" aria-label="새창">팀 명 : Turtle King</a><span class="bar"></span></li>'
     +'<li style="list-style:none"><a href="https://music.bugs.co.kr/cooperation?wl_ref=M_footer_03_01">LEADER : 신승호 </a><span class="bar"></span></li>'
     +'<li style="list-style:none"><a href="https://music.bugs.co.kr/rules/use?wl_ref=M_footer_03_01">MEMBER : 김진태</a><span class="bar"></span></li>'
     +'<li style="list-style:none"><a href="https://music.bugs.co.kr/rules/privacy?wl_ref=M_footer_03_01">MEMBER : 이 슬</a><span class="bar"></span></li>'
     +'<li style="list-style:none"><a href="https://music.bugs.co.kr/rules/youth?wl_ref=M_footer_03_01">MEMBER : 최소진</a><span class="bar"></span></li>'
     +'<li style="list-style:none"><a href="https://music.bugs.co.kr/connect/center?wl_ref=M_footer_03_01">MEMBER : 최솔빛누리</a><span class="bar"></span></li>'
     +'<li style="list-style:none"><a href="http://help.bugs.co.kr?wl_ref=M_footer_03_01">영상</a><span class="bar"></span></li>'
+'</ul>'
+'</div>'
+'</section>';
var login = ()=> '<section id="loginSec" class="loginSec" >'
	 +'<div class="container-fluid">'
	 +'<div class="col-md-4">'
	 +'</div>'
	 +'<div class="col-md-5">'
	 /* loginBox */
     +'<div id="loginBox" class="loginBox">'
     +'<div id="logoForm" class="logoForm">'
     +'<img src="'+$.img()+'/logo.png" id="logoImg" class="loginLogo"><h2 class="loginInst">로그인 후 이용하실 수 있습니다.</h2>'
     +'</div>'
     +'<div id="loginForm" class="loginForm">'
     +'<input id="memberId" class="loginInput" type="text" placeholder="아이디" required/></br>'
     +'<input id="pass" class="loginInput" type="password" placeholder="비밀번호" required/></br>'
     +'</div>'
     +'</div>'
     /*--loginBox--*/
     +'</div>'
     +'<div class="col-md-3">'
	 +'</div>'
	 +'</div>'
     +'</section>';
var join = ()=> '<section id="joinSec" class="joinSec">'
	 +'<div class="container-fluid">'
	 +'<div class="col-md-4">'
	 +'</div>'
	 +'<div class="col-md-5">'
     +'<div id="joinBox" class="joinBox">'
     +'<div id="logoForm" class="logoForm">'
     +'<p><img src="'+$.img()+'/logo.png" id="logoImg" class="joinLogo"></p>'
     +'</div>'
     +'<div id="joinForm" class="joinForm">'
     +'아이디'
     +'<span id="idInput"><input id="memberId" class="joinInput joinId" type="text" placeholder="아이디" required/></span></br>'
     +'비밀번호'
     +'<input id="pass" type="password" class="joinInput joinPass"  placeholder="비밀번호" required/></br>'
     +'<input id="pass2" type="password" class="joinInput joinPass2" placeholder="비밀번호 재입력" required/></br>'
     +'이름'
     +'<input id="name" class="joinInput joinName" required/><br>'
     +'닉네임'
     +'<input id="nick" class="joinInput joinNick" required/><br>'
     +'생년월일'
     +'<input id="ssn" class="joinInput joinSsn" placeholder="예)920807" required/><br>'
     +'성별'
     +'<span class="joinMan"><input type="radio" name="sex" value="남" checked="checked"/>  남</span>'
     +'<span class="joinWoman"><input type="radio" name="sex" value="여"/>  여</span>'
     +'</br>'
     +'이메일'
     +'<input id="email" class="joinMail" placeholder="이메일 입력" required/> @ '
     +'<select name="domain" class="mailDomain" id="mail">'
        +' <option value="">선택</option>'
        +' <option value="nate.com" selected="selected"> nate.com</option>'
        +' <option value="naver.com"> naver.com</option>'
        +' <option value="daum.net"> daum.net</option>'
        +' <option value="gmail.com"> gmail.com</option>'
        +' <option value="hanmail.net"> hanmail.net</option>'
        +' <option value="yahoo.com"> yahoo.com</option>'
        +' <option value="lycos.co.kr"> lycos.co.kr</option>'
        +' <option value="cyworld.com"> cyworld.com</option>'
        +' <option value="paran.com"> paran.com</option>'
        +' <option value="empal.com"> empal.com</option>'
        +' <option value="dreamwiz.com"> dreamwiz.com</option>'
        +' <option value="korea.com"> korea.com</option>'
        +' <option value="hanmir.com"> hanmir.com</option>'
        +' <option value="hitel.net"> hitel.net</option>'
        +' <option value="freechal.com"> freechal.com</option>'
     +'</select>'
     +'</br>'
     +'휴대폰'
     +'<input id="phone" class="joinInput joinPhone" required/></br>'
     +'</br>'
     +'<p class="inst1">추가 입력 사항</p>'
     +'<p class="inst2">-선호 장르(최대 2개)</p>'
     +'<div class="selectGenre">'
     +'<span class="genre"><input type="checkbox" class="genre" value="발라드" checked="checked" />   발라드 </span>'
     +'<span class="genre"><input type="checkbox" class="genre" value="힙합" />   힙합 </span>'
     +'<span class="genre"><input type="checkbox" class="genre" value="댄스" />   댄스 </span>'
     +'<span class="genre"><input type="checkbox" class="genre" value="트로트" />   트로트 </span>'
     +'</br>'
     +'<span class="genre"><input type="checkbox" class="genre" value="일렉트로닉" />   일렉트로닉 </span>'
     +'<span class="genre"><input type="checkbox" class="genre" value="알앤비소울" />   알앤비/소울 </span>'
     +'</div>'
     +'</br>'
     +'<p class="inst3">-선호 아티스트(최대 3명)</p>'
     +'<div id="selectArtist" class="selectArtist">'
     +'</div>'
     +'</div>'
     /*joinForm end*/
     +'</div> <!-- joinBox end -->'
     +'</div>'
     +'<div class="col-md-3">'
	 +'</div>'
	 +'</div>'
     +'</section>';
     return {
         ctx : ()=>$ctx,
         js : ()=>$js,
         css : ()=>$css,
         img : ()=>$img,
         w : ()=>w,
         init : init,
         home : home,
         nav : nav,
         banner : banner,
         cloud : cloud,
         topFive : topFive,
         footer : footer,
         login : login,
         join : join   
      };
})();
/*$('#wrapper').on("click",'#loginBtn',function(event){
    // 동적으로 여러 태그가 생성된 경우라면 이런식으로 클릭된 객체를 this 키워드를 이용해서 잡아올 수 있다.
     alert('lg버튼클릭');
     sh.clickEvent.login();
  });
*/

sh.service ={
     login : ()=>{
         console.log('sh.service.login::');
         $(sh.w()).html(sh.login());
         $.getScript(sh.js()+'/compo.js',()=>{
              let $loginForm = $('#loginForm');
              ui.br({len : 1, at : $loginForm});
              ui.span({ clazz : 'findJoin', at : $loginForm});
              ui.a({ id : 'findIdBtn', clazz : 'findJoinBtn', txt : '아이디/비밀번호 찾기', at : $('.findJoin')});
              ui.a({ id : 'joinBtn', clazz : 'findJoinBtn', txt : '회원가입', at : $('.findJoin')})
              .click(e=>{
                       alert('join::');
                       sh.service.join();
                  });
              ui.br({len : 2, at : $loginForm});
              ui.btn({ id : 'loginConf', clazz : 'success loginConf', txt : '로그인', at : $loginForm})
                  .click(e=>{
                       alert('id : '+$('#memberId').val());
                       alert('pass : '+$('#pass').val());
                       alert('url ::: '+ sh.ctx()+'/member/login');
                       $.ajax({
                    	  url : sh.ctx()+'/member/login',
                    	  method : 'post',
                    	  contentType : 'application/json',
                    	  data : JSON.stringify({
                    		  memberId : $('#memberId').val(),
                    		  pass : $('#pass').val()
                    	  }),
                    	  success : d=>{
                    		  console.log('login success in :::');
                    		  if(d.isAuth){
                    			 $.cookie("loginID",d.id);
                    			 sh.home();
                    		  }else{
                    			 console.log("인증실패 다시 로그인폼으로");
                    			 sh.service.login(); 
                    		  }

                    	  },
                    	  error : ()=>{
                    		  alert('로그인 실패 error.jsp');
                    	  }
                       });
              });
              ui.br({len : 1, at : $loginForm});
              ui.btn({ 'id' : 'kakaoBtn', clazz : 'warning kakaoBtn', txt : '카카오계정 로그인', at : $loginForm})
              .click(e=>{
                   alert('id : '+$('#userId').val());
                   alert('pass : '+$('#password').val());
                   sh.home({ state : 'priv', userId : $('#userId').val()});
              });

         });
         $('#logoImg').click(e=>{
              alert('logo::');
              sh.home();
         });
         
     },
     join : ()=>{
         console.log('sh.service.join::');
         $(sh.w()).html(sh.join());
         $.getScript(sh.js()+'/compo.js',()=>{
             let $joinForm = $('#joinForm');
             ui.btn({
            	 clazz : 'success dupleCheck',
            	 txt : '중복확인',
                 at : $('#idInput')
             });
             
             ui.btn({
            	 clazz : 'success joinConf',
            	 txt : '회원가입',
                 at : $joinForm
             })
             .click(e=>{
            	 alert('회원가입!!');
            	 $('input:checkbox[class=genre]:checked').each((i,o)=>{
                   	 alert(o.value);
                 });
             });
             
         });
         
         $('#logoImg').click(e=>{
              alert('logo::');
              sh.home();
         });
          $('input:checkbox[class=genre]').click(function() { 
                let genreCnt = $('input:checkbox[class=genre]:checked').length;
                if(genreCnt>2){
                 alert('최대 2개까지 선택 가능합니다.')
                 $(this).prop('checked', false);
                }
                
          });
     }
};