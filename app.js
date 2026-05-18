// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const STATUS = { TREATMENT: 'treatment', DISCHARGE: 'discharge', LETTER: 'letter', GROUP: 'group', SPECIAL: 'special' };
const AVAIL  = { AVAILABLE: 'available', VACATION: 'vacation', SOROKA: 'soroka', DAYOFF: 'dayoff', PARTIAL: 'partial' };

const CONSTRAINT_OPTIONS = [
  { avail: 'vacation', label: 'חופש',            color: '#F59E0B', blocks: true  },
  { avail: 'dayoff',   label: 'יום חופשי',        color: '#10B981', blocks: true  },
  { avail: 'partial',  label: 'נוכחות חלקית',     color: '#8B5CF6', blocks: false },
];

const STATUS_LABEL = {
  [STATUS.TREATMENT]: 'טיפול רגיל',
  [STATUS.DISCHARGE]: 'שחרור',
  [STATUS.LETTER]:    'מכתב',
  [STATUS.GROUP]:     'קבוצה',
  [STATUS.SPECIAL]:   'ישב"צ',
};

const AVAIL_LABEL = {
  [AVAIL.AVAILABLE]: 'זמין/ה',
  [AVAIL.VACATION]:  'חופש',
  [AVAIL.SOROKA]:    'שיקום סורוקה',
  [AVAIL.DAYOFF]:    'יום חופשי',
  [AVAIL.PARTIAL]:   'נוכחות חלקית',
};


const DEPT_HOUR_COLOR = '#6366F1';
const DAY_NAMES_SHORT = ["א'", "ב'", "ג'", "ד'", "ה'"];
const DAY_NAMES_FULL  = ["יום א'", "יום ב'", "יום ג'", "יום ד'", "יום ה'"];
const MONTH_NAMES = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
const DOW_HE = ["א'","ב'","ג'","ד'","ה'","ו'","ש'"];

// ─── INITIAL DATA ─────────────────────────────────────────────────────────────

const INIT_THERAPISTS = [
  { id: 't1', name: 'נורית', color: '#3B82F6', constraints: { maxPerDay: null, blockedDays: [], specialties: '', notes: '' } },
  { id: 't2', name: 'אור',   color: '#10B981', constraints: { maxPerDay: null, blockedDays: [], specialties: '', notes: '' } },
  { id: 't3', name: 'עידית', color: '#8B5CF6', constraints: { maxPerDay: null, blockedDays: [], specialties: '', notes: '' } },
  { id: 't4', name: 'מיכל', color: '#F59E0B', constraints: { maxPerDay: null, blockedDays: [], specialties: '', notes: '' } },
  { id: 't5', name: 'רותי',  color: '#EF4444', constraints: { maxPerDay: null, blockedDays: [], specialties: '', notes: '' } },
  { id: 't6', name: 'דנה',   color: '#EC4899', constraints: { maxPerDay: null, blockedDays: [], specialties: '', notes: '' } },
];

const PATIENT_DEFAULTS = { primaryTherapist: null, secondaryTherapist: null, treatmentsPerWeek: null, dischargeDate: null };

const INIT_PATIENTS = [
  { id: 'p1',  name: 'נויאף',   ...PATIENT_DEFAULTS },
  { id: 'p2',  name: 'אסנת',    ...PATIENT_DEFAULTS },
  { id: 'p3',  name: 'פאטמה',   ...PATIENT_DEFAULTS },
  { id: 'p4',  name: 'בני',     ...PATIENT_DEFAULTS },
  { id: 'p5',  name: 'חסיין',   ...PATIENT_DEFAULTS },
  { id: 'p6',  name: 'עדנאן',   ...PATIENT_DEFAULTS },
  { id: 'p7',  name: 'בנימין',  ...PATIENT_DEFAULTS },
  { id: 'p8',  name: 'רונית',   ...PATIENT_DEFAULTS },
  { id: 'p9',  name: 'יצחק',    ...PATIENT_DEFAULTS },
  { id: 'p10', name: 'דולב',    ...PATIENT_DEFAULTS },
  { id: 'p11', name: 'פרחאן',   ...PATIENT_DEFAULTS },
  { id: 'p12', name: 'נאור',    ...PATIENT_DEFAULTS },
  { id: 'p13', name: 'נאיל',    ...PATIENT_DEFAULTS },
  { id: 'p14', name: 'אליאס',   ...PATIENT_DEFAULTS },
  { id: 'p15', name: 'עווד',    ...PATIENT_DEFAULTS },
  { id: 'p16', name: 'אושרי',   ...PATIENT_DEFAULTS },
  { id: 'p17', name: 'ברוך',    ...PATIENT_DEFAULTS },
  { id: 'p18', name: 'יוליה',   ...PATIENT_DEFAULTS },
  { id: 'p19', name: 'אורי',    ...PATIENT_DEFAULTS },
  { id: 'p20', name: 'חליל',    ...PATIENT_DEFAULTS },
  { id: 'p21', name: 'ולרי',    ...PATIENT_DEFAULTS },
  { id: 'p22', name: 'שי',      ...PATIENT_DEFAULTS },
  { id: 'p23', name: 'נחמיאל',  ...PATIENT_DEFAULTS },
  { id: 'p24', name: 'ענדאן',   ...PATIENT_DEFAULTS },
];

function makeDay(avail, assignments, groups = [], discharges = []) {
  return { availability: avail, assignments, groups, discharges };
}

const A = AVAIL, S = STATUS;

const INIT_SCHEDULE = {
  '2026-05-10': makeDay(
    { t1: A.AVAILABLE, t2: A.AVAILABLE, t3: A.VACATION, t4: A.AVAILABLE, t5: A.VACATION, t6: A.AVAILABLE },
    {
      t1: [
        {pid:'p1',s:S.TREATMENT},{pid:'p2',s:S.TREATMENT},{pid:'p3',s:S.TREATMENT},
        {pid:'p4',s:S.TREATMENT},{pid:'p5',s:S.TREATMENT},{pid:'p6',s:S.TREATMENT},{pid:'p7',s:S.TREATMENT}
      ],
      t2: [
        {pid:'p8',s:S.TREATMENT},{pid:'p9',s:S.TREATMENT},{pid:'p10',s:S.TREATMENT},
        {pid:'p11',s:S.TREATMENT},{pid:'p12',s:S.TREATMENT},{pid:'p13',s:S.TREATMENT},{pid:'p14',s:S.TREATMENT}
      ],
      t3: [], t4: [
        {pid:'p15',s:S.TREATMENT},{pid:'p16',s:S.TREATMENT},{pid:'p17',s:S.TREATMENT},
        {pid:'p18',s:S.TREATMENT},{pid:'p19',s:S.TREATMENT},{pid:'p20',s:S.TREATMENT},{pid:'p21',s:S.TREATMENT}
      ],
      t5: [], t6: []
    },
    ['p8','p11','p16','p19','p17','p1','p14']
  ),
  '2026-05-11': makeDay(
    { t1: A.SOROKA, t2: A.AVAILABLE, t3: A.AVAILABLE, t4: A.AVAILABLE, t5: A.SOROKA, t6: A.AVAILABLE },
    {
      t1: [], t2: [
        {pid:'p1',s:S.TREATMENT},{pid:'p13',s:S.TREATMENT},{pid:'p8',s:S.TREATMENT},
        {pid:'p9',s:S.TREATMENT},{pid:'p2',s:S.TREATMENT},{pid:'p11',s:S.TREATMENT}
      ],
      t3: [
        {pid:'p6',s:S.TREATMENT},{pid:'p5',s:S.TREATMENT},{pid:'p3',s:S.TREATMENT},
        {pid:'p4',s:S.TREATMENT},{pid:'p10',s:S.TREATMENT},{pid:'p14',s:S.TREATMENT},
        {pid:'p12',s:S.TREATMENT},{pid:'p7',s:S.TREATMENT}
      ],
      t4: [
        {pid:'p15',s:S.TREATMENT},{pid:'p18',s:S.TREATMENT},{pid:'p16',s:S.TREATMENT},
        {pid:'p19',s:S.LETTER},{pid:'p20',s:S.TREATMENT},{pid:'p17',s:S.TREATMENT},
        {pid:'p21',s:S.TREATMENT},{pid:'p22',s:S.TREATMENT}
      ],
      t5: [], t6: []
    },
    ['p14','p12','p23']
  ),
  '2026-05-12': makeDay(
    { t1: A.DAYOFF, t2: A.AVAILABLE, t3: A.AVAILABLE, t4: A.AVAILABLE, t5: A.SOROKA, t6: A.AVAILABLE },
    {
      t1: [], t2: [
        {pid:'p1',s:S.TREATMENT},{pid:'p13',s:S.TREATMENT},{pid:'p8',s:S.LETTER},
        {pid:'p9',s:S.TREATMENT},{pid:'p2',s:S.TREATMENT},{pid:'p11',s:S.LETTER}
      ],
      t3: [
        {pid:'p10',s:S.TREATMENT},{pid:'p14',s:S.TREATMENT},{pid:'p5',s:S.TREATMENT},
        {pid:'p6',s:S.TREATMENT},{pid:'p4',s:S.TREATMENT},{pid:'p3',s:S.TREATMENT},
        {pid:'p7',s:S.TREATMENT},{pid:'p12',s:S.TREATMENT}
      ],
      t4: [
        {pid:'p15',s:S.TREATMENT},{pid:'p18',s:S.TREATMENT},{pid:'p16',s:S.TREATMENT},
        {pid:'p19',s:S.DISCHARGE},{pid:'p17',s:S.TREATMENT},{pid:'p21',s:S.TREATMENT},
        {pid:'p20',s:S.TREATMENT},{pid:'p22',s:S.TREATMENT}
      ],
      t5: [], t6: []
    },
    [], ['p19']
  ),
  '2026-05-13': makeDay(
    { t1: A.AVAILABLE, t2: A.DAYOFF, t3: A.DAYOFF, t4: A.AVAILABLE, t5: A.AVAILABLE, t6: A.SOROKA },
    {
      t1: [
        {pid:'p1',s:S.TREATMENT},{pid:'p2',s:S.TREATMENT},{pid:'p5',s:S.TREATMENT},
        {pid:'p24',s:S.TREATMENT},{pid:'p4',s:S.TREATMENT},{pid:'p3',s:S.TREATMENT},{pid:'p9',s:S.TREATMENT}
      ],
      t2: [], t3: [],
      t4: [
        {pid:'p15',s:S.TREATMENT},{pid:'p17',s:S.TREATMENT},{pid:'p18',s:S.TREATMENT},
        {pid:'p22',s:S.TREATMENT},{pid:'p16',s:S.TREATMENT},{pid:'p20',s:S.TREATMENT},
        {pid:'p22',s:S.SPECIAL}
      ],
      t5: [
        {pid:'p21',s:S.TREATMENT},{pid:'p8',s:S.TREATMENT},{pid:'p7',s:S.TREATMENT},
        {pid:'p12',s:S.TREATMENT},{pid:'p11',s:S.DISCHARGE},{pid:'p13',s:S.TREATMENT},
        {pid:'p14',s:S.TREATMENT},{pid:'p10',s:S.TREATMENT}
      ],
      t6: []
    },
    ['p11','p23'], ['p11']
  ),
  '2026-05-14': makeDay(
    { t1: A.AVAILABLE, t2: A.SOROKA, t3: A.AVAILABLE, t4: A.DAYOFF, t5: A.AVAILABLE, t6: A.AVAILABLE },
    {
      t1: [
        {pid:'p1',s:S.TREATMENT},{pid:'p2',s:S.TREATMENT},{pid:'p22',s:S.TREATMENT},
        {pid:'p16',s:S.TREATMENT},{pid:'p18',s:S.TREATMENT},{pid:'p17',s:S.TREATMENT},{pid:'p9',s:S.TREATMENT}
      ],
      t2: [],
      t3: [
        {pid:'p6',s:S.TREATMENT},{pid:'p5',s:S.TREATMENT},{pid:'p4',s:S.TREATMENT},
        {pid:'p3',s:S.TREATMENT},{pid:'p14',s:S.TREATMENT},{pid:'p10',s:S.TREATMENT},{pid:'p15',s:S.TREATMENT}
      ],
      t4: [],
      t5: [
        {pid:'p21',s:S.TREATMENT},{pid:'p7',s:S.TREATMENT},{pid:'p20',s:S.TREATMENT},
        {pid:'p23',s:S.TREATMENT},{pid:'p12',s:S.TREATMENT},{pid:'p13',s:S.TREATMENT},
        {pid:'p8',s:S.DISCHARGE}
      ],
      t6: []
    },
    ['p8'], ['p8']
  ),
};

// ─── STATE ────────────────────────────────────────────────────────────────────

let state = {
  view: 'weekly',
  currentDate: new Date(),
  selectedDayIndex: 0,
  therapists: [],
  patients: [],
  schedule: {},
  settings: { maxPatientsPerDay: 7 },
  currentUser: null,
};

// ─── PERMISSIONS ──────────────────────────────────────────────────────────────

const canEdit            = () => !state.currentUser || state.currentUser.role !== 'readonly';
const canEditPatients    = () => !state.currentUser || ['admin','editor'].includes(state.currentUser.role);
const isAdmin            = () => !state.currentUser || state.currentUser.role === 'admin';
const isOwnTherapist     = (tid) => state.currentUser?.therapistId === tid;
const canEditConstraints = (tid) => !state.currentUser || isAdmin() || isOwnTherapist(tid);

// ─── FIREBASE ─────────────────────────────────────────────────────────────────

const _clientId = Math.random().toString(36).slice(2);
let _db          = null;
let _auth        = null;
let _unsubscribe = null;
let _localWriteInFlight = 0;

function initFirebase() {
  try {
    firebase.initializeApp(FIREBASE_CONFIG);
    _db   = firebase.firestore();
    _auth = firebase.auth();
  } catch(e) {
    console.warn('Firebase init failed, using localStorage fallback:', e);
    _db = null; _auth = null;
  }
}

function _fsDoc() {
  return _db.collection('physioTeam').doc('state');
}

