'use strict';
const { ipcRenderer } = require('electron');
$ = require('jquery');

var question;
var answer;
var streak = 0;

ipcRenderer.on('entry', (event, entry) => {
    question = entry.question;
    answer = entry.answer;
    console.log(entry);
    $('#question').text(question);
});

$("#question-form").on('submit', () => {
    if($('#question-form :input').val() == answer){
        $('.question-container').hide();
        $(".good-container").show();
        streak += 1;
        $("#streak").html(streak + ` <i style="color: #ff7434; " class="fa fa-fire" aria-hidden="true"></i>`);
    }
    else {
        $("#wrong-answer").show();
        streak = 0;
        $("#streak").html(streak + ` <i style="color: #ff7434; " class="fa fa-fire" aria-hidden="true"></i>`);

    }
});
$("#next-question").on('click', () => {
    $('.question-container').show();
    $("#wrong-answer").hide();
    $(".good-container").hide();
    $("#answer").val("");
    ipcRenderer.send('random-entry');
});

$("#show-answer").on('click', () => {
    $("#wrong-answer").hide();
    $("#answer").val(answer);

});

$(function() {
    ipcRenderer.send('random-entry');
});

  
  
  