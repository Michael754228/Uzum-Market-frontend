document.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
        window.location.href = '/';
        return;
    }

    const userInfoCard = document.getElementById('userInfoCard');
    if (userInfoCard) {
        userInfoCard.innerHTML = `
            <div class="avatar-placeholder">
                 <img src="/icons/user.svg" alt="" style="width: 32px; height: 32px;">
            </div>
            <div class="user-full-name">${userData.firstName} ${userData.lastName}</div>
            <div class="user-detail">${userData.phone}</div>
            <div class="user-detail">${userData.gender === 'male' ? 'Мужской' : userData.gender === 'female' ? 'Женский' : 'Не указан'}</div>
        `;
    }

    const navItems = document.querySelectorAll('.nav-item[data-section]');
    const contentArea = document.getElementById('contentArea');

    function renderSection(section) {
        contentArea.innerHTML = '';

        navItems.forEach(item => item.classList.remove('active'));
        const activeNav = document.querySelector(`.nav-item[data-section="${section}"]`);
        if (activeNav) activeNav.classList.add('active');

        switch (section) {
            case 'orders':
                contentArea.innerHTML = `
                    <h2 class="section-title">Мои заказы</h2>
                    <div style="text-align: center; color: #666; margin-top: 50px;">
                        <img src="/icons/logo.svg" style="width: 60px; filter: grayscale(1); opacity: 0.5; margin-bottom: 20px;">
                        <p>У вас пока нет заказов</p>
                    </div>
                `;
                break;
            case 'reviews':
                contentArea.innerHTML = `
                    <h2 class="section-title">Мои отзывы</h2>
                    <p>У вас пока нет отзывов.</p>
                `;
                break;
            case 'profile':
                renderProfileForm();
                break;
            case 'promos':
                contentArea.innerHTML = `
                    <h2 class="section-title">Промокоды</h2>
                    <p>У вас нет активных промокодов.</p>
                `;
                break;
            default:
                renderSection('orders');
        }
    }

    function renderProfileForm() {
        const currentData = JSON.parse(localStorage.getItem('userData')) || {};

        contentArea.innerHTML = `
            <h2 class="section-title">Настройки профиля</h2>
            <form id="profileSettingsForm" class="profile-form">
                <div class="form-row">
                    <label class="form-label">Имя</label>
                    <input type="text" class="form-input-profile" name="firstName" value="${currentData.firstName || ''}">
                </div>
                <div class="form-row">
                    <label class="form-label">Фамилия</label>
                    <input type="text" class="form-input-profile" name="lastName" value="${currentData.lastName || ''}">
                </div>
                <div class="form-row">
                    <label class="form-label">Телефон</label>
                    <input type="text" class="form-input-profile" name="phone" value="${currentData.phone || ''}" readonly style="background-color: #f0f0f0; color: #888;">
                </div>
                 <div class="form-row">
                    <label class="form-label">Пол</label>
                    <div class="gender-toggle">
                        <button type="button" class="gender-btn ${currentData.gender === 'male' ? 'selected' : ''}" data-value="male">Мужчина</button>
                        <button type="button" class="gender-btn ${currentData.gender === 'female' ? 'selected' : ''}" data-value="female">Женщина</button>
                        <button type="button" class="gender-btn ${currentData.gender === 'other' ? 'selected' : ''}" data-value="other">Не знаю</button>
                    </div>
                    <input type="hidden" name="gender" id="genderInput" value="${currentData.gender || 'male'}">
                </div>

                <div class="form-row" style="margin-top: 40px;">
                    <button type="submit" class="save-btn">Сохранить изменения</button>
                    <button type="button" class="cancel-btn">Отмена</button>
                </div>
                 <button type="button" class="delete-account-btn">Удалить аккаунт</button>
            </form>
        `;

        const genderBtns = contentArea.querySelectorAll('.gender-btn');
        const genderInput = document.getElementById('genderInput');

        genderBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                genderBtns.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                genderInput.value = btn.dataset.value;
            });
        });

        document.getElementById('profileSettingsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);

            const updatedData = {
                ...currentData,
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                gender: formData.get('gender')
            };

            localStorage.setItem('userData', JSON.stringify(updatedData));
            alert('Данные сохранены!');
            location.reload();
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.getAttribute('data-section');
            renderSection(section);
        });
    });

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            const confirmLogout = confirm('Вы уверены, что хотите выйти?');
            if (confirmLogout) {
                localStorage.removeItem('userData');
                window.location.href = '/';
            }
        });
    }
    renderSection('orders');
});