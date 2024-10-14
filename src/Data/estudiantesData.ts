export interface Estudiante {
  id: number;
  nombre: string;
  carrera: string;
  telefono: string;
  fase: 'Diseño' | 'Resultados';  // Agregamos fase
                // Agregamos estado
}

export const estudiantesData: Estudiante[] = [
  { id: 1, nombre: 'Juan Pérez', carrera: 'Ingeniería en Sistemas', telefono: '0999999999', fase: 'Diseño'},
  { id: 2, nombre: 'María González', carrera: 'Ingeniería en Sistemas', telefono: '0998888888', fase: 'Resultados'},
  { id: 3, nombre: 'Carlos Ramírez', carrera: 'Ingeniería en Software', telefono: '0997777777', fase: 'Diseño'},
  { id: 4, nombre: 'Ana Jiménez', carrera: 'Ingeniería en Software', telefono: '0996666666', fase: 'Resultados' },
  { id: 5, nombre: 'Luis Martínez', carrera: 'Ingeniería en Sistemas', telefono: '0995555555', fase: 'Diseño' },
  { id: 6, nombre: 'Sofía Torres', carrera: 'Ingeniería en Software', telefono: '0994444444', fase: 'Resultados' },
  { id: 7, nombre: 'Andrés Ortiz', carrera: 'Ingeniería en Sistemas', telefono: '0993333333', fase: 'Diseño'},
  { id: 8, nombre: 'Paula Vargas', carrera: 'Ingeniería en Software', telefono: '0992222222', fase: 'Resultados'},
  { id: 9, nombre: 'Miguel Ríos', carrera: 'Ingeniería en Sistemas', telefono: '0991111111', fase: 'Diseño'},
  { id: 10, nombre: 'Laura Silva', carrera: 'Ingeniería en Software', telefono: '0990000000', fase: 'Resultados'},
];
