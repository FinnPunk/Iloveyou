class ValentineGame {
    constructor() {
        this.currentScreen = 'welcome-screen';
        this.gameProgress = JSON.parse(localStorage.getItem('gameProgress')) || {
            picture: false,
            lantern: false,
            watch: false,
            tea: false,
            window: false
        };
        
        // Подключаем модули
        this.gameLogic = new GameLogic(this);
        this.qrScanner = new QRScanner(this);
        
        this.init();
    }

    init() {
        // Инициализация кнопок
        document.getElementById('start-btn').addEventListener('click', () => {
            this.showScreen('scanner-screen');
        });
        
        document.getElementById('back-btn').addEventListener('click', () => {
            this.qrScanner.stopScanner();
            this.showScreen('welcome-screen');
        });

        // Обновляем статусы
        this.updateProgressDisplay();
        
        // Инициализируем плавающие сердечки
        this.initFloatingHearts();
    }

    initFloatingHearts() {
        const container = document.getElementById('floating-hearts-container');
        
        // Создаём плавающие сердечки
        const heartTypes = ['❤️', '💕', '💖', '💘', '💝', '💗', '💓', '💞', '💟'];
        
        setInterval(() => {
            if (Math.random() > 0.7) { // 30% шанс создать сердечко
                const heart = document.createElement('div');
                heart.className = 'floating-heart-bg';
                heart.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];
                heart.style.left = Math.random() * 100 + '%';
                heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
                heart.style.animationDuration = (Math.random() * 10 + 5) + 's';
                
                container.appendChild(heart);
                
                // Удаляем сердечко после анимации
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.remove();
                    }
                }, 15000);
            }
        }, 500);
    }

    showScreen(screenId) {
        // Скрываем все экраны
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Показываем нужный экран
        document.getElementById(screenId).classList.add('active');
        this.currentScreen = screenId;

        // Если это экран сканирования - запускаем камеру
        if (screenId === 'scanner-screen') {
            this.qrScanner.startCamera();
        }
    }

    startGame(gameType) {
        // Проверяем, не пройдена ли игра уже
        if (this.gameProgress[gameType]) {
            this.showMessage('❌ Эта игра уже пройдена!');
            return;
        }
        
        // Сохраняем прогресс
        this.gameProgress[gameType] = true;
        localStorage.setItem('gameProgress', JSON.stringify(this.gameProgress));
        
        // Обновляем отображение
        this.updateProgressDisplay();
        
        // Проверяем, все ли игры пройдены
        this.checkAllGamesCompleted();
        
        // Показываем сообщение
        this.showMessage(`🎮 Игра "${this.getGameName(gameType)}" начата!`);
        
        // Показываем экран игры
        this.showGameScreen(gameType);
    }

    showGameScreen(gameType) {
        this.showScreen('game-screen');
        
        const gameContainer = document.getElementById('current-game');
        
        switch(gameType) {
            case 'picture':
                gameContainer.innerHTML = this.gameLogic.createPictureGame();
                break;
            case 'lantern':
                gameContainer.innerHTML = this.gameLogic.createLanternGame();
                break;
            case 'watch':
                gameContainer.innerHTML = this.gameLogic.createWatchGame();
                break;
            case 'tea':
                gameContainer.innerHTML = this.gameLogic.createTeaGame();
                break;
            case 'window':
                gameContainer.innerHTML = this.gameLogic.createWindowGame();
                break;
            default:
                gameContainer.innerHTML = '<p>Неизвестная игра</p>';
        }
        
        // Запускаем логику игры
        this.gameLogic.initGameLogic(gameType);
    }

    startFinalGame() {
        // Показываем финальную игру
        this.showScreen('game-screen');
        
        const gameContainer = document.getElementById('current-game');
        gameContainer.innerHTML = this.gameLogic.createFinalGame();
        
        // Инициализируем логику финальной игры
        this.gameLogic.initFinalGame();
    }

    restartGame() {
        // Сбрасываем прогресс
        this.gameProgress = {
            picture: false,
            lantern: false,
            watch: false,
            tea: false,
            window: false
        };
        localStorage.removeItem('gameProgress');
        
        // Обновляем отображение
        this.updateProgressDisplay();
        
        // Возвращаемся к главному экрану
        this.showScreen('welcome-screen');
    }

    getGameName(gameType) {
        const names = {
            picture: 'Лови сердечки',
            lantern: 'Зажги фонарики',
            watch: 'Заряди до 100%',
            tea: 'Идеальная температура',
            window: 'Помой окно'
        };
        return names[gameType];
    }

    updateProgressDisplay() {
        const progressMap = document.querySelector('.progress-map');
        
        // Проверяем, все ли игры пройдены
        const allCompleted = Object.values(this.gameProgress).every(completed => completed);
        
        if (allCompleted) {
            // Показываем только одну кнопку "Любит - не любит"
            progressMap.innerHTML = `
                <button id="start-final-game" class="btn" style="margin: 20px auto; display: block; font-size: 1.2rem;">
                    🌼 Запустить "Любит - не любит"
                </button>
            `;
            
            document.getElementById('start-final-game').addEventListener('click', () => {
                this.startFinalGame();
            });
        } else {
            // Показываем обычную карту прогресса
            progressMap.innerHTML = `
                <div class="gift-item">
                    <span class="status" data-gift="picture">${this.gameProgress.picture ? '✅' : '🔒'}</span>
                </div>
                <div class="gift-item">
                    <span class="status" data-gift="lantern">${this.gameProgress.lantern ? '✅' : '🔒'}</span>
                </div>
                <div class="gift-item">
                    <span class="status" data-gift="watch">${this.gameProgress.watch ? '✅' : '🔒'}</span>
                </div>
                <div class="gift-item">
                    <span class="status" data-gift="tea">${this.gameProgress.tea ? '✅' : '🔒'}</span>
                </div>
                <div class="gift-item">
                    <span class="status" data-gift="window">${this.gameProgress.window ? '✅' : '🔒'}</span>
                </div>
            `;
        }
    }

    checkAllGamesCompleted() {
        const allCompleted = Object.values(this.gameProgress).every(completed => completed);
        
        if (allCompleted) {
            // Обновляем отображение
            this.updateProgressDisplay();
        }
    }

    showMessage(text) {
        // Проверяем, нет ли уже активного сообщения
        const existingMessage = document.querySelector('.message-popup');
        if (existingMessage) return;
        
        // Создаем всплывающее сообщение
        const message = document.createElement('div');
        message.className = 'message-popup';
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(39, 174, 96, 0.9);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            z-index: 1000;
            animation: slideDown 0.5s ease;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 3000);
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    new ValentineGame();
});