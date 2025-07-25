// script.js

let tareasPendientes = [];
let tareasRealizadas = [];
let tareasEliminadas = [];

document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.getElementById('formTarea');
  const mensaje = document.getElementById('mensaje');
  const listaPendientes = document.getElementById('listaTareasPendientes');
  const listaRealizadas = document.getElementById('listaTareasRealizadas');
  const listaEliminadas = document.getElementById('listaTareasEliminadas');

  function mostrarTareas() {
    // Limpiar listas
    listaPendientes.innerHTML = '';
    listaRealizadas.innerHTML = '';
    listaEliminadas.innerHTML = '';

    // Mostrar pendientes
    tareasPendientes.forEach(tarea => {
      const li = document.createElement('li');
      li.textContent = `${tarea.texto} (📅 ${tarea.fecha}) `;

      const btnCompletar = document.createElement('button');
      btnCompletar.textContent = '✅';
      btnCompletar.title = 'Marcar como realizada';
      btnCompletar.addEventListener('click', () => completarTarea(tarea.id));

      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = '🗑';
      btnEliminar.title = 'Eliminar tarea';
      btnEliminar.addEventListener('click', () => eliminarTarea(tarea.id, false));

      li.appendChild(btnCompletar);
      li.appendChild(btnEliminar);
      listaPendientes.appendChild(li);
    });

    // Mostrar realizadas
    tareasRealizadas.forEach(tarea => {
      const li = document.createElement('li');
      li.textContent = `${tarea.texto} (✅ ${tarea.fecha}) `;

      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = '🗑';
      btnEliminar.title = 'Eliminar tarea';
      btnEliminar.addEventListener('click', () => eliminarTarea(tarea.id, true));

      li.appendChild(btnEliminar);
      listaRealizadas.appendChild(li);
    });

    // Mostrar eliminadas (solo texto)
    tareasEliminadas.forEach(tarea => {
      const li = document.createElement('li');
      li.textContent = `${tarea.texto} (🗑️ ${tarea.fecha})`;
      listaEliminadas.appendChild(li);
    });
  }

  function agregarTarea(texto) {
    const nueva = {
      id: Math.floor(Math.random() * 1000000),
      texto,
      fecha: new Date().toLocaleDateString()
    };
    tareasPendientes.push(nueva);
    mostrarTareas();
  }

  // Al eliminar, movemos la tarea a tareasEliminadas
  function eliminarTarea(id, realizada) {
    let tareaEliminada;

    if (realizada) {
      const index = tareasRealizadas.findIndex(t => t.id === id);
      if (index !== -1) {
        tareaEliminada = tareasRealizadas.splice(index, 1)[0];
      }
    } else {
      const index = tareasPendientes.findIndex(t => t.id === id);
      if (index !== -1) {
        tareaEliminada = tareasPendientes.splice(index, 1)[0];
      }
    }

    if (tareaEliminada) {
      tareasEliminadas.push(tareaEliminada);
      mostrarTareas();
    }
  }

  function completarTarea(id) {
    const index = tareasPendientes.findIndex(t => t.id === id);
    if (index !== -1) {
      const tarea = tareasPendientes.splice(index, 1)[0];
      tareasRealizadas.push(tarea);
      mostrarTareas();
    }
  }

  formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const texto = event.target.tareaInput.value.trim();

    if (texto === '') {
      mensaje.textContent = '⚠️ Por favor, escribe una tarea.';
    } else {
      mensaje.textContent = '';
      agregarTarea(texto);
      event.target.reset();
    }
  });

  mostrarTareas(); // Mostrar listas vacías al cargar
});
