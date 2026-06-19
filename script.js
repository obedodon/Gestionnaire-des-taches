const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const trashSection = document.getElementById("trashSection");
const trashList = document.getElementById("trashList");

addBtn.addEventListener("click", ajouterTache);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        ajouterTache();
    }
});

function ajouterTache() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Veuillez entrer une tâche");
        return;
    }

    const li = document.createElement("li");
    li.className =
        "bg-slate-100 border border-slate-200 px-4 py-3 rounded-lg shadow-sm";

    const ligne = document.createElement("div");
    ligne.className = "flex justify-between items-center gap-3";

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskSpan.className = "text-slate-700 font-medium flex-1";

    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "flex gap-2";

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✓";
    doneBtn.className =
        "bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded-full font-bold transition";

    doneBtn.addEventListener("click", function () {
        taskSpan.classList.toggle("line-through");
        taskSpan.classList.toggle("text-green-600");
        li.classList.toggle("bg-green-100");
        li.classList.toggle("border-green-400");
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.className =
        "bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full font-bold transition";

    deleteBtn.addEventListener("click", function () {
        li.remove();

        const trashItem = document.createElement("li");
        trashItem.className =
            "bg-red-100 border border-red-300 px-4 py-3 rounded-lg";

        const trashRow = document.createElement("div");
        trashRow.className = "flex justify-between items-center gap-3";

        const trashText = document.createElement("span");
        trashText.textContent = taskText;
        trashText.className = "text-red-700 line-through flex-1";

        const trashButtons = document.createElement("div");
        trashButtons.className = "flex gap-2";

        const restoreBtn = document.createElement("button");
        restoreBtn.textContent = "↺";
        restoreBtn.className =
            "bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition";

        restoreBtn.addEventListener("click", function () {
            trashItem.remove();
            taskList.appendChild(li);
            verifierCorbeille();
        });

        const removeForeverBtn = document.createElement("button");
        removeForeverBtn.textContent = "Supprimer";
        removeForeverBtn.className =
            "bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition";

        removeForeverBtn.addEventListener("click", function () {
            trashItem.remove();
            verifierCorbeille();
        });

        trashButtons.appendChild(restoreBtn);
        trashButtons.appendChild(removeForeverBtn);

        trashRow.appendChild(trashText);
        trashRow.appendChild(trashButtons);

        trashItem.appendChild(trashRow);

        trashSection.classList.remove("hidden");
        trashList.appendChild(trashItem);
    });

    buttonsDiv.appendChild(doneBtn);
    buttonsDiv.appendChild(deleteBtn);

    ligne.appendChild(taskSpan);
    ligne.appendChild(buttonsDiv);

    li.appendChild(ligne);
    taskList.appendChild(li);

    taskInput.value = "";
    taskInput.focus();
}

function verifierCorbeille() {
    if (trashList.children.length === 0) {
        trashSection.classList.add("hidden");
    }
}