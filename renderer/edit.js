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
        <td class="delete-button" style="cursor: pointer;"><i style="color: #2c3e50" class="fa fa-trash" aria-hidden="true"></i></td>
    </tr>
    `;

    return html;
  }, '');

  // set list html to the entry items
  $('#entry-list').html(entryItems);

  // add click handlers to delete the clicked entry
  $('.delete-button').on('click', 
    (e) => {
      ipcRenderer.send('delete-entry', $(e.target).parent().find('.entry-index').text());
    });
    $("#question-input").trigger('focus');
});


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