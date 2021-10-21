import React from "react";
import { nanoid } from "nanoid";

function App() {
  const [tarea, setTarea] = React.useState("");
  const [tareas, setTareas] = React.useState([]);
  const [modoEdicion, setModoEdicion] = React.useState(false);
  const [id, setId] = React.useState("");
  const [error, setError] = React.useState(null);

  /*   setTareas([...tareas, { id: nanoid(), NombreTarea: tarea }]); */

  const agregarTarea = (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      console.log("Elemento vacio");
      setError("Escriba algo");
      return;
    }

    console.log(tarea);

    setTareas([...tareas, { id: nanoid(), NombreTarea: tarea }]);
    setTarea("");
    setError(null);
  };

  const eliminarTarea = (id) => {
    const arrayFiltrado = tareas.filter((tarea) => tarea.id !== id);
    setTareas(arrayFiltrado);
  };

  const editar = (item) => {
    console.log(item);
    setModoEdicion(true);
    setTarea(item.NombreTarea);
    setId(item.id);
  };

  const editarTarea = (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      console.log("Elemento vacio");
      setError("Escriba algo");
      return;
    }

    const arrayEditado = tareas.map((item) =>
      item.id === id ? { id, NombreTarea: tarea } : item
    );

    setTareas(arrayEditado);
    setModoEdicion(false);
    setTarea("");
    setId("");
    setError(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Crud simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {tareas.length === 0 ? (
              <li className="list-group-item">No hay tareas</li>
            ) : (
              tareas.map((tarea, index) => (
                <li className="list-group-item" key={tarea.id}>
                  <span className="lead">{tarea.NombreTarea}</span>
                  <button
                    className="btn btn-danger btn-sm float-end mx-2"
                    onClick={() => eliminarTarea(tarea.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning btn-sm float-end"
                    onClick={() => editar(tarea)}
                  >
                    Editar
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {modoEdicion ? "Editar Tarea" : "Agregar Tarea"}
          </h4>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {error ? <span className="text-danger"> {error} </span> : null}

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />

            {modoEdicion ? (
              <button type="submit" className="btn btn-warning  w-100">
                Editar
              </button>
            ) : (
              <button type="submit" className="btn btn-dark w-100">
                Agregar
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
