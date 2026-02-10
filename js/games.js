class GameLogic {
    constructor(parent) {
        this.parent = parent; // Ссылка на основной класс
    }

    createPictureGame() {
        return `
            <div class="game-title">
                <h2>🖼️ Лови сердечки!</h2>
                <div class="heart">❤️</div>
            </div>
            <div class="game-stats">
                <span>Счёт: <span id="score">0</span>/10</span>
                <span>Время: <span id="time">30</span>s</span>
            </div>
            <div id="hearts-container" style="position: relative; height: 300px; background: rgba(128, 128, 128, 0.2); border-radius: 10px; overflow: hidden;">
                <!-- Сердечки будут появляться здесь -->
            </div>
        `;
    }

    createLanternGame() {
        return `
            <div class="game-title">
                <h2>🏮 Зажги фонарики!</h2>
                <div style="font-size: 2rem;">🏮</div>
            </div>
            <div class="game-stats">
                <span>Зажжено: <span id="lit-lanterns">0</span>/8</span>
            </div>
            <div id="lanterns-container" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin: 20px 0;">
                <!-- Фонарики будут здесь -->
            </div>
        `;
    }

    createWatchGame() {
        return `
            <div class="game-title">
                <h2>🔋 Заряди до 100%!</h2>
                <div style="font-size: 2rem;">📱</div>
            </div>
            <div class="game-stats">
                <span>Заряд: <span id="battery-level">0</span>%</span>
            </div>
            <div style="background: rgba(128, 128, 128, 0.2); padding: 20px; border-radius: 10px; margin: 20px 0;">
                <div style="width: 100%; height: 30px; background: #ddd; border-radius: 15px; overflow: hidden;">
                    <div id="battery-bar" style="height: 100%; width: 0%; background: linear-gradient(90deg, #27ae60, #2ecc71); transition: width 0.3s;"></div>
                </div>
            </div>
            <div id="bolt-click-area" style="text-align: center; margin: 20px 0;">
                <div id="bolt-icon" class="bolt-icon">⚡</div>
            </div>
        `;
    }

    createTeaGame() {
        return `
            <div class="game-title">
                <h2>🍵 Идеальная температура!</h2>
                <div style="font-size: 2rem;">🌡️</div>
            </div>
            <div class="game-stats">
                <span>Попыток: <span id="attempts">6</span></span>
            </div>
            <div id="thermometers-container" style="margin: 20px 0;">
                <!-- 6 термометров разной сложности -->
            </div>
            <button id="start-tea-game" class="btn">Начать игру!</button>
        `;
    }

    createWindowGame() {
        return `
            <div class="game-title">
                <h2>🪟 Помой окно!</h2>
                <div style="font-size: 2rem;">🧽</div>
            </div>
            <div class="window-game-container">
                <!-- Встроенный SVG-робот (увеличен в 2 раза) -->
                <svg id="robot-window" class="robot-window" width="200" height="400" viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg" style="left: 50%; top: 50%; display: none; position: absolute; transform: scale(2); transform-origin: center;">
                  <!-- Корпус робота -->
                  <path d="
                    M 10 20 
                    C 5 30, 5 170, 10 180 
                    L 90 180 
                    C 95 170, 95 30, 90 20 
                    Z
                  " fill="#F3F4F6" stroke="#D1D5DB" stroke-width="2"/>
                  
                  <!-- Верхняя панель -->
                  <path d="
                    M 25 10 
                    L 75 10 
                    L 75 30 
                    L 25 30 
                    Z
                  " fill="#1F2937" stroke="#111827" stroke-width="1"/>
                  
                  <!-- Дисплей -->
                  <rect x="30" y="15" width="40" height="10" rx="2" fill="#0F172A"/>
                  
                  <!-- Индикаторы -->
                  <circle cx="40" cy="20" r="4" fill="#8B5CF6"/> <!-- Фиолетовый -->
                  <circle cx="50" cy="20" r="4" fill="#EF4444"/> <!-- Красный -->
                  <circle cx="60" cy="20" r="4" fill="#F59E0B"/> <!-- Жёлтый -->
                  
                  <!-- Центральный дисплей -->
                  <circle cx="50" cy="80" r="30" fill="#1F2937" stroke="#374151" stroke-width="2"/>
                  <text x="50" y="84" font-size="8" fill="#F3F4F6" text-anchor="middle" font-family="monospace">LOAD</text>
                  
                  <!-- Ручка слева -->
                  <rect x="5" y="50" width="15" height="20" rx="3" fill="#6B7280"/>
                  <circle cx="12" cy="60" r="5" fill="#374151"/>
                  
                  <!-- Нижняя кнопка -->
                  <circle cx="50" cy="150" r="12" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="2"/>
                  <circle cx="50" cy="150" r="6" fill="#1F2937"/>
                  
                  <!-- Ножки -->
                  <rect x="30" y="185" width="10" height="15" rx="2" fill="#9CA3AF"/>
                  <rect x="60" y="185" width="10" height="15" rx="2" fill="#9CA3AF"/>
                </svg>
            </div>
            <div class="game-stats">
                <span>Чисто: <span id="cleaned-percent">0</span>%</span>
            </div>
            <p>Проведи пальцем по экрану, чтобы управлять роботом</p>
        `;
    }

    createFinalGame() {
        return `
            <div class="game-title">
                <h2>🌼 Любит - не любит</h2>
                <div style="font-size: 3rem; margin: 20px 0;">🌸</div>
            </div>
            <div class="game-stats">
                <span>Осталось лепестков: <span id="petals-left">10</span></span>
            </div>
            <div class="flower-container">
                <!-- Встроенный SVG-цветок -->
                <svg id="flower-center" width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1;">
                  <circle cx="40" cy="40" r="38" fill="#FACC15" stroke="#EAB308" stroke-width="2"/>
                </svg>
                <div id="petals-container"></div>
            </div>
            <div id="result-message" style="margin: 20px 0; font-size: 1.5rem; font-weight: bold; color: #e74c3c; display: none;">
                <!-- Результат появится здесь -->
            </div>
            <div id="final-message" style="margin: 20px 0; display: none; background: rgba(255,255,255,0.9); padding: 15px; border-radius: 10px;">
                <!-- Финальное признание -->
            </div>
        `;
    }

    initGameLogic(gameType) {
        switch(gameType) {
            case 'picture':
                this.initPictureGame();
                break;
            case 'lantern':
                this.initLanternGame();
                break;
            case 'watch':
                this.initWatchGame();
                break;
            case 'tea':
                this.initTeaGame();
                break;
            case 'window':
                this.initWindowGame();
                break;
        }
    }

    initPictureGame() {
        let score = 0;
        let timeLeft = 30;
        const heartsContainer = document.getElementById('hearts-container');
        const scoreElement = document.getElementById('score');
        const timeElement = document.getElementById('time');

        // Создаём разные смайлики, но с высоким шансом красных сердечек
        const heartTypes = [
            { emoji: '❤️', type: 'correct' }, // Красное сердце - правильный ответ
            { emoji: '😍', type: 'wrong' },
            { emoji: '💕', type: 'wrong' },
            { emoji: '💖', type: 'wrong' },
            { emoji: '❤️', type: 'correct' }, // Ещё одно красное
            { emoji: '❤️', type: 'correct' }, // И ещё одно
            { emoji: '❤️', type: 'correct' }, // Много красных!
            { emoji: '💕', type: 'wrong' },
            { emoji: '💖', type: 'wrong' },
            { emoji: '❤️', type: 'correct' }
        ];

        // Создаём сердечки
        const createHeart = () => {
            const heartData = heartTypes[Math.floor(Math.random() * heartTypes.length)];
            const heart = document.createElement('div');
            heart.innerHTML = heartData.emoji;
            heart.className = 'heart-game';
            heart.dataset.type = heartData.type;
            heart.style.position = 'absolute';
            heart.style.fontSize = '2rem';
            heart.style.left = Math.random() * (heartsContainer.offsetWidth - 40) + 'px';
            heart.style.top = Math.random() * (heartsContainer.offsetHeight - 40) + 'px';
            heart.style.zIndex = '10';
            heart.style.userSelect = 'none';

            heart.addEventListener('click', () => {
                if (heart.dataset.type === 'correct' && score < 10) {
                    score++;
                    scoreElement.textContent = score;
                    heart.classList.add('correct');
                    
                    if (score >= 10) {
                        setTimeout(() => {
                            this.completeGame('picture');
                        }, 500);
                    }
                } else if (heart.dataset.type === 'wrong') {
                    // Неправильный - убираем без очков
                    heart.classList.add('correct');
                }
            });

            heartsContainer.appendChild(heart);

            // Удаляем сердечко через 2 секунды если не поймано
            setTimeout(() => {
                if (heart.parentNode && !heart.classList.contains('correct')) {
                    heart.remove();
                }
            }, 2000);
        };

        // Создаём сердечки каждые 300ms (быстрее)
        const heartInterval = setInterval(createHeart, 300);

        // Таймер
        const timer = setInterval(() => {
            timeLeft--;
            timeElement.textContent = timeLeft;

            if (timeLeft <= 0 || score >= 10) {
                clearInterval(timer);
                clearInterval(heartInterval);
                
                if (score >= 10) {
                    this.completeGame('picture');
                } else {
                    this.parent.showMessage('⏰ Время вышло! Попробуй снова.');
                    setTimeout(() => {
                        this.parent.showScreen('welcome-screen');
                    }, 2000);
                }
            }
        }, 1000);
    }

    initLanternGame() {
        let litCount = 0;
        const container = document.getElementById('lanterns-container');
        const countElement = document.getElementById('lit-lanterns');

        // Создаём 8 фонариков как SVG (точные изображения из присланных)
        for (let i = 0; i < 8; i++) {
            const lantern = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            lantern.setAttribute('width', '120');
            lantern.setAttribute('height', '200');
            lantern.setAttribute('viewBox', '0 0 120 200');
            lantern.setAttribute('class', 'lantern');
            lantern.style.cursor = 'pointer';
            lantern.style.filter = 'brightness(0.5) saturate(0.5)';
            lantern.style.transition = 'all 0.3s ease';
            lantern.style.width = '50px';
            lantern.style.height = 'auto';

            // Вставляем точный SVG-код изображения
            lantern.innerHTML = `
              <!-- Крышка -->
              <rect x="45" y="0" width="30" height="15" fill="#F59E0B"/>
              
              <!-- Тело фонарика (красное с сеткой) -->
              <ellipse cx="60" cy="70" rx="55" ry="60" fill="#EF4444"/>
              
              <!-- Сетка (горизонтальные линии) -->
              <g stroke="#DC2626" stroke-width="1">
                <line x1="10" y1="30" x2="110" y2="30"/>
                <line x1="10" y1="40" x2="110" y2="40"/>
                <line x1="10" y1="50" x2="110" y2="50"/>
                <line x1="10" y1="60" x2="110" y2="60"/>
                <line x1="10" y1="70" x2="110" y2="70"/>
                <line x1="10" y1="80" x2="110" y2="80"/>
                <line x1="10" y1="90" x2="110" y2="90"/>
                <line x1="10" y1="100" x2="110" y2="100"/>
                <line x1="10" y1="110" x2="110" y2="110"/>
              </g>
              
              <!-- Сетка (вертикальные линии) -->
              <g stroke="#DC2626" stroke-width="1">
                <line x1="20" y1="20" x2="20" y2="120"/>
                <line x1="30" y1="20" x2="30" y2="120"/>
                <line x1="40" y1="20" x2="40" y2="120"/>
                <line x1="50" y1="20" x2="50" y2="120"/>
                <line x1="60" y1="20" x2="60" y2="120"/>
                <line x1="70" y1="20" x2="70" y2="120"/>
                <line x1="80" y1="20" x2="80" y2="120"/>
                <line x1="90" y1="20" x2="90" y2="120"/>
                <line x1="100" y1="20" x2="100" y2="120"/>
              </g>
              
              <!-- Золотая нижняя часть (узор) -->
              <path d="
                M 15 120 
                Q 30 110, 45 120 
                Q 60 130, 75 120 
                Q 90 110, 105 120 
                L 105 125 
                L 15 125 Z
              " fill="#F59E0B" stroke="#D97706" stroke-width="1"/>
              
              <!-- Кисточка (золотые нити) -->
              <g fill="#F59E0B">
                <rect x="55" y="125" width="10" height="40" rx="2"/>
                <rect x="57" y="125" width="2" height="40" fill="#D97706"/>
                <rect x="59" y="125" width="2" height="40" fill="#D97706"/>
                <rect x="61" y="125" width="2" height="40" fill="#D97706"/>
                <rect x="63" y="125" width="2" height="40" fill="#D97706"/>
                <rect x="65" y="125" width="2" height="40" fill="#D97706"/>
              </g>
              
              <!-- Подвеска (зелёный шарик) -->
              <circle cx="60" cy="170" r="8" fill="#16A34A"/>
              
              <!-- Нижняя кисточка (длинная) -->
              <g fill="#F59E0B">
                <rect x="52" y="175" width="16" height="60" rx="2"/>
                <rect x="54" y="175" width="2" height="60" fill="#D97706"/>
                <rect x="56" y="175" width="2" height="60" fill="#D97706"/>
                <rect x="58" y="175" width="2" height="60" fill="#D97706"/>
                <rect x="60" y="175" width="2" height="60" fill="#D97706"/>
                <rect x="62" y="175" width="2" height="60" fill="#D97706"/>
                <rect x="64" y="175" width="2" height="60" fill="#D97706"/>
              </g>
            `;

            lantern.addEventListener('click', () => {
                if (!lantern.classList.contains('active')) {
                    lantern.classList.add('active');
                    litCount++;
                    countElement.textContent = litCount;
                    
                    if (litCount >= 8) {
                        setTimeout(() => {
                            this.completeGame('lantern');
                        }, 1000);
                    }
                }
            });
            
            container.appendChild(lantern);
        }
    }

    initWatchGame() {
        let charge = 0;
        const levelElement = document.getElementById('battery-level');
        const barElement = document.getElementById('battery-bar');
        const boltIcon = document.getElementById('bolt-icon');

        boltIcon.addEventListener('click', () => {
            boltIcon.classList.add('charging');
            charge += 2;
            if (charge > 100) charge = 100;
            
            levelElement.textContent = charge;
            barElement.style.width = charge + '%';
            
            setTimeout(() => {
                boltIcon.classList.remove('charging');
            }, 300);
            
            if (charge >= 100) {
                setTimeout(() => {
                    this.completeGame('watch');
                }, 500);
            }
        });
    }

    initTeaGame() {
        const container = document.getElementById('thermometers-container');
        const startBtn = document.getElementById('start-tea-game');
        const attemptsElement = document.getElementById('attempts');
        
        let attempts = 6;
        let successCount = 0;

        // Создаём 6 уровней сложности
        const levels = [
            { target: 50, width: 60, label: "Очень легко" }, // Широкая зона
            { target: 30, width: 40, label: "Легко" },
            { target: 50, width: 30, label: "Средне" },
            { target: 70, width: 25, label: "Сложно" },
            { target: 25, width: 20, label: "Очень сложно" },
            { target: 50, width: 15, label: "Эксперт" } // Очень узкая зона
        ];

        // Создаём термометры
        levels.forEach((level, index) => {
            const thermometerDiv = document.createElement('div');
            thermometerDiv.innerHTML = `
                <div style="margin: 10px 0; text-align: center;">
                    <div style="margin-bottom: 5px; font-weight: bold;">${level.label}</div>
                    <div class="thermometer-line">
                        <div class="target-zone" style="left: ${level.target - level.width/2}%; width: ${level.width}%;"></div>
                        <div class="temperature-pointer" style="left: 50%;"></div>
                    </div>
                    <div style="margin-top: 5px;">
                        <button class="btn btn-tea-level" data-index="${index}">Нажми!</button>
                    </div>
                </div>
            `;
            container.appendChild(thermometerDiv);
        });

        // Анимация движения указателя для каждого уровня
        const pointers = container.querySelectorAll('.temperature-pointer');
        const levelButtons = container.querySelectorAll('.btn-tea-level');
        
        let animations = {};
        
        const animatePointer = (index) => {
            let position = Math.random() * 100;
            let direction = Math.random() > 0.5 ? 1 : -1;
            
            const movePointer = () => {
                if (animations[index]) {
                    position += direction * 2;
                    
                    if (position >= 100) {
                        direction = -1;
                        position = 100;
                    } else if (position <= 0) {
                        direction = 1;
                        position = 0;
                    }
                    
                    pointers[index].style.left = position + '%';
                    
                    requestAnimationFrame(movePointer);
                }
            };
            
            movePointer();
        };

        // Запускаем анимации для всех уровней
        pointers.forEach((_, index) => {
            animations[index] = true;
            animatePointer(index);
        });

        // Обработчик нажатий на уровни
        levelButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                if (animations[index]) {
                    const targetZone = btn.parentElement.previousElementSibling.querySelector('.target-zone');
                    const targetLeft = parseFloat(targetZone.style.left);
                    const targetWidth = parseFloat(targetZone.style.width);
                    const currentPos = parseFloat(pointers[index].style.left);
                    
                    // Проверяем, в зелёной ли зоне
                    if (currentPos >= targetLeft && currentPos <= (targetLeft + targetWidth)) {
                        successCount++;
                        btn.disabled = true;
                        btn.textContent = '✅';
                        btn.style.background = '#27ae60';
                        
                        // Останавливаем анимацию для этого уровня
                        animations[index] = false;
                        
                        // Проверяем, все ли уровни пройдены
                        if (successCount >= 6) {
                            this.completeGame('tea');
                        }
                    } else {
                        attempts--;
                        attemptsElement.textContent = attempts;
                        
                        if (attempts <= 0) {
                            this.parent.showMessage('❌ Попытки закончились! Попробуй снова.');
                            setTimeout(() => {
                                this.parent.showScreen('welcome-screen');
                            }, 2000);
                        }
                    }
                }
            });
        });

        startBtn.addEventListener('click', () => {
            startBtn.style.display = 'none';
        });
    }

    initWindowGame() {
        const container = document.querySelector('.window-game-container');
        const robot = document.getElementById('robot-window');
        const percentElement = document.getElementById('cleaned-percent');
        
        let cleanedAreas = [];
        let cleanedPercent = 0;
        let robotX = container.offsetWidth / 2;
        let robotY = container.offsetHeight / 2;
        let totalArea = container.offsetWidth * container.offsetHeight;
        
        // Показываем робота (увеличенный)
        robot.style.display = 'block';
        robot.style.left = (robotX - 50) + 'px'; // центрируем
        robot.style.top = (robotY - 100) + 'px'; // центрируем
        
        // Увеличиваем порог очистки до 90% и увеличиваем размер области очистки
        const cleanRadius = 60; // увеличенный радиус очистки
        const requiredCleanPercent = 90; // порог

        // Функция для создания области очистки
        const createCleanArea = (x, y) => {
            const area = document.createElement('div');
            area.className = 'cleaned-area';
            area.style.left = (x - cleanRadius/2) + 'px';
            area.style.top = (y - cleanRadius/2) + 'px';
            area.style.width = cleanRadius + 'px';
            area.style.height = cleanRadius + 'px';
            area.style.background = 'linear-gradient(135deg, #ffffff 0%, #f0f8ff 100%)';
            container.appendChild(area);
            cleanedAreas.push(area);
            
            // Обновляем процент очистки
            let totalCleaned = 0;
            cleanedAreas.forEach(area => {
                totalCleaned += cleanRadius * cleanRadius; // площадь каждой области
            });
            
            cleanedPercent = Math.min(100, Math.floor((totalCleaned / totalArea) * 100));
            percentElement.textContent = cleanedPercent;
            
            if (cleanedPercent >= requiredCleanPercent) {
                setTimeout(() => {
                    this.completeGame('window');
                }, 1000);
            }
        };

        // Обработчик движения
        let isMoving = false;
        
        const moveRobot = (clientX, clientY) => {
            const rect = container.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            
            robotX = Math.max(50, Math.min(container.offsetWidth - 50, x)); // учитываем размер робота
            robotY = Math.max(100, Math.min(container.offsetHeight - 100, y)); // учитываем размер робота
            
            robot.style.left = (robotX - 50) + 'px'; // центрируем
            robot.style.top = (robotY - 100) + 'px'; // центрируем
            robot.classList.add('moving');
            
            // Создаём область очистки
            createCleanArea(robotX, robotY);
            
            setTimeout(() => {
                robot.classList.remove('moving');
            }, 100);
        };

        // Touch events для мобильных устройств
        container.addEventListener('touchstart', (e) => {
            isMoving = true;
            moveRobot(e.touches[0].clientX, e.touches[0].clientY);
            e.preventDefault();
        });

        container.addEventListener('touchmove', (e) => {
            if (isMoving) {
                moveRobot(e.touches[0].clientX, e.touches[0].clientY);
                e.preventDefault();
            }
        });

        container.addEventListener('touchend', () => {
            isMoving = false;
        });

        // Mouse events для десктопа
        container.addEventListener('mousedown', (e) => {
            isMoving = true;
            moveRobot(e.clientX, e.clientY);
        });

        container.addEventListener('mousemove', (e) => {
            if (isMoving) {
                moveRobot(e.clientX, e.clientY);
            }
        });

        container.addEventListener('mouseup', () => {
            isMoving = false;
        });

        container.addEventListener('mouseleave', () => {
            isMoving = false;
        });
    }

    initFinalGame() {
        const petalsContainer = document.getElementById('petals-container');
        const petalsLeftElement = document.getElementById('petals-left');
        const resultMessage = document.getElementById('result-message');
        
        let petals = 10;
        let removedCount = 0;
        
        // Создаём лепестки по кругу (как на нормальных цветках)
        const centerX = 100;
        const centerY = 100;
        const radius = 80; // расстояние от центра до основания лепестка
        
        for (let i = 0; i < petals; i++) {
            const angle = (i / petals) * 2 * Math.PI; // равномерное распределение
            const baseX = centerX + radius * Math.cos(angle); // основание лепестка у цветка
            const baseY = centerY + radius * Math.sin(angle);
            const tipX = centerX + (radius + 60) * Math.cos(angle); // кончик лепестка дальше
            const tipY = centerY + (radius + 60) * Math.sin(angle);
            
            // Создаём SVG-элемент лепестка
            const petal = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            petal.setAttribute('width', '60');
            petal.setAttribute('height', '120');
            petal.setAttribute('viewBox', '0 0 60 120');
            petal.setAttribute('class', 'petal');
            petal.style.position = 'absolute';
            petal.style.left = baseX - 30 + 'px';
            petal.style.top = baseY - 60 + 'px';
            petal.style.cursor = 'pointer';
            petal.style.transform = `rotate(${angle * 180 / Math.PI}deg)`; // поворачиваем лепесток
            petal.style.transformOrigin = '30px 60px'; // вращаем относительно центра лепестка
            
            // Вставляем точный SVG-код лепестка (ориентирован правильно)
            petal.innerHTML = `
              <path d="
                M 30 60 
                C 45 30, 55 0, 30 0 
                C 5 0, 15 30, 30 60
              " fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
            `;

            petal.addEventListener('click', () => {
                if (!petal.classList.contains('removing')) {
                    petal.classList.add('removing');
                    removedCount++;
                    petalsLeftElement.textContent = petals - removedCount;
                    
                    if (removedCount >= petals) {
                        // Убираем обработчики, чтобы не вызывались лишние разы
                        const allPetals = document.querySelectorAll('.petal');
                        allPetals.forEach(p => {
                            p.removeEventListener('click', arguments.callee);
                        });
                        
                        setTimeout(() => {
                            this.showFinalMessage();
                        }, 500);
                    }
                }
            });
            
            petalsContainer.appendChild(petal);
        }
    }

    showFinalMessage() {
        const finalMessage = document.getElementById('final-message');
        const resultMessage = document.getElementById('result-message');
        
        // Показываем результат
        resultMessage.style.display = 'block';
        resultMessage.style.color = '#e74c3c';
        resultMessage.innerHTML = 'ЛЮБИТ! ❤️<br><span style="font-size: 1rem;">(и даже больше, чем ты думаешь)</span>';
        
        // Анимация появления результата
        resultMessage.style.animation = 'pulse 0.5s ease';
        
        // Финальное признание
        const loveMessages = [
            "Ты - самое лучшее, что случилось в моей жизни.",
            "Каждый день с тобой - это подарок, который я ценю.",
            "Твоя улыбка делает мой мир ярче.",
            "Я благодарен судьбе за то, что ты есть у меня.",
            "С тобой я чувствую себя лучше, чем когда-либо.",
            "Ты вдохновляешь меня быть лучше каждый день.",
            "Люблю тебя больше, чем могу выразить словами.",
            "Ты - моя любовь, моя поддержка, моя радость."
        ];
        
        // Показываем сообщение через 2 секунды
        setTimeout(() => {
            finalMessage.innerHTML = `
                <h3>💕 Мое признание 💕</h3>
                <p>${loveMessages[Math.floor(Math.random() * loveMessages.length)]}</p>
                <p>С Днём Святого Валентина, моя любовь! ❤️</p>
                <p>Пусть эта игра напомнит тебе, как сильно я тебя люблю.</p>
                <div style="margin: 20px 0; animation: float 3s ease-in-out infinite;">
                    <div style="font-size: 2rem;">💖💖💖</div>
                </div>
                <button id="restart-game" class="btn" style="margin-top: 20px;">Начать заново</button>
            `;
            finalMessage.style.display = 'block';
            
            // Анимация появления финального сообщения
            finalMessage.style.animation = 'fadeIn 1s ease';
            
            // Кнопка перезапуска
            document.getElementById('restart-game').addEventListener('click', () => {
                this.parent.restartGame();
            });
        }, 2000);
    }

    completeGame(gameType) {
        // Проверяем, не была ли игра уже завершена
        if (this.alreadyCompleted) return;
        this.alreadyCompleted = true;
        
        // Показываем сообщение о завершении
        const messages = {
            picture: 'Когда я подарил тебе картину, я знал, что ты изменишь мою жизнь. Спасибо за это!',
            lantern: 'Этот фонарик напоминает мне о твоей любви к Японии и о том, как ты светишься от счастья.',
            watch: 'Я хочу, чтобы ты всегда была в безопасности и чтобы я мог быть рядом, даже когда мы далеко.',
            tea: 'Пусть каждый твой чайный момент будет наполнен спокойствием и любовью.',
            window: 'Этот робот - символ моего желания, чтобы ты не уставала и имела время для себя.'
        };

        this.parent.showMessage('🎉 Игра завершена! 🎉');
        
        // Показываем сообщение через 1.5 секунды
        setTimeout(() => {
            alert(messages[gameType]);
        }, 1500);

        // Возвращаемся на главный экран через 3 секунды
        setTimeout(() => {
            this.parent.showScreen('welcome-screen');
            // Сбрасываем флаг завершения
            delete this.alreadyCompleted;
        }, 3000);
    }
}