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

    // Tabs
  (function($){
    jQuery.fn.lightTabs = function(options){

      var createTabs = function(){
        tabs = this;
        i = 0;

        showPage = function(i){
          $(tabs).find(".online-course-tab-content").children("div").hide();
          $(tabs).find(".online-course-tab-content").children("div").eq(i).show();
          $(tabs).find(".online-course__filter-btn").removeClass("is-checked");
          $(tabs).find(".online-course__filter-btn").eq(i).addClass("is-checked");
        }

        showPage(0);

        $(tabs).find(".online-course__filter-btn").each(function(index, element){
          $(element).attr("data-page", i);
          i++;
        });

        $(tabs).find(".online-course__filter-btn").click(function(){
          showPage(parseInt($(this).attr("data-page")));
        });
      };
      return this.each(createTabs);
    };
  })(jQuery);

  $(".online-course-tab").lightTabs();

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

});

// Svg-sprite LocalStorage
// <svg><use xlink:href="#down-arrow"></use></svg>
;( function( window, document )
{
  'use strict';

  var file     = 'img/symbols.html',
      revision = 1.3;

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