// app.js — BLOODLINE
(() => {
  const $ = (id) => document.getElementById(id);

  // ========= Keys / storage =========
  const LS = {
    activeProfile: "bloodline_active_profile",
    week(profile){ return `bloodline_week_${profile}`; },
    check(profile, week, sessionId, exId){ return `bloodline_check_${profile}_w${week}_${sessionId}_${exId}`; },
    doneDay(profile, week, sessionId){ return `bloodline_done_${profile}_w${week}_${sessionId}`; },
    adminPlan(profile){ return `bloodline_admin_plan_${profile}`; }
  };

  // ========= State =========
  let ACTIVE_PROFILE = "juancho";
  let ACTIVE_SESSION = null;
  let ADMIN_MODE = false;

  // ========= Inspiración =========
  const INSPIRATION_MESSAGES = [
    "LA DISCIPLINA CREA LA DIFERENCIA",
    "ENTRENA COMO QUIERES JUGAR",
    "HOY SE FORJA TU MEJOR VERSIÓN",
    "CALIDAD ANTES QUE CANTIDAD",
    "EL TRABAJO SILENCIOSO DA RESULTADOS",
    "FUERTE DE CUERPO · FIRME DE MENTE",
    "CADA REPETICIÓN CUENTA",
    "LA CONSTANCIA SUPERA AL TALENTO",
    "NO BUSQUES EXCUSAS, BUSCA PROGRESO",
    "BLOODLINE · DISCIPLINA Y FUERZA"
  ];

  function showInspirationThenEnterApp(){
    const inspire = $("inspire");
    const inspireText = $("inspireText");
    if (!inspire || !inspireText) return;

    const msg = INSPIRATION_MESSAGES[Math.floor(Math.random() * INSPIRATION_MESSAGES.length)];
    inspireText.textContent = msg;

    inspire.classList.remove("hidden");
    inspire.setAttribute("aria-hidden", "false");

    // Reinicia animación
    inspire.classList.remove("is-playing");
    void inspire.offsetWidth;
    inspire.classList.add("is-playing");

    // Oculta al finalizar
    setTimeout(() => {
      inspire.classList.add("hidden");
      inspire.setAttribute("aria-hidden", "true");
      inspire.classList.remove("is-playing");
    }, 2900);
  }

  // ========= Helpers =========
  function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

  function restToSeconds(restStr){
    if (!restStr) return 60;
    const s = String(restStr).toLowerCase().trim();
    if (s === "—" || s === "-") return 60;

    const rangeM = s.match(/(\d+)\s*[–-]\s*(\d+)\s*m/);
    if (rangeM) return parseInt(rangeM[1],10) * 60;

    const rangeS = s.match(/(\d+)\s*[–-]\s*(\d+)\s*s/);
    if (rangeS) return parseInt(rangeS[1],10);

    const m = s.match(/(\d+)\s*m/);
    if (m) return parseInt(m[1],10) * 60;

    const sec = s.match(/(\d+)\s*s/);
    if (sec) return parseInt(sec[1],10);

    const n = s.match(/(\d+)/);
    return n ? parseInt(n[1],10) : 60;
  }

  function fmtTime(t){
    const mm = Math.floor(t/60);
    const ss = t % 60;
    return String(mm).padStart(2,"0") + ":" + String(ss).padStart(2,"0");
  }

  function getProfile(){ return localStorage.getItem(LS.activeProfile) || "juancho"; }
  function setProfile(p){ localStorage.setItem(LS.activeProfile, p); }

  function getWeek(profile){
    const v = Number(localStorage.getItem(LS.week(profile)) || "1");
    return clamp(v || 1, 1, 6);
  }
  function setWeek(profile, w){ localStorage.setItem(LS.week(profile), String(clamp(w,1,6))); }

  // ========= Plans =========
  function getBasePlanFor(profile){
    // Admin override?
    const saved = localStorage.getItem(LS.adminPlan(profile));
    if (saved){
      try{
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }catch(e){}
    }
    // default
    return window.BLOODLINE_DEFAULT_PLANS[profile] || [];
  }

  // Progression rules:
  // Week1 base
  // Week2 +5–10% volume (reps or +1 rep in ranges)
  // Week3 +1 set on 1–2 main lifts OR +1 rep each set
  // Week4 deload (−20% volume)
  // Week5 same as week3 but better quality
  // Week6 peak quality (same volume as week3, maybe slightly less rest)
  function progressionText(profile, week){
    if (week === 1) return "Semana 1: base técnica + calidad. Nada al fallo.";
    if (profile === "benja"){
      if (week === 2) return "Semana 2: +1 rep por serie en ejercicios de masa si mantienes técnica.";
      if (week === 3) return "Semana 3: +1 serie en 1 ejercicio principal (pierna/pecho) o +2 reps totales.";
      if (week === 4) return "Semana 4 (deload): baja 15–25% el volumen para recuperar y crecer.";
      if (week === 5) return "Semana 5: vuelve a Semana 3 con mejor control y algo más de velocidad.";
      return "Semana 6: misma exigencia que Semana 3, técnica perfecta (sin fallo).";
    }
    if (profile === "juancho"){
      if (week === 2) return "Semana 2: misma carga, mejor velocidad. Si fácil: +2.5–5% solo en 1 ejercicio.";
      if (week === 3) return "Semana 3: +1 serie en prevención o +1 sprint, SIN fatiga residual.";
      if (week === 4) return "Semana 4 (deload): reduce volumen 20% para llegar más fresco.";
      if (week === 5) return "Semana 5: calidad máxima en sprints/saltos. Descanso completo.";
      return "Semana 6: misma carga/volumen, mejor ejecución. Objetivo: chispa y frescura.";
    }
    // Gaston
    if (week === 2) return "Semana 2: +1 ronda de juego/técnica o +5s extra en plancha si sale perfecto.";
    if (week === 3) return "Semana 3: mejor coordinación (mejor ritmo), no más cansancio.";
    if (week === 4) return "Semana 4: semana fácil: técnica suave + diversión.";
    if (week === 5) return "Semana 5: repite Semana 3 con mejor control.";
    return "Semana 6: semana estrella: calidad, sonrisas y técnica.";
  }

  // Apply progression in a conservative way:
  // - Warmup stays as-is.
  // - For rest: slightly shorter on weeks 2/3/5/6 for hypertrophy, but keep full rest for sprints/jumps.
  // - Week4 deload reduces sets by ~1 on strength/accessory (min 1).
  function applyProgressionToExercise(e, week, profile){
    const out = { ...e };
    const isWarmup = String(e.id || "").startsWith("WU");
    if (isWarmup) return out;

    const name = String(e.name || "").toLowerCase();
    const isSprintOrJump = /sprint|salt|jump|aceler|agility|cod|pro\s*agility|5-10-5|bounds/.test(name);
    const isCore = /plancha|dead bug|core|respir/i.test(name);

    // Parse sets if numeric
    const setsN = Number(out.sets);
    const setsIsNum = Number.isFinite(setsN);

    // Week 4 deload
    if (week === 4){
      if (setsIsNum && !isSprintOrJump){
        out.sets = String(Math.max(1, setsN - 1));
      }
      // keep rest slightly generous
      return out;
    }

    // Weeks 2/3/5/6 adjustments
    if (setsIsNum && !isWarmup){
      if (week === 3 || week === 5 || week === 6){
        // Add 1 set to one main lift per session handled elsewhere; here keep sets same
        // (we will add set to first strength exercise per session in applyProgressionToSession)
      } else if (week === 2){
        // keep sets
      }
    }

    // Reduce rest slightly for hypertrophy/accessories on weeks 2/3/5/6 (not for sprints/jumps)
    if (!isSprintOrJump && out.rest){
      const sec = restToSeconds(out.rest);
      let delta = 0;
      if (week === 2) delta = 5;
      if (week === 3) delta = 10;
      if (week === 5) delta = 10;
      if (week === 6) delta = 10;
      const newSec = Math.max(30, sec - delta);
      // write back in a friendly format
      if (newSec % 60 === 0) out.rest = (newSec/60) + "m";
      else out.rest = newSec + "s";
    }

    // For reps ranges: on week2 +1 rep, on week3/5/6 +1 rep (conservative)
    if (out.reps && !isSprintOrJump && !isCore){
      const r = String(out.reps);
      // patterns: "6–8", "8-10", "10/10", "6x20m", "30–40s" etc.
      const range = r.match(/^(\d+)\s*[–-]\s*(\d+)(.*)$/);
      if (range){
        const a = parseInt(range[1],10);
        const b = parseInt(range[2],10);
        const tail = range[3] || "";
        const inc = (week === 2) ? 1 : (week === 3 || week === 5 || week === 6) ? 1 : 0;
        out.reps = `${a+inc}–${b+inc}${tail}`;
      } else {
        // single number
        const single = r.match(/^(\d+)(.*)$/);
        if (single){
          const a = parseInt(single[1],10);
          const tail = single[2] || "";
          const inc = (week === 2) ? 1 : (week === 3 || week === 5 || week === 6) ? 1 : 0;
          out.reps = `${a+inc}${tail}`;
        }
      }
    }

    return out;
  }

  function applyProgressionToSession(session, week, profile){
    const s = { ...session };
    s.exercises = (session.exercises || []).map(e => applyProgressionToExercise(e, week, profile));

    // Add +1 set to first "strength-ish" exercise on week3/5/6 (not warmup; not sprints/jumps)
    if (week === 3 || week === 5 || week === 6){
      for (let i=0; i<s.exercises.length; i++){
        const e = s.exercises[i];
        if (String(e.id||"").startsWith("WU")) continue;
        const name = String(e.name||"").toLowerCase();
        const sprintJump = /sprint|salt|jump|aceler|agility|cod|bounds/.test(name);
        const setsN = Number(e.sets);
        if (!sprintJump && Number.isFinite(setsN)){
          s.exercises[i] = { ...e, sets: String(setsN + 1) };
          break;
        }
      }
    }

    // Week4 deload already handled by per-exercise (sets-1).
    return s;
  }

  function getPlan(profile, week){
    const base = getBasePlanFor(profile);
    return base.map(s => applyProgressionToSession(s, week, profile));
  }

  // ========= Progress =========
  function sessionDone(profile, week, sessionId){
    return localStorage.getItem(LS.doneDay(profile, week, sessionId)) === "1";
  }

  function setSessionDone(profile, week, sessionId, val){
    localStorage.setItem(LS.doneDay(profile, week, sessionId), val ? "1" : "0");
  }

  function getSessionProgress(profile, week, session){
    const exs = session.exercises || [];
    let total = 0, done = 0;
    exs.forEach(e => {
      if (String(e.id||"").startsWith("WU")) return; // no contamos warmup en progreso
      total++;
      const key = LS.check(profile, week, session.id, e.id);
      if (localStorage.getItem(key) === "1") done++;
    });
    const pct = total ? Math.round(done/total*100) : 0;
    return { done, total, pct };
  }

  function getWeeklyProgress(profile, week, plan){
    let total = 0, done = 0;
    plan.forEach(s => {
      const p = getSessionProgress(profile, week, s);
      total += p.total;
      done += p.done;
    });
    const pct = total ? Math.round(done/total*100) : 0;
    return { done, total, pct };
  }

  // ========= Render =========
  function render(){
    const profile = ACTIVE_PROFILE;
    const week = getWeek(profile);

    // sync selects
    $("profileSelect").value = profile;
    $("weekSelect").value = String(week);

    const prof = window.BLOODLINE_PROFILES[profile];
    $("planTitle").textContent = `Plan de ${prof?.name || "—"}`;
    $("planMeta").textContent = prof?.info || "—";
    $("profileInfo").textContent = `${prof?.focus || ""} · ${prof?.info || ""}`;

    $("progressionHint").innerHTML = `🎯 <b>Progresión:</b> ${progressionText(profile, week)}`;

    const plan = getPlan(profile, week);
    const wk = getWeeklyProgress(profile, week, plan);
    $("kpiWeek").textContent = String(week);
    $("kpiPct").textContent = wk.pct + "%";

    // Home view
    $("homeView").innerHTML = "";
    $("sessionView").classList.add("hidden");

    plan.forEach(s => {
      const p = getSessionProgress(profile, week, s);
      const done = sessionDone(profile, week, s.id);

      const card = document.createElement("div");
      card.className = "sessionCard";
      card.innerHTML = `
        <div class="row between">
          <div>
            <h3>${s.dayLabel} · ${s.title}</h3>
            <div class="meta">${s.objective}</div>
          </div>
          <div class="row">
            <span class="tag">${s.approx || "~60 min"}</span>
            <span class="pill"><span class="dot ${done ? "good":"warn"}"></span> ${done ? "Realizado":"Pendiente"}</span>
          </div>
        </div>

        <div style="height:10px"></div>

        <div class="row between">
          <span class="tag">Progreso: <b>${p.done}/${p.total}</b> (${p.pct}%)</span>
          <button class="btn metal">Abrir día</button>
        </div>
      `;
      card.querySelector("button").onclick = () => openSession(s.id);
      $("homeView").appendChild(card);
    });

    // Admin panel render if open
    $("adminPanel").style.display = ADMIN_MODE ? "block" : "none";
    if (ADMIN_MODE) {
      $("adminTextarea").value = JSON.stringify(getBasePlanFor(profile), null, 2);
      $("adminStatus").textContent = "Editando plan base (Semana 1).";
    }
  }

  function openSession(sessionId){
    const profile = ACTIVE_PROFILE;
    const week = getWeek(profile);
    const plan = getPlan(profile, week);
    const session = plan.find(s => s.id === sessionId);
    if (!session) return;

    ACTIVE_SESSION = sessionId;

    $("sessionTitle").textContent = `${session.dayLabel} · ${session.title}`;
    $("sessionObjective").textContent = `Objetivo: ${session.objective} · Semana ${week}`;
    $("sessionTimeTag").textContent = session.approx || "~60 min";

    $("homeView").innerHTML = "";
    $("sessionView").classList.remove("hidden");

    // Table
    const tbody = $("exerciseTable");
    tbody.innerHTML = "";

    session.exercises.forEach(e => {
      const isWarmup = String(e.id||"").startsWith("WU");
      const key = LS.check(profile, week, session.id, e.id);
      const checked = localStorage.getItem(key) === "1";
      const restSec = restToSeconds(e.rest);

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${isWarmup ? "" : `<input class="check" type="checkbox" ${checked ? "checked":""} />`}</td>
        <td>
          <div style="font-weight:900">${e.name}</div>
          <div class="small muted" style="margin-top:4px; line-height:1.35">${e.desc || ""}</div>
        </td>
        <td>${e.sets ?? "—"}</td>
        <td>${e.reps ?? "—"}</td>
        <td>${e.rest ?? "—"}</td>
        <td>${isWarmup ? "" : `<button class="btn metal" data-timer="1">⏱</button>`}</td>
        <td>${e.url ? `<a href="${e.url}" target="_blank" rel="noopener">Ver</a>` : "—"}</td>
      `;

      const cb = tr.querySelector("input");
      if (cb){
        cb.addEventListener("change", (ev) => {
          localStorage.setItem(key, ev.target.checked ? "1" : "0");
          // auto if all done, mark day done
          tryAutoMarkDayDone(profile, week, session.id);
        });
      }

      const timerBtn = tr.querySelector("[data-timer]");
      if (timerBtn){
        timerBtn.addEventListener("click", () => openTimer(e.name, restSec));
      }

      tbody.appendChild(tr);
    });

    $("completeSessionBtn").onclick = () => {
      setSessionDone(profile, week, session.id, true);
      // mark all non-warmup exercises as done
      session.exercises.forEach(e => {
        if (String(e.id||"").startsWith("WU")) return;
        localStorage.setItem(LS.check(profile, week, session.id, e.id), "1");
      });
      render();
    };

    $("backBtn").onclick = () => render();
  }

  function tryAutoMarkDayDone(profile, week, sessionId){
    const plan = getPlan(profile, week);
    const session = plan.find(s => s.id === sessionId);
    if (!session) return;

    const p = getSessionProgress(profile, week, session);
    if (p.total > 0 && p.done === p.total){
      setSessionDone(profile, week, sessionId, true);
    } else {
      setSessionDone(profile, week, sessionId, false);
    }
  }

  // ========= Timer modal =========
  let timerInterval = null;
  let timerRemaining = 0;
  let timerRunning = false;

  function openTimer(exName, seconds){
    $("timerExerciseName").textContent = exName || "Descanso";
    timerRemaining = Math.max(0, seconds || 60);
    timerRunning = false;
    $("timerDisplay").textContent = fmtTime(timerRemaining);
    $("timerModal").classList.add("show");
    $("timerModal").setAttribute("aria-hidden", "false");
  }

  function closeTimer(){
    stopTimer();
    $("timerModal").classList.remove("show");
    $("timerModal").setAttribute("aria-hidden", "true");
  }

  function startTimer(){
    if (timerRunning) return;
    timerRunning = true;
    timerInterval = setInterval(() => {
      timerRemaining = Math.max(0, timerRemaining - 1);
      $("timerDisplay").textContent = fmtTime(timerRemaining);
      if (timerRemaining <= 0){
        stopTimer();
        try { navigator.vibrate && navigator.vibrate([80,60,80]); } catch(e){}
      }
    }, 1000);
  }

  function stopTimer(){
    timerRunning = false;
    if (timerInterval){ clearInterval(timerInterval); timerInterval = null; }
  }

  function resetTimer(){
    stopTimer();
    $("timerDisplay").textContent = fmtTime(timerRemaining);
  }

  function initTimerUI(){
    $("timerCloseBtn").onclick = closeTimer;
    $("timerStartBtn").onclick = startTimer;
    $("timerPauseBtn").onclick = stopTimer;
    $("timerResetBtn").onclick = resetTimer;

    $("timerModal").querySelectorAll("[data-tsec]").forEach(btn => {
      btn.addEventListener("click", () => {
        timerRemaining = parseInt(btn.getAttribute("data-tsec"), 10);
        $("timerDisplay").textContent = fmtTime(timerRemaining);
      });
    });

    $("timerModal").addEventListener("click", (e) => {
      if (e.target === $("timerModal")) closeTimer();
    });
  }

  // ========= Splash (3s) =========
  function initSplash(){
    const splash = $("splash");
    const btn = $("splashBtn");
    const hint = $("splashHint");
    if (!splash || !btn || !hint) return;

    let canEnter = false;

    splash.classList.add("is-playing");

    // Only after 3 seconds
    setTimeout(() => {
      canEnter = true;
      splash.classList.add("can-enter");
    }, 3000);

    function enter(){
      if (!canEnter) return;

      splash.classList.add("is-hiding");
      setTimeout(() => splash.remove(), 450);

      setTimeout(() => {
        showInspirationThenEnterApp();
      }, 220);
    }

    btn.addEventListener("click", enter);
    btn.addEventListener("touchstart", enter, { passive:true });
  }

  // ========= Admin =========
  function initAdminTriggers(){
    // Trigger oculto 1: mantener pulsado BLOODLINE (2.2s)
    const titleEl = $("brandTitle");
    let pressTimer = null;

    if (titleEl){
      const start = () => {
        pressTimer = setTimeout(() => {
          enterAdmin();
        }, 2200);
      };
      const cancel = () => {
        if (pressTimer){ clearTimeout(pressTimer); pressTimer = null; }
      };

      titleEl.addEventListener("pointerdown", start);
      titleEl.addEventListener("pointerup", cancel);
      titleEl.addEventListener("pointercancel", cancel);
      titleEl.addEventListener("pointerleave", cancel);
    }

    // Trigger oculto 2 (PC): Ctrl + Shift + L
    document.addEventListener("keydown", (e) => {
      const key = String(e.key || "").toLowerCase();
      if (e.ctrlKey && e.shiftKey && key === "l"){
        e.preventDefault();
        enterAdmin();
      }
    });
  }


  function enterAdmin(){
    const pin = prompt("PIN ADMIN:");
    if (pin !== "1979"){ // PIN simple. Cambialo si querés.
      alert("PIN incorrecto.");
      return;
    }
    ADMIN_MODE = true;
    render();
  }

  function exitAdmin(){
    ADMIN_MODE = false;
    render();
  }

  function saveAdminPlan(){
    const profile = ACTIVE_PROFILE;
    const raw = $("adminTextarea").value;
    try{
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) throw new Error("El JSON debe ser un array de sesiones.");
      localStorage.setItem(LS.adminPlan(profile), JSON.stringify(parsed));
      $("adminStatus").textContent = "Guardado ✅";
      render();
    }catch(e){
      $("adminStatus").textContent = "Error: " + (e.message || e);
    }
  }

  function loadDefaultToEditor(){
    const profile = ACTIVE_PROFILE;
    $("adminTextarea").value = JSON.stringify(window.BLOODLINE_DEFAULT_PLANS[profile] || [], null, 2);
    $("adminStatus").textContent = "Default cargado.";
  }

  function copyEditor(){
    $("adminTextarea").select();
    document.execCommand("copy");
    $("adminStatus").textContent = "Copiado al portapapeles.";
  }

  // ========= Init =========
  function init(){
    initSplash();
    initTimerUI();

    // Load persisted profile & week
    ACTIVE_PROFILE = getProfile();
    setProfile(ACTIVE_PROFILE);
    if (!localStorage.getItem(LS.week(ACTIVE_PROFILE))) setWeek(ACTIVE_PROFILE, 1);

    // Select listeners
    $("profileSelect").addEventListener("change", (e) => {
      ACTIVE_PROFILE = e.target.value;
      setProfile(ACTIVE_PROFILE);
      if (!localStorage.getItem(LS.week(ACTIVE_PROFILE))) setWeek(ACTIVE_PROFILE, 1);
      render();
    });

    $("weekSelect").addEventListener("change", (e) => {
      const w = Number(e.target.value || "1");
      setWeek(ACTIVE_PROFILE, w);
      render();
    });

    // Admin buttons
    initAdminTriggers();
    $("exitAdminBtn").addEventListener("click", exitAdmin);
    $("saveJsonBtn").addEventListener("click", saveAdminPlan);
    $("loadDefaultBtn").addEventListener("click", loadDefaultToEditor);
    $("copyJsonBtn").addEventListener("click", copyEditor);

    render();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
