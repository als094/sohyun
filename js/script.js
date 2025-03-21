(function ($) {

  // scroll

  $(window).scroll(function () {
    let scrollT = $(this).scrollTop();
    if (scrollT > 500) {
      $("#header").addClass("fix");
    } else {
      $("#header").removeClass("fix");
    }
  });

  $(".btn.btn-outline-light").click(function () {
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
  });

  $("#header .gnb_list li").click(function () {
    $(this).addClass("on");
    $(this).siblings().removeClass("on");
  });

  "use strict";

  // init Isotope
  var initIsotope = function () {

    $('.grid').each(function () {

      // $('.grid').imagesLoaded( function() {
      // images have loaded
      var $buttonGroup = $('.button-group');
      var $checked = $buttonGroup.find('.is-checked');
      var filterValue = $checked.attr('data-filter');

      var $grid = $('.grid').isotope({
        itemSelector: '.portfolio-item',
        // layoutMode: 'fitRows',
        filter: filterValue
      });

      // bind filter button click
      $('.button-group').on('click', 'a', function (e) {
        e.preventDefault();
        filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
      });

      // change is-checked class on buttons
      $('.button-group').each(function (i, buttonGroup) {
        $buttonGroup.on('click', 'a', function () {
          $buttonGroup.find('.is-checked').removeClass('is-checked');
          $(this).addClass('is-checked');
        });
      });
      // });
    });
  }

  var initTexts = function () {
    // Wrap every letter in a span
    $('.txt-fx').each(function () {
      this.innerHTML = this.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    });

    anime.timeline()
      .add({
        targets: '.txt-fx .letter',
        translateX: [0, -30],
        opacity: [1, 0],
        easing: "easeInExpo",
        duration: 100,
        delay: (el, i) => 0
      });
  }
  var animateTexts = function () {

    anime.timeline()
      .add({
        targets: '.slick-current .txt-fx .letter',
        translateX: [40, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 30 * i
      });
  }

  var hideTexts = function () {

    anime.timeline()
      .add({
        targets: '.slick-current .txt-fx .letter',
        translateX: [0, -30],
        opacity: [1, 0],
        easing: "easeInExpo",
        duration: 1100,
        delay: (el, i) => 30 * i
      })
  }

  // initialize all the sliders
  var initSlider = function () {
    // homepage slider | slick slider
    $('.main-slider').slick({
      autoplay: false,
      autoplaySpeed: 4000,
      fade: true,
      prevArrow: $('.prev'),
      nextArrow: $('.next'),
    });

    $('.main-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      hideTexts();
      console.log('beforeChange');
    });

    $('.main-slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
      animateTexts();
      console.log('afterChange');
    });

    initTexts();
    animateTexts();
  }

  // animate search box
  var searchButton = function () {
    // search box toggle
    $('#header-wrap').on('click', '.search-toggle', function (e) {
      var selector = $(this).data('selector');

      $(selector).toggleClass('show').find('.search-input').focus();
      $(this).toggleClass('active');

      e.preventDefault();
    });


    // close when click off of container
    $(document).on('click touchstart', function (e) {
      if (!$(e.target).is('.search-toggle, .search-toggle *, #header-wrap, #header-wrap *')) {
        $('.search-toggle').removeClass('active');
        $('#header-wrap').removeClass('show');
      }
    });
  }

  // initialize tabs
  var jsTabs = function () {
    // portfolio tabs
    const tabs = document.querySelectorAll('[data-tab-target]')
    const tabContents = document.querySelectorAll('[data-tab-content]')

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => {
          tabContent.classList.remove('active')
        })
        tabs.forEach(tab => {
          tab.classList.remove('active')
        })
        tab.classList.add('active')
        target.classList.add('active')
      })
    });
  }

  // stick header on the top
  var stickyHeader = function () {
    // header menu
    var StickyHeader = new hcSticky('#header.fixed', {
      stickTo: 'body',
      top: 0,
      bottomEnd: 200,
      responsive: {
        1024: {
          disable: true
        }
      }
    });
  }

  //Overlay Menu Navigation
  var overlayMenu = function () {

    if (!$('.nav-overlay').length) {
      return false;
    }

    var body = undefined;
    var menu = undefined;
    var menuItems = undefined;
    var init = function init() {
      body = document.querySelector('body');
      menu = document.querySelector('.menu-btn');
      menuItems = document.querySelectorAll('.nav__list-item');
      applyListeners();
    };
    var applyListeners = function applyListeners() {
      menu.addEventListener('click', function () {
        return toggleClass(body, 'nav-active');
      });
    };
    var toggleClass = function toggleClass(element, stringClass) {
      if (element.classList.contains(stringClass)) element.classList.remove(stringClass); else element.classList.add(stringClass);
    };
    init();
  }

  // init Chocolat light box
  var initChocolat = function () {
    Chocolat(document.querySelectorAll('.image-link'), {
      imageSize: 'contain',
      loop: true,
    })
  }

  $(document).ready(function () {

    stickyHeader();
    searchButton();
    initSlider();
    jsTabs();
    initChocolat();
    overlayMenu();

    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-keep-img"), {
      keepImg: true,
    });

  }); // End of document ready

  // preloader
  $(window).load(function () {
    $(".preloader").fadeOut("slow");
    initIsotope();
  });


  // 스크롤할때 gnb자동변경
  let sections = {
    '#intro': 0,
    '#about': 1,
    '#portfolio': 2,
    '#Skill': 3
  };

  let $tabs = $(".gnb_list li");
  let $window = $(window);

  $window.on('scroll', function () {
    let scrollPosition = $window.scrollTop();
    let offset = 300;

    for (let section in sections) {
      let sectionTop = $(section).offset().top - offset;

      if (scrollPosition >= sectionTop) {
        $tabs.removeClass("on")
        $tabs.eq(sections[section]).addClass("on");
      }
    }
  })

  $(".art_box").mouseenter(function () {
    $(this).find(".txt_box").css({ opacity: 1 });
    // $(".txt_box").css({ opacity: 1 });
  })
  $(".art_box").mouseleave(function () {
    // $(".txt_box").css({ opacity: 0 });
    $(this).find(".txt_box").css({ opacity: 0 });
  })


  // swiper-slide
  // var con = new Swiper(".con", {
  //   slidesPerView: 1,
  //   pagination: {
  //     el: ".swiper-pagination",
  //     clickable: true,
  //   },
  // });

  // $(".filters .btn").click(function () {
  //   $(this).find(".swiper ul li");
  // });

  document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.button-group a');
    const swiperSlides = document.querySelectorAll('.swiper-slide');
    const swiperContainer = document.querySelector('.swiper.con');

    // Swiper 초기화
    const swiper = new Swiper(swiperContainer, {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });

    // 초기 상태에서 "ALL"에 해당하는 슬라이드 보이기
    const initialTargetClass = '.design'; // 기본적으로 보여줄 슬라이드 클래스
    swiperSlides.forEach(slide => {
      if (slide.classList.contains(initialTargetClass.replace('.', ''))) {
        slide.style.display = 'block'; // 보이기
      } else {
        slide.style.display = 'none'; // 숨기기
      }
    });

    //첫 번째 슬라이드로 이동
    swiper.slideTo(0);

    buttons.forEach(button => {
      button.addEventListener('click', function (e) {
        e.preventDefault(); // 기본 동작 방지
        const targetClass = this.getAttribute('data-target');

        // 모든 슬라이드를 숨기고, 해당 클래스의 슬라이드만 보이게 설정
        swiperSlides.forEach(slide => {
          if (slide.classList.contains(targetClass.replace('.', ''))) {
            slide.style.display = 'block'; // 보이기
          } else {
            slide.style.display = 'none'; // 숨기기
          }
        });

        // 첫 번째 슬라이드로 이동
        swiper.slideTo(0);
      });
    });
  });

  const dimmed = new Swiper('.dimmed', {
    slidesPerView: 1,
    slideToClickedSlide: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  // 여행배너
  $(".dimmed, .dimmed02, .dimmed03, .dimmed04").hide();
  $(".click_trip").click(function () {
    $(".dimmed01").fadeIn();
  });
  $(".btn_back").click(function () {
    $(".dimmed01").fadeOut();
  });
  // 선물배너
  $(".click_gift").click(function () {
    $(".dimmed02").fadeIn();
  });
  $(".btn_back").click(function () {
    $(".dimmed02").fadeOut();
  });
  // 마스크팩배너
  $(".click_mask").click(function () {
    $(".dimmed03").fadeIn();
  });
  $(".btn_back").click(function () {
    $(".dimmed03").fadeOut();
  });
  // 카드뉴스(임산부)
  $(".click_drug").click(function () {
    $(".dimmed04").fadeIn();
  });
  $(".btn_back").click(function () {
    $(".dimmed04").fadeOut();
  });
  // 카드뉴스(펫)
  $(".click_pet").click(function () {
    $(".dimmed05").fadeIn();
  });
  $(".btn_back").click(function () {
    $(".dimmed05").fadeOut();
  });




  $('.canvas').each(function () {
    // 퍼센트를 표시할 요소 선택
    const spanpercent = $(this).siblings('.percent');

    // 원의 테두리 너비(px) 및 애니메이션 지속 시간(ms) 정의 
    const border = 25;
    const duration = 700;

    // 캔버스 및 2D 컨텍스트 설정
    const canvas = $(this)[0];
    const ctx = canvas.getContext('2d');

    // 애니메이션에 필요한 변수 및 데이터 속성에서 목표 퍼센트 가져오기
    const targetPercent = $(this).data('percent');
    const posX = canvas.width / 2;
    const posY = canvas.height / 2;
    const onePercent = 360 / 100;
    const result = onePercent * targetPercent;
    const radius = (canvas.width / 2) - (border / 2);
    let percent = 0;
    ctx.lineCap = (targetPercent <= 0) ? 'butt' : 'round';

    // 원을 그리고 퍼센트 업데이트하는 함수
    function arcMove() {
      let degrees = 0;
      let startTime = null;

      // 애니메이션을 처리하는 함수
      function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = (timestamp - startTime) / duration;
        progress = Math.min(1, progress);
        degrees = progress * result;

        // 캔버스 초기화 및 퍼센트 업데이트
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        percent = Math.floor(degrees / onePercent);
        spanpercent.text(percent);

        // 배경 선 그리기
        ctx.beginPath();
        ctx.arc(posX, posY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = '#DDDFEA';
        ctx.lineWidth = border;
        ctx.stroke();

        // 애니메이션 되는 선 그리기
        ctx.beginPath();
        ctx.strokeStyle = '#719AF3';
        ctx.lineWidth = border;
        ctx.arc(posX, posY, radius, Math.PI * -0.5, (Math.PI / 180) * degrees - (Math.PI / 2));
        ctx.stroke();

        // 애니메이션이 완료되지 않았다면 계속해서 프레임 요청
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }
      // 첫 프레임 요청
      requestAnimationFrame(animate);
    }

    // 애니메이션 함수 호출
    arcMove();
  });

  consoleText([`HELLO.`, 'SO HYUN <br> PORTFOLIO.'], 'text', ['#333']);

  function consoleText(words, id, colors) {
    if (colors === undefined) colors = ['#fff'];
    var visible = true;
    var con = document.getElementById('console');
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById(id)
    target.setAttribute('style', 'color:' + colors[0])
    window.setInterval(function () {

      if (letterCount === 0 && waiting === false) {
        waiting = true;
        target.innerHTML = words[0].substring(0, letterCount)
        window.setTimeout(function () {
          var usedColor = colors.shift();
          colors.push(usedColor);
          var usedWord = words.shift();
          words.push(usedWord);
          x = 1;
          target.setAttribute('style', 'color:' + colors[0])
          letterCount += x;
          waiting = false;
        }, 1000)
      } else if (letterCount === words[0].length + 1 && waiting === false) {
        waiting = true;
        window.setTimeout(function () {
          x = -1;
          letterCount += x;
          waiting = false;
        }, 1000)
      } else if (waiting === false) {
        target.innerHTML = words[0].substring(0, letterCount)
        letterCount += x;
      }
    }, 120)
    window.setInterval(function () {
      if (visible === true) {
        con.className = 'console-underscore hidden'
        visible = false;

      } else {
        con.className = 'console-underscore'

        visible = true;
      }
    }, 400)
  }

})(jQuery);