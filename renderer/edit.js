'use strict'

const { ipcRenderer } = require('electron');
$ = require('jquery');

$("#add-form").on('submit', (evt) => {
  // prevent default refresh functionality of forms
  evt.preventDefault();

  // input on the form
  const question = evt.target[0];
  const answer = evt.target[1];
  console.log(answer.value);

  // send entry to main process
  ipcRenderer.send('add-entry', { "question": question.value, "answer": answer.value });

  // reset input
  question.value = answer.value = '';
})



// create add entry window button
$('add-entry').on("click", () => {
  ipcRenderer.send('add-entry-window');
})

// on receive entrys
ipcRenderer.on('entries', (event, entries) => {

  const entryItems = entries.reduce((html, entry, i) => {

    html += 
    `
    <tr class="entry-row">
        <th class="entry-index">${i}</th>
        <td>${entry.question}</td>
        <td>${entry.answer}</td>
        <td id="${i}" class="delete-button" style="cursor: pointer;"><button onclick="deleteButtonPressed(${i})" class="btn btn-primary"><i style="color: #EEE" class="fa fa-trash" aria-hidden="true"></i></button></td>
    </tr>
    `;

    return html;
  }, '');

  // set list html to the entry items
  $('#entry-list').html(entryItems);

  // add click handlers to delete the clicked entry
   
});

function deleteButtonPressed(i) {
    console.log(i);
    //$("#question-input").trigger('focus');
    ipcRenderer.send('delete-entry', i);
  }

$(function() {
  ipcRenderer.send('get-entries');
});



function showForm() {
  var x = document.getElementById("add-form");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

$(".demo").click(function () {

});