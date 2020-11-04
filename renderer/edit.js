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

const deleteTodo = (e) => {
  ipcRenderer.send('delete-entry', e.target.textContent);
}

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
  const entryItems = entries.reduce((html, entry) => {
    console.log(entry);
    console.log(entry.question);
    html += 
    `
    <tr>
        <td>${entry.question}</td>
        <td>${entry.answer}</td>
    </tr>
    `;

    return html;
  }, '');

  // set list html to the entry items
  $('#entry-list').html(entryItems);

  // add click handlers to delete the clicked entry
  $('.entry-item').each(item => {
    item.addEventListener('click', deleteTodo);
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