function _showLoadingOverlay(visible) {
  let el = document.getElementById('_fbOverlay');
  if (!el && visible) {
    el = document.createElement('div');
    el.id = '_fbOverlay';
    el.style.cssText = 'position:fixed;inset:0;background:rgba(255,255,255,0.92);display:flex;align-items:center;justify-content:center;z-index:9999;flex-direction:column;gap:0.75rem;font-family:Heebo,sans-serif;font-size:1rem;color:#2563EB;';
    el.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2.5" style="animation:_fbspin 1s linear infinite"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg><span>טוען נתונים...</span>';
    const s = document.createElement('style');
    s.textContent = '@keyframes _fbspin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}';
    document.head.appendChild(s);
    document.body.appendChild(el);
  }
  if (el) el.style.display = visible ? 'flex' : 'none';
}

function _applyDoc(data) {
  state.therapists = data.therapists || deepCopy(INIT_THERAPISTS);
  state.patients   = data.patients   || deepCopy(INIT_PATIENTS);
  state.schedule   = Object.assign({}, deepCopy(INIT_SCHEDULE), data.schedule || {});
  state.settings   = Object.assign(
    { maxPatientsPerDay: 7, departmentHour: { enabled: true, dayOfWeek: 0, fromTime: '12:00', toTime: '13:00' } },
    data.settings || {}
  );
  if (!state.settings.departmentHour)
    state.settings.departmentHour = { enabled: true, dayOfWeek: 0, fromTime: '12:00', toTime: '13:00' };
  state.therapists.forEach(t => {
    if (!t.constraints) t.constraints = { maxPerDay: null, blockedDays: [], specialties: '', notes: '' };
  });
  state.patients.forEach(p => {
    if (p.primaryTherapist   === undefined) p.primaryTherapist   = null;
    if (p.secondaryTherapist === undefined) p.secondaryTherapist = null;
    if (p.treatmentsPerWeek  === undefined) p.treatmentsPerWeek  = null;
    if (p.dischargeDate      === undefined) p.dischargeDate      = null;
  });
}

function _loadFromLocalStorage() {
  try {
    const raw = localStorage.getItem('physioTeamSoroka_v1');
    if (raw) { _applyDoc(JSON.parse(raw)); purgeExpiredPatients(); }
    else { state.therapists = deepCopy(INIT_THERAPISTS); state.patients = deepCopy(INIT_PATIENTS); state.schedule = deepCopy(INIT_SCHEDULE); }
  } catch(e) {
    state.therapists = deepCopy(INIT_THERAPISTS); state.patients = deepCopy(INIT_PATIENTS); state.schedule = deepCopy(INIT_SCHEDULE);
  }
}

function _startListener() {
  if (_unsubscribe) _unsubscribe();
  _unsubscribe = _fsDoc().onSnapshot(doc => {
    if (!doc.exists) return;
    const data = doc.data();
    if (data._clientId === _clientId && _localWriteInFlight > 0) {
      _localWriteInFlight--;
      return;
    }
    _applyDoc(data);
    renderCurrentView();
    if (state.activePanel) renderPanelContent(state.activePanel);
  }, err => console.warn('Firestore listener error:', err));
}

