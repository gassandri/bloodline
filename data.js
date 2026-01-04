// data.js — Planes base (Semana 1) + perfiles
// Nota: La progresión semanal se aplica en app.js automáticamente.

window.BLOODLINE_PROFILES = {
  juancho: {
    name: "JUANCHO",
    info: "15 años · 70 kg · 179 cm · Cadete autonómico (CD Manacor) · Objetivo: explosión + resistencia",
    focus: "Explosión + Resistencia",
    cautions: ["Cuidar fatiga pre-partido", "Calidad de sprint/salto > cantidad"]
  },
  benja: {
    name: "BENJA",
    info: "17 años · 67 kg · 182 cm · Objetivo: masa muscular + explosión (resistencia ya buena)",
    focus: "Masa + Explosión",
    cautions: ["Subir volumen sin ir al fallo", "Progresar cargas con técnica perfecta"]
  },
  gaston: {
    name: "GASTON",
    info: "9 años · 38 kg · 140 cm · Objetivo: coordinación + fuerza segura + velocidad (modo juego)",
    focus: "Coordinación + Fuerza segura",
    cautions: ["Nada de cargas máximas", "Prioridad: técnica, juego y disfrute"]
  }
};

// Ejercicio helper
function ex(id, name, desc, sets, reps, rest, url){
  return { id, name, desc, sets, reps, rest, url };
}

