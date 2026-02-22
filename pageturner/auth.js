/**
 * PageTurner — auth.js
 * Handles login, registration, theme, and session via localStorage
 */

/* ========================
   THEME
======================== */
const savedTheme = localStorage.getItem('pageturner_theme') || 'dark';
applyTheme(savedTheme);

function applyTheme(theme) {
  document.body.classList.toggle('dark',  theme === 'dark');
  document.body.classList.toggle('light', theme === 'light');
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

const darkToggle = document.getElementById('darkToggle');
if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('pageturner_theme', next);
  });
}

/* ========================
   HELPERS
======================== */
function getUsers() {
  return JSON.parse(localStorage.getItem('pt_users') || '[]');
}

function saveUsers(users) {
  localStorage.setItem('pt_users', JSON.stringify(users));
}

function showAlert(id, msg, type = 'error') {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.className = `auth-alert ${type}`;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 4000);
}

function setFieldError(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.style.display = msg ? 'block' : 'none'; }
}

function clearErrors(...ids) {
  ids.forEach(id => setFieldError(id, ''));
}

/* ========================
   PASSWORD TOGGLE
======================== */
document.querySelectorAll('.toggle-pw').forEach(btn => {
  btn.addEventListener('click', () => {
    const wrap = btn.closest('.input-wrap');
    const input = wrap.querySelector('input');
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
      btn.textContent = input.type === 'password' ? '👁' : '🙈';
    }
  });
});

/* ========================
   PASSWORD STRENGTH
======================== */
const regPwInput = document.getElementById('regPassword');
if (regPwInput) {
  regPwInput.addEventListener('input', () => {
    const val = regPwInput.value;
    const bar   = document.getElementById('pwBar');
    const label = document.getElementById('pwLabel');
    if (!bar || !label) return;

    let score = 0;
    if (val.length >= 8)          score++;
    if (/[A-Z]/.test(val))        score++;
    if (/[0-9]/.test(val))        score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const levels = [
      { w: '0%',   color: 'transparent', text: '' },
      { w: '25%',  color: '#e05252',     text: 'Weak' },
      { w: '50%',  color: '#e8a838',     text: 'Fair' },
      { w: '75%',  color: '#a3d977',     text: 'Good' },
      { w: '100%', color: '#4fc46a',     text: 'Strong' },
    ];

    const lvl = levels[score];
    bar.style.width = lvl.w;
    bar.style.background = lvl.color;
    label.textContent = lvl.text;
    label.style.color = lvl.color;
  });
}

/* ========================
   REGISTER PAGE
======================== */
const registerForm = document.getElementById('registerForm');
if (registerForm) {

  // Two-step navigation
  const stepOne   = document.getElementById('stepOne');
  const stepTwo   = document.getElementById('stepTwo');
  const step1Dot  = document.getElementById('step1Dot');
  const step2Dot  = document.getElementById('step2Dot');
  const nextBtn   = document.getElementById('nextBtn');
  const backBtn   = document.getElementById('backBtn');

  nextBtn && nextBtn.addEventListener('click', () => {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName  = document.getElementById('lastName').value.trim();
    const email     = document.getElementById('regEmail').value.trim();

    clearErrors('firstNameErr', 'lastNameErr', 'regEmailErr');
    let ok = true;

    if (!firstName) { setFieldError('firstNameErr', 'First name is required'); ok = false; }
    if (!lastName)  { setFieldError('lastNameErr',  'Last name is required');  ok = false; }
    if (!email)     { setFieldError('regEmailErr',  'Email is required');       ok = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFieldError('regEmailErr', 'Enter a valid email'); ok = false;
    } else {
      const users = getUsers();
      if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        setFieldError('regEmailErr', 'Email already registered'); ok = false;
      }
    }

    if (!ok) return;

    stepOne.classList.add('hidden');
    stepTwo.classList.remove('hidden');
    step1Dot.classList.remove('active');
    step2Dot.classList.add('active');
  });

  backBtn && backBtn.addEventListener('click', () => {
    stepTwo.classList.add('hidden');
    stepOne.classList.remove('hidden');
    step2Dot.classList.remove('active');
    step1Dot.classList.add('active');
  });

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName  = document.getElementById('lastName').value.trim();
    const email     = document.getElementById('regEmail').value.trim();
    const password  = document.getElementById('regPassword').value;
    const confirm   = document.getElementById('confirmPassword').value;
    const genre     = document.getElementById('favGenre').value;
    const terms     = document.getElementById('termsCheck').checked;

    clearErrors('regPwErr', 'confirmPwErr', 'termsErr');
    let ok = true;

    if (password.length < 8)  { setFieldError('regPwErr', 'Password must be at least 8 characters'); ok = false; }
    if (password !== confirm)  { setFieldError('confirmPwErr', 'Passwords do not match'); ok = false; }
    if (!terms)                { setFieldError('termsErr', 'You must accept the terms'); ok = false; }
    if (!ok) return;

    // Save user
    const users = getUsers();
    const newUser = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email: email.toLowerCase(),
      password, // In production: hash this! For demo only.
      favGenre: genre,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    saveUsers(users);

    // Auto-login
    const session = { id: newUser.id, firstName, lastName, email: newUser.email, favGenre: genre };
    localStorage.setItem('pt_session', JSON.stringify(session));

    // Show success & redirect
    const btn = document.getElementById('registerBtn');
    btn.querySelector('.btn-text').textContent = 'Creating account…';
    btn.querySelector('.btn-spinner').classList.remove('hidden');
    btn.disabled = true;

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1200);
  });
}

/* ========================
   LOGIN PAGE
======================== */
const loginForm = document.getElementById('loginForm');
if (loginForm) {

  // If already logged in, redirect
  if (localStorage.getItem('pt_session')) {
    window.location.href = 'index.html';
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email    = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    const remember = document.getElementById('rememberMe').checked;

    clearErrors('emailErr', 'pwErr');
    let ok = true;

    if (!email)    { setFieldError('emailErr', 'Email is required'); ok = false; }
    if (!password) { setFieldError('pwErr', 'Password is required'); ok = false; }
    if (!ok) return;

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      showAlert('loginAlert', '❌ Invalid email or password. Please try again.', 'error');
      return;
    }

    // Create session
    const session = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      favGenre: user.favGenre
    };

    if (remember) {
      localStorage.setItem('pt_session', JSON.stringify(session));
    } else {
      sessionStorage.setItem('pt_session', JSON.stringify(session));
    }

    // Show spinner & redirect
    const btn = document.getElementById('loginBtn');
    btn.querySelector('.btn-text').textContent = 'Signing in…';
    btn.querySelector('.btn-spinner').classList.remove('hidden');
    btn.disabled = true;

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  });
}
