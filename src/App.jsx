import { useState, useEffect, useMemo } from 'react';
import './App.css';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [duracion, setDuracion] = useState('');
  const [horaActual, setHoraActual] = useState(new Date().toLocaleTimeString());

  // ⏰ Actualiza la hora cada segundo
  useEffect(() => {
    const intervalo = setInterval(() => {
      setHoraActual(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  // 🧠 useMemo para calcular solo cuando cambia tareas
  const totalHoras = useMemo(() => {
    console.log('⏳ Recalculando horas...');
    return tareas.reduce((total, tarea) => total + parseFloat(tarea.duracion), 0);
  }, [tareas]);

  const agregarTarea = () => {
    if (nuevaTarea.trim() !== '' && duracion.trim() !== '') {
      setTareas([...tareas, { nombre: nuevaTarea, duracion }]);
      setNuevaTarea('');
      setDuracion('');
    }
  };

  const eliminarTarea = (index) => {
    const nuevas = [...tareas];
    nuevas.splice(index, 1);
    setTareas(nuevas);
  };

  return (
    <div className="contenedor">
      <h1>📝 Contador de Tareas</h1>
      <p>Hora actual: <strong>{horaActual}</strong></p>

      <div className="formulario">
        <input
          type="text"
          placeholder="Nombre de la tarea"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
        />
        <input
          type="number"
          placeholder="Duración (hrs)"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
        />
        <button onClick={agregarTarea}>Agregar</button>
      </div>

      <ul className="lista">
        {tareas.map((tarea, index) => (
          <li key={index}>
            {tarea.nombre} - {tarea.duracion} hrs
            <button onClick={() => eliminarTarea(index)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <p><strong>Total de horas:</strong> {totalHoras}</p>
    </div>
  );
}

export default App;
