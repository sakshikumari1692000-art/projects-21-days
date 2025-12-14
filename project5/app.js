const rosterUrl = "https://jsonplaceholder.typicode.com/users?_limit=10";
const clockUrl = "https://worldtimeapi.org/api/timezone/Asia/Kolkata";

/* ================= AUTH (DUMMY LOGIN) ================= */
const AUTH_KEY = "quickslot-user";

const emailInput = document.getElementById("emailInput");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userStatus = document.getElementById("userStatus");

function isLoggedIn() {
  return !!localStorage.getItem(AUTH_KEY);
}

function loginUser(email) {
  localStorage.setItem(AUTH_KEY, JSON.stringify({ email }));
}

function logoutUser() {
  localStorage.removeItem(AUTH_KEY);
}

function updateAuthUI() {
  if (isLoggedIn()) {
    const user = JSON.parse(localStorage.getItem(AUTH_KEY));
    userStatus.textContent = `Logged in as ${user.email}`;
    loginBtn.classList.add("d-none");
    logoutBtn.classList.remove("d-none");
  } else {
    userStatus.textContent = "Not logged in";
    loginBtn.classList.remove("d-none");
    logoutBtn.classList.add("d-none");
  }
}

loginBtn.onclick = () => {
  const email = emailInput.value.trim();
  if (!email) {
    alert("Enter email");
    return;
  }
  loginUser(email);
  updateAuthUI();
};

logoutBtn.onclick = () => {
  logoutUser();

  // Clear email field on logout
  emailInput.value = "";

  updateAuthUI();
};


/* ================= UI ELEMENTS ================= */
const providerSelect = document.getElementById("providerSelect");
const dateInput = document.getElementById("dateInput");
const loadSlotsBtn = document.getElementById("loadSlotsBtn");
const refreshBtn = document.getElementById("refreshBtn");
const slotsGrid = document.getElementById("slotsGrid");
const slotsHeadline = document.getElementById("slotsHeadline");
const slotMeta = document.getElementById("slotMeta");
const bookingsList = document.getElementById("bookingsList");
const clearBookingsBtn = document.getElementById("clearBookingsBtn");
const statProviders = document.getElementById("statProviders");
const statBookings = document.getElementById("statBookings");
const statClock = document.getElementById("statClock");
const lastSync = document.getElementById("lastSync");

/* ================= MODAL ================= */
const confirmModal = new bootstrap.Modal(
  document.getElementById("confirmModal")
);
const confirmTitle = document.getElementById("confirmTitle");
const confirmMeta = document.getElementById("confirmMeta");
const confirmBtn = document.getElementById("confirmBtn");
const notesInput = document.getElementById("notesInput");

/* ================= STATE ================= */
const state = {
  providers: [],
  nowUtc: null,
  target: null,
  bookings: [],
  pendingSlot: null,
};

/* ================= STORAGE ================= */
function readBookings() {
  state.bookings = JSON.parse(
    localStorage.getItem("quickslot-bookings") || "[]"
  );
}

function saveBookings() {
  localStorage.setItem("quickslot-bookings", JSON.stringify(state.bookings));
  statBookings.textContent = state.bookings.length;
}

/* ================= PROVIDERS ================= */
async function fetchProviders() {
  providerSelect.disabled = true;
  providerSelect.innerHTML = `<option>Loading roster…</option>`;

  try {
    const res = await fetch(rosterUrl);
    const data = await res.json();

    state.providers = data.map((person) => ({
      id: person.id,
      name: person.name,
      specialty: person.company?.bs || "Generalist",
    }));

    statProviders.textContent = state.providers.length;
    renderProviderSelect();
  } catch (err) {
    providerSelect.innerHTML = `<option>Error loading providers</option>`;
    console.error(err);
  }
}

function renderProviderSelect() {
  providerSelect.disabled = false;
  providerSelect.innerHTML = `<option value="">Select provider</option>`;

  state.providers.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = `${p.name} — ${p.specialty}`;
    providerSelect.appendChild(opt);
  });
}

/* ================= CLOCK ================= */
async function syncClock() {
  try {
    const res = await fetch(clockUrl);
    const data = await res.json();
    state.nowUtc = new Date(data.datetime);
  } catch {
    state.nowUtc = new Date();
  }

  statClock.textContent = state.nowUtc.toLocaleTimeString("en-IN");
  lastSync.textContent = `Last synced ${new Date().toLocaleTimeString("en-IN")}`;
}

