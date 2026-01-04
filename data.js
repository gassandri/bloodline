/* =========================================================
   BLOODLINE · PLANES BASE (OBLIGATORIO PARA QUE LA APP CARGUE)
   ========================================================= */

const BLOODLINE_DEFAULT_PLANS = {
  juancho: {
    name: "Juancho",
    objetivo: "Explosión, potencia y resistencia específica fútbol",
    semanas: {
      1: {
        dias: {
          1: {
            titulo: "Potencia + Aceleración",
            ejercicios: [
              {
                nombre: "Saltos al cajón",
                series: "4",
                reps: "4",
                descanso: 90,
                video: "https://www.youtube.com/watch?v=zqlFPQf-Go8"
              },
              {
                nombre: "Skater jumps",
                series: "3",
                reps: "6 por lado",
                descanso: 60,
                video: "https://www.youtube.com/watch?v=3xjRkYzY5R8"
              },
              {
                nombre: "Sentadilla con barra",
                series: "4",
                reps: "5",
                descanso: 120,
                video: "https://www.youtube.com/watch?v=SW_C1A-rejs"
              },
              {
                nombre: "Sprint 20 m",
                series: "6",
                reps: "1",
                descanso: 90,
                video: "https://www.youtube.com/watch?v=9fGJ0Y3J5hM"
              }
            ]
          },
          2: {
            titulo: "Resistencia + Tren superior",
            ejercicios: [
              {
                nombre: "HIIT fútbol 20/40",
                series: "10",
                reps: "intervalos",
                descanso: 40,
                video: "https://www.youtube.com/watch?v=YdvIiW0GXA4"
              },
              {
                nombre: "Dominadas",
                series: "4",
                reps: "6-8",
                descanso: 90,
                video: "https://www.youtube.com/watch?v=eGo4IYlbE5g"
              },
              {
                nombre: "Flexiones",
                series: "4",
                reps: "15",
                descanso: 60,
                video: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"
              }
            ]
          },
          3: {
            titulo: "Agilidad + Unilateral",
            ejercicios: [
              {
                nombre: "Drill 5-10-5",
                series: "6",
                reps: "1",
                descanso: 60,
                video: "https://www.youtube.com/watch?v=R5yNw6zZ4mE"
              },
              {
                nombre: "Zancada búlgara",
                series: "3",
                reps: "6 por pierna",
                descanso: 90,
                video: "https://www.youtube.com/watch?v=2C-uNgKwPLE"
              }
            ]
          },
          4: {
            titulo: "Fuerza total + velocidad",
            ejercicios: [
              {
                nombre: "Peso muerto",
                series: "4",
                reps: "4",
                descanso: 120,
                video: "https://www.youtube.com/watch?v=ytGaGIn3SjE"
              },
              {
                nombre: "Sprint 30 m",
                series: "4",
                reps: "1",
                descanso: 120,
                video: "https://www.youtube.com/watch?v=QmZAiBqPvZw"
              }
            ]
          }
        }
      }
    }
  },

  benja: {
    name: "Benja",
    objetivo: "Aumentar masa muscular y explosión",
    semanas: {
      1: {
        dias: {
          1: {
            titulo: "Pierna + masa",
            ejercicios: [
              {
                nombre: "Sentadilla",
                series: "4",
                reps: "8",
                descanso: 120,
                video: "https://www.youtube.com/watch?v=SW_C1A-rejs"
              },
              {
                nombre: "Zancadas caminando",
                series: "3",
                reps: "10 por pierna",
                descanso: 90,
                video: "https://www.youtube.com/watch?v=wrwwXE_x-pQ"
              }
            ]
          },
          2: {
            titulo: "Tren superior",
            ejercicios: [
              {
                nombre: "Press banca",
                series: "4",
                reps: "8",
                descanso: 120,
                video: "https://www.youtube.com/watch?v=rT7DgCr-3pg"
              },
              {
                nombre: "Remo con barra",
                series: "4",
                reps: "10",
                descanso: 90,
                video: "https://www.youtube.com/watch?v=vT2GjY_Umpw"
              }
            ]
          },
          3: {
            titulo: "Potencia",
            ejercicios: [
              {
                nombre: "Saltos verticales",
                series: "4",
                reps: "5",
                descanso: 90,
                video: "https://www.youtube.com/watch?v=6Tn1X9zF4Eg"
              }
            ]
          },
          4: {
            titulo: "Full body",
            ejercicios: [
              {
                nombre: "Peso muerto rumano",
                series: "3",
                reps: "8",
                descanso: 120,
                video: "https://www.youtube.com/watch?v=0Y7d9bq6v7Y"
              }
            ]
          }
        }
      }
    }
  },

  gaston: {
    name: "Gaston",
    objetivo: "Coordinación, fuerza segura y diversión",
    semanas: {
      1: {
        dias: {
          1: {
            titulo: "Coordinación",
            ejercicios: [
              {
                nombre: "Escalera de agilidad",
                series: "4",
                reps: "30 s",
                descanso: 30,
                video: "https://www.youtube.com/watch?v=1UqgH4C9F2o"
              }
            ]
          },
          2: {
            titulo: "Fuerza básica",
            ejercicios: [
              {
                nombre: "Sentadilla libre",
                series: "3",
                reps: "12",
                descanso: 45,
                video: "https://www.youtube.com/watch?v=aclHkVaku9U"
              }
            ]
          },
          3: {
            titulo: "Velocidad",
            ejercicios: [
              {
                nombre: "Carreras 10 m",
                series: "6",
                reps: "1",
                descanso: 60,
                video: "https://www.youtube.com/watch?v=J8kF6QG9wW8"
              }
            ]
          },
          4: {
            titulo: "Juego activo",
            ejercicios: [
              {
                nombre: "Saltos suaves",
                series: "3",
                reps: "10",
                descanso: 45,
                video: "https://www.youtube.com/watch?v=U4s4mEQ5VqU"
              }
            ]
          }
        }
      }
    }
  }
};
