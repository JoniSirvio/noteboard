function loadNotes() {
    const noteList = document.getElementById("noteList");
    noteList.innerHTML = "";

    const notes = JSON.parse(localStorage.getItem("notes") || "[]");

    notes.forEach((note, index) => {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");
        noteDiv.setAttribute("draggable", "true");
        noteDiv.setAttribute("data-index", index);

        const textSpan = document.createElement("span");
        textSpan.classList.add("note-text");
        textSpan.textContent = note.text;

        textSpan.onclick = () => openEditModal(index, note.text);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✕";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => deleteNote(index);

        noteDiv.appendChild(textSpan);
        noteDiv.appendChild(deleteBtn);

        noteDiv.addEventListener("dragstart", handleDragStart);
        noteDiv.addEventListener("dragover", handleDragOver);
        noteDiv.addEventListener("drop", handleDrop);
        noteDiv.addEventListener("dragend", handleDragEnd);
        noteDiv.addEventListener("dragenter", handleDragEnter);
        noteDiv.addEventListener("dragleave", handleDragLeave);

        noteList.appendChild(noteDiv);
    });
}

function addNote() {
    const noteInput = document.getElementById("noteInput");
    const text = noteInput.value.trim();
    if (text === "") return;

    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.push({ text, timestamp: new Date().toISOString() });

    localStorage.setItem("notes", JSON.stringify(notes));
    noteInput.value = "";
    loadNotes();
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
}

let draggedIndex = null;

function handleDragStart(e) {
    draggedIndex = +e.target.dataset.index;
    e.target.classList.add("dragging");
}

function handleDragEnd(e) {
    e.target.classList.remove("dragging");
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    e.target.classList.add("over");
}

function handleDragLeave(e) {
    e.target.classList.remove("over");
}

function handleDrop(e) {
    e.preventDefault();
    const targetIndex = +e.target.dataset.index;
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const notes = JSON.parse(localStorage.getItem("notes") || "[]");

    const draggedNote = notes[draggedIndex];
    notes.splice(draggedIndex, 1);
    notes.splice(targetIndex, 0, draggedNote);

    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
}

let currentEditIndex = null;

function openEditModal(index, text) {
    currentEditIndex = index;
    document.getElementById("editTextarea").value = text;
    document.getElementById("editModal").style.display = "block";
}

function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
    currentEditIndex = null;
}

document.getElementById("saveBtn").addEventListener("click", () => {
    const newText = document.getElementById("editTextarea").value.trim();
    if (newText === "") return;

    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    if (currentEditIndex !== null && notes[currentEditIndex]) {
        notes[currentEditIndex].text = newText;
        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes();
        closeEditModal();
    }
});

document.getElementById("cancelBtn").addEventListener("click", closeEditModal);

window.addNote = addNote;
window.onload = loadNotes;
