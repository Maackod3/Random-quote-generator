var colors = ['#2E0927', '#D90000', '#FF2D00', '#FF8C00', '#04756F'];

const url = 'https://talaikis.com/api/quotes/random/';

function inIframe () { try { return window.self !== window.top; } catch (e) { return true; } }

let currentQuote = '';
let currentAuthor = '';
function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}
function getQuote() {
  $.ajax({
    url: 'https://talaikis.com/api/quotes/random/',
    type: 'GET',
    dataType: 'json',
    success: function(r) {
      if (typeof r === 'string') {
       r = JSON.parse(r); 
      }
      currentQuote = r.quote;
      currentAuthor = r.author;
      if(inIframe())
      {
        $('#tweet').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
      }
      $(".quote").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $('.quotation').text(r.quote);
        });

      $(".author").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $('.quote-author').html(r.author);
        });

      var color = Math.floor(Math.random() * colors.length);
      $("body").css({
        backgroundColor: colors[color],
        color: colors[color]
      }, 500);
      $(".buttons").css({
        backgroundColor: colors[color]
      }, 500);
    }
  });
}
$(document).ready(function() {
  getQuote();
  $('#new-quote').on('click', getQuote);
  $('#tweet').on('click', function() {
    if(!inIframe()) {
      openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
    }
  });
});