// 4 sesiones por perfil (Semana 1)
// Cada sesión: 10' calentamiento + trabajo principal + cierre breve.
window.BLOODLINE_DEFAULT_PLANS = {
  juancho: [
    {
      id:"D1",
      dayLabel:"Día 1",
      title:"Potencia pierna + aceleración",
      approx:"~60 min",
      objective:"Pliometría + fuerza (pierna) + sprints cortos",
      exercises:[
        // Warm-up (10 min)
        ex("WU1","Calentamiento (10')","Escalera 2' + movilidad cadera/tobillo 2' + skipping/butt-kicks 2' + 3 aceleraciones progresivas 3x15m + activación glúteo (banda) 1'", "—","10 min","—","https://www.youtube.com/results?search_query=football+dynamic+warm+up+10+minutes"),
        // Main
        ex("P1","Saltos al cajón (control)","Subir explosivo, bajar suave. 90% calidad.",3,"4–6","90s","https://www.youtube.com/results?search_query=box+jump+landing+mechanics"),
        ex("P2","Saltos laterales (skater bounds)","Aterrizaje estable, rodilla alineada.",3,"6/6","75–90s","https://www.youtube.com/results?search_query=skater+bounds+tutorial"),
        ex("S1","Sentadilla (barra o goblet)","Rango cómodo. RPE 7–8.",4,"5","2–3m","https://www.youtube.com/results?search_query=barbell+back+squat+technique"),
        ex("S2","Peso muerto rumano (mancuernas/barra)","Cadera atrás, espalda neutra.",3,"6–8","2m","https://www.youtube.com/results?search_query=romanian+deadlift+dumbbell+form"),
        ex("F1","Sprints 6x20m (descanso completo)","Aceleración máxima, técnica.",6,"20m","2–3m","https://www.youtube.com/results?search_query=20m+sprint+acceleration+drills"),
        ex("C1","Plancha + side plank","Core rígido, respiración.",2,"30–40s","45–60s","https://www.youtube.com/results?search_query=front+plank+side+plank+form")
      ]
    },
    {
      id:"D2",
      dayLabel:"Día 2",
      title:"Resistencia específica + tren superior",
      approx:"~60 min",
      objective:"Circuito de campo (HIIT) + fuerza superior",
      exercises:[
        ex("WU1","Calentamiento (10')","Trote suave 2' + movilidad + 3 progresiones 3x20m + técnica de carrera 2'", "—","10 min","—","https://www.youtube.com/results?search_query=soccer+warm+up+routine+10+minutes"),
        ex("F1","HIIT campo: 10x(20" fuerte/40" suave)","Fuerte=80–90%, suave=trote.",1,"10 repeticiones","—","https://www.youtube.com/results?search_query=soccer+hiit+20+40"),
        ex("U1","Dominadas (o asistidas)","Control, pecho hacia barra.",4,"4–8","2m","https://www.youtube.com/results?search_query=pull+up+proper+form"),
        ex("U2","Press banca o flexiones lastradas","Escápulas atrás, control.",4,"6–10","2m","https://www.youtube.com/results?search_query=bench+press+technique"),
        ex("U3","Remo mancuerna","Codo atrás, sin girar torso.",3,"8/8","90s","https://www.youtube.com/results?search_query=one+arm+dumbbell+row+form"),
        ex("PRE1","Nordic curl (asistido)","Isquios: bajar lento.",3,"3–5","2m","https://www.youtube.com/results?search_query=assisted+nordic+hamstring+curl"),
        ex("C1","Farmer carry","Postura alta, abdomen firme.",3,"30–40m","60–90s","https://www.youtube.com/results?search_query=farmer+carry+form")
      ]
    },
    {
      id:"D3",
      dayLabel:"Día 3",
      title:"Cambio de dirección + potencia",
      approx:"~60 min",
      objective:"Agilidad/COD + potencia + unilateral",
      exercises:[
        ex("WU1","Calentamiento (10')","Escalera 2' + movilidad + 3 progresiones + 2 cambios de dirección suaves", "—","10 min","—","https://www.youtube.com/results?search_query=change+of+direction+warm+up"),
        ex("A1","Drills COD (5-10-5)","2 reps suaves + 4 rápidas.",1,"6 repeticiones","90–120s","https://www.youtube.com/results?search_query=5-10-5+pro+agility+drill"),
        ex("P1","Lanzamiento balón medicinal (rotacional)","Explosivo, cadera rota.",3,"6/6","60–90s","https://www.youtube.com/results?search_query=medicine+ball+rotational+throw"),
        ex("S1","Zancada búlgara","Control, rodilla estable.",3,"6–8/6–8","2m","https://www.youtube.com/results?search_query=bulgarian+split+squat+form"),
        ex("S2","Peso muerto a una pierna (mancuerna)","Equilibrio, cadera alineada.",3,"6–8/6–8","90–120s","https://www.youtube.com/results?search_query=single+leg+romanian+deadlift+form"),
        ex("PRE1","Gemelos (elevaciones)","Pausa arriba.",3,"10–12","60–90s","https://www.youtube.com/results?search_query=calf+raise+proper+form"),
        ex("C1","Dead bug","Lumbar pegada, control.",2,"8/8","45–60s","https://www.youtube.com/results?search_query=dead+bug+exercise+form")
      ]
    },
    {
      id:"D4",
      dayLabel:"Día 4",
      title:"Fuerza total + velocidad",
      approx:"~60 min",
      objective:"Fuerza compuesta + sprints y prevención",
      exercises:[
        ex("WU1","Calentamiento (10')","Movilidad + activación banda + 3 aceleraciones progresivas", "—","10 min","—","https://www.youtube.com/results?search_query=dynamic+warm+up+soccer"),
        ex("S1","Trap bar deadlift / peso muerto (moderado)","Potente, sin grind.",4,"3–5","2–3m","https://www.youtube.com/results?search_query=trap+bar+deadlift+form"),
        ex("S2","Press militar (mancuernas)","Core firme, sin arquear.",3,"6–8","2m","https://www.youtube.com/results?search_query=dumbbell+overhead+press+form"),
        ex("S3","Remo barra o TRX","Espalda sólida.",3,"6–10","90–120s","https://www.youtube.com/results?search_query=barbell+row+form"),
        ex("F1","Sprints 4x30m (descanso completo)","Máxima calidad.",4,"30m","2–3m","https://www.youtube.com/results?search_query=30m+sprint+acceleration"),
        ex("PRE1","Copenhagen plank (rodilla)","Aductores, control.",2,"20–30s/20–30s","60s","https://www.youtube.com/results?search_query=copenhagen+plank+adductor"),
        ex("C1","Respiración + movilidad final","Bajar pulsaciones.",1,"3–4 min","—","https://www.youtube.com/results?search_query=post+workout+breathing+mobility")
      ]
    }
  ],

  benja: [
    {
      id:"D1",
      dayLabel:"Día 1",
      title:"Hipertrofia pierna + salto",
      approx:"~60 min",
      objective:"Masa (pierna) + potencia (saltos)",
      exercises:[
        ex("WU1","Calentamiento (10')","Movilidad + activación glúteo/banda + 3 saltitos + 2 progresiones 2x15m","—","10 min","—","https://www.youtube.com/results?search_query=lower+body+warm+up+10+minutes"),
        ex("P1","Saltos al cajón (bajo/medio)","Explosivo, técnica limpia.",3,"4–6","90s","https://www.youtube.com/results?search_query=box+jump+landing+mechanics"),
        ex("S1","Sentadilla (barra)","RPE 7–8. Subir volumen.",4,"6–8","2–3m","https://www.youtube.com/results?search_query=barbell+squat+technique"),
        ex("S2","Prensa improvisada / zancadas caminando","Control, sin colapsar rodilla.",3,"10/10","90–120s","https://www.youtube.com/results?search_query=walking+lunge+form"),
        ex("S3","Peso muerto rumano","Isquios + glúteo.",3,"8–10","2m","https://www.youtube.com/results?search_query=romanian+deadlift+form"),
        ex("ACC","Gemelos","Pausa arriba.",3,"12–15","60–90s","https://www.youtube.com/results?search_query=calf+raise+form"),
        ex("C1","Plancha","Core fuerte.",2,"40–50s","45–60s","https://www.youtube.com/results?search_query=plank+proper+form")
      ]
    },
    {
      id:"D2",
      dayLabel:"Día 2",
      title:"Tren superior (masa) + prevención",
      approx:"~60 min",
      objective:"Empuje/tirón + hombro + isquios",
      exercises:[
        ex("WU1","Calentamiento (10')","Movilidad hombro + bandas + 2 series suaves de flexiones/remadas","—","10 min","—","https://www.youtube.com/results?search_query=upper+body+warm+up+bands"),
        ex("U1","Press banca o flexiones lastradas","Volumen para crecer.",4,"8–10","2m","https://www.youtube.com/results?search_query=bench+press+form"),
        ex("U2","Dominadas / jalón con banda","Control total.",4,"6–10","2m","https://www.youtube.com/results?search_query=band+assisted+pull+up"),
        ex("U3","Remo mancuerna","Espalda ancha.",3,"10/10","90s","https://www.youtube.com/results?search_query=dumbbell+row+form"),
        ex("U4","Press militar mancuernas","Hombro fuerte.",3,"8","90–120s","https://www.youtube.com/results?search_query=dumbbell+overhead+press+form"),
        ex("PRE1","Nordic curl asistido","Isquios: bajar lento.",3,"3–5","2m","https://www.youtube.com/results?search_query=assisted+nordic+curl"),
        ex("C1","Farmer carry","Agarre + core.",3,"30–50m","60–90s","https://www.youtube.com/results?search_query=farmer+carry+form")
      ]
    },
    {
      id:"D3",
      dayLabel:"Día 3",
      title:"Potencia + full body",
      approx:"~60 min",
      objective:"Potencia (medball) + fuerza total",
      exercises:[
        ex("WU1","Calentamiento (10')","Movilidad + 2 progresiones + activación core","—","10 min","—","https://www.youtube.com/results?search_query=dynamic+warm+up+athlete+10"),
        ex("P1","Lanzamiento medball al suelo","Explosivo, abdomen firme.",4,"6","60–90s","https://www.youtube.com/results?search_query=medicine+ball+slam+form"),
        ex("S1","Peso muerto (moderado)","Potencia, sin fallo.",4,"4–6","2–3m","https://www.youtube.com/results?search_query=deadlift+proper+form"),
        ex("S2","Zancada búlgara","Unilateral.",3,"8/8","2m","https://www.youtube.com/results?search_query=bulgarian+split+squat+form"),
        ex("S3","Fondos entre bancos / dips asistidos","Tríceps + pecho.",3,"8–12","90s","https://www.youtube.com/results?search_query=bench+dips+form"),
        ex("S4","Remo barra","Espalda.",3,"8–10","90–120s","https://www.youtube.com/results?search_query=barbell+row+form"),
        ex("C1","Dead bug","Control.",2,"10/10","45–60s","https://www.youtube.com/results?search_query=dead+bug+exercise")
      ]
    },
    {
      id:"D4",
      dayLabel:"Día 4",
      title:"Aceleración + accesorios (masa)",
      approx:"~60 min",
      objective:"Sprints cortos + accesorios para crecer",
      exercises:[
        ex("WU1","Calentamiento (10')","Escalera 2' + movilidad + 3 progresiones 3x15m","—","10 min","—","https://www.youtube.com/results?search_query=ladder+drills+warm+up"),
        ex("F1","Sprints 6x15m","Explosivo, descanso completo.",6,"15m","2–3m","https://www.youtube.com/results?search_query=15m+sprint+start"),
        ex("A1","Hip thrust (barra/mancuerna)","Glúteo fuerte.",4,"8–12","2m","https://www.youtube.com/results?search_query=hip+thrust+form"),
        ex("A2","Press inclinado mancuernas","Pecho superior.",3,"10–12","90s","https://www.youtube.com/results?search_query=incline+dumbbell+press+form"),
        ex("A3","Curl bíceps (barra W/mancuerna)","Control.",3,"10–12","75–90s","https://www.youtube.com/results?search_query=dumbbell+bicep+curl+form"),
        ex("A4","Elevaciones laterales","Hombro.",3,"12–15","60–75s","https://www.youtube.com/results?search_query=lateral+raise+form"),
        ex("C1","Movilidad final","Recuperar.",1,"3–4 min","—","https://www.youtube.com/results?search_query=post+workout+mobility")
      ]
    }
  ],

  gaston: [
    {
      id:"D1",
      dayLabel:"Día 1",
      title:"Coordinación + saltos seguros",
      approx:"~50–60 min",
      objective:"Juego, coordinación, saltos suaves, fuerza básica",
      exercises:[
        ex("WU1","Calentamiento (10')","Juego 2' (pilla-pilla) + movilidad 3' + escalera fácil 3' + 2 carreras suaves 2x15m","—","10 min","—","https://www.youtube.com/results?search_query=kids+soccer+warm+up+10+minutes"),
        ex("G1","Escalera (patrones simples)","2 patrones x 3 pasadas.",1,"6 pasadas","45–60s","https://www.youtube.com/results?search_query=agility+ladder+drills+kids"),
        ex("P1","Saltos en línea (suaves)","10 saltos, descanso, repetir.",3,"10","60s","https://www.youtube.com/results?search_query=jump+landing+kids+drills"),
        ex("S1","Sentadilla goblet liviana / sentadilla aire","Técnica: espalda recta.",3,"8–10","60–75s","https://www.youtube.com/results?search_query=goblet+squat+form"),
        ex("S2","Flexiones inclinadas (manos elevadas)","Control total.",3,"6–10","60–75s","https://www.youtube.com/results?search_query=incline+push+up+kids"),
        ex("S3","Remo con banda","Codo atrás.",3,"10–12","60s","https://www.youtube.com/results?search_query=band+row+exercise"),
        ex("C1","Plancha (juego)","Aguantar como estatua.",2,"20–30s","45–60s","https://www.youtube.com/results?search_query=plank+for+kids")
      ]
    },
    {
      id:"D2",
      dayLabel:"Día 2",
      title:"Velocidad (técnica) + core",
      approx:"~50–60 min",
      objective:"Técnica de carrera, aceleraciones cortas, core",
      exercises:[
        ex("WU1","Calentamiento (10')","Movilidad + skipping suave + 2 progresiones 2x15m","—","10 min","—","https://www.youtube.com/results?search_query=running+drills+kids"),
        ex("T1","Técnica: skipping / talones","2 drills x 3 repeticiones cortas.",1,"6 repeticiones","45–60s","https://www.youtube.com/results?search_query=kids+running+drills+skipping"),
        ex("F1","Aceleraciones 6x10m","Rápido pero controlado.",6,"10m","75–90s","https://www.youtube.com/results?search_query=kids+acceleration+drills"),
        ex("G1","Lanzamiento medball (suave)","Frente al pecho, control.",3,"6","60s","https://www.youtube.com/results?search_query=medicine+ball+chest+pass+kids"),
        ex("C1","Dead bug (simple)","Control.",2,"6/6","45–60s","https://www.youtube.com/results?search_query=dead+bug+kids"),
        ex("C2","Equilibrio 1 pierna","Ojos al frente.",2,"20–30s/20–30s","45s","https://www.youtube.com/results?search_query=single+leg+balance+kids")
      ]
    },
    {
      id:"D3",
      dayLabel:"Día 3",
      title:"Fuerza segura + juego",
      approx:"~50–60 min",
      objective:"Fuerza básica + coordinación (divertido)",
      exercises:[
        ex("WU1","Calentamiento (10')","Juego 2' + movilidad 3' + escalera 3' + 2 carreras 2x15m","—","10 min","—","https://www.youtube.com/results?search_query=kids+dynamic+warm+up"),
        ex("S1","Peso muerto con mancuerna liviana / bisagra","Aprender bisagra.",3,"8–10","60–75s","https://www.youtube.com/results?search_query=hip+hinge+kids+exercise"),
        ex("S2","Step-ups al cajón bajo","Subir controlado.",3,"8/8","60–75s","https://www.youtube.com/results?search_query=step+ups+kids"),
        ex("S3","Dominadas colgado (solo colgarse)","Agarre fuerte.",4,"10–20s","60s","https://www.youtube.com/results?search_query=dead+hang+kids"),
        ex("G1","Carrera con cambios (zig-zag conos)","Corto y rápido.",6,"10–15s","60–90s","https://www.youtube.com/results?search_query=agility+drills+kids+cones"),
        ex("C1","Plancha lateral (rodilla)","Control.",2,"15–25s/15–25s","45–60s","https://www.youtube.com/results?search_query=side+plank+kids")
      ]
    },
    {
      id:"D4",
      dayLabel:"Día 4",
      title:"Resistencia divertida (intervalos)",
      approx:"~50–60 min",
      objective:"Intervalos suaves + fuerza básica",
      exercises:[
        ex("WU1","Calentamiento (10')","Movilidad + juego 3' + 2 progresiones 2x15m","—","10 min","—","https://www.youtube.com/results?search_query=kids+soccer+warm+up"),
        ex("F1","Intervalos: 8x(20" rápido/40" caminar)","Rápido=alegre, sin ahogarse.",1,"8 repeticiones","—","https://www.youtube.com/results?search_query=kids+interval+training+20+40"),
        ex("S1","Sentadilla aire","Técnica.",3,"10","60s","https://www.youtube.com/results?search_query=bodyweight+squat+kids"),
        ex("S2","Flexiones inclinadas","Control.",3,"8–10","60s","https://www.youtube.com/results?search_query=incline+push+up"),
        ex("S3","Remo con banda","Espalda.",3,"12","60s","https://www.youtube.com/results?search_query=resistance+band+row"),
        ex("C1","Movilidad final + respiración","Recuperar.",1,"3–4 min","—","https://www.youtube.com/results?search_query=kids+cool+down+stretching")
      ]
    }
  ]
};
