let draggedIndex = null;
let draggedStorageKey = null;

function loadNoteList() {
    renderList("todoList", "todoNotes");
    renderList("doneList", "doneNotes");
}

function renderList(containerId, storageKey) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    const notes = JSON.parse(localStorage.getItem(storageKey) || "[]");

    notes.forEach((note, index) => {
        const li = document.createElement("li");
        li.classList.add("note-list-item");
        li.setAttribute("draggable", "true");
        li.dataset.index = index;

        const bullet = document.createElement("span");
        bullet.textContent = "•";
        bullet.classList.add("bullet");

        const text = document.createElement("span");
        text.textContent = note.text;
        text.classList.add("note-text");

        li.appendChild(bullet);
        li.appendChild(text);

        if (storageKey === "todoNotes") {
            const doneBtn = document.createElement("button");
            doneBtn.textContent = "✓";
            doneBtn.classList.add("checkmark-btn", "btn-done");
            doneBtn.onclick = () => {
                moveNote(index, "todoNotes", "doneNotes");
            };
            li.appendChild(doneBtn);
        } else if (storageKey === "doneNotes") {
            const undoBtn = document.createElement("button");
            undoBtn.textContent = "↩";
            undoBtn.classList.add("checkmark-btn", "btn-undo");
            undoBtn.onclick = () => {
                moveNote(index, "doneNotes", "todoNotes");
            };

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "✕";
            deleteBtn.classList.add("checkmark-btn", "btn-delete");
            deleteBtn.onclick = () => {
                deleteNote(index, "doneNotes");
            };

            li.appendChild(undoBtn);
            li.appendChild(deleteBtn);
        }

        li.addEventListener("dragstart", handleDragStart);
        li.addEventListener("dragover", handleDragOver);
        li.addEventListener("dragenter", handleDragEnter);
        li.addEventListener("dragleave", handleDragLeave);
        li.addEventListener("drop", handleDrop);
        li.addEventListener("dragend", handleDragEnd);

        container.appendChild(li);
    });
}

function handleDragStart(e) {
    draggedIndex = +e.target.dataset.index;
    draggedStorageKey = e.target.closest("ul").id === "todoList" ? "todoNotes" : "doneNotes";
    e.target.classList.add("dragging");
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    const li = e.target.closest(".note-list-item");
    if (li && +li.dataset.index !== draggedIndex) {
        li.classList.add("drag-over");
    }
}

function handleDragLeave(e) {
    const li = e.target.closest(".note-list-item");
    if (li) {
        li.classList.remove("drag-over");
    }
}

function handleDrop(e) {
    e.preventDefault();
    const li = e.target.closest(".note-list-item");
    if (!li) return;

    const targetIndex = +li.dataset.index;
    if (draggedIndex === null || targetIndex === draggedIndex) return;

    const notes = JSON.parse(localStorage.getItem(draggedStorageKey) || "[]");

    const [draggedNote] = notes.splice(draggedIndex, 1);
    notes.splice(targetIndex, 0, draggedNote);

    localStorage.setItem(draggedStorageKey, JSON.stringify(notes));
    loadNoteList();
}

function handleDragEnd(e) {
    e.target.classList.remove("dragging");
    document.querySelectorAll(".drag-over").forEach(el => el.classList.remove("drag-over"));
}

function addListNote() {
    const input = document.getElementById("noteInput");
    const text = input.value.trim();
    if (text === "") return;

    const notes = JSON.parse(localStorage.getItem("todoNotes") || "[]");
    notes.push({ text });

    localStorage.setItem("todoNotes", JSON.stringify(notes));
    input.value = "";
    loadNoteList();
}

function moveNote(index, fromKey, toKey) {
    const from = JSON.parse(localStorage.getItem(fromKey) || "[]");
    const to = JSON.parse(localStorage.getItem(toKey) || "[]");

    const [moved] = from.splice(index, 1);
    to.push(moved);

    localStorage.setItem(fromKey, JSON.stringify(from));
    localStorage.setItem(toKey, JSON.stringify(to));
    loadNoteList();
}

function deleteNote(index, key) {
    const notes = JSON.parse(localStorage.getItem(key) || "[]");
    notes.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(notes));
    loadNoteList();
}

window.addListNote = addListNote;
window.onload = loadNoteList;
