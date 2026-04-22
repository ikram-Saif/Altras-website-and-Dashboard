$(function () {
  // ========================move mouse jquery plugin==========
  var lFollowX = 0,
    lFollowY = 0,
    x = 0,
    y = 0,
    friction = 1 / 30;

function moveBackground() {
  x += (lFollowX - x) * friction;
  y += (lFollowY - y) * friction;

  //  translate = 'translateX(' + x + 'px, ' + y + 'px)';
  translate = 'translateX(' + x + 'px) translateY(' + y +'px)';

  $('.animate-this').css({
  '-webit-transform': translate,
  '-moz-transform': translate,
  'transform': translate
  });

  window.requestAnimationFrame(moveBackground);
}

$(window).on('mousemove click', function(e) {
  
  var isHovered = $('.animate-this:hover').length > 0;
  console.log(isHovered);
  
  //if(!$(e.target).hasClass('animate-this')) {
  if(!isHovered) {
    var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX)),
        lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));

    lFollowX = (20 * lMouseX) / 100;
    lFollowY = (10 * lMouseY) / 100;
  }
});

moveBackground();
var counted = 0;
$(window).scroll(function() {

  var oTop = $('#counter').offset().top - window.innerHeight;
  if (counted == 0 && $(window).scrollTop() > oTop) {
    $('.count').each(function() {
      var $this = $(this),
        countTo = $this.attr('data-count');
      $({
        countNum: $this.text()
      }).animate({
          countNum: countTo
        },

        {

          duration: 2000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);
            //alert('finished');
          }

        });
    });
    counted = 1;
  }

});
// =======================end move mouse plugin========
// ===============fieldset============
$(document).on("click", ".nextBtn", function () {
  var curntField = $(this).parents('fieldset');
  var nextField = curntField.next('fieldset');
  curntField.hide();
  nextField.show();
});

$(document).on("click", ".backBtn", function () {
  var curntField = $(this).parents('fieldset');
  var prevField = curntField.prev('fieldset');
  curntField.hide();
  prevField.show();
});


// ==============dashboard=========
$('#_toggle').click(function(){
  $(this).next('.inside').slideToggle();
})

// ========faq's===========
    $('.acc h4').click(function(){
        $(this).next('.content').slideToggle();
        $(this).parent().toggleClass('active');
        $(this).parent().siblings().children('.content').slideUp();
        $(this).parent().siblings().removeClass('active');
    })


  /*_____ Toggle _____*/
  $(document).on("click", ".toggle", function () {
    $(".toggle").toggleClass("active");
    $("nav").toggleClass("active");
    $("body").toggleClass("flow");
  });
  /*_____ Upload File _____*/
  var imgFile;
  $(document).on("click", ".uploadImg", function () {
    imgFile = $(this).attr("data-image-src");
    $(this).parents("form").find(".uploadFile").trigger("click");
  });
  $(document).on("change", ".uploadFile", function () {
    // alert(imgFile);
    var file = $(this).val();
    $(".uploadImg").html(file);
  });

  /*_____ Drop Down _____*/
  $(document).on("click", ".dropBtn", function (e) {
    e.stopPropagation();
    var $this = $(this).parent().children(".dropCnt");
    $(".dropCnt").not($this).removeClass("active");
    var $parent = $(this).parent(".dropDown");
    $parent.children(".dropCnt").toggleClass("active");
  });
  $(document).on("click", ".dropCnt", function (e) {
    e.stopPropagation();
  });
  $(document).on("click", function () {
    $(".dropCnt").removeClass("active");
  });

  /*_____ Popup _____*/
  $(document).on("click", ".popup", function (e) {
    if ($(e.target).closest(".popup ._inner, .popup .inside").length === 0) {
      $(".popup").fadeOut("3000");
      $("body").removeClass("flow");
      $(".popup .videoBlk").html("");
      $("#loadVideo").html("");
    }
  });
  $(document).on("click", ".crosBtn , .alert .crossClass", function () {
    $(".popup").fadeOut();
    $("body").removeClass("flow");
    $(".popup .videoBlk").html("");
    $("#loadVideo").html("");
  });
  $(document).keydown(function (e) {
    if (e.keyCode == 27) $(".crosBtn").click();
  });
  $(document).on("click", ".popBtn", function () {
    var popUp = $(this).data("popup");
    $("body").addClass("flow");
    $(".popup[data-popup= " + popUp + "]").fadeIn();
  });
  $(document).on("click", '#videos .popBtn[data-popup="videos"]', function () {
    $("#loadVideo").load("watch.php");
  });

  /*_____ Qty Button _____*/
  // This button will increment the value
  $(document).on("click", ".qtyPlus", function (e) {
    e.preventDefault();
    var parnt = $(this).parent().children(".qty");
    var currentVal = parnt.val();
    if (!isNaN(currentVal)) {
      if (currentVal >= 5) return false;
      parnt.val(parseInt(currentVal) + 1);
    } else {
      parnt.val(0);
    }
  });
  // This button will decrement the value till 0
  $(document).on("click", ".qtyMinus", function (e) {
    e.preventDefault();
    var parnt = $(this).parent().children(".qty");
    var currentVal = parnt.val();
    if (!isNaN(currentVal) && currentVal > 0) {
      parnt.val(parseInt(currentVal) - 1);
    } else {
      parnt.val(0);
    }
  });

  /*_____ FAQ's _____*/
  $(document).on("click", ".faqLst > li > h3", function () {
    $(".faqLst > li .cntnt")
      .not($(this).parent("li").children(".cntnt").slideToggle())
      .slideUp();
    $(".faqLst > li i")
      .not(
        $(this)
          .parent("li")
          .children("i")
          .toggleClass("fi-chevron-down")
          .toggleClass("fi-chevron-up")
      )
      .removeClass("fi-chevron-up")
      .addClass("fi-chevron-down");
  });
});
var offHed = $('body').offset().top;
        var offHed = offHed + 100;
        $(window).scroll(function() {
            var scrollPos = $(window).scrollTop();
            if (scrollPos >= offHed) {
                $('header').addClass('fix');
            } else {
                $('header').removeClass('fix');
            }
        });
$(window).on("load", function () {
  $("img").parent("a").css("display", "block");
  $(".loader").delay(700).fadeOut();
  $("#pageloader").delay(1200).fadeOut("slow");
});


$(function() {

  
  $("#chat-circle").click(function() {    
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  })
  
  $(".chat-box-toggle").click(function() {
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  })
  
})