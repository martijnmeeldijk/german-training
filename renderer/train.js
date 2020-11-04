'use strict';
const { ipcRenderer } = require('electron');
$ = require('jquery');

var question;
var answer;

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
    }
    else {
        $("#wrong-answer").show();
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

  
  
  