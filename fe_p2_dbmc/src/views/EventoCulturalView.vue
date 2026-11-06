<template>
  <div class="evento-container">
    <h2>Gestión de Eventos Culturales</h2>

    <!-- Formulario para Crear / Registrar Evento -->
    <form @submit.prevent="guardarEvento" class="evento-form">
      <h3>Registrar Nuevo Evento</h3>

      <div class="form-group">
        <label for="titulo">Título:</label>
        <input type="text" id="titulo" v-model="form.titulo" required maxlength="150" />
      </div>

      <div class="form-group">
        <label for="artista_principal">Artista Principal:</label>
        <input type="text" id="artista_principal" v-model="form.artista_principal" required maxlength="100" />
      </div>

      <div class="form-group">
        <label for="id_recinto">ID Recinto:</label>
        <input type="number" id="id_recinto" v-model.number="form.id_recinto" required min="1" />
      </div>

      <div class="form-group">
        <label for="duracion_minutos">Duración (minutos):</label>
        <input type="number" id="duracion_minutos" v-model.number="form.duracion_minutos" required min="1" />
      </div>

      <div class="form-group">
        <label for="precio_entrada">Precio de Entrada:</label>
        <input type="number" id="precio_entrada" v-model.number="form.precio_entrada" required step="0.01" min="0" />
      </div>

      <div class="form-group">
        <label for="fecha_evento">Fecha del Evento:</label>
        <input type="date" id="fecha_evento" v-model="form.fecha_evento" required />
      </div>

      <!-- Select para la Modalidad de Ingreso -->
      <div class="form-group">
        <label for="modalidad_ingreso">Modalidad de Ingreso:</label>
        <select id="modalidad_ingreso" v-model="form.modalidad_ingreso" required>
          <option value="entrada gratuita">Entrada Gratuita</option>
          <option value="entrada pagada">Entrada Pagada</option>
          <option value="pase Invitacion">Pase Invitación</option>
        </select>
      </div>

      <!-- Select para el Estado del Evento -->
      <div class="form-group">
        <label for="estado">Estado:</label>
        <select id="estado" v-model="form.estado" required>
          <option value="Programado">Programado</option>
          <option value="Agotado">Agotado</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      </div>

      <button type="submit" class="btn-submit">Guardar Evento</button>
    </form>

    <!-- Tabla para Listar los Eventos -->
    <div class="evento-list">
      <h3>Lista de Eventos Culturales</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Artista</th>
            <th>Fecha</th>
            <th>Modalidad</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="evento in eventos" :key="evento.id">
            <td>{{ evento.id }}</td>
            <td>{{ evento.titulo }}</td>
            <td>{{ evento.artista_principal }}</td>
            <td>{{ evento.fecha_evento }}</td>
            <td>{{ evento.modalidad_ingreso }}</td>
            <td>{{ evento.estado }}</td>
          </tr>
          <tr v-if="eventos.length === 0">
            <td colspan="6" class="text-center">No hay eventos registrados.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

const form = reactive({
  titulo: '',
  artista_principal: '',
  id_recinto: 1,
  duracion_minutos: 120,
  precio_entrada: 0,
  fecha_evento: '',
  modalidad_ingreso: 'entrada gratuita',
  estado: 'Programado'
});

const eventos = ref<any[]>([]);

const obtenerEventos = async () => {
  try {
    const response = await fetch('http://localhost:3000/evento-cultural');
    if (response.ok) {
      eventos.value = await response.json();
    }
  } catch (error) {
    console.error('Error al conectar con el backend:', error);
  }
};

const guardarEvento = async () => {
  try {
    const response = await fetch('http://localhost:3000/evento-cultural', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      alert('¡Evento creado exitosamente!');
      obtenerEventos();
      form.titulo = '';
      form.artista_principal = '';
    } else {
      const errData = await response.json();
      alert('Error al crear: ' + JSON.stringify(errData.message || errData));
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
};

onMounted(() => {
  obtenerEventos();
});
</script>

<style scoped>
.evento-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

.evento-form {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input,
.form-group select {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-submit {
  background-color: #42b883;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #35495e;
}

.evento-list table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.evento-list th,
.evento-list td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: left;
}

.evento-list th {
  background-color: #f4f4f4;
}

.text-center {
  text-align: center;
  color: #666;
}
</style>