/* ================= DATE ================= */
function setMinDate() {
  const today = new Date().toISOString().split("T")[0];
  dateInput.min = today;
  dateInput.value = today;
}

/* ================= SLOTS ================= */
function buildSlots(date) {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    ["00", "30"].forEach((minute) => {
      slots.push(`${String(hour).padStart(2, "0")}:${minute}`);
    });
  }
  return slots.map((label) => ({
    label,
    disabled: isSlotDisabled(date, label),
  }));
}

function isSlotDisabled(date, slotLabel) {
  const targetDate = new Date(`${date}T${slotLabel}:00+05:30`);
  const now = state.nowUtc || new Date();

  if (targetDate < now) return true;

  return state.bookings.some(
    (b) =>
      b.date === date &&
      b.slot === slotLabel &&
      b.providerId === state.target?.providerId
  );
}

function renderSlots(providerId, date) {
  const provider = state.providers.find((p) => p.id === Number(providerId));
  if (!provider || !date) return;

  state.target = { providerId: provider.id, date };

  slotsHeadline.textContent = `Slots for ${provider.name}`;
  slotMeta.textContent = `${new Date(date).toDateString()}`;

  slotsGrid.innerHTML = "";

  buildSlots(date).forEach((slot) => {
    const col = document.createElement("div");
    col.className = "col-6 col-xl-4";

    const card = document.createElement("div");
    card.className = `slot-card ${slot.disabled ? "disabled" : ""}`;
    card.innerHTML = `
      <div>${slot.label}</div>
      <small>${slot.disabled ? "Unavailable" : "Tap to book"}</small>
    `;

    if (!slot.disabled) {
      card.onclick = () => openModal(provider, date, slot.label);
    }

    col.appendChild(card);
    slotsGrid.appendChild(col);
  });
}

/* ================= MODAL ================= */
function openModal(provider, date, slotLabel) {
  state.pendingSlot = { provider, date, slotLabel };
  confirmTitle.textContent = provider.name;
  confirmMeta.textContent = `${date} · ${slotLabel}`;
  notesInput.value = "";
  confirmModal.show();
}

confirmBtn.onclick = () => {
  const payload = {
    id: crypto.randomUUID(),
    providerId: state.pendingSlot.provider.id,
    provider: state.pendingSlot.provider.name,
    date: state.pendingSlot.date,
    slot: state.pendingSlot.slotLabel,
    notes: notesInput.value.trim(),
  };

  state.bookings.push(payload);
  saveBookings();
  renderSlots(payload.providerId, payload.date);
  renderBookings();
  sendConfirmationEmail(payload);
  confirmModal.hide();
};

/* ================= BOOKINGS ================= */
function renderBookings() {
  bookingsList.innerHTML = "";

  if (!state.bookings.length) {
    bookingsList.innerHTML = `<div class="text-secondary">No bookings yet.</div>`;
    return;
  }

  state.bookings.forEach((b) => {
    const div = document.createElement("div");
    div.textContent = `${b.provider} | ${b.date} ${b.slot}`;
    bookingsList.appendChild(div);
  });
}

clearBookingsBtn.onclick = () => {
  if (confirm("Clear all bookings?")) {
    state.bookings = [];
    saveBookings();
    renderBookings();
  }
};

/* ================= EVENTS ================= */
loadSlotsBtn.onclick = async () => {
  if (!isLoggedIn()) {
    alert("Please login first");
    return;
  }

  if (!providerSelect.value || !dateInput.value) {
    alert("Select provider and date");
    return;
  }

  await syncClock();
  renderSlots(providerSelect.value, dateInput.value);
};

refreshBtn.onclick = syncClock;

/* ================= DUMMY MAIL ================= */
function sendConfirmationEmail(booking) {
  console.log("📧 Dummy Email Sent:", booking);
}

/* ================= INIT ================= */
async function init() {
  updateAuthUI();
  readBookings();
  statBookings.textContent = state.bookings.length;
  setMinDate();
  await Promise.all([fetchProviders(), syncClock()]);
  renderBookings();
  const loginModal = new bootstrap.Modal(
  document.getElementById("loginModal")
);

if (!isLoggedIn()) {
  loginModal.show();
}
}

document.addEventListener("DOMContentLoaded", init);
