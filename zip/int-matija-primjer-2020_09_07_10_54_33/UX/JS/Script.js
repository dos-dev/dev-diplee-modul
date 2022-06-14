/*----------------------------------------------------------------------------*/
/* INI                                                                        */
/*----------------------------------------------------------------------------*/
var arrayOfLetters = [];
var letters = {
  "1": "a",
  "2": "b",
  "3": "c",
  "4": "d",
  "5": "e",
  "6": "f",
  "7": "g",
  "8": "h",
  "9": "i",
  "10": "j",
  "11": "k",
  "12": "l",
  "13": "m",
  "14": "n",
  "15": "o",
  "16": "p",
  "17": "q",
  "18": "r",
  "19": "s",
  "20": "t",
  "21": "u",
  "22": "v",
  "23": "w",
  "24": "x",
  "25": "y",
  "26": "z"
};


function stopAllMusic() {
  $("audio").each(function() {
    this.pause();
    this.currentTime = 0;
  });
}

function mouseMoveImg(index) {
  $("#panel-" + index).mousemove(function(e) {
    parallaxIt(e, "#img-" + index, -7);
  });
}

function jsonToObjects(obj) {
  $.each(obj, function(key, value) {
    arrayOfLetters.push(value);
  });
  main();
};


$(document).ready(function() {
  $("img").on("dragstart", function(event) {
    event.preventDefault();
  });

  jsonToObjects((letters));
});

function parallaxIt(e, target, movement) {
  var $this = $(".panel");
  var relX = e.pageX - $this.offset().left;
  var relY = e.pageY - $this.offset().top;

  TweenMax.to(target, 1, {
    x: ((relX - $this.width() / 2) / $this.width()) * movement,
    y: ((relY - $this.height() / 2) / $this.height()) * movement
  });
}

/*----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------*/
/* CALLBACKS                                                                  */
/*----------------------------------------------------------------------------*/
$(window).on("load resize", function() {
  vAlg();
});
/*----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------*/
/* CALLBACKS                                                                  */
/*----------------------------------------------------------------------------*/

//-------
//-> MAIN FUNKCIJA
//-------
$(document).on("click", ".playAnimation", function(e) {
  e.preventDefault();
  stopAllMusic();
  
  var musicID = e.target.attributes[0].value;
  var file = $("#music_"+musicID);
  var file2 = $("#music_MM-F1-01-02-02-"+musicID.substring(15));

  file2[0].play();

  
  file2.on("ended", function() {
    file[0].play();
    file.on("ended", function() {
      //file[0].play();
      $("#speaker-1").hide();
      $("#speaker-2").show();
    });
  });


});
//--


//-------
//-> ANIMACIJA [1] FUNKCIJA
//-------
function main() {
  for (var index = 1; index <= arrayOfLetters.length; index++) {
    $("#appendLetter").append(
      `
    <div data-music="MM-F5-01-01-07-`+arrayOfLetters[index - 1].toUpperCase()+`" id="panel-` +
        index +
        `" class="col-3 panel playAnimation">
      <img data-music="MM-F5-01-01-07-`+arrayOfLetters[index - 1].toUpperCase()+`" id="img-` +
        index +
        `" src="Media/Ilustracija/` +
        index +
        `.png"></img>
    </div>
    `
    );

    $("#appendAudio").append(
      `<audio id="music_MM-F5-01-01-07-`+arrayOfLetters[index - 1].toUpperCase()+`">
      <source src="Media/Audio/MM-F5-01-01-07-`+arrayOfLetters[index - 1].toUpperCase()+`.mp3" type="audio/mpeg">
  </audio>`
    );
    
    $("#appendAudio").append(
      `<audio id="music_MM-F1-01-02-02-`+arrayOfLetters[index - 1].toUpperCase()+`">
      <source src="Media/Audio2/MM-F1-01-02-02-`+arrayOfLetters[index - 1].toUpperCase()+`.mp3" type="audio/mpeg">
  </audio>`
    );

    mouseMoveImg(index);
    $("#panel-" + index).append(
      "<style>.panel:nth-child(" +
        index +
        '):before {content: "' +
        arrayOfLetters[index - 1] +
        '"; position: absolute; font-size: 45px; font-weight: 400; text-transform: uppercase;}</style>'
    );
  }
}
//--

/*----------------------------------------------------------------------------*/


function vAlg() 
{
  if ($(window).width() < 700) {

    /*---------------------------------------*/
    $(".col-xl-3").each(function(index) {
      $(this)
      .removeClass("col-xl-3")
      .addClass("col-3");
    });
    /*---------------------------------------*/

  } else {

    /*---------------------------------------*/
    $(".col-3").each(function(index) {
      $(this)
      .removeClass("col-3")
      .addClass("col-xl-3");
    });

    if ($(".lSSlideOuter")[0]){
      $(".lSSlideOuter").remove();
      $(".interactionTitle").after("<div id='appendLetter'></div>");
      $("#appendLetter").html('');
      main();
    }

    /*---------------------------------------*/
  }
}
