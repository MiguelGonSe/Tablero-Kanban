// Seleccionamos todos los botones "Añadir Tarjeta"
const botones = document.querySelectorAll(".add-tarjet");

botones.forEach(boton => {
    boton.onclick = function () {
        const columna = boton.closest(".tarjet");
        const dropzone = columna.querySelector(".dropzone");

        // Evitar abrir varios formularios
        if (columna.querySelector(".formulario")) return;

        // Crear formulario simple
        const form = document.createElement("div");
        form.className = "formulario";

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Escribe tu tarea...";

        const addBtn = document.createElement("button");
        addBtn.type = "button"; 
        addBtn.textContent = "Confirmar";

        const cancelBtn = document.createElement("button");
        cancelBtn.type = "button"; 
        cancelBtn.textContent = "Cancelar";

        form.appendChild(input);
        form.appendChild(addBtn);
        form.appendChild(cancelBtn);

        columna.insertBefore(form, boton);
        boton.style.display = "none";

        cancelBtn.onclick = function () {
            form.remove();
            boton.style.display = "block";
        }

        addBtn.onclick = function () {
            const texto = input.value.trim();
            if (!texto) return;

            const tarea = document.createElement("div");
            tarea.className = "task";
            tarea.setAttribute("draggable", "true");

            const span = document.createElement("span");
            span.textContent = texto;
            span.contentEditable = true;

            const borrar = document.createElement("button");
            borrar.innerHTML = '<i class="fa fa-trash"></i>';
            borrar.onclick = () => tarea.remove();

            tarea.appendChild(span);
            tarea.appendChild(borrar);

            dropzone.appendChild(tarea); // Insertamos al final

            // Drag & Drop básico
            tarea.ondragstart = () => tarea.classList.add("dragging");
            tarea.ondragend = () => tarea.classList.remove("dragging");

            form.remove();
            boton.style.display = "block";
        }

        input.focus();
    }
});

// Drag & Drop sencillo para colocar entre tarjetas
const dropzones = document.querySelectorAll(".dropzone");

dropzones.forEach(zone => {
    zone.addEventListener("dragover", e => {
        e.preventDefault();
        const dragging = document.querySelector(".dragging");
        if (!dragging) return;

        const tasks = zone.querySelectorAll(".task"); // todas las tarjetas en la dropzone

        let inserted = false;
        tasks.forEach(task => {
            if (task !== dragging) {
                const rect = task.getBoundingClientRect();
                // Si el cursor está en la mitad superior de la tarjeta, se inserta antes
                if (e.clientY < rect.top + rect.height / 2 && !inserted) {
                    zone.insertBefore(dragging, task);
                    inserted = true;
                }
            }
        });

        // Si no se insertó en ninguna tarjeta, se añade al final
        if (!inserted) {
            zone.appendChild(dragging);
        }
    });
});
