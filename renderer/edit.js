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
  console.log('received entries');
  console.log(entries);
  console.log("----------------------");
  // get the entryList ul

  // create html string
  const entryItems = entries.reduce((html, entry, i) => {
    console.log(entry);
    console.log(entry.question);
    html += 
    `
    <tr class="entry-row">
        <th class="entry-index">${i}</th>
        <td>${entry.question}</td>
        <td>${entry.answer}</td>
        <td class="delete-button" style="cursor: pointer;">delete</td>
    </tr>
    `;

    return html;
  }, '');

  // set list html to the entry items
  $('#entry-list').html(entryItems);

  // add click handlers to delete the clicked entry
  $('.delete-button').on('click', 
    (e) => {
      console.log($(e.target).parent().find('.entry-index').text());
      ipcRenderer.send('delete-entry', $(e.target).parent().find('.entry-index').text());
    });
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