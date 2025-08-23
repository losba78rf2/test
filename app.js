const tg = window.Telegram.WebApp;

// Инициализация приложения
function initApp() {
    // Проверяем, запущено ли в Telegram
    const isTelegram = !!tg.initData;
    
    if (isTelegram) {
        document.body.classList.add('telegram-environment');
        tg.ready();
        tg.expand(); // Полноэкранный режим
        console.log('✅ Запущено в Telegram');
    } else {
        console.log('🌐 Запущено в браузере');
        applyFallbackTheme();
    }
    
    applyTheme();
}

// Показываем нативный Telegram alert
function showTelegramAlert() {
    // Проверяем, в Telegram ли мы
    if (tg.initData) {
        // Нативный Telegram popup
        tg.showPopup({
            title: "Привет, мир! 🌍",
            message: "Это нативный Telegram alert!\nТвое приложение работает отлично!",
            buttons: [
                { 
                    type: "ok", 
                    id: "ok_btn",
                    text: "Круто! 👍"
                },
                {
                    type: "cancel",
                    id: "cancel_btn", 
                    text: "Закрыть"
                }
            ]
        }, function(buttonId) {
            // Обработчик нажатия кнопок в popup
            if (buttonId === 'ok_btn') {
                console.log('Пользователь нажал "Круто!"');
                tg.showAlert('Спасибо за feedback! 🚀');
            } else {
                console.log('Пользователь закрыл alert');
            }
        });
        
    } else {
        // Запасной вариант для браузера
        alert("Привет, мир! 🌍\nВ Telegram здесь будет красивый popup!");
    }
}

// Закрываем приложение
function closeApp() {
    if (tg.initData) {
        tg.close();
    } else {
        alert("Приложение закрылось бы в Telegram");
    }
}

// Применяем тему Telegram
function applyTheme() {
    const theme = tg.themeParams || {};
    
    document.documentElement.style.setProperty('--tg-theme-bg-color', 
        theme.bg_color || '#18222d');
    document.documentElement.style.setProperty('--tg-theme-text-color', 
        theme.text_color || '#ffffff');
    document.documentElement.style.setProperty('--tg-theme-button-color', 
        theme.button_color || '#2ea6ff');
    document.documentElement.style.setProperty('--tg-theme-button-text-color', 
        theme.button_text_color || '#ffffff');
    document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', 
        theme.secondary_bg_color || '#2d4263');
    document.documentElement.style.setProperty('--tg-theme-hint-color', 
        theme.hint_color || '#7c8b9a');
}

// Тема для разработки в браузере
function applyFallbackTheme() {
    tg.themeParams = {
        bg_color: '#18222d',
        text_color: '#ffffff',
        button_color: '#2ea6ff',
        button_text_color: '#ffffff',
        secondary_bg_color: '#2d4263',
        hint_color: '#7c8b9a'
    };
}

// Обработчик изменений темы (если пользователь сменит тему в Telegram)
tg.onEvent('themeChanged', applyTheme);

// Запускаем приложение при загрузке
document.addEventListener('DOMContentLoaded', initApp);

// Покажем информацию о пользователе (если есть)
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    console.log('👤 Пользователь:', tg.initDataUnsafe.user);
}
