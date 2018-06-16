jQuery(document).ready(function($) {

  // Menu
  $('.nav-toggle').on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.nav').toggleClass('open');
    $('body').toggleClass('nav-open');
  });

  // Sticky header
  var h = $('.header').innerHeight();

  $(window).scroll(function() {
    if($(this).scrollTop() > h / 4) {
      $('.header').addClass('sticky');
    }
    else {
      $('.header').removeClass('sticky');
    }
  });

  $('.modal').popup({
    transition: 'all 0.3s',
    onclose: function() {
      $(this).find('label.error').remove();
    }
  });
  $('input[type=tel]').mask('+7 (000) 000-00-00');

  $('.city b').click(function(e) {
    $(this).parent().next('.city-list').toggleClass('open');
  });

  var youtube = $('.youtube');
  $.each(youtube, function(index, el) {
    var source = "https://img.youtube.com/vi/"+ $(el).data('embed') +"/sddefault.jpg";
    var image = new Image();
    image.src = source;
    image.addEventListener( "load", function() {
      youtube[ index ].append( image );
    }( index ) );

    $(el).on('click', function() {
      var iframe = document.createElement( "iframe" );

      iframe.setAttribute( "frameborder", "0" );
      iframe.setAttribute( "allowfullscreen", "" );
      iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ $(this).data('embed') +"?rel=0&showinfo=0&autoplay=1" );
      $(this).innerHTML = "";
      $(this).append( iframe );
      $(this).find('.play-button').hide();
    });
  });

  // Partner slider
  const breakpoint = window.matchMedia( '(min-width: 992px)' );
  var partnerSlider;

  const breakpointChecker = function() {
     // if larger viewport and multi-row layout needed
     if ( breakpoint.matches === true ) {
        // clean up old instances and inline styles when available
        if ( partnerSlider !== undefined ) {
          $('.partner-list').removeClass('swiper-container');
          $('.partner-list__item').unwrap('.swiper-wrapper');
          $('.partner-list__item').removeClass('swiper-slide');
          $('.partner-list .swiper-pagination').remove();
          partnerSlider.destroy( true, true );
        }
        // or/and do nothing
        return;
     // else if a small viewport and single column layout needed
     } else if ( breakpoint.matches === false ) {
        // fire small viewport version of swiper
        return enableSwiper();
     }
  };

  const enableSwiper = function() {

    $('.partner-list').addClass('swiper-container');
    if (! $('.partner-list .swiper-wrapper').length ) {
      $('.partner-list__item').wrapAll('<div class="swiper-wrapper"></div>');
    }
    $('.partner-list__item').addClass('swiper-slide');
    $('.partner-list').append('<div class="swiper-pagination"></div>');

    partnerSlider = new Swiper ('.partner-list', {
      slidesPerView: 3,
      breakpoints: {
        767: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 0
        }
      },

      pagination: {
        el: '.swiper-pagination',
      },
    });
  }

  // keep an eye on viewport size changes
  breakpoint.addListener(breakpointChecker);
  // kickstart
  breakpointChecker();

  // Teacher slider
  teacherSlider = new Swiper ('.teacher-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    simulateTouch: false,
    navigation: {
      nextEl: '.teacher-btn-next',
      prevEl: '.teacher-btn-prev',
    },

  });

  $('.teacher-diploma-slider').each(function(i, el) {
    var $this = $(this);
    $this.addClass("teacher-diploma-slider-" + i);
    $this.parent().find(".swiper-button-prev").addClass("button-prev-" + i);
    $this.parent().find(".swiper-button-next").addClass("button-next-" + i);

    var btnNext = '.button-next-' + i;
    var btnPrev = '.button-prev-' + i;

    diplomaSlider = new Swiper ('.teacher-diploma-slider-' + i, {
      slidesPerView: 4,
      spaceBetween: 20,
      breakpoints: {
        992: {
          slidesPerView: 3,
        },
        767: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 0
        }
      },
      navigation: {
        nextEl: btnNext,
        prevEl: btnPrev,
      },
    });
  });

  // Teacher thumb slider
  teacherThumbSlider = new Swiper ('.teacher-thumbnail', {
    slidesPerView: 10,
    spaceBetween: 30,
    centeredSlides: true,
    touchRatio: 0.2,
    // slidesOffsetBefore: 20,
    // slidesOffsetAfter: 20,
    slideToClickedSlide: true,
    breakpoints: {
      1200: {
        slidesPerView: 8,
      },
      992: {
        slidesPerView: 6,
      },
      767: {
        slidesPerView: 5,
        spaceBetween: 10
      },
      480: {
        slidesPerView: 4
      },
      370: {
        slidesPerView: 3
      }
    },
    navigation: {
      nextEl: '.teacher-btn-next',
      prevEl: '.teacher-btn-prev',
    },
  });

  if ( $('.teacher-slider').length ) {
    teacherSlider.controller.control = teacherThumbSlider;
    teacherThumbSlider.controller.control = teacherSlider;
  }
  
  // Testimonial slider
  testimonialSlider = new Swiper ('.testimonial-slider', {
    slidesPerView: 2,
    spaceBetween: -240,
    centeredSlides: true,
    loop: true,
    breakpoints: {
      767: {
        slidesPerView: 1,
        spaceBetween: 0
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
  });

  // Testimonial client slider
  testimonialClientSlider = new Swiper ('.testimonial-client-slider', {
    slidesPerView: 1,
    spaceBetween: 240,
    breakpoints: {
      767: {
        slidesPerView: 1,
        spaceBetween: 100
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // Filtering isotop
  $(window).on('load', function () {
    var $grid = $('.action-list').isotope({
      itemSelector: '.action-list .col-lg-6',
      horizontalOrder: true,
      fitWidth: true,
      layoutMode: 'masonry'
    });

    // bind filter button click
    $('.action__filter').on( 'click', 'button', function() {
      var filterValue = $( this ).attr('data-filter');
      if( filterValue == '*' ) {
        // $('.action-list__item').matchHeight();
        $('.action-list__item ul').matchHeight();
      }
      else {
        // $(filterValue + ' .action-list__item').matchHeight();
        $(filterValue + ' .action-list__item ul').matchHeight();
      }
      $grid.isotope({ filter: filterValue });
    });

    // change is-checked class on buttons
    $('.action__filter').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $( this ).addClass('is-checked');
      });
    });

  });

  // Match height
  // $('.action-list__item').matchHeight();
  $('.action-list__item ul, .corporate-offer-list__title-wrap').matchHeight();

  // Group course more
  $('.group-course__more').click(function(e) {
    $('.group-course-list__item.hidden').each(function(i, el) {
      $(el).removeClass('hidden');
    });
    $(this).hide();
  });

  // Footer menu
  $('.footer__menu h3').click(function() {
    $(this).toggleClass('active');
    $(this).parent().find('ul').slideToggle(500);
  });

  function mapWidth() {
    if ( $(window).width() > 767 ) {
      var contactWidth = $('.contact').width();
      var containerWidth = $('.contact .container').width();
      var mapWidth = $('.contact__map').width();
      var scrollW = $(document).scrollWidth;
      $('.contact__map').css('width', mapWidth + (contactWidth - containerWidth) / 2);
    }
  }

  mapWidth();

  $(window).resize(function() {
    $('.contact__map').removeAttr('style');
    mapWidth();
  });

  $('.contact__more').click( function(e) {
    e.preventDefault()
    $('.contact__list').toggleClass('open');
  } );

  // Test chart
  // if( $('#test-chart').length ) {
  //   $.jqplot('test-chart',  [[[1, 2],[3,5.12],[5,13.1],[7,33.6],[9,85.9]]]);
  // }

    // Tabs
  (function($){
    jQuery.fn.lightTabs = function(options){

      var createTabs = function(){
        tabs = this;
        i = 0;

        showPage = function(i){
          $(tabs).find(".filters-content").children("div").hide();
          $(tabs).find(".filters-content").children("div").eq(i).show();
          $(tabs).find(".filter__btn").removeClass("is-checked");
          $(tabs).find(".filter__btn").eq(i).addClass("is-checked");
        }

        showPage(0);

        $(tabs).find(".filter__btn").each(function(index, element){
          $(element).attr("data-page", i);
          i++;
        });

        $(tabs).find(".filter__btn").click(function(){
          showPage(parseInt($(this).attr("data-page")));
        });
      };
      return this.each(createTabs);
    };
  })(jQuery);

  $(".filters").lightTabs();

  /* Валидация телефона */
  jQuery.validator.addMethod("phoneno", function(phone_number, element) {
     return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
  }, "Введите Ваш телефон");

  /* Валидация формы */
  $(".callback-form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = {
        name: jQuery(".callback-form").find("input[name=name]").val(),
        phone: jQuery(".callback-form").find("input[name=phone]").val(),
        subject: jQuery(".callback-form").find("input[name=subject]").val()
      };
      ajaxSend('.callback-form', t);
    }
  });

  $(".action-form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = {
        name: jQuery(".action-form").find("input[name=name]").val(),
        phone: jQuery(".action-form").find("input[name=phone]").val(),
        subject: jQuery(".action-form").find("input[name=subject]").val()
      };
      ajaxSend('.action-form', t);
    }
  });

  $(".subscribe-form").validate({
    messages: {
      email: "Введите Ваш email",
    },
    rules: {
      "email": {
        email: true
      }
    },
    submitHandler: function(form) {
      var t = {
        phondemaile: jQuery(".subscribe-form").find("input[name=email]").val(),
        subject: jQuery(".subscribe-form").find("input[name=subject]").val()
      };
      ajaxSend('.subscribe-form', t);
    }
  });

  $(".order-online-course-1-form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = {
        name: jQuery(".order-online-course-1-form").find("input[name=name]").val(),
        phone: jQuery(".order-online-course-1-form").find("input[name=phone]").val(),
        subject: jQuery(".order-online-course-1-form").find("input[name=subject]").val()
      };
      ajaxSend('.order-online-course-1-form', t);
    }
  });

  $(".sign-lesson-form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = {
        name: jQuery(".sign-lesson-form").find("input[name=name]").val(),
        phone: jQuery(".sign-lesson-form").find("input[name=phone]").val(),
        subject: jQuery(".sign-lesson-form").find("input[name=subject]").val()
      };
      ajaxSend('.sign-lesson-form', t);
    }
  });

  $(".group-1-form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = {
        name: jQuery(".group-1-form").find("input[name=name]").val(),
        phone: jQuery(".group-1-form").find("input[name=phone]").val(),
        subject: jQuery(".group-1-form").find("input[name=subject]").val()
      };
      ajaxSend('.group-1-form', t);
    }
  });

  $(".calc-course-form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = {
        name: jQuery(".calc-course-form").find("input[name=name]").val(),
        phone: jQuery(".calc-course-form").find("input[name=phone]").val(),
        subject: jQuery(".calc-course-form").find("input[name=subject]").val()
      };
      ajaxSend('.calc-course-form', t);
    }
  });

  /* Функцыя для отправки формы */
  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

  // Test
  var TestStep = 0;     // Порядковый номер теста
  var TestMass = [];    // Многомерный массив 
  TestMass[0] = [];     // Здесь храним ID записи
  TestMass[1] = [];   // Правильный ответ
  TestMass[2] = [];   // Правильный ли ответ 
  TestMass[3] = [];   // Ответ пользователя
  var MaxTestQuestions = 7; //Максимальное количество вопросов в тесте

  var pid = "";
  var title = "";
  var sub_title = "";
  var right = "";
  var isRightReply = "";
  var otvet = '';
  strTest ='';
  var myPlotVal = 0;

  s2 = null;
  s2 = new Array();
  s2[0]= new Array();
  s2[0]=[0,0];
    if ( $('#test-chart').length > 0) {
    
  // var pid = get_pid();
  get_text_area();
  setMass();
  TestStep++;
    
  plot1 = $.jqplot("test-chart", [new Array(1)], {
//  plot1 = $.jqplot("jqplot", s2, {
        // Turns on animatino for all series in this plot.
        animate: true,
        // Will animate plot on calls to plot1.replot({resetAxes:true})
        animateReplot: false,
        seriesColors: ['#ffab00'],

        grid: {
      drawGridlines: true,
          borderColor: 'transparent',
          shadow: false,
          drawBorder: false,
          shadowColor: 'transparent',
          background: '#ffffff',
          gridLineColor:'#eaeaea'
  },

        cursor: {
            show: false,
            zoom: false,
            looseZoom: false,
            showTooltip: false
        },
        seriesDefaults: {
      rendererOptions: {
          smooth: true
            }
        },
        series:[
            {
                rendererOptions: {
                    animation: {
                        speed: 2000
                    }
                }
            }
        ],
        axesDefaults: {
            pad: 0,
            min: 0,
        },
        axes: {
            // These options will set up the x axis like a category axis.
            xaxis: {
//          renderer: $.jqplot.DateAxisRenderer,
    renderer: $.jqplot.LinearAxisRenderer,
                tickInterval: 1,
                drawMajorGridlines: true,
                drawMinorGridlines: false,
                drawMajorTickMarks: false,
                forceTickAt0: true,
          pad:0,
                rendererOptions: {
                  tickInset: 0,
                  minorTicks: 1,
                  forceTickAt0: true
          },
          min:0,
          max:7,
          showTicks: false
            },
            yaxis: {
          tickInterval: 1,
                pad:0,
                rendererOptions: {
                    minorTicks: 0.5,
                    tickInsets: 1
                },
                min:-7,
                max:7,
    tickOptions: {
        textColor: '#222222',
        fontSize: '11pt'
    }
            }
        },
        highlighter: {
            show: false, 
            showLabel: false, 
            tooltipAxes: 'n',
            sizeAdjust: 1 , 
            tooltipLocation : 'ne'
        }
    });
  

  s1 = null;
  s1 = new Array();

  $( "div.jqplot-yaxis-tick:contains('2')" ).css({ "font-size":"10px", "color":"#dee4e9", "margin-top": "3px" });
  $( "div.jqplot-yaxis-tick:contains('4')" ).css({ "font-size":"10px", "color":"#dee4e9", "margin-top": "3px" });
  $( "div.jqplot-yaxis-tick:contains('6')" ).css({ "font-size":"10px", "color":"#dee4e9", "margin-top": "3px" });

  }
  
  
  $('.test__submit').click(function () {
    var per1 = 0;
    var per2 = 0;
    checked = false;
    $('.form__radio').each(function(i,elem) {
      if ($(this).prop("checked")){
        checked = true;
        otvet = $('input[type=radio]:checked').val();
        TestMass[3][TestStep] = otvet;
      }
    });

    if (!checked){
      alert('Выберите вариант ответа');
      return;
    }
    
    $('.test-line1-left_bisy').css('display','block');
    pid = get_pid();
    get_text_area();
    setMass();
    // $('input, select').styler();
    /* var iter = 1;
    $.each($('input#otvet1'), function () {
        $(this).attr("id","otvet"+iter);
        //$(this).attr("name","otvet"+iter);
        console.log($(this).attr("id"));
        iter++;
    });
    iter = 1;
    $.each($('label'), function () {
        $(this).attr("for","otvet"+iter);
        console.log($(this).attr("for"));
        iter++;
    }); */



    

    $('.test-breadcrumb__item').each(function(i,elem) {

      if ($(this).hasClass("active")) {
        $(this).removeClass("active");  
      } 
      if (TestStep == (i)) {
        $(this).addClass("active");
        var step = 0;
        if (TestStep == 0) {
          step = 0;
        }else{
          step = 1;
        }
      }
    });
    //alert(TestMass[3][TestStep-1]);
    TestMass[3][TestStep-1] = otvet;
    //alert(TestMass[3][TestStep-1]);
    //alert(TestMass[1][TestStep-1]);
    if (TestMass[3][TestStep-1] == TestMass[1][TestStep-1]){
      isRightReply = true;
    }else{
      isRightReply = false;

    }
    TestMass[2][TestStep-1] = isRightReply;

    TestStep++;
    
    if (TestStep > MaxTestQuestions) {
      TestMass[3][TestStep-1] = otvet;
//      console.log(TestMass[3][TestStep-1]);
//      console.log(TestMass[1][TestStep-1]);

//      if (TestMass[3][TestStep-1] == TestMass[1][TestStep-1]){
//        isRightReply = true;
//      }else{
//        isRightReply = false;
//      }
//      TestMass[2][TestStep-1] = isRightReply;
      $('.test-end').css('display','block');
//      console.log(TestMass[0]);
//      console.log(TestMass[1]);
//      console.log(TestMass[2]);
//      console.log(TestMass[3]);
      
//      console.log('right='+right);
//      console.log('user_reply='+user_reply);
//      console.log('isRightReply='+isRightReply);
//      console.log('TestStep='+TestStep);

      if (isRightReply) {myPlotVal++;} else {myPlotVal--;};
    
      s2[TestStep-1] = new Array();
      s2[TestStep-1] = [TestStep-1,myPlotVal];

      plot1.series[0].data = s2;
      plot1.axes.xaxis.min = 0;
      plot1.axes.xaxis.max = 7;
//      plot1.axes.xaxes.pad = 0;
      plot1.replot();
      if (myPlotVal < 0) { $('.test-line1-right p').css({"display":"block"}); } else { $('.test-line1-right p').css({"display":"none"}); };
//      console.log(myPlotVal);
      var totalAnswers = 0;
      TestMass[2].forEach(function(entry) {
      if (entry == true) {totalAnswers++;};
      });
      $("#right_answers").text(totalAnswers);
//      console.log( 7-(7-Math.abs(myPlotVal)) );
      alert('Тест завершен!');
      $( "div.jqplot-yaxis-tick:contains('2')" ).css({ "font-size":"10px", "color":"#dee4e9", "margin-top": "3px" });
      $( "div.jqplot-yaxis-tick:contains('4')" ).css({ "font-size":"10px", "color":"#dee4e9", "margin-top": "3px" });
      $( "div.jqplot-yaxis-tick:contains('6')" ).css({ "font-size":"10px", "color":"#dee4e9", "margin-top": "3px" });
      
      
      fancyboxForm = '<div class="popup-wrap"><div class="b1-form"><form><div class="form-title"><span>Спасибо!</span><br /> Сообщение будет отправлено Вам в течении 30 секунд!</div></form></div></div>';
      $.fancybox('<div class="popup-wrap"><div class="b2-form"><form id="contact2" method="post" action="/sendmessage.php" ><div class="form-title"><span>Спасибо, что прошли тест!</span></div><br />'+
      '<b>Введите ваш e-mail и мы отправим подходящую <br> вам программу обучения в течении 30 секунд</b><br><br><br>' +
      '<input type="text" name="answers" style="display:none;" value="'+totalAnswers+'">' +
      '<input type="text" name="email" class="email" placeholder="Введите ваш е-mail:"><br>'+
      '<input type="text" name="order_text" value="<p><strong>Отправлено с формы: </strong>Пройти тест | Форма 2 - пройти тест</p> <br>' +
      'Количество правильных ответов: '+ totalAnswers + '" style="display:none;">' +
      '<button type="submit" class="send1">Получить программу</button>'+
      '</div></form></div></div>');
      $("#contact2").submit(function() { 
          send1_event($(this));
          $('a.fancybox-item.fancybox-close').click();
          return false; 
      });
      return;

    }
//    console.log(TestMass[0]);
//    console.log(TestMass[1]);
//    console.log(TestMass[2]);
//    console.log(TestMass[3]);
    
//    console.log('right='+right);
//    console.log('user_reply='+user_reply);
//    console.log('isRightReply='+isRightReply);
//    console.log('TestStep='+TestStep);
    
    if (isRightReply) {myPlotVal++;} else {myPlotVal--;};
    s2[TestStep-1] = new Array();
    s2[TestStep-1] = [TestStep-1,myPlotVal];
    plot1.series[0].data = s2;
    plot1.axes.xaxis.min = 0;
    plot1.axes.xaxis.max = 7;
//    plot1.axes.xaxes.pad = 0;
//    plot1.axes.xaxes.rendererOptions.forceTickAt0 = true;
    plot1.replot();
//    console.log(myPlotVal);
    if (myPlotVal < 0) { $('.test-line1-right p').css({"display":"block"}); } else { $('.test-line1-right p').css({"display":"none"}); };
    $( "div.jqplot-yaxis-tick:contains('2')" ).css({ "font-size":"10px", "color":"#dee4e9", "margin-top": "3px" });
    $( "div.jqplot-yaxis-tick:contains('4')" ).css({ "font-size":"10px", "color":"#dee4e9", "margin-top": "3px" });
    $( "div.jqplot-yaxis-tick:contains('6')" ).css({ "font-size":"10px", "color":"#dee4e9", "margin-top": "3px" });
//    console.log(s2);
    return false;
    
  }); 

  function get_pid(){
    var tmp_pid = "";
    tmp_pid = get_test_data('array', 134);
//    console.log('tmp_pid='+tmp_pid);
    var bol = true;
    while (bol === true){
      if (in_array(tmp_pid, TestMass[0])) {
        tmp_pid = (get_test_data('array', 134));
//        console.log('renew tmp_pid='+tmp_pid);
      }else{
        bol = false;
        pid = tmp_pid;
//        console.log('pid='+pid);
        return pid;
      }
    }
  }

  function isValidEmailAddress(emailAddress) {
//      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
//      return /^[a-z0-9]+([-._][a-z0-9]+)*@([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,4}$/.test(email) && /^(?=.{1,64}@.{4,64}$)(?=.{6,100}$).*/.test(email);
      var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
      return pattern.test(emailAddress);
  }


  function in_array(value, array) 
  {
      for(var k = 0; k < array.length; k++) 
      {
          if(array[k] == value) return true;
      }
      return false;
  }

  function get_text_area(){
    title       = get_test_data('title', pid);
    sub_title   = get_test_data('sub-title', pid);
    reply       = get_test_data('reply', pid);
    right       = get_test_data('right', pid);
    picture     = get_test_data('picture',pid);
    str_arrea = '<form>'+
      '<div id="title" class="test-vopros">'+title+'</div>'+
      '<p id="sub-title">'+sub_title+'</p>'+ reply+
      
    '</form>';

    // if (picture.length > 0) { $('.test-line1 .test-line1-left').css({"background-image": "url('/wp-content/uploads/2015/10/question_background.png')", "background-position": "right", "background-repeat": "no-repeat"}); };
    // if (picture.length <= 0) {$('.test-line1 .test-line1-left').css({"background-image":""}); };
    $("#text-content").html(str_arrea);
    $('.test-line1-left_bisy').css('display','none');

  }

  function get_test_data(what, pid){
    str="";
    $.ajax({
      type: "POST",
      url: "http://www.mymandarin.ru/get_mytest.php",
      async: false,
      data: {'what': what, 'pid': pid },
      success: function(html){
        str = jqXHR.responseText;
      },
      error: function (jqXHR, exception) {
          str = jqXHR.responseText;
          
        },
    });
    return str;
  }

  function setMass(){
    
    TestMass[0][TestStep] = pid;
    TestMass[1][TestStep] = right;
    TestMass[2][TestStep] = "пока пустой";
    TestMass[3][TestStep] = "пока пустой тоже";
    //TestMass[2][TestStep] = isRightReply;
    //TestMass[3][TestStep] = otvet;
  }



});

// Svg-sprite LocalStorage
// <svg><use xlink:href="#down-arrow"></use></svg>
;( function( window, document )
{
  'use strict';

  var file     = 'img/symbols.html',
      revision = 1.4;

  if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect )
      return true;

  var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null,
      request,
      data,
      insertIT = function()
      {
          document.body.insertAdjacentHTML( 'afterbegin', data );
      },
      insert = function()
      {
          if( document.body ) insertIT();
          else document.addEventListener( 'DOMContentLoaded', insertIT );
      };

  if( isLocalStorage && localStorage.getItem( 'inlineSVGrev' ) == revision )
  {
    data = localStorage.getItem( 'inlineSVGdata' );
    if( data )
    {
        insert();
        return true;
    }
  }

  try
  {
    request = new XMLHttpRequest();
    request.open( 'GET', file, true );
    request.onload = function()
      {
        if( request.status >= 200 && request.status < 400 )
          {
            data = request.responseText;
            insert();
            if( isLocalStorage )
            {
              localStorage.setItem( 'inlineSVGdata',  data );
              localStorage.setItem( 'inlineSVGrev',   revision );
            }
        }
    }
    request.send();
  }
  catch( e ){}

}( window, document ) );