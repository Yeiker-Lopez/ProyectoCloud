import React, { useEffect, useState } from "react";
import { IEstudiante } from "../interfaces/IEstudiantes";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// ────────────────────────────── Estrategias ────────────────────────────── //
interface FaseStrategy {
  obtenerMensaje(estudiante: IEstudiante): string;
  obtenerColor(): string;
}

class FaseDisenoStrategy implements FaseStrategy {
  obtenerMensaje(estudiante: IEstudiante): string {
    return `🛠️ ${estudiante.nombre} está en la fase de diseño.`;
  }

  obtenerColor(): string {
    return "#cce5ff";
  }
}

class FaseResultadosStrategy implements FaseStrategy {
  obtenerMensaje(estudiante: IEstudiante): string {
    return `📊 ${estudiante.nombre} está en la fase de resultados.`;
  }

  obtenerColor(): string {
    return "#d4edda";
  }
}

class FaseContext {
  private estrategia: FaseStrategy;

  constructor(fase: "Diseño" | "Resultados") {
    this.estrategia =
      fase === "Diseño"
        ? new FaseDisenoStrategy()
        : new FaseResultadosStrategy();
  }

  mostrarMensaje(estudiante: IEstudiante): string {
    return this.estrategia.obtenerMensaje(estudiante);
  }

  obtenerColor(): string {
    return this.estrategia.obtenerColor();
  }
}

const EstudiantesPage: React.FC = () => {
  const [estudiantes, setEstudiantes] = useState<IEstudiante[]>([]);
  const [form, setForm] = useState<Omit<IEstudiante, "id">>({
    nombre: "",
    carrera: "",
    telefono: "",
    fase: "Diseño",
  });
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const cargarEstudiantes = async () => {
    const querySnapshot = await getDocs(collection(db, "estudiantes"));
    const data: IEstudiante[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<IEstudiante, "id">),
    }));
    setEstudiantes(data);
  };

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editandoId) {
      const ref = doc(db, "estudiantes", editandoId);
      await updateDoc(ref, form);
      setEditandoId(null);
    } else {
      await addDoc(collection(db, "estudiantes"), form);
    }
    setForm({ nombre: "", carrera: "", telefono: "", fase: "Diseño" });
    cargarEstudiantes();
  };

  const manejarEditar = (est: IEstudiante) => {
    setForm({ nombre: est.nombre, carrera: est.carrera, telefono: est.telefono, fase: est.fase });
    setEditandoId(est.id);
  };

  const manejarEliminar = async (id: string) => {
    await deleteDoc(doc(db, "estudiantes", id));
    cargarEstudiantes();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Gestión de Estudiantes</h1>

      {/* Formulario */}
      <form onSubmit={manejarSubmit} style={{ marginBottom: "2rem", display: "grid", gap: "0.5rem" }}>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={manejarCambio}
          placeholder="Nombre"
          required
        />
        <input
          type="text"
          name="carrera"
          value={form.carrera}
          onChange={manejarCambio}
          placeholder="Carrera"
          required
        />
        <input
          type="tel"
          name="telefono"
          value={form.telefono}
          onChange={manejarCambio}
          placeholder="Teléfono"
          required
        />
        <select name="fase" value={form.fase} onChange={manejarCambio}>
          <option value="Diseño">Diseño</option>
          <option value="Resultados">Resultados</option>
        </select>
        <button type="submit">{editandoId ? "Actualizar" : "Agregar"}</button>
        {editandoId && (
          <button type="button" onClick={() => {
            setEditandoId(null);
            setForm({ nombre: "", carrera: "", telefono: "", fase: "Diseño" });
          }}>
            Cancelar
          </button>
        )}
      </form>

      {/* Lista de estudiantes */}
      {estudiantes.map((est) => {
        const contexto = new FaseContext(est.fase);
        return (
          <div
            key={est.id}
            style={{
              backgroundColor: contexto.obtenerColor(),
              padding: "1rem",
              borderRadius: "10px",
              marginBottom: "1rem",
              boxShadow: "0 0 5px rgba(0,0,0,0.1)",
            }}
          >
            <h2>{est.nombre}</h2>
            <p><strong>Carrera:</strong> {est.carrera}</p>
            <p><strong>Teléfono:</strong> {est.telefono}</p>
            <p><strong>Fase:</strong> {est.fase}</p>
            <p><em>{contexto.mostrarMensaje(est)}</em></p>
            <button onClick={() => manejarEditar(est)}>Editar</button>{" "}
            <button onClick={() => manejarEliminar(est.id)}>Eliminar</button>
          </div>
        );
      })}
    </div>
  );
};

export default EstudiantesPage;
