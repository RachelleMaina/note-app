let store = [];
let colors = ['#9d8f8f', '#6a1051', '#f54291', '#42b883', '#5c7893'];
let selectedColor = '';
let bg = document.getElementsByClassName('bg');
let notes = document.getElementById('notes');
let colorPalette = document.getElementById('colors');
let color = document.getElementById('color');
let content = document.getElementById('newNote');
let newNote = document.getElementById('add');
let editNote = document.getElementById('edit');
let all = document.getElementById('all');
let textArea = document.getElementById('editedNote');
let messageError = document.getElementById('messageError');
let messageSuccess = document.getElementById('messageSuccess');

let hidden = document.getElementsByClassName('hidden')[0];

function trimContent(note) {
  if (note.length < 66) {
    return note;
  }
  return note.slice(0, 66) + ' ...';
}

function allNotes() {
  newNote.classList.add('remove-element');
  editNote.classList.add('remove-element');
  all.classList.remove('remove-element');

  notes.innerHTML = ' ';
  if (store.length === 0) {
    notes.innerHTML = `<span class="title-list">
                No notes to display ...
              </span>`;
  } else {
    store.map(note => {
      notes.innerHTML =
        notes.innerHTML +
        `<div class="title-list-wrapper bg"><span class="title-list" id="${store.indexOf(
          note
        )}" onclick="editButton()">
                ${trimContent(note)}
              </span><span class="trash right"><i class="fa fa-trash note" onclick="deleteNote()" id="${store.indexOf(
                note
              )}"></i></span></div>`;
    });
  }
}
function addNote() {
  if (content.value) {
    messageSuccess.innerHTML = ' ';
    messageError.innerHTML = ' ';

    store.push(content.value);
    allNotes();
    toggleColors();
    newNote.classList.add('remove-element');
    all.classList.remove('remove-element');
    messageSuccess.innerHTML = `<span class="message-success">
               <i class="fa fa-exclamation-triangle"></i> New note added.
               <i class="fa fa-remove right" onclick="dissolveMessage()"></i>
              </span>`;
  } else {
    messageError.innerHTML = `<span class="message-error">
               <i class="fa fa-exclamation-triangle"></i> Saving will be available once you start typing.
               <i class="fa fa-remove right" onclick="dissolveMessage()"></i>
              </span>`;
  }
}
function deleteNote() {
  let index = window.event.target.id;

  if (index > -1) {
    store.splice(index, 1);
    allNotes();
    toggleColors();
    messageSuccess.innerHTML = `<span class="message-success">
               <i class="fa fa-exclamation-triangle"></i> Note Deleted.
               <i class="fa fa-remove right" onclick="dissolveMessage()"></i>
              </span>`;
  }
}

function editButton() {
  let index = window.event.target.id;
  hidden.id = index;

  all.classList.add('remove-element');
  editNote.classList.remove('remove-element');

  if (index > -1) {
    let content = store[index];
    textArea.value = content;
  }
}

function updateNote() {
  let index = hidden.id;
  let editedContent = textArea.value;

  store[index] = editedContent;
  allNotes();
  toggleColors();
  messageSuccess.innerHTML = `<span class="message-success">
               <i class="fa fa-exclamation-triangle"></i> Note updated successifully.
               <i class="fa fa-remove right" onclick="dissolveMessage()"></i>
              </span>`;
}
function toggleElements() {
  content.value = '';
  newNote.classList.remove('remove-element');
  all.classList.add('remove-element');
}
function dissolveMessage() {
  messageSuccess.innerHTML = '';
  messageError.innerHTML = '';
}

function displayColors() {
  colors.map(color => {
    colorPalette.innerHTML =
      colorPalette.innerHTML +
      `<span style="background:${color}" class="color" id="${color}" onclick="changeTheme()">
         `;
  });
}

function changeTheme() {
  selectedColor = window.event.target.id;
  toggleColors();
}
function toggleColors() {
  for (let i = 0; i < bg.length; i++) {
    bg[i].style.backgroundColor = selectedColor;
  }
}
allNotes();
displayColors();
