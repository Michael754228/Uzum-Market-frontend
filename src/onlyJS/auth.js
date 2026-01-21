function openAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function updateUserDisplay() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const loginBtn = document.getElementById('loginBtn');

    if (userData && userData.firstName) {
        if (loginBtn) {

            const actionItem = loginBtn.closest('.actionItem');
            if (actionItem) {
                actionItem.innerHTML = `
                    <a href="/user.html" style="text-decoration: none; color: inherit; display: flex; flex-direction: column; align-items: center;">
                        <img src="/icons/user.svg" alt="" class="icon">
                        <span class="user-name">${userData.firstName}</span>
                    </a>
                `;
            }
        }
    }
}

function handleRegistration(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked')?.value;

    if (!firstName || !lastName || !phone || !password || !gender) {
        alert('Пожалуйста, заполните все поля!');
        return;
    }

    const userData = {
        firstName,
        lastName,
        phone,
        password,
        gender
    };

    localStorage.setItem('userData', JSON.stringify(userData));

    closeAuthModal();
    updateUserDisplay();
    document.getElementById('authForm').reset();
}

document.addEventListener('DOMContentLoaded', () => {

    if (!document.getElementById('authModal')) {
        createAuthModal();
    }

    setTimeout(() => {

        updateUserDisplay();


        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openAuthModal();
            });
        } else {
            console.warn('loginBtn not found!');
        }

        const authForm = document.getElementById('authForm');
        if (authForm) {
            authForm.addEventListener('submit', handleRegistration);
        }

        const modal = document.getElementById('authModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeAuthModal();
                }
            });
        }

        const closeBtn = document.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeAuthModal);
        }
    }, 100);
});

function createAuthModal() {
    const modalHTML = `
        <div id="authModal" class="auth-modal">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h2 class="modal-title">Регистрация</h2>
                <form id="authForm">
                    <div class="form-group">
                        <input type="text" id="firstName" class="form-input" placeholder="Имя" required>
                    </div>
                    <div class="form-group">
                        <input type="text" id="lastName" class="form-input" placeholder="Фамилия" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" id="phone" class="form-input" placeholder="Номер телефона" required>
                    </div>
                    <div class="form-group">
                        <input type="password" id="password" class="form-input" placeholder="Пароль" required>
                    </div>
                    <div class="form-group">
                        <label class="gender-label">Пол:</label>
                        <div class="gender-options">
                            <label class="gender-option">
                                <input type="radio" name="gender" value="male" required>
                                <span>Парень</span>
                            </label>
                            <label class="gender-option">
                                <input type="radio" name="gender" value="female" required>
                                <span>Девушка</span>
                            </label>
                            <label class="gender-option">
                                <input type="radio" name="gender" value="other" required>
                                <span>Не знаю</span>
                            </label>
                        </div>
                    </div>
                    <button type="submit" class="submit-btn">Зарегистрироваться</button>
                </form>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}