async function _saveToFirestore() {
  _localWriteInFlight++;
  try {
    await _fsDoc().set({
      therapists: state.therapists,
      patients:   state.patients,
      schedule:   state.schedule,
      settings:   state.settings,
      _clientId:  _clientId,
      _updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } catch(e) {
    _localWriteInFlight = Math.max(0, _localWriteInFlight - 1);
    console.warn('Firestore save failed:', e);
  }
}

// ─── PERSISTENCE ──────────────────────────────────────────────────────────────

async function loadState() {
  if (!_db) { _loadFromLocalStorage(); return; }
  _showLoadingOverlay(true);
  try {
    const doc = await _fsDoc().get();
    if (doc.exists) {
      _applyDoc(doc.data());
      purgeExpiredPatients();
    } else {
      state.therapists = deepCopy(INIT_THERAPISTS);
      state.patients   = deepCopy(INIT_PATIENTS);
      state.schedule   = deepCopy(INIT_SCHEDULE);
      await _saveToFirestore();
    }
    _startListener();
  } catch(e) {
    console.warn('Firestore load failed, falling back to localStorage:', e);
    _loadFromLocalStorage();
  } finally {
    _showLoadingOverlay(false);
  }
}

function purgeExpiredPatients() {
  const today = fmtKey(new Date());
  const expired = state.patients.filter(p => p.dischargeDate && p.dischargeDate < today);
  if (!expired.length) return;
  const expiredIds = new Set(expired.map(p => p.id));
  Object.values(state.schedule).forEach(day => {
    if (!day.assignments) return;
    Object.keys(day.assignments).forEach(tid => {
      day.assignments[tid] = (day.assignments[tid] || []).filter(a => !expiredIds.has(a.pid));
    });
  });
  state.patients = state.patients.filter(p => !expiredIds.has(p.id));
}

function saveState() {
  purgeExpiredPatients();
  if (_db) {
    _saveToFirestore();
  } else {
    localStorage.setItem('physioTeamSoroka_v1', JSON.stringify({
      therapists: state.therapists,
      patients:   state.patients,
      schedule:   state.schedule,
      settings:   state.settings,
    }));
  }
}

function deepCopy(o) { return JSON.parse(JSON.stringify(o)); }

function getMaxForTherapist(tid) {
  const t = getTherapist(tid);
  const personal = t && t.constraints && t.constraints.maxPerDay ? parseInt(t.constraints.maxPerDay) : null;
  return personal || state.settings.maxPatientsPerDay;
}

function therapistOptions(selected) {
  return `<option value="">— ללא —</option>` +
    state.therapists.map(t =>
      `<option value="${t.id}" ${selected === t.id ? 'selected' : ''}>${t.name}</option>`
    ).join('');
}

function checkPatientWarning(pid) {
  const p = getPatient(pid);
  if (!p || !p.treatmentsPerWeek) return;
  const count = getWeekTreatmentCount(pid, fmtKey(state.currentDate));
  if (count === p.treatmentsPerWeek) return;
  const low = count < p.treatmentsPerWeek;
  document.getElementById('warningModalBody').innerHTML =
    `<div style="padding:0.25rem 0 0.75rem">
      <div class="warning-issue-item">
        <span class="warning-issue-icon ${low ? 'low' : 'high'}">${low ? '↓' : '↑'}</span>
        <span>כמות הטיפולים של <strong>${p.name}</strong> ${low ? 'נמוכה' : 'גבוהה'} מהכמות שהוגדרה
          <span class="warning-issue-count">${count}/${p.treatmentsPerWeek}</span></span>
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-primary" onclick="closeModal('warningModal')">אישור</button>
    </div>`;
  showModal('warningModal');
}

function fmtDateHe(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${parseInt(d)}/${parseInt(m)}/${y}`;
}

function isPatientDischarged(pid) {
  const p = getPatient(pid);
  return p && !!p.dischargeDate;
}

function showDischargeWarning(pid) {
  const p = getPatient(pid);
  if (!p) return;
  document.getElementById('warningModalBody').innerHTML = `
    <div style="padding:0.25rem 0 0.75rem">
      <div class="warning-issue-item">
        <span class="warning-issue-icon high">✕</span>
        <span>תאריך שחרור של <strong>${p.name}</strong>: <strong>${fmtDateHe(p.dischargeDate)}</strong>.<br>לא ניתן לשבץ מטופל/ת לאחר תאריך השחרור.</span>
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-primary" onclick="closeModal('warningModal')">אישור</button>
    </div>`;
  showModal('warningModal');
}

function getWeekTreatmentCount(pid, dateStr) {
  const ws = weekStart(new Date(dateStr + 'T00:00:00'));
  const dates = weekDates(ws);
  let count = 0;
  dates.forEach(d => {
    const day = getDay(fmtKey(d));
    state.therapists.forEach(t => {
      count += (day.assignments[t.id] || []).filter(a => a.pid === pid).length;
    });
  });
  return count;
}

function checkTreatmentWarnings() {
  const dates = weekDates(weekStart(state.currentDate));
  const issues = [];
  state.patients.forEach(p => {
    if (!p.treatmentsPerWeek) return;
    let count = 0;
    dates.forEach(date => {
      const day = getDay(fmtKey(date));
      const assigned = state.therapists.some(t =>
        (day.assignments[t.id] || []).some(a => a.pid === p.id)
      );
      if (assigned) count++;
    });
    if (count !== p.treatmentsPerWeek) {
      issues.push({ name: p.name, count, target: p.treatmentsPerWeek, low: count < p.treatmentsPerWeek });
    }
  });
  if (!issues.length) return;

  document.getElementById('warningModalBody').innerHTML =
    `<div style="padding:0.25rem 0 0.75rem">` +
    issues.map(i => `
      <div class="warning-issue-item">
        <span class="warning-issue-icon ${i.low ? 'low' : 'high'}">${i.low ? '↓' : '↑'}</span>
        <span>כמות הטיפולים של <strong>${i.name}</strong> ${i.low ? 'נמוכה' : 'גבוהה'} מהכמות שהוגדרה
          <span class="warning-issue-count">${i.count}/${i.target}</span></span>
      </div>`).join('') +
    `</div>
    <div class="modal-actions">
      <button class="btn btn-primary" onclick="closeModal('warningModal')">אישור</button>
    </div>`;
  showModal('warningModal');
}

// ─── DATE HELPERS ─────────────────────────────────────────────────────────────

function fmtKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth()+1).padStart(2,'0');
  const d = String(date.getDate()).padStart(2,'0');
  return `${y}-${m}-${d}`;
}

function fmtDisplay(date) { return `${date.getDate()}/${date.getMonth()+1}`; }

function weekStart(date) {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay()); // Sunday
  return d;
}

function weekDates(start) {
  return Array.from({length:5}, (_,i) => {
    const d = new Date(start);
    d.setDate(d.getDate()+i);
    return d;
  });
}

// ─── SCHEDULE HELPERS ─────────────────────────────────────────────────────────

function getDay(dateStr) {
  if (state.schedule[dateStr]) return state.schedule[dateStr];
  return {
    availability: Object.fromEntries(state.therapists.map(t => [t.id, AVAIL.AVAILABLE])),
    assignments:  Object.fromEntries(state.therapists.map(t => [t.id, []])),
    groups: [],
    discharges: [],
    availExtra: {},
  };
}

function ensureDay(dateStr) {
  if (!state.schedule[dateStr]) state.schedule[dateStr] = getDay(dateStr);
  return state.schedule[dateStr];
}

function getPatient(id)   { return state.patients.find(p => p.id === id); }
function getTherapist(id) { return state.therapists.find(t => t.id === id); }

function removeAssignmentsAfterDischarge(pid, dischargeDate) {
  if (!dischargeDate) return;
  Object.keys(state.schedule).forEach(dateStr => {
    if (dateStr <= dischargeDate) return;
    const day = state.schedule[dateStr];
    if (!day || !day.assignments) return;
    Object.keys(day.assignments).forEach(tid => {
      day.assignments[tid] = (day.assignments[tid] || []).filter(a => a.pid !== pid);
    });
  });
}

// ─── RENDER: STATS BAR ────────────────────────────────────────────────────────

function renderStatsBar() {
  return `<div class="stats-bar">
    ${state.therapists.map(t => {
      const primaryCount   = state.patients.filter(p => p.primaryTherapist   === t.id).length;
      const secondaryCount = state.patients.filter(p => p.secondaryTherapist === t.id).length;
      const primaryChip   = primaryCount   > 0 ? `<span class="stat-primary-chip">${primaryCount} ראשי</span>`     : '';
      const secondaryChip = secondaryCount > 0 ? `<span class="stat-secondary-chip">${secondaryCount} משני</span>` : '';
      return `<div class="stat-card" style="background:${t.color}18;border:1.5px solid ${t.color}44;cursor:pointer" onclick="openTherapistPatients('${t.id}')">
        <span class="stat-name" style="color:${t.color}">${t.name}</span>
        ${primaryChip}${secondaryChip}
      </div>`;
    }).join('')}
  </div>`;
}

// ─── RENDER: WEEKLY VIEW ──────────────────────────────────────────────────────

function renderWeeklyView() {
  const ws    = weekStart(state.currentDate);
  const dates = weekDates(ws);

  document.getElementById('periodTitle').innerHTML =
    `<span dir="ltr">${fmtDisplay(dates[0])} – ${fmtDisplay(dates[4])}/${dates[0].getFullYear()}</span>`;

  document.getElementById('statsBarContainer').innerHTML = renderStatsBar();

  const thead = `<tr>
    <th class="th-day">יום</th>
    ${state.therapists.map(t => `
      <th class="th-therapist">
        <div class="therapist-th-badge" style="background:${t.color}18;border-color:${t.color}44;color:${t.color}">${t.name}</div>
      </th>`).join('')}
  </tr>`;

  const tbody = dates.map((date, i) => {
    const dateStr = fmtKey(date);
    const day     = getDay(dateStr);
    const cells   = state.therapists.map(t => renderCell(dateStr, t, day)).join('');
    const dayTotal = state.therapists.reduce((sum, t) => {
      const av = day.availability[t.id] || AVAIL.AVAILABLE;
      if (av === AVAIL.VACATION || av === AVAIL.DAYOFF) return sum;
      return sum + (day.assignments[t.id] || []).length;
    }, 0);
    return `<tr>
      <td class="day-name-cell">
        <div class="day-label">יום ${DAY_NAMES_SHORT[i]}</div>
        <div class="day-date">${fmtDisplay(date)}</div>
        <div class="day-total-pill"><span class="day-total-num">${dayTotal}</span><div>מטופלים</div></div>
      </td>
      ${cells}
    </tr>`;
  }).join('');

  document.getElementById('weeklyView').innerHTML = `
    <div class="weekly-wrapper">
      <div class="weekly-scroll">
        <table class="schedule-table">
          <thead>${thead}</thead>
          <tbody>${tbody}</tbody>
        </table>
      </div>
    </div>`;

  bindWeeklyEvents();

}

function renderCell(dateStr, t, day) {
  const av   = day.availability[t.id] || AVAIL.AVAILABLE;
  const asns = day.assignments[t.id]  || [];
  const c    = t.constraints || {};

  // Check if this day-of-week is in blocked days constraint
  const dow         = new Date(dateStr).getDay();
  const isBlocked   = (c.blockedDays || []).includes(dow);
  const max         = getMaxForTherapist(t.id);
  const isOverLimit = asns.length > max;

  const isUnavail = av === AVAIL.VACATION || av === AVAIL.DAYOFF;
  const constraintBtn = canEditConstraints(t.id)
    ? `<button class="cell-constraint-btn" data-date="${dateStr}" data-tid="${t.id}" title="הגדר אילוץ">אילוצים</button>` : '';
  const cellFooter = (!isUnavail && canEdit()) ? `<div class="cell-footer">
    <button class="cell-add-btn" data-date="${dateStr}" data-tid="${t.id}">+ הוסף מטופל</button>
  </div>` : '';

  if (av !== AVAIL.AVAILABLE && av !== AVAIL.PARTIAL && av !== AVAIL.SOROKA) {
    const cls = { [AVAIL.VACATION]:'vacation', [AVAIL.DAYOFF]:'dayoff' }[av] || '';
    const opt = CONSTRAINT_OPTIONS.find(o => o.avail === av);
    const pillStyle = opt ? `style="background:${opt.color}20;color:${opt.color};border-color:${opt.color}40"` : '';
    return `<td class="day-cell unavail-cell" data-date="${dateStr}" data-tid="${t.id}">
      <div class="cell-header-row">
        <span></span>
        ${constraintBtn}
      </div>
      <div class="unavail-center">
        <span class="unavail-pill ${cls}" ${pillStyle}>${AVAIL_LABEL[av]}</span>
      </div>
    </td>`;
  }

  // Partial presence hours badge
  const extra = (day.availExtra || {})[t.id] || {};
  const partialBadge = av === AVAIL.PARTIAL
    ? `<span class="partial-hours-pill" dir="ltr">${extra.fromHour || ''}${extra.toHour ? '–'+extra.toHour : ''}</span>` : '';

  const chips = asns.map(a => {
    const p = getPatient(a.pid);
    if (!p) return '';
    let chipStyle = '';
    if (p.primaryTherapist) {
      const pt = getTherapist(p.primaryTherapist);
      if (pt) chipStyle += `background:${pt.color}20;border-color:${pt.color}55;`;
    }
    if (p.treatmentsPerWeek && getWeekTreatmentCount(p.id, dateStr) !== p.treatmentsPerWeek) {
      chipStyle += 'box-shadow:0 0 0 1.5px #EF4444;';
    }
    const isDischargeDay = p.dischargeDate === dateStr;
    const badges = (a.letter || a.group || isDischargeDay) ? `<span class="chip-badges">
      ${isDischargeDay ? '<span class="chip-badge chip-badge-discharge">שחרור</span>' : ''}
      ${a.letter ? '<span class="chip-badge chip-badge-letter">מכתב</span>' : ''}
      ${a.group  ? '<span class="chip-badge chip-badge-group">קבוצתי</span>' : ''}
    </span>` : '';
    return `<span class="patient-chip"
                  ${canEdit() ? 'draggable="true"' : ''}
                  data-date="${dateStr}" data-tid="${t.id}" data-pid="${a.pid}"
                  ${canEdit() ? 'ondragstart="chipDragStart(event)" ondragend="chipDragEnd(event)"' : ''}
                  ${chipStyle ? `style="${chipStyle}"` : ''}>
      <span class="chip-name">${p.name}</span>${badges}
    </span>`;
  }).join('');

  const countCls = isOverLimit ? 'cell-count overload' : 'cell-count';
  const countEl  = `<span class="${countCls}" title="${isOverLimit ? `עומס! מקסימום ${max} מטופלים` : ''}">
    ${asns.length}/${max}${isOverLimit ? ' ⚠' : ''}
  </span>`;
  const dh = state.settings.departmentHour;
  const deptChip = (dh && dh.enabled && dow === dh.dayOfWeek)
    ? `<span class="patient-chip dept-hour-chip" style="background:${DEPT_HOUR_COLOR}18;border-color:${DEPT_HOUR_COLOR}55;color:${DEPT_HOUR_COLOR}">
        שעת מחלקה <span dir="ltr">${dh.fromTime}–${dh.toTime}</span>
      </span>` : '';

  const overloadCls = isOverLimit ? ' overload-cell' : '';
  return `<td class="day-cell${overloadCls}"
              data-date="${dateStr}" data-tid="${t.id}"
              ondragover="cellDragOver(event)"
              ondragleave="cellDragLeave(event)"
              ondrop="cellDrop(event)">
    <div class="cell-header-row">
      ${countEl}
      ${partialBadge}
      ${constraintBtn}
    </div>
    <div class="cell-patients">${deptChip}${chips}</div>
    ${cellFooter}
  </td>`;
}

function bindWeeklyEvents() {
  document.querySelectorAll('.patient-chip').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      openEditModal(el.dataset.date, el.dataset.tid, el.dataset.pid);
    });
  });

  document.querySelectorAll('.cell-add-btn').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      openAddModal(el.dataset.date, el.dataset.tid);
    });
  });

  document.querySelectorAll('.cell-constraint-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openConstraintModal(btn.dataset.date, btn.dataset.tid);
    });
  });
}

// ─── RENDER: DAILY VIEW ───────────────────────────────────────────────────────

function renderDailyView() {
  const ws    = weekStart(state.currentDate);
  const dates = weekDates(ws);
  const dateStr = fmtKey(dates[state.selectedDayIndex]);
  const day   = getDay(dateStr);

  document.getElementById('periodTitle').textContent =
    `יום ${DAY_NAMES_SHORT[state.selectedDayIndex]} – ${fmtDisplay(dates[state.selectedDayIndex])}/${dates[state.selectedDayIndex].getFullYear()}`;
  document.getElementById('statsBarContainer').innerHTML = renderStatsBar();

  const dayTotalPatients = state.therapists.reduce((sum, t) => {
    const av = day.availability[t.id] || AVAIL.AVAILABLE;
    if (av === AVAIL.VACATION || av === AVAIL.DAYOFF) return sum;
    return sum + (day.assignments[t.id] || []).length;
  }, 0);

  const tabs = `<div class="daily-day-tabs">
    ${dates.map((d, i) => `
      <button class="day-tab-btn ${i === state.selectedDayIndex ? 'active' : ''}" data-day="${i}">
        יום ${DAY_NAMES_SHORT[i]} ${fmtDisplay(d)}
      </button>`).join('')}
    <div class="daily-total-badge">סה״כ <span class="daily-total-num">${dayTotalPatients}</span> מטופלים</div>
  </div>`;

  const cards = state.therapists.map(t => {
    const av   = day.availability[t.id] || AVAIL.AVAILABLE;
    const asns = day.assignments[t.id]  || [];

    let body;
    if (av !== AVAIL.AVAILABLE && av !== AVAIL.PARTIAL && av !== AVAIL.SOROKA) {
      const opt = CONSTRAINT_OPTIONS.find(o => o.avail === av);
      const pillStyle = opt ? `style="background:${opt.color}20;color:${opt.color};border-color:${opt.color}40"` : '';
      const cls = { [AVAIL.VACATION]:'vacation', [AVAIL.DAYOFF]:'dayoff' }[av] || '';
      body = `<div class="empty-card"><span class="unavail-pill ${cls}" ${pillStyle}>${AVAIL_LABEL[av]}</span></div>`;
    } else {
      const rows = asns.map(a => {
        const p = getPatient(a.pid);
        if (!p) return '';
        const badges = [];
        if (p.dischargeDate === dateStr) badges.push(`<span class="mini-badge discharge">שחרור</span>`);
        if (a.letter) badges.push(`<span class="mini-badge">מכתב</span>`);
        if (a.group)  badges.push(`<span class="mini-badge">טיפול קבוצתי</span>`);
        let rowStyle = '';
        if (p.primaryTherapist) {
          const pt = getTherapist(p.primaryTherapist);
          if (pt) rowStyle += `background:${pt.color}15;border-color:${pt.color}45;`;
        }
        if (p.treatmentsPerWeek && getWeekTreatmentCount(p.id, dateStr) !== p.treatmentsPerWeek) {
          rowStyle += 'box-shadow:0 0 0 1.5px #EF4444;';
        }
        return `<div class="patient-row"
                     ${canEdit() ? 'draggable="true"' : ''}
                     data-date="${dateStr}" data-tid="${t.id}" data-pid="${a.pid}"
                     ${canEdit() ? 'ondragstart="chipDragStart(event)" ondragend="chipDragEnd(event)"' : ''}
                     ${rowStyle ? `style="${rowStyle}"` : ''}>
          <span class="patient-row-name">${p.name}</span>
          <div class="mini-badges">${badges.join('')}</div>
        </div>`;
      }).join('');

      const addBtn = canEdit() ? `<button class="card-add-btn" data-date="${dateStr}" data-tid="${t.id}">+ הוסף מטופל</button>` : '';
      body = asns.length
        ? rows + addBtn
        : `<div class="empty-card">אין מטופלים משובצים</div>${addBtn}`;
    }

    const max         = getMaxForTherapist(t.id);
    const isOverLimit = (av === AVAIL.AVAILABLE || av === AVAIL.PARTIAL) && asns.length > max;

    const cardOverloadCls = isOverLimit ? ' overload-card' : '';
    return `<div class="therapist-card${cardOverloadCls}" style="border-top-color:${t.color}"
                 data-date="${dateStr}" data-tid="${t.id}"
                 ondragover="cardDragOver(event)"
                 ondragleave="cardDragLeave(event)"
                 ondrop="cardDrop(event)">
      <div class="therapist-card-header" style="background:${t.color}18;border-bottom:1.5px solid ${t.color}44;">
        <div class="tc-header-main">
          <div class="tc-name" style="color:${t.color}">
            ${t.name}
          </div>
        </div>
        ${canEditConstraints(t.id) ? `<button class="card-constraint-btn" data-date="${dateStr}" data-tid="${t.id}" title="הגדר אילוץ">אילוצים</button>` : ''}
      </div>
      <div class="therapist-card-body">${body}</div>
    </div>`;
  }).join('');

  document.getElementById('dailyView').innerHTML = `
    ${tabs}
    <div class="daily-grid">${cards}</div>`;

  bindDailyEvents(dateStr);
}

function bindDailyEvents(dateStr) {
  document.querySelectorAll('.day-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedDayIndex = parseInt(btn.dataset.day);
      renderDailyView();
    });
  });

  document.querySelectorAll('.patient-row').forEach(row => {
    row.addEventListener('click', () => openEditModal(row.dataset.date, row.dataset.tid, row.dataset.pid));
  });

  document.querySelectorAll('.card-add-btn').forEach(btn => {
    btn.addEventListener('click', () => openAddModal(btn.dataset.date, btn.dataset.tid));
  });

  document.querySelectorAll('.card-constraint-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openConstraintModal(btn.dataset.date, btn.dataset.tid);
    });
  });
}

// ─── RENDER: MONTHLY VIEW ─────────────────────────────────────────────────────

function renderMonthlyView() {
  const year  = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth();

  document.getElementById('periodTitle').textContent = `${MONTH_NAMES[month]} ${year}`;

  const first = new Date(year, month, 1);
  const last  = new Date(year, month+1, 0);
  const pad   = first.getDay();

  const cells = [];
  for (let i=0; i<pad; i++) {
    const d = new Date(first); d.setDate(d.getDate()-(pad-i));
    cells.push({date:d, inMonth:false});
  }
  for (let d=1; d<=last.getDate(); d++) cells.push({date:new Date(year,month,d), inMonth:true});
  const rem = (7 - cells.length%7) % 7;
  for (let i=1; i<=rem; i++) cells.push({date:new Date(year,month+1,i), inMonth:false});

  const todayStr = fmtKey(new Date());

  const dayCells = cells.map(({date, inMonth}) => {
    const dateStr = fmtKey(date);
    const isToday = dateStr === todayStr;
    const dow     = date.getDay();
    const isWeekend = dow === 5 || dow === 6;
    const dayData = state.schedule[dateStr];

    let dots = '';
    let summary = '';
    if (dayData && inMonth) {
      const available = state.therapists.filter(t => dayData.availability[t.id] === AVAIL.AVAILABLE);
      dots = available.map(t => `<div class="month-dot" style="background:${t.color}" title="${t.name}"></div>`).join('');
      const totalPts = available.reduce((acc,t) => acc + (dayData.assignments[t.id]||[]).length, 0);
      if (totalPts > 0) summary = `<div class="month-summary">${totalPts} מטופלים</div>`;
    }

    const cls = [
      !inMonth ? 'other-month' : '',
      isToday  ? 'today'       : '',
      isWeekend? 'weekend'     : '',
    ].filter(Boolean).join(' ');

    return `<div class="month-day ${cls}" data-date="${dateStr}" onclick="gotoDay('${dateStr}')">
      <div class="month-day-num">${date.getDate()}</div>
      <div class="month-dots">${dots}</div>
      ${summary}
    </div>`;
  }).join('');

  document.getElementById('statsBarContainer').innerHTML = renderStatsBar();
  document.getElementById('monthlyView').innerHTML = `
    <div class="monthly-wrapper">
      <div class="month-grid">
        ${DOW_HE.map(d => `<div class="month-header-cell">${d}</div>`).join('')}
        ${dayCells}
      </div>
    </div>`;
}

window.gotoDay = function(dateStr) {
  state.currentDate = new Date(dateStr);
  const dow = state.currentDate.getDay();
  state.selectedDayIndex = dow === 0 ? 0 : Math.min(dow, 4);
  switchView('daily');
};

// ─── RENDER: LEGEND ───────────────────────────────────────────────────────────

function renderLegend() {
  const items = [
    { color:'#EFF6FF', text:'טיפול רגיל', border:'#BFDBFE' },
    { color:'#FEF2F2', text:'שחרור',       border:'#FECACA' },
    { color:'#FFFBEB', text:'מכתב',        border:'#FDE68A' },
    { color:'#ECFDF5', text:'קבוצה',       border:'#A7F3D0' },
    { color:'#F5F3FF', text:'ישב"צ',       border:'#DDD6FE' },
    { color:'#F1F5F9', text:'חופש',        border:'#94A3B8' },
    { color:'#EDE9FE', text:'סורוקה',      border:'#A78BFA' },
    { color:'#F0FDF4', text:'יום חופשי',   border:'#86EFAC' },
  ];
  return `<div class="legend-strip">
    ${items.map(i => `
      <div class="legend-item">
        <div class="legend-swatch" style="background:${i.color};border:1px solid ${i.border}"></div>
        ${i.text}
      </div>`).join('')}
  </div>`;
}

// ─── MODALS: ADD ASSIGNMENT ───────────────────────────────────────────────────

function openAddModal(dateStr, tid) {
  const therapist = getTherapist(tid);
  const day       = getDay(dateStr);
  const av        = day.availability[tid] || AVAIL.AVAILABLE;
  if (av === AVAIL.VACATION || av === AVAIL.DAYOFF) {
    const label = AVAIL_LABEL[av];
    document.getElementById('assignModalTitle').textContent = 'לא ניתן לשבץ';
    document.getElementById('assignModalBody').innerHTML = `
      <p style="text-align:center;padding:1rem 0;color:var(--text-muted);font-size:0.9rem">
        לא ניתן להוסיף מטופל ביום זה — ${therapist.name} ב${label}
      </p>
      <div class="modal-actions"><button class="btn btn-cancel" onclick="closeModal('assignModal')">סגור</button></div>`;
    showModal('assignModal');
    return;
  }
  const taken     = new Set((day.assignments[tid]||[]).map(a => a.pid));
  const available = state.patients.filter(p => !taken.has(p.id) && !p.dischargeDate);

  const [d,m] = [new Date(dateStr).getDate(), new Date(dateStr).getMonth()+1];

  const patientRow = p => {
    const pt = p.primaryTherapist ? getTherapist(p.primaryTherapist) : null;
    const color = pt ? pt.color : null;
    const rowStyle = color
      ? `style="background:${color}15;border-right:3px solid ${color};"`
      : '';
    const chips = [];
    if (p.primaryTherapist)   chips.push(`<span class="sp-pmeta-chip primary">ר׳ ${pt?.name || ''}</span>`);
    if (p.secondaryTherapist) chips.push(`<span class="sp-pmeta-chip secondary">מ׳ ${getTherapist(p.secondaryTherapist)?.name || ''}</span>`);
    if (p.treatmentsPerWeek)  chips.push(`<span class="sp-pmeta-chip tpw">${p.treatmentsPerWeek}×/שבוע</span>`);
    const meta = chips.length ? `<div class="sp-patient-meta">${chips.join('')}</div>` : '';
    return `<div class="add-pick-row" ${rowStyle} onclick="doAddDirect('${dateStr}','${tid}','${p.id}')">
      <span class="sp-item-name">${p.name}</span>
      ${meta}
    </div>`;
  };

  const listHtml = available.length
    ? available.map(patientRow).join('')
    : `<div style="text-align:center;color:var(--text-muted);padding:1rem;font-size:0.85rem">אין מטופלים זמינים לשיבוץ</div>`;

  document.getElementById('assignModalTitle').textContent = `הוסף מטופל — ${therapist.name} (${d}/${m})`;
  document.getElementById('assignModalBody').innerHTML = `
    <input type="text" class="sp-input" id="addPickSearch" placeholder="חיפוש מטופל..." oninput="filterAddPick(this.value)" style="margin-bottom:0.5rem">
    <div class="add-pick-list" id="addPickList">${listHtml}</div>
    <div class="modal-actions" style="margin-top:0.5rem">
      <button class="btn btn-cancel" onclick="closeModal('assignModal')">ביטול</button>
    </div>`;

  showModal('assignModal');
}

window.filterAddPick = function(q) {
  const rows = document.querySelectorAll('#addPickList .add-pick-row');
  const lq = q.trim().toLowerCase();
  rows.forEach(r => {
    const name = r.querySelector('.sp-item-name').textContent.toLowerCase();
    r.style.display = name.includes(lq) ? '' : 'none';
  });
};

window.doAddDirect = function(dateStr, tid, pid) {
  if (isPatientDischarged(pid)) { closeModal('assignModal'); showDischargeWarning(pid); return; }
  const day = ensureDay(dateStr);
  if (!day.assignments[tid]) day.assignments[tid] = [];
  day.assignments[tid].push({ pid, s: STATUS.TREATMENT });
  saveState();
  closeModal('assignModal');
  renderCurrentView();
  const newCount = day.assignments[tid].length;
  const max      = getMaxForTherapist(tid);
  if (newCount > max) {
    showOverloadToast(getTherapist(tid).name, newCount, max);
  } else {
    showToast(`${getPatient(pid).name} שובץ/ה`);
  }
  checkPatientWarning(pid);
};

// ─── MODALS: EDIT ASSIGNMENT ──────────────────────────────────────────────────

function openEditModal(dateStr, tid, pid) {
  const patient   = getPatient(pid);
  const therapist = getTherapist(tid);
  if (!patient || !therapist) return;
  const p   = patient;
  const day = getDay(dateStr);
  const asn = (day.assignments[tid] || []).find(a => a.pid === pid) || {};
  const [d,m] = [new Date(dateStr).getDate(), new Date(dateStr).getMonth()+1];

  document.getElementById('assignModalTitle').textContent = `${p.name} (${d}/${m})`;
  document.getElementById('assignModalBody').innerHTML = `
    <div class="form-group">
      <label>שם</label>
      <input type="text" id="editPName" value="${p.name}">
    </div>
    <div class="form-group">
      <label>מטפל ראשי</label>
      <select id="editPPrimary">${therapistOptions(p.primaryTherapist)}</select>
    </div>
    <div class="form-group">
      <label>מטפל משני</label>
      <select id="editPSecondary">${therapistOptions(p.secondaryTherapist)}</select>
    </div>
    <div class="form-group">
      <label>כמות טיפולים בשבוע</label>
      <select id="editPTPW">
        <option value="">לא מוגדר</option>
        ${[3,4,5].map(n => `<option value="${n}" ${p.treatmentsPerWeek === n ? 'selected' : ''}>${n}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label>תאריך שחרור <span style="font-weight:400;color:var(--text-muted)">(אופציונלי)</span></label>
      <input type="date" id="editPDischarge" value="${p.dischargeDate || ''}"
             onchange="this.blur()"
             style="padding:.5rem .75rem;border:1.5px solid var(--border);border-radius:8px;font-family:Heebo,sans-serif;font-size:.875rem;width:100%;box-sizing:border-box">
    </div>
    <div class="form-group" style="border-top:1px solid var(--border);padding-top:0.75rem;display:flex;gap:1.25rem">
      <label class="checkbox-label">
        <input type="checkbox" id="editAsnLetter" ${asn.letter ? 'checked' : ''}>
        ✉ מכתב שחרור
      </label>
      <label class="checkbox-label">
        <input type="checkbox" id="editAsnGroup" ${asn.group ? 'checked' : ''}>
        👥 טיפול קבוצתי
      </label>
    </div>
    <div class="modal-actions">
      <button class="btn btn-primary" onclick="doSavePatientFromCalendar('${dateStr}','${tid}','${pid}')">שמור</button>
      <button class="btn btn-danger"  onclick="doRemove('${dateStr}','${tid}','${pid}')">הסר</button>
      <button class="btn btn-cancel"  onclick="closeModal('assignModal')">ביטול</button>
    </div>`;

  showModal('assignModal');
}

window.doSavePatientFromCalendar = function(dateStr, tid, pid) {
  const p = getPatient(pid);
  if (!p) return;
  const name = document.getElementById('editPName').value.trim();
  if (!name) { showToast('שם לא יכול להיות ריק'); return; }
  p.name               = name;
  p.primaryTherapist   = document.getElementById('editPPrimary').value   || null;
  p.secondaryTherapist = document.getElementById('editPSecondary').value || null;
  const tpwRaw = document.getElementById('editPTPW').value;
  p.treatmentsPerWeek  = tpwRaw ? parseInt(tpwRaw) : null;
  p.dischargeDate      = document.getElementById('editPDischarge').value || null;
  removeAssignmentsAfterDischarge(pid, p.dischargeDate);
  // Save per-assignment flags
  const dayObj = ensureDay(dateStr);
  const asnObj = (dayObj.assignments[tid] || []).find(a => a.pid === pid);
  if (asnObj) {
    asnObj.letter = document.getElementById('editAsnLetter')?.checked || false;
    asnObj.group  = document.getElementById('editAsnGroup')?.checked  || false;
  }
  saveState();
  closeModal('assignModal');
  if (state.activePanel === 'patients') renderPanelContent('patients');
  renderCurrentView();
  showToast('פרטי מטופל עודכנו');
};

window.doSave = function(dateStr, tid, pid) {
  const status = document.getElementById('modalStatus').value;
  const group  = document.getElementById('modalGroup').checked;

  const day = ensureDay(dateStr);
  const idx = (day.assignments[tid]||[]).findIndex(a => a.pid === pid);
  if (idx >= 0) day.assignments[tid][idx].s = status;

  if (!day.groups) day.groups = [];
  if (group && !day.groups.includes(pid)) {
    day.groups.push(pid);
  } else if (!group) {
    day.groups = day.groups.filter(id => id !== pid);
  }

  saveState();
  closeModal('assignModal');
  renderCurrentView();
  showToast('שמור בהצלחה');
};

window.doRemove = function(dateStr, tid, pid) {
  const day = ensureDay(dateStr);
  day.assignments[tid] = (day.assignments[tid]||[]).filter(a => a.pid !== pid);
  day.groups = (day.groups||[]).filter(id => id !== pid);

  saveState();
  closeModal('assignModal');
  renderCurrentView();
  showToast(`${getPatient(pid).name} הוסר/ה`);
  checkPatientWarning(pid);
};

// ─── MODALS: AVAILABILITY ─────────────────────────────────────────────────────

window.openTherapistPatients = function(tid) {
  const t = getTherapist(tid);
  if (!t) return;

  const primary   = state.patients.filter(p => p.primaryTherapist   === tid);
  const secondary = state.patients.filter(p => p.secondaryTherapist === tid);

  const patientRow = p => `
    <div class="tp-patient-row" onclick="openEditPatientModalFromTP('${p.id}','${tid}')" title="ערוך מטופל">
      <span class="tp-patient-name">${p.name}</span>
      ${p.dischargeDate    ? `<span class="sp-pmeta-chip discharge" style="font-size:0.6rem">שחרור ${fmtDateHe(p.dischargeDate)}</span>` : ''}
      ${p.treatmentsPerWeek ? `<span class="sp-pmeta-chip tpw" style="font-size:0.6rem">${p.treatmentsPerWeek}×/שבוע</span>` : ''}
    </div>`;

  const col = (title, list, color, bg) => `
    <div class="tp-col" style="background:${bg};border:1.5px solid ${color}30">
      <div class="tp-col-header" style="color:${color};border-bottom:2px solid ${color}30">
        <span class="tp-col-title">${title}</span>
        <span class="tp-col-count" style="background:${color}20;color:${color}">${list.length}</span>
      </div>
      <div class="tp-col-body">
        ${list.length ? list.map(patientRow).join('') : `<div class="tp-empty">אין מטופלים</div>`}
      </div>
    </div>`;

  document.getElementById('assignModalTitle').textContent = `מטופלים — ${t.name}`;
  document.getElementById('assignModalBody').innerHTML = `
    <div class="tp-patient-select-row">
      <select class="sp-input" id="tpPatientJump" onchange="if(this.value) openEditPatientModalFromTP(this.value,'${tid}')" style="flex:1">
        <option value="">בחר מטופל מהרשימה...</option>
        ${state.patients.map(p => `<option value="${p.id}">${p.name}${p.dischargeDate ? ' (שחרור)' : ''}</option>`).join('')}
      </select>
    </div>
    <div class="tp-cols">
      ${col('מטופלים ראשיים', primary,   '#2563EB', '#EFF6FF')}
      ${col('מטופלים משניים', secondary, '#7C3AED', '#F5F3FF')}
    </div>
    <div class="modal-actions" style="margin-top:0.75rem">
      <button class="btn btn-cancel" onclick="closeModal('assignModal')">סגור</button>
    </div>`;
  showModal('assignModal');
};

function openConstraintModal(dateStr, tid) {
  const t   = getTherapist(tid);
  if (!t) return;
  const day      = getDay(dateStr);
  const curAvail = day.availability[tid] || AVAIL.AVAILABLE;
  const extra    = (day.availExtra || {})[tid] || {};
  const date     = new Date(dateStr);
  const dayLabel = DAY_NAMES_FULL[date.getDay()] || '';

  document.getElementById('assignModalTitle').textContent =
    `אילוץ — ${t.name} / ${dayLabel} ${fmtDisplay(date)}`;

  document.getElementById('assignModalBody').innerHTML = `
    <div class="form-group">
      <label>סוג אילוץ</label>
      <div class="constraint-type-grid">
        ${CONSTRAINT_OPTIONS.map(opt => `
          <button class="constraint-type-btn ${curAvail === opt.avail ? 'selected' : ''}"
                  style="--c-color:${opt.color}"
                  data-avail="${opt.avail}"
                  onclick="selectConstraintType(this)">
            <span class="ct-dot" style="background:${opt.color}"></span>
            ${opt.label}
          </button>`).join('')}
      </div>
    </div>

    <div class="form-group" id="partialHoursGroup" style="${curAvail === AVAIL.PARTIAL ? '' : 'display:none'}">
      <label>שעות נוכחות במחלקה</label>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <input type="time" id="cFromHour" value="${extra.fromHour || '08:00'}" class="sp-input" style="flex:1">
        <span style="color:var(--text-muted);font-size:0.85rem">עד</span>
        <input type="time" id="cToHour"   value="${extra.toHour   || '14:00'}" class="sp-input" style="flex:1">
      </div>
    </div>

    <div class="form-group">
      <label>חזרה</label>
      <div class="recurrence-opts">
        <label class="recurrence-opt"><input type="radio" name="rec" value="none" checked onchange="toggleUntilDate(this)"> ללא חזרה</label>
        <label class="recurrence-opt"><input type="radio" name="rec" value="weekly"       onchange="toggleUntilDate(this)"> שבועי (אותו יום בשבוע)</label>
        <label class="recurrence-opt"><input type="radio" name="rec" value="daily"        onchange="toggleUntilDate(this)"> יומי</label>
        <label class="recurrence-opt"><input type="radio" name="rec" value="until"        onchange="toggleUntilDate(this)"> התאמה אישית — עד תאריך</label>
      </div>
      <div id="untilDateWrap" style="display:none;margin-top:0.5rem">
        <input type="date" id="cUntilDate" class="sp-input" min="${dateStr}">
      </div>
    </div>

    <div class="modal-actions">
      <button class="btn btn-primary" onclick="applyConstraint('${dateStr}','${tid}')">הגדר</button>
      <button class="btn" ${curAvail === AVAIL.AVAILABLE ? 'disabled style="background:#F1F5F9;color:#CBD5E1;border:1px solid #E2E8F0;cursor:not-allowed"' : 'style="background:#FEF2F2;color:#991B1B;border:1px solid #FECACA" onclick="removeConstraint(\''+dateStr+'\',\''+tid+'\')"'}>הסר אילוץ</button>
      <button class="btn btn-cancel" onclick="closeModal('assignModal')">ביטול</button>
    </div>`;

  showModal('assignModal');
}

// Keep legacy alias
function openAvailModal(dateStr, tid) { openConstraintModal(dateStr, tid); }

window.selectConstraintType = function(btn) {
  btn.closest('.constraint-type-grid').querySelectorAll('.constraint-type-btn')
    .forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  const group = document.getElementById('partialHoursGroup');
  if (group) group.style.display = btn.dataset.avail === AVAIL.PARTIAL ? '' : 'none';
};

window.toggleUntilDate = function(radio) {
  const wrap = document.getElementById('untilDateWrap');
  if (wrap) wrap.style.display = (radio.value === 'until' && radio.checked) ? '' : 'none';
};

function generateConstraintDates(startDate, recurrence, untilDate) {
  if (recurrence === 'none') return [startDate];
  const start = new Date(startDate + 'T00:00:00');
  const dow   = start.getDay();
  const end   = (recurrence === 'until' && untilDate)
    ? new Date(untilDate + 'T00:00:00')
    : new Date(start.getFullYear(), start.getMonth() + 6, start.getDate());
  const dates = [];
  const cur   = new Date(start);
  while (cur <= end) {
    if (recurrence === 'daily' || cur.getDay() === dow) dates.push(fmtKey(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
}

window.applyConstraint = function(dateStr, tid) {
  const selectedBtn = document.querySelector('.constraint-type-btn.selected');
  if (!selectedBtn) { showToast('בחר סוג אילוץ'); return; }
  const avail      = selectedBtn.dataset.avail;
  const recurrence = document.querySelector('input[name="rec"]:checked')?.value || 'none';
  const untilDate  = document.getElementById('cUntilDate')?.value || '';
  const fromHour   = document.getElementById('cFromHour')?.value  || '';
  const toHour     = document.getElementById('cToHour')?.value    || '';
  const blocks     = CONSTRAINT_OPTIONS.find(o => o.avail === avail)?.blocks ?? true;
  const dates      = generateConstraintDates(dateStr, recurrence, untilDate);

  if (blocks) {
    const blockedDates = dates.filter(ds => (getDay(ds).assignments[tid] || []).length > 0);
    if (blockedDates.length > 0) {
      showToast('יש מטופלים משובצים באותו מועד, לא ניתן להגדיר את האילוץ');
      return;
    }
  }

  dates.forEach(ds => {
    const day = ensureDay(ds);
    day.availability[tid] = avail;
    if (!day.availExtra) day.availExtra = {};
    if (avail === AVAIL.PARTIAL) {
      day.availExtra[tid] = { fromHour, toHour };
    } else {
      delete day.availExtra[tid];
    }
    if (blocks) day.assignments[tid] = [];
  });

  saveState(); closeModal('assignModal'); renderCurrentView();
  if (state.activePanel === 'therapists') renderPanelContent('therapists');
  showToast(`אילוץ הוגדר ל-${dates.length} ${dates.length === 1 ? 'יום' : 'ימים'}`);
};

window.removeConstraint = function(dateStr, tid) {
  const day = ensureDay(dateStr);
  day.availability[tid] = AVAIL.AVAILABLE;
  if (day.availExtra) delete day.availExtra[tid];
  saveState(); closeModal('assignModal'); renderCurrentView();
  if (state.activePanel === 'therapists') renderPanelContent('therapists');
  showToast('אילוץ הוסר');
};

// openSettingsModal redirects to the new panel system
function openSettingsModal(tab = 'therapists') { openPanel(tab); }

window.deleteTherapist = function(tid) {
  const t = getTherapist(tid);
  if (!t) return;
  if (!confirm(`למחוק את ${t.name}?\nהמטפל יוסר מכל השיבוצים הקיימים.`)) return;
  state.therapists = state.therapists.filter(th => th.id !== tid);
  Object.values(state.schedule).forEach(day => {
    delete day.availability[tid];
    delete day.assignments[tid];
  });
  saveState();
  if (state.activePanel === 'therapists') renderPanelContent('therapists');
  renderCurrentView();
  showToast(`${t.name} נמחק/ה`);
};

window.deletePatient = function(pid) {
  const p = getPatient(pid);
  if (!p) return;
  if (!confirm(`למחוק את ${p.name}?\nהמטופל יוסר מכל השיבוצים הקיימים.`)) return;
  state.patients = state.patients.filter(pt => pt.id !== pid);
  Object.values(state.schedule).forEach(day => {
    Object.keys(day.assignments).forEach(tid => {
      day.assignments[tid] = (day.assignments[tid]||[]).filter(a => a.pid !== pid);
    });
    day.groups     = (day.groups||[]).filter(id => id !== pid);
    day.discharges = (day.discharges||[]).filter(id => id !== pid);
  });
  saveState();
  if (state.activePanel === 'patients') renderPanelContent('patients');
  renderCurrentView();
  showToast(`${p.name} נמחק/ה`);
};

// ─── MODALS: CONSTRAINTS ──────────────────────────────────────────────────────

window.openConstraintsModal = function(tid) {
  const t = getTherapist(tid);
  if (!t) return;
  const c = t.constraints || { maxPerDay: null, blockedDays: [], specialties: '', notes: '' };

  document.getElementById('assignModalTitle').textContent = `אילוצים אישיים — ${t.name}`;
  document.getElementById('assignModalBody').innerHTML = `
    <div class="form-group">
      <label>מקסימום מטופלים ביום</label>
      <div style="display:flex;align-items:center;gap:.75rem">
        <input type="number" id="cMaxPerDay" min="1" max="20" value="${c.maxPerDay || ''}"
               placeholder="ללא הגבלה" style="width:120px;padding:.5rem .75rem;border:1.5px solid var(--border);border-radius:8px;font-family:Heebo,sans-serif;font-size:.875rem;direction:ltr">
        <span style="font-size:.8rem;color:var(--text-muted)">ריק = ללא הגבלה</span>
      </div>
    </div>

    <div class="form-group">
      <label>ימים חסומים (חוזר שבועי)</label>
      <div class="day-check-grid">
        ${[0,1,2,3,4].map(d => `
          <label class="day-check-label">
            <input type="checkbox" class="day-check" value="${d}" ${(c.blockedDays||[]).includes(d) ? 'checked' : ''}>
            <span class="day-check-box">יום ${DAY_NAMES_SHORT[d]}</span>
          </label>`).join('')}
      </div>
      <p class="constraint-hint-text">ימים חסומים מסומנים בצהוב בלוח השיבוצים כאזהרה</p>
    </div>

    <div class="form-group">
      <label>התמחות / קבוצת מטופלים</label>
      <input type="text" id="cSpecialties" value="${c.specialties || ''}"
             placeholder="לדוגמה: נוירולוגי, אורטופדי, ילדים...">
    </div>

    <div class="form-group">
      <label>הערות ואילוצים נוספים</label>
      <textarea id="cNotes" placeholder="הזן אילוצים, העדפות, מגבלות...">${c.notes || ''}</textarea>
    </div>

    <div class="modal-actions">
      <button class="btn btn-primary" onclick="saveConstraints('${tid}')">שמור אילוצים</button>
      <button class="btn btn-cancel"  onclick="closeModal('assignModal')">ביטול</button>
    </div>`;

  showModal('assignModal');
};

window.saveConstraints = function(tid) {
  const t = getTherapist(tid);
  if (!t) return;
  const maxRaw  = document.getElementById('cMaxPerDay').value.trim();
  const blocked = [...document.querySelectorAll('.day-check:checked')].map(cb => parseInt(cb.value));
  const specs   = document.getElementById('cSpecialties').value.trim();
  const notes   = document.getElementById('cNotes').value.trim();

  t.constraints = {
    maxPerDay:   maxRaw ? parseInt(maxRaw) : null,
    blockedDays: blocked,
    specialties: specs,
    notes,
  };

  saveState();
  closeModal('assignModal');
  if (state.activePanel === 'therapists') renderPanelContent('therapists');
  renderCurrentView();
  showToast(`אילוצי ${t.name} נשמרו`);
};

// ─── EDIT PATIENT (inline modal) ─────────────────────────────────────────────

window.openEditPatientModalFromTP = function(pid, tid) {
  window._tpReturnTid = tid;
  openEditPatientModal(pid);
};

window.openEditPatientModal = function(pid) {
  const p = getPatient(pid);
  if (!p) return;
  document.getElementById('assignModalTitle').textContent = `עריכת מטופל — ${p.name}`;
  document.getElementById('assignModalBody').innerHTML = `
    <div class="form-group">
      <label>שם</label>
      <input type="text" id="editPName" value="${p.name}">
    </div>
    <div class="form-group">
      <label>מטפל ראשי</label>
      <select id="editPPrimary">${therapistOptions(p.primaryTherapist)}</select>
    </div>
    <div class="form-group">
      <label>מטפל משני</label>
      <select id="editPSecondary">${therapistOptions(p.secondaryTherapist)}</select>
    </div>
    <div class="form-group">
      <label>כמות טיפולים בשבוע</label>
      <select id="editPTPW">
        <option value="">לא מוגדר</option>
        ${[3,4,5].map(n => `<option value="${n}" ${p.treatmentsPerWeek === n ? 'selected' : ''}>${n}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label>תאריך שחרור <span style="font-weight:400;color:var(--text-muted)">(אופציונלי)</span></label>
      <input type="date" id="editPDischarge" value="${p.dischargeDate || ''}"
             onchange="this.blur()"
             style="padding:.5rem .75rem;border:1.5px solid var(--border);border-radius:8px;font-family:Heebo,sans-serif;font-size:.875rem;width:100%;box-sizing:border-box">
    </div>
    <div class="modal-actions">
      <button class="btn btn-primary" onclick="savePatientEdit('${pid}')">שמור</button>
      <button class="btn btn-cancel"  onclick="closeModal('assignModal')">ביטול</button>
    </div>`;
  showModal('assignModal');
};

window.savePatientEdit = function(pid) {
  const p = getPatient(pid);
  if (!p) return;
  const name = document.getElementById('editPName').value.trim();
  if (!name) { showToast('שם לא יכול להיות ריק'); return; }
  p.name               = name;
  p.primaryTherapist   = document.getElementById('editPPrimary').value   || null;
  p.secondaryTherapist = document.getElementById('editPSecondary').value || null;
  const tpwRaw = document.getElementById('editPTPW').value;
  p.treatmentsPerWeek  = tpwRaw ? parseInt(tpwRaw) : null;
  p.dischargeDate      = document.getElementById('editPDischarge').value || null;
  removeAssignmentsAfterDischarge(pid, p.dischargeDate);
  saveState();
  if (state.activePanel === 'patients') renderPanelContent('patients');
  renderCurrentView();
  showToast('פרטי מטופל עודכנו');
  const returnTid = window._tpReturnTid;
  window._tpReturnTid = null;
  if (returnTid) {
    openTherapistPatients(returnTid);
  } else {
    closeModal('assignModal');
  }
};

// ─── PANEL MANAGEMENT ────────────────────────────────────────────────────────

state.activePanel = null;

function openPanel(type) {
  state.activePanel = type;
  renderPanelContent(type);
  document.getElementById('sidePanel').classList.add('open');
  document.getElementById('panelBackdrop').classList.add('show');
  document.querySelectorAll('.panel-trigger').forEach(b => {
    b.classList.toggle('active', b.dataset.panel === type);
  });
}

function closePanel() {
  state.activePanel = null;
  document.getElementById('sidePanel').classList.remove('open');
  document.getElementById('panelBackdrop').classList.remove('show');
  document.querySelectorAll('.panel-trigger').forEach(b => b.classList.remove('active'));
}

function renderPanelContent(type) {
  const isOptions = type === 'options';
  const spTabsEl  = document.querySelector('.sp-tabs');
  if (spTabsEl) spTabsEl.style.display = isOptions ? 'none' : '';

  document.querySelectorAll('.sp-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.panel === type);
  });

  const body = document.getElementById('spBody');
  if (type === 'therapists') body.innerHTML = buildTherapistsPanel();
  else if (type === 'patients') { body.innerHTML = buildPatientsPanel(); }
  else if (type === 'options') {
    body.innerHTML = buildOptionsPanel();
    if (isAdmin() && _db) setTimeout(() => _renderUserManagement(), 0);
  }
}

function buildTherapistsPanel() {
  const ws    = weekStart(state.currentDate);
  const dates = weekDates(ws);

  const rows = state.therapists.map(t => {
    const c              = t.constraints || {};
    const primaryCount   = state.patients.filter(p => p.primaryTherapist   === t.id).length;
    const secondaryCount = state.patients.filter(p => p.secondaryTherapist === t.id).length;

    const dayBtns = dates.map((date, i) => {
      const dateStr = fmtKey(date);
      const day     = getDay(dateStr);
      const av      = day.availability[t.id] || AVAIL.AVAILABLE;
      const opt     = CONSTRAINT_OPTIONS.find(o => o.avail === av);
      const btnStyle = opt ? `background:${opt.color}20;color:${opt.color};border-color:${opt.color}55` : '';
      return `<button class="sp-day-btn${opt ? ' has-con' : ''}"
                      style="${btnStyle}"
                      onclick="openConstraintModal('${dateStr}','${t.id}')"
                      title="${opt ? opt.label : 'לחץ להגדרת אילוץ'}">
        ${DAY_NAMES_SHORT[i]}${opt ? `<span class="sp-day-con-label">${opt.label}</span>` : ''}
      </button>`;
    }).join('');

    return `<div class="sp-item sp-therapist-item" style="background:${t.color}18;border:1.5px solid ${t.color}44;">
      <div class="sp-item-info" style="flex:1;min-width:0">
        <div class="sp-therapist-name-row">
          <span class="sp-item-name" style="color:${t.color}">${t.name}</span>
          <span class="sp-count-chips">
            ${primaryCount   > 0 ? `<span class="sp-count-chip primary">${primaryCount} ראשי</span>`     : ''}
            ${secondaryCount > 0 ? `<span class="sp-count-chip secondary">${secondaryCount} משני</span>` : ''}
          </span>
        </div>
        <div class="sp-max-row">
          <span class="sp-max-label">מקס׳/יום</span>
          <input type="number" class="sp-max-input" min="1" max="20"
                 value="${getMaxForTherapist(t.id)}"
                 oninput="updateMaxPerDay('${t.id}',this.value)">
          <button class="sp-max-reset" data-tid="${t.id}"
                  onclick="resetMaxPerDay('${t.id}')" title="חזרה לערך ברירת המחדל">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
            </svg>
          </button>
        </div>
        <div class="sp-week-days">${dayBtns}</div>
      </div>
      ${isAdmin() ? `<button class="sp-btn danger" onclick="deleteTherapist('${t.id}')" title="מחק מטפל">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6m4-6v6"/><path d="M9 6V4h6v2"/></svg>
      </button>` : ''}
    </div>`;
  }).join('');

  return `<div class="sp-list">${rows}</div>
    ${isAdmin() ? `<div class="sp-add-section">
      <div class="sp-add-title">הוסף מטפל חדש</div>
      <div class="sp-inline-row">
        <input type="text" id="panelNewTherapist" placeholder="שם המטפל" class="sp-input">
        <button class="sp-add-btn" onclick="addTherapistFromPanel()">הוסף</button>
      </div>
    </div>` : ''}`;
}

window.updateMaxPerDay = function(tid, val) {
  const t = getTherapist(tid);
  if (!t) return;
  if (!t.constraints) t.constraints = { maxPerDay: null, blockedDays: [], specialties: '', notes: '' };
  t.constraints.maxPerDay = val && parseInt(val) > 0 ? parseInt(val) : null;
  saveState();
  clearTimeout(window._maxRefreshTimer);
  window._maxRefreshTimer = setTimeout(renderCurrentView, 400);
};

window.resetMaxPerDay = function(tid) {
  const t = getTherapist(tid);
  if (!t) return;
  if (!t.constraints) t.constraints = { maxPerDay: null, blockedDays: [], specialties: '', notes: '' };
  t.constraints.maxPerDay = null;
  saveState();
  if (state.activePanel === 'therapists') renderPanelContent('therapists');
  renderCurrentView();
};

function buildPatientsPanel() {
  const rows = state.patients.map(p => {
    const pt = p.primaryTherapist ? getTherapist(p.primaryTherapist) : null;
    const colorStyle = pt ? `border-right:3px solid ${pt.color};background:${pt.color}10;` : '';
    return `
    <div class="sp-item sp-patient-item" data-pid="${p.id}" style="${colorStyle}">
      <div class="sp-item-info" style="flex:1;min-width:0">
        <div class="sp-item-name">${p.name}${p.room ? ` <span style="font-size:0.7rem;font-weight:500;color:var(--text-muted)">חדר ${p.room}</span>` : ''}</div>
        ${(() => {
          const chips = [];
          if (p.dischargeDate)      chips.push(`<span class="sp-pmeta-chip discharge">שחרור ${fmtDateHe(p.dischargeDate)}</span>`);
          if (p.primaryTherapist)   chips.push(`<span class="sp-pmeta-chip primary">ר׳ ${getTherapist(p.primaryTherapist)?.name || ''}</span>`);
          if (p.secondaryTherapist) chips.push(`<span class="sp-pmeta-chip secondary">מ׳ ${getTherapist(p.secondaryTherapist)?.name || ''}</span>`);
          if (p.treatmentsPerWeek)  chips.push(`<span class="sp-pmeta-chip tpw">${p.treatmentsPerWeek}×/שבוע</span>`);
          return chips.length ? `<div class="sp-patient-meta">${chips.join('')}</div>` : '';
        })()}
      </div>
      <div class="sp-item-actions">
        ${canEditPatients() ? `<button class="sp-btn" onclick="openEditPatientModal('${p.id}')" title="ערוך">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>` : ''}
        ${isAdmin() ? `<button class="sp-btn danger" onclick="deletePatient('${p.id}')" title="מחק">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6m4-6v6"/><path d="M9 6V4h6v2"/></svg>
        </button>` : ''}
      </div>
    </div>`;
  }).join('');

  return `<div class="sp-list" id="patientsPanelList">${rows}</div>
    ${canEditPatients() ? `<div class="sp-add-section">
      <div class="sp-add-title">הוסף מטופל חדש</div>
      <label class="sp-field-label">שם מטופל</label>
      <input type="text" id="panelNewPatientName" placeholder="הכנס שם" class="sp-input" style="margin-bottom:.6rem">
      <label class="sp-field-label">מטפל ראשי</label>
      <select id="panelNewPatientPrimary" class="sp-input" style="margin-bottom:.6rem">
        <option value="">— ללא —</option>
        ${state.therapists.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
      </select>
      <label class="sp-field-label">מטפל משני</label>
      <select id="panelNewPatientSecondary" class="sp-input" style="margin-bottom:.6rem">
        <option value="">— ללא —</option>
        ${state.therapists.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
      </select>
      <label class="sp-field-label">כמות טיפולים שבועי</label>
      <select id="panelNewPatientTPW" class="sp-input" style="margin-bottom:.6rem">
        <option value="">לא מוגדר</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <label style="font-size:0.72rem;font-weight:700;color:var(--text-muted);margin-bottom:2px;display:block">תאריך שחרור (אופציונלי)</label>
      <input type="date" id="panelNewPatientDischarge" class="sp-input" onchange="this.blur()" style="margin-bottom:.4rem">
      <button class="sp-add-btn" onclick="addPatientFromPanel()">הוסף מטופל</button>
    </div>` : ''}`;
}

function buildOptionsPanel() {
  return `
    ${isAdmin() ? `<div class="sp-add-section" style="border-bottom:1px solid var(--border);padding-bottom:1rem;margin-bottom:0">
      <label style="display:block;font-size:0.82rem;font-weight:700;color:var(--text-mid);margin-bottom:0.5rem">
        מגבלת מטופלים יומית (ברירת מחדל)
      </label>
      <div class="sp-inline-row" style="margin-bottom:0.5rem">
        <input type="number" id="globalMaxPerDay" min="1" max="30"
               value="${state.settings.maxPatientsPerDay}" class="sp-input" style="width:80px">
        <button class="sp-add-btn" onclick="saveGlobalSettings()">שמור</button>
      </div>
      <div style="font-size:0.7rem;color:var(--text-muted);line-height:1.5">
        ניתן לקבוע מגבלה אישית לכל מטפל דרך פאנל המטפלים.<br>
        המגבלה האישית מבטלת את ברירת המחדל.
      </div>
    </div>` : ''}

    ${isAdmin() ? `<div class="sp-add-section" style="border-bottom:1px solid var(--border);padding-bottom:1rem">
      <label style="display:block;font-size:0.82rem;font-weight:700;color:var(--text-mid);margin-bottom:0.5rem">
        שעת מחלקה
      </label>
      <label class="sp-field-label">יום בשבוע</label>
      <div class="sp-week-days" style="margin-bottom:0.6rem">
        ${DAY_NAMES_SHORT.map((name, i) => `
          <button class="sp-day-btn ${state.settings.departmentHour?.dayOfWeek === i ? 'active' : ''}"
                  onclick="selectDeptDay(${i}, this)">${name}</button>`).join('')}
      </div>
      <label class="sp-field-label">שעות</label>
      <div style="display:flex;align-items:center;gap:0.4rem;margin-bottom:0.6rem;direction:ltr">
        <input type="time" id="deptHourFrom" value="${state.settings.departmentHour?.fromTime || '12:00'}" class="sp-input" style="flex:1">
        <span style="color:var(--text-muted);font-size:0.8rem">–</span>
        <input type="time" id="deptHourTo"   value="${state.settings.departmentHour?.toTime   || '13:00'}" class="sp-input" style="flex:1">
      </div>
      <button class="sp-add-btn" onclick="saveDepartmentHour()">שמור</button>
    </div>` : ''}

    ${isAdmin() ? `<div class="sp-add-section" style="border-bottom:1px solid var(--border);padding-bottom:1rem">
      <div class="sp-add-title">הוסף מטפל חדש</div>
      <div class="sp-inline-row">
        <input type="text" id="optionsNewTherapist" placeholder="שם המטפל" class="sp-input">
        <button class="sp-add-btn" onclick="addTherapistFromOptions()">הוסף</button>
      </div>
    </div>` : ''}

    ${canEditPatients() ? `<div class="sp-add-section" style="border-bottom:1px solid var(--border);padding-bottom:1rem">
      <div class="sp-add-title">הוסף מטופל חדש</div>
      <label class="sp-field-label">שם מטופל</label>
      <input type="text" id="optionsNewPatientName" placeholder="הכנס שם" class="sp-input" style="margin-bottom:.6rem">
      <label class="sp-field-label">מטפל ראשי</label>
      <select id="optionsNewPatientPrimary" class="sp-input" style="margin-bottom:.6rem">
        <option value="">— ללא —</option>
        ${state.therapists.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
      </select>
      <label class="sp-field-label">מטפל משני</label>
      <select id="optionsNewPatientSecondary" class="sp-input" style="margin-bottom:.6rem">
        <option value="">— ללא —</option>
        ${state.therapists.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
      </select>
      <label class="sp-field-label">כמות טיפולים שבועי</label>
      <select id="optionsNewPatientTPW" class="sp-input" style="margin-bottom:.6rem">
        <option value="">לא מוגדר</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button class="sp-add-btn" onclick="addPatientFromOptions()">הוסף מטופל</button>
    </div>` : ''}

    ${(isAdmin() && _db) ? `<div class="sp-add-section" id="userMgmtSection">
      <div class="sp-add-title">הרשאות משתמשים</div>
      <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:0.6rem;line-height:1.5">
        מנהל — גישה מלאה &nbsp;·&nbsp; עורך — עריכת שיבוצים &nbsp;·&nbsp; צפייה — קריאה בלבד
      </div>
      <div id="userMgmtContent"><div style="color:var(--text-muted);font-size:0.8rem">טוען...</div></div>
    </div>` : ''}`;
}

window.addTherapistFromOptions = function() {
  const name = document.getElementById('optionsNewTherapist').value.trim();
  if (!name) { showToast('הכנס שם מטפל'); return; }
  const colors = ['#06B6D4','#84CC16','#F97316','#14B8A6','#A855F7','#F43F5E'];
  const color  = colors[state.therapists.length % colors.length];
  state.therapists.push({ id: 't' + Date.now(), name, color, constraints: { maxPerDay: null, blockedDays: [], specialties: '', notes: '' } });
  saveState();
  renderPanelContent('options');
  renderCurrentView();
  showToast(`${name} נוסף/ה`);
};

window.addPatientFromOptions = function() {
  const name = document.getElementById('optionsNewPatientName').value.trim();
  if (!name) { showToast('הכנס שם מטופל'); return; }
  const primaryTherapist   = document.getElementById('optionsNewPatientPrimary').value   || null;
  const secondaryTherapist = document.getElementById('optionsNewPatientSecondary').value || null;
  const tpwRaw             = document.getElementById('optionsNewPatientTPW').value;
  const treatmentsPerWeek  = tpwRaw ? parseInt(tpwRaw) : null;
  state.patients.push({ id: 'p' + Date.now(), name, room: '', primaryTherapist, secondaryTherapist, treatmentsPerWeek, dischargeDate: null });
  saveState();
  renderPanelContent('options');
  showToast(`${name} נוסף/ה`);
};

window.addTherapistFromPanel = function() {
  const name = document.getElementById('panelNewTherapist').value.trim();
  if (!name) { showToast('הכנס שם מטפל'); return; }
  const colors = ['#06B6D4','#84CC16','#F97316','#14B8A6','#A855F7','#F43F5E'];
  const color  = colors[state.therapists.length % colors.length];
  state.therapists.push({ id: 't' + Date.now(), name, color, constraints: { maxPerDay: null, blockedDays: [], specialties: '', notes: '' } });
  saveState();
  renderPanelContent('therapists');
  renderCurrentView();
  showToast(`${name} נוסף/ה`);
};

window.addPatientFromPanel = function() {
  const name = document.getElementById('panelNewPatientName').value.trim();
  if (!name) { showToast('הכנס שם מטופל'); return; }
  const primaryTherapist   = document.getElementById('panelNewPatientPrimary').value   || null;
  const secondaryTherapist = document.getElementById('panelNewPatientSecondary').value || null;
  const tpwRaw             = document.getElementById('panelNewPatientTPW').value;
  const treatmentsPerWeek  = tpwRaw ? parseInt(tpwRaw) : null;
  const dischargeDate      = document.getElementById('panelNewPatientDischarge').value || null;
  state.patients.push({ id: 'p' + Date.now(), name, room: '', primaryTherapist, secondaryTherapist, treatmentsPerWeek, dischargeDate });
  saveState();
  renderPanelContent('patients');
  showToast(`${name} נוסף/ה`);
};

// keep old names as aliases so existing inline onclick still works
window.addTherapist            = window.addTherapistFromPanel;
window.addPatientFromSettings  = window.addPatientFromPanel;

// ─── MODAL HELPERS ────────────────────────────────────────────────────────────

window.pickStatus = function(s, btn) {
  btn.closest('.status-grid').querySelectorAll('.status-opt').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  document.getElementById('modalStatus').value = s;
};

function showModal(id) {
  document.getElementById(id).classList.remove('hidden');
}

window.closeModal = function(id) {
  document.getElementById(id).classList.add('hidden');
};

// ─── VIEW SWITCHING ───────────────────────────────────────────────────────────

function switchView(v) {
  state.view = v;
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.view === v));
  document.querySelectorAll('.view').forEach(el => el.classList.toggle('active', el.id === `${v}View`));
  renderCurrentView();
}

function renderCurrentView() {
  if (state.view === 'weekly')  renderWeeklyView();
  if (state.view === 'daily')   renderDailyView();
  if (state.view === 'monthly') renderMonthlyView();
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────────

function navigate(dir) {
  const d = new Date(state.currentDate);
  if (state.view === 'weekly')  d.setDate(d.getDate() + dir*7);
  if (state.view === 'daily')   d.setDate(d.getDate() + dir);
  if (state.view === 'monthly') d.setMonth(d.getMonth() + dir);
  state.currentDate = d;
  renderCurrentView();
}

function goToday() {
  state.currentDate = new Date();
  const dow = state.currentDate.getDay();
  state.selectedDayIndex = dow === 0 ? 0 : Math.min(dow, 4);
  renderCurrentView();
}

// ─── TOAST ────────────────────────────────────────────────────────────────────

function showToast(msg) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.classList.remove('toast-warning');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2200);
}

function showOverloadToast(therapistName, count, max) {
  document.getElementById('warningModalTitle').textContent = 'התרעת עומס';
  document.getElementById('warningModalBody').innerHTML =
    `<div style="padding:0.25rem 0 0.75rem">
      <div class="warning-issue-item">
        <span class="warning-issue-icon high">⚠</span>
        <span>עומס על <strong>${therapistName}</strong> — שובצו
          <span class="warning-issue-count">${count}/${max}</span> מטופלים (מעל המגבלה)</span>
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-primary" onclick="closeModal('warningModal')">אישור</button>
    </div>`;
  showModal('warningModal');
}

window._deptDayOfWeek = null;

window.selectDeptDay = function(i, btn) {
  window._deptDayOfWeek = i;
  btn.closest('.sp-week-days').querySelectorAll('.sp-day-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
};

window.saveDepartmentHour = function() {
  const fromTime = document.getElementById('deptHourFrom')?.value || '12:00';
  const toTime   = document.getElementById('deptHourTo')?.value   || '13:00';
  const dayOfWeek = window._deptDayOfWeek !== null
    ? window._deptDayOfWeek
    : (state.settings.departmentHour?.dayOfWeek ?? 0);
  state.settings.departmentHour = { enabled: true, dayOfWeek, fromTime, toTime };
  window._deptDayOfWeek = null;
  saveState();
  renderCurrentView();
  showToast('שעת מחלקה עודכנה');
};

window.saveGlobalSettings = function() {
  const val = parseInt(document.getElementById('globalMaxPerDay')?.value);
  if (!val || val < 1) { showToast('ערך לא תקין'); return; }
  state.settings.maxPatientsPerDay = val;
  saveState();
  renderCurrentView();
  renderPanelContent('therapists');
  showToast(`מגבלה עודכנה: ${val} מטופלים/יום`);
};

// ─── DRAG AND DROP ────────────────────────────────────────────────────────────

function bindPatientDragEvents() {
  document.querySelectorAll('.sp-patient-item').forEach(item => {
    item.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'new', pid: item.dataset.pid }));
      e.dataTransfer.effectAllowed = 'copy';
      item.classList.add('dragging');
    });
    item.addEventListener('dragend', () => item.classList.remove('dragging'));
  });
}

window.chipDragStart = function(e) {
  const el = e.currentTarget;
  e.dataTransfer.setData('text/plain', JSON.stringify({
    type: 'move', pid: el.dataset.pid, fromDate: el.dataset.date, fromTid: el.dataset.tid
  }));
  e.dataTransfer.effectAllowed = 'move';
  el.classList.add('dragging');
  e.stopPropagation();
};

window.chipDragEnd = function(e) { e.currentTarget.classList.remove('dragging'); };

window.cellDragOver = function(e) {
  e.preventDefault();
  const cell = e.currentTarget;
  const day  = getDay(cell.dataset.date);
  const _av = day.availability[cell.dataset.tid] || AVAIL.AVAILABLE;
  if (_av !== AVAIL.AVAILABLE && _av !== AVAIL.PARTIAL) return;
  cell.classList.add('drag-over');
  e.dataTransfer.dropEffect = 'copy';
};

window.cellDragLeave = function(e) {
  if (!e.currentTarget.contains(e.relatedTarget)) {
    e.currentTarget.classList.remove('drag-over');
  }
};

window.cellDrop = function(e) {
  e.preventDefault();
  const cell    = e.currentTarget;
  const dateStr = cell.dataset.date;
  const tid     = cell.dataset.tid;
  cell.classList.remove('drag-over');

  const day = getDay(dateStr);
  const _avCd = day.availability[tid] || AVAIL.AVAILABLE;
  if (_avCd !== AVAIL.AVAILABLE && _avCd !== AVAIL.PARTIAL) {
    showToast('המטפל אינו זמין ביום זה'); return;
  }

  let data;
  try { data = JSON.parse(e.dataTransfer.getData('text/plain')); } catch { return; }

  if (data.type === 'new') {
    const { pid } = data;
    if (isPatientDischarged(pid)) { showDischargeWarning(pid); return; }
    if ((day.assignments[tid]||[]).some(a => a.pid === pid)) {
      showToast('המטופל כבר משובץ למטפל זה'); return;
    }
    const d = ensureDay(dateStr);
    if (!d.assignments[tid]) d.assignments[tid] = [];
    d.assignments[tid].push({ pid, s: STATUS.TREATMENT });
    saveState(); renderCurrentView();
    const newCount = d.assignments[tid].length;
    const max      = getMaxForTherapist(tid);
    if (newCount > max) showOverloadToast(getTherapist(tid).name, newCount, max);
    else showToast(`${getPatient(pid)?.name} שובץ/ה ✓`);
    checkPatientWarning(pid);

  } else if (data.type === 'move') {
    const { pid, fromDate, fromTid } = data;
    if (fromDate === dateStr && fromTid === tid) return;

    const src = ensureDay(fromDate);
    src.assignments[fromTid] = (src.assignments[fromTid]||[]).filter(a => a.pid !== pid);

    const tgt = ensureDay(dateStr);
    if (!(tgt.assignments[tid]||[]).some(a => a.pid === pid)) {
      if (!tgt.assignments[tid]) tgt.assignments[tid] = [];
      tgt.assignments[tid].push({ pid, s: STATUS.TREATMENT });
    }
    saveState(); renderCurrentView();
    const newCount = (tgt.assignments[tid]||[]).length;
    const max      = getMaxForTherapist(tid);
    if (newCount > max) showOverloadToast(getTherapist(tid).name, newCount, max);
    else showToast(`${getPatient(pid)?.name} הועבר/ה ✓`);
    checkPatientWarning(pid);
  }
};

// Card drop targets (daily view)
window.cardDragOver = function(e) {
  e.preventDefault();
  e.currentTarget.closest('.therapist-card').classList.add('drag-over-card');
  e.dataTransfer.dropEffect = 'copy';
};

window.cardDragLeave = function(e) {
  if (!e.currentTarget.closest('.therapist-card').contains(e.relatedTarget)) {
    e.currentTarget.closest('.therapist-card').classList.remove('drag-over-card');
  }
};

window.cardDrop = function(e) {
  e.preventDefault();
  const card    = e.currentTarget.closest('.therapist-card');
  card.classList.remove('drag-over-card');
  const dateStr = card.dataset.date;
  const tid     = card.dataset.tid;

  const day = getDay(dateStr);
  const _avCr = day.availability[tid] || AVAIL.AVAILABLE;
  if (_avCr !== AVAIL.AVAILABLE && _avCr !== AVAIL.PARTIAL) {
    showToast('המטפל אינו זמין ביום זה'); return;
  }

  let data;
  try { data = JSON.parse(e.dataTransfer.getData('text/plain')); } catch { return; }

  const pid = data.pid;
  if (isPatientDischarged(pid)) { showDischargeWarning(pid); return; }
  if ((day.assignments[tid]||[]).some(a => a.pid === pid)) {
    showToast('המטופל כבר משובץ'); return;
  }

  if (data.type === 'move') {
    const src = ensureDay(data.fromDate);
    src.assignments[data.fromTid] = (src.assignments[data.fromTid]||[]).filter(a => a.pid !== pid);
  }

  const tgt = ensureDay(dateStr);
  if (!tgt.assignments[tid]) tgt.assignments[tid] = [];
  tgt.assignments[tid].push({ pid, s: STATUS.TREATMENT });
  saveState(); renderCurrentView();
  const newCount = tgt.assignments[tid].length;
  const max      = getMaxForTherapist(tid);
  if (newCount > max) showOverloadToast(getTherapist(tid).name, newCount, max);
  else showToast(`${getPatient(pid)?.name} שובץ/ה ✓`);
  checkPatientWarning(pid);
};

// ─── AUTO ASSIGN ─────────────────────────────────────────────────────────────

window.autoAssignWeek = function() {
  const ws    = weekStart(state.currentDate);
  const dates = weekDates(ws);
  const conflicts = [];

  const parseMinutes = s => {
    const [h, m] = (s || '00:00').split(':').map(Number);
    return h * 60 + (m || 0);
  };

  const getDayMax = (tid, dateStr) => {
    const day = getDay(dateStr);
    const av  = day.availability[tid] || AVAIL.AVAILABLE;
    if (av === AVAIL.VACATION || av === AVAIL.DAYOFF) return 0;
    if (av === AVAIL.PARTIAL) {
      const extra = (day.availExtra || {})[tid] || {};
      const mins = parseMinutes(extra.toHour || '14:00') - parseMinutes(extra.fromHour || '08:00');
      return Math.max(0, Math.floor(mins / 60));
    }
    return getMaxForTherapist(tid);
  };

  dates.forEach(date => {
    const dateStr = fmtKey(date);

    // Build mutable capacity map
    const cap = {};
    state.therapists.forEach(t => {
      const assigned = (getDay(dateStr).assignments[t.id] || []).length;
      cap[t.id] = Math.max(0, getDayMax(t.id, dateStr) - assigned);
    });

    // Track already-assigned patients this day
    const assignedToday = new Set();
    state.therapists.forEach(t => {
      (getDay(dateStr).assignments[t.id] || []).forEach(a => assignedToday.add(a.pid));
    });

    const doAssign = (tid, pid) => {
      const d = ensureDay(dateStr);
      if (!d.assignments[tid]) d.assignments[tid] = [];
      d.assignments[tid].push({ pid, s: STATUS.TREATMENT });
      cap[tid]--;
      assignedToday.add(pid);
    };

    // Pass 1: assign primary patients to available/partial therapists
    state.therapists.forEach(t => {
      const av = getDay(dateStr).availability[t.id] || AVAIL.AVAILABLE;
      if (av === AVAIL.VACATION || av === AVAIL.DAYOFF) return;
      const patients = state.patients.filter(p =>
        p.primaryTherapist === t.id && !p.dischargeDate && !assignedToday.has(p.id)
      );
      patients.forEach(p => { if (cap[t.id] > 0) doAssign(t.id, p.id); });
    });

    // Previous-week therapist map: pid → tid (who treated them last week, not primary/secondary)
    const prevWeekStart = new Date(ws);
    prevWeekStart.setDate(prevWeekStart.getDate() - 7);
    const prevDates = weekDates(prevWeekStart);
    const prevDow   = date.getDay();
    const prevDateStr = fmtKey(prevDates.find(d => d.getDay() === prevDow) || prevWeekStart);
    const prevDay   = getDay(prevDateStr);
    const prevTherapistForPatient = {};
    state.therapists.forEach(t => {
      (prevDay.assignments[t.id] || []).forEach(a => {
        const p2 = getPatient(a.pid);
        if (p2 && p2.primaryTherapist !== t.id && p2.secondaryTherapist !== t.id) {
          prevTherapistForPatient[a.pid] = t.id;
        }
      });
    });

    // Pass 2: therapists on vacation/dayoff — try secondary, then prev-week, then recommend
    state.therapists.forEach(t => {
      const av = getDay(dateStr).availability[t.id] || AVAIL.AVAILABLE;
      if (av !== AVAIL.VACATION && av !== AVAIL.DAYOFF) return;
      const patients = state.patients.filter(p =>
        p.primaryTherapist === t.id && !p.dischargeDate && !assignedToday.has(p.id)
      );
      patients.forEach(p => {
        const secTid = p.secondaryTherapist;
        const secAv  = secTid ? (getDay(dateStr).availability[secTid] || AVAIL.AVAILABLE) : null;
        if (secTid && secAv !== AVAIL.VACATION && secAv !== AVAIL.DAYOFF && cap[secTid] > 0) {
          // Priority 2: secondary therapist
          doAssign(secTid, p.id);
        } else {
          // Priority 3: therapist who treated this patient last week (same day)
          const prevTid = prevTherapistForPatient[p.id];
          const prevTAv = prevTid ? (getDay(dateStr).availability[prevTid] || AVAIL.AVAILABLE) : null;
          if (prevTid && prevTAv !== AVAIL.VACATION && prevTAv !== AVAIL.DAYOFF && cap[prevTid] > 0) {
            doAssign(prevTid, p.id);
          } else {
            // No automatic solution — recommend best by capacity
            const available = state.therapists.filter(x => {
              const xAv = getDay(dateStr).availability[x.id] || AVAIL.AVAILABLE;
              return xAv !== AVAIL.VACATION && xAv !== AVAIL.DAYOFF && cap[x.id] > 0;
            }).sort((a, b) => cap[b.id] - cap[a.id]);
            const rec = available[0] || null;
            conflicts.push({ pid: p.id, dateStr, primaryTid: t.id, recTid: rec ? rec.id : null });
          }
        }
      });
    });
  });

  saveState();
  renderCurrentView();

  if (conflicts.length > 0) {
    openAutoAssignConflictModal(conflicts);
  } else {
    showToast('שיבוץ אוטומטי הושלם בהצלחה');
  }
};

function openAutoAssignConflictModal(conflicts) {
  window._autoAssignConflicts = conflicts;

  // Group conflicts by day
  const byDay = {};
  conflicts.forEach((c, i) => {
    if (!byDay[c.dateStr]) byDay[c.dateStr] = [];
    byDay[c.dateStr].push({ ...c, idx: i });
  });

  const dayBlocks = Object.keys(byDay).sort().map(dateStr => {
    const d        = new Date(dateStr + 'T00:00:00');
    const dayLabel = DAY_NAMES_FULL[d.getDay()] || '';
    const dateFmt  = `${d.getDate()}/${d.getMonth()+1}`;

    const rows = byDay[dateStr].map(c => {
      const p  = getPatient(c.pid);
      const pt = getTherapist(c.primaryTid);

      const opts = state.therapists.map(t => {
        const av      = getDay(c.dateStr).availability[t.id] || AVAIL.AVAILABLE;
        const unavail = av === AVAIL.VACATION || av === AVAIL.DAYOFF;
        return `<option value="${t.id}" ${t.id === c.recTid ? 'selected' : ''} ${unavail ? 'disabled' : ''}>
          ${t.name}${unavail ? ' (לא זמין)' : ''}
        </option>`;
      }).join('');

      const recName = c.recTid ? getTherapist(c.recTid)?.name : null;
      const recHtml = recName
        ? `<span class="conflict-rec">המלצה: ${recName}</span>`
        : `<span class="conflict-rec warn">אין מטפל זמין</span>`;

      return `<div class="conflict-row">
        <div class="conflict-info">
          <strong>${p?.name || ''}</strong>
          <span class="conflict-meta">${pt?.name || ''} לא זמין</span>
          ${recHtml}
        </div>
        <select class="sp-input conflict-sel" data-idx="${c.idx}" style="min-width:130px;font-size:0.8rem">
          <option value="">— ללא שיבוץ —</option>
          ${opts}
        </select>
      </div>`;
    }).join('');

    return `<div class="conflict-day-block">
      <div class="conflict-day-header">יום ${dayLabel} · ${dateFmt}</div>
      ${rows}
    </div>`;
  }).join('');

  document.getElementById('assignModalTitle').textContent = 'דילמות שיבוץ אוטומטי';
  document.getElementById('assignModalBody').innerHTML = `
    <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:0.75rem">
      המטופלים הבאים לא שובצו אוטומטית. בחר מטפל לכל אחד או השאר ללא שיבוץ.
    </p>
    <div class="conflict-list">${dayBlocks}</div>
    <div class="modal-actions">
      <button class="btn btn-primary" onclick="applyAutoAssignConflicts()">אשר שיבוץ</button>
      <button class="btn btn-cancel"  onclick="closeModal('assignModal')">סגור</button>
    </div>`;
  showModal('assignModal');
}

window.applyAutoAssignConflicts = function() {
  const conflicts = window._autoAssignConflicts || [];
  document.querySelectorAll('.conflict-sel').forEach((sel, i) => {
    const tid = sel.value;
    const c   = conflicts[i];
    if (!tid || !c) return;
    const d = ensureDay(c.dateStr);
    if (!d.assignments[tid]) d.assignments[tid] = [];
    // Avoid double-assigning
    if (!(d.assignments[tid] || []).some(a => a.pid === c.pid)) {
      d.assignments[tid].push({ pid: c.pid, s: STATUS.TREATMENT });
    }
  });
  window._autoAssignConflicts = null;
  saveState();
  closeModal('assignModal');
  renderCurrentView();
  showToast('שיבוץ אוטומטי הושלם');
};

// ─── AUTH & INIT ──────────────────────────────────────────────────────────────

async function _loadUserProfile(user) {
  try {
    const profilesDoc = await _db.collection('physioTeam').doc('userProfiles').get();
    const profiles = profilesDoc.exists ? profilesDoc.data() : {};
    if (profiles[user.uid]) {
      state.currentUser = { uid: user.uid, ...profiles[user.uid] };
      // Sync displayName from Firebase Auth when it's better than what's stored
      const authName = user.displayName;
      if (authName && authName !== state.currentUser.displayName) {
        state.currentUser.displayName = authName;
        profiles[user.uid].displayName = authName;
        _db.collection('physioTeam').doc('userProfiles').set(profiles).catch(() => {});
      }
    } else {
      const existingCount = Object.keys(profiles).filter(k => !k.startsWith('_')).length;
      const role = existingCount === 0 ? 'admin' : 'readonly';
      const newProfile = {
        email: user.email,
        displayName: user.displayName || user.email,
        role,
        therapistId: null,
      };
      state.currentUser = { uid: user.uid, ...newProfile };
      profiles[user.uid] = newProfile;
      await _db.collection('physioTeam').doc('userProfiles').set(profiles);
    }
  } catch(e) {
    console.warn('Could not load user profile:', e);
    state.currentUser = { uid: user.uid, email: user.email, displayName: user.displayName || user.email, role: 'admin', therapistId: null };
  }
}

function bindLoginUI() {
  const errEl = document.getElementById('loginError');

  document.getElementById('loginBtn').addEventListener('click', async () => {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    errEl.textContent = '';
    if (!email || !password) { errEl.textContent = 'נא למלא אימייל וסיסמה'; return; }
    const btn = document.getElementById('loginBtn');
    btn.disabled = true;
    try {
      await _auth.signInWithEmailAndPassword(email, password);
    } catch(e) {
      btn.disabled = false;
      errEl.textContent = ({
        'auth/user-not-found':      'משתמש לא נמצא',
        'auth/wrong-password':      'סיסמה שגויה',
        'auth/invalid-email':       'אימייל לא תקין',
        'auth/invalid-credential':  'אימייל או סיסמה שגויים',
        'auth/too-many-requests':   'יותר מדי ניסיונות. נסה שוב מאוחר יותר',
      })[e.code] || 'שגיאת כניסה';
    }
  });

  document.getElementById('loginPassword').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('loginBtn').click();
  });

  document.getElementById('showSignupLink').addEventListener('click', e => {
    e.preventDefault();
    const s = document.getElementById('signupSection');
    s.style.display = s.style.display === 'none' ? 'block' : 'none';
  });

  document.getElementById('signupBtn').addEventListener('click', async () => {
    const name     = document.getElementById('signupName').value.trim();
    const email    = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    errEl.textContent = '';
    if (!name || !email || !password) { errEl.textContent = 'נא למלא את כל השדות'; return; }
    if (password.length < 6) { errEl.textContent = 'הסיסמה חייבת להכיל לפחות 6 תווים'; return; }
    const btn = document.getElementById('signupBtn');
    btn.disabled = true;
    try {
      const cred = await _auth.createUserWithEmailAndPassword(email, password);
      await cred.user.updateProfile({ displayName: name });
      // Fix Firestore profile displayName (onAuthStateChanged may have fired before updateProfile finished)
      if (_db) {
        const pd = await _db.collection('physioTeam').doc('userProfiles').get();
        const profs = pd.exists ? pd.data() : {};
        if (profs[cred.user.uid]) {
          profs[cred.user.uid].displayName = name;
          await _db.collection('physioTeam').doc('userProfiles').set(profs);
          if (state.currentUser?.uid === cred.user.uid) {
            state.currentUser.displayName = name;
            _updateGreeting();
          }
        }
      }
    } catch(e) {
      btn.disabled = false;
      errEl.textContent = ({
        'auth/email-already-in-use': 'כתובת האימייל כבר בשימוש',
        'auth/invalid-email':        'אימייל לא תקין',
        'auth/weak-password':        'הסיסמה חלשה מדי (לפחות 6 תווים)',
      })[e.code] || 'שגיאת הרשמה';
    }
  });
}

async function _renderUserManagement() {
  const el = document.getElementById('userMgmtContent');
  if (!el || !_db) return;
  try {
    const doc  = await _db.collection('physioTeam').doc('userProfiles').get();
    const profiles = doc.exists ? doc.data() : {};

    // Build therapistId → registered user map
    const byTherapist = {};
    Object.entries(profiles).forEach(([uid, p]) => {
      if (uid.startsWith('_')) return;
      if (p.therapistId) byTherapist[p.therapistId] = { uid, ...p };
    });

    // Pending roles (for therapists not yet registered)
    const pending = profiles['_therapistRoles'] || {};

    const rows = state.therapists.map(t => {
      const user        = byTherapist[t.id];
      const currentRole = user ? user.role : (pending[t.id] || 'readonly');
      const isSelf      = user && state.currentUser?.uid === user.uid;

      return `<div class="sp-user-row">
        <span class="sp-user-dot" style="background:${t.color}"></span>
        <div class="sp-user-info" style="flex:1;min-width:0;overflow:hidden">
          <div class="sp-user-name" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
            ${t.name}${isSelf ? ' <span style="font-size:0.62rem;color:var(--primary);font-weight:600">(אתה)</span>' : ''}
          </div>
          ${user
            ? `<div class="sp-user-email">${user.email}</div>`
            : `<div class="sp-user-email" style="color:#CBD5E1;font-style:italic">טרם נרשם/ה</div>`}
        </div>
        <select class="sp-user-role" data-tid="${t.id}" ${user ? `data-uid="${user.uid}"` : ''}
                style="font-size:0.8rem;padding:0.25rem 0.35rem;width:82px;flex-shrink:0;
                       border:1.5px solid var(--border);border-radius:8px;
                       font-family:'Heebo',sans-serif;background:white;color:var(--text);
                       cursor:pointer">
          <option value="admin"    ${currentRole==='admin'    ? 'selected':''}>מנהל</option>
          <option value="editor"   ${currentRole==='editor'   ? 'selected':''}>עורך</option>
          <option value="readonly" ${currentRole==='readonly' ? 'selected':''}>צפייה</option>
        </select>
      </div>`;
    }).join('');

    el.innerHTML = rows +
      `<button class="sp-add-btn" onclick="saveAllUserProfiles()"
               style="width:100%;margin-top:0.75rem;padding:0.5rem;font-size:0.82rem">
         שמור שינויים
       </button>`;
  } catch(e) {
    if (el) el.innerHTML = '<div style="color:#DC2626;font-size:0.8rem">שגיאה בטעינת משתמשים</div>';
  }
}

window.saveAllUserProfiles = async function() {
  if (!_db) return;
  const selects = document.querySelectorAll('#userMgmtContent .sp-user-role');
  if (!selects.length) return;
  try {
    const doc = await _db.collection('physioTeam').doc('userProfiles').get();
    const profiles = doc.exists ? doc.data() : {};
    if (!profiles['_therapistRoles']) profiles['_therapistRoles'] = {};

    let ownRoleChanged = false;
    selects.forEach(sel => {
      const tid  = sel.dataset.tid;
      const uid  = sel.dataset.uid;
      const role = sel.value;
      profiles['_therapistRoles'][tid] = role;   // store for future registration
      if (uid && profiles[uid]) {
        profiles[uid].role = role;
        if (state.currentUser?.uid === uid) {
          state.currentUser.role = role;
          ownRoleChanged = true;
        }
      }
    });

    await _db.collection('physioTeam').doc('userProfiles').set(profiles);
    if (ownRoleChanged) { _updateUIForPermissions(); renderCurrentView(); }
    showToast('הרשאות עודכנו');
  } catch(e) { showToast('שגיאה בשמירת ההרשאות'); }
};

function _updateGreeting() {
  const el = document.getElementById('headerGreeting');
  if (!el) return;
  if (!state.currentUser) { el.textContent = ''; return; }
  const h = new Date().getHours();
  const greet = h >= 5 && h < 12 ? 'בוקר טוב'
              : h >= 12 && h < 17 ? 'צהריים טובים'
              : h >= 17 && h < 21 ? 'ערב טוב'
              : 'לילה טוב';
  const storedName = state.currentUser.displayName || '';
  const authName   = _auth?.currentUser?.displayName || '';
  const isEmail    = (s) => s.includes('@');
  const fullName   = (!storedName || isEmail(storedName)) ? authName : storedName;
  const name = fullName ? fullName.trim().split(/\s+/)[0] : (state.currentUser.email || '');
  el.textContent = `${greet}, ${name}`;
}

function _updateUIForPermissions() {
  const autoBtn = document.getElementById('autoAssignBtn');
  if (autoBtn) autoBtn.style.display = canEdit() ? '' : 'none';
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.style.display = (_auth && state.currentUser) ? '' : 'none';
  _updateGreeting();
}

const DARK_KEY = 'physioTeamDarkMode';
const MOON_SVG = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
const SUN_SVG  = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';

function _initDarkMode() {
  if (localStorage.getItem(DARK_KEY) === '1') _applyDarkMode(true);
}

function _applyDarkMode(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : '');
  const icon = document.getElementById('darkModeIcon');
  if (icon) icon.innerHTML = dark ? SUN_SVG : MOON_SVG;
  const btn = document.getElementById('darkModeBtn');
  if (btn) btn.title = dark ? 'מצב בהיר' : 'מצב כהה';
}

function _toggleDarkMode() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  _applyDarkMode(!isDark);
  localStorage.setItem(DARK_KEY, isDark ? '0' : '1');
}

let _appEventsBound = false;

function _bindAppEvents() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => switchView(tab.dataset.view));
  });
  document.getElementById('prevPeriod').addEventListener('click', () => navigate(-1));
  document.getElementById('nextPeriod').addEventListener('click', () => navigate(1));
  document.getElementById('goToday').addEventListener('click', goToday);
  document.getElementById('autoAssignBtn').addEventListener('click', autoAssignWeek);
  document.getElementById('darkModeBtn').addEventListener('click', _toggleDarkMode);
  document.querySelectorAll('.panel-trigger').forEach(btn => {
    if (btn.id === 'darkModeBtn') return;
    btn.addEventListener('click', () => {
      const type = btn.dataset.panel;
      if (state.activePanel === type) closePanel();
      else openPanel(type);
    });
  });
  document.querySelectorAll('.sp-tab').forEach(tab => {
    tab.addEventListener('click', () => renderPanelContent(tab.dataset.panel));
  });
  document.getElementById('closeSidePanel').addEventListener('click', closePanel);
  document.getElementById('panelBackdrop').addEventListener('click', closePanel);
  document.getElementById('closeAssignModal').addEventListener('click', () => closeModal('assignModal'));
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.add('hidden');
    });
  });
  document.getElementById('logoutBtn')?.addEventListener('click', () => _auth?.signOut());
}

function _initView() {
  goToday();
  _updateUIForPermissions();
  if (!document.getElementById('weeklyView').classList.contains('active')) {
    document.getElementById('weeklyView').classList.add('active');
    state.view = 'weekly';
  }
  renderCurrentView();
}

document.addEventListener('DOMContentLoaded', () => {
  _initDarkMode();
  initFirebase();

  if (_auth) {
    bindLoginUI();
    _auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).catch(() => {});
    _auth.onAuthStateChanged(async (user) => {
      if (user) {
        await _loadUserProfile(user);
        document.getElementById('loginOverlay').style.display = 'none';
        await loadState();
        if (!_appEventsBound) {
          _bindAppEvents();
          _appEventsBound = true;
        }
        _initView();
      } else {
        state.currentUser = null;
        if (_unsubscribe) { _unsubscribe(); _unsubscribe = null; }
        document.getElementById('loginOverlay').style.display = 'flex';
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) logoutBtn.style.display = 'none';
      }
    });
  } else {
    document.getElementById('loginOverlay').style.display = 'none';
    loadState().then(() => {
      if (!_appEventsBound) {
        _bindAppEvents();
        _appEventsBound = true;
      }
      _initView();
    });
  }
});
