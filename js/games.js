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
            <div id="hearts-container" style="position: relative; height: 300px; background: #f9f9f9; border-radius: 10px; overflow: hidden;">
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
            <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
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
                <img id="robot-window" class="robot-window" src="images/robot.svg" alt="Робот" style="left: 50%; top: 50%;">
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
                <img id="flower-center" src="images/flower.svg" alt="Цветок" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1; width: 80px; height: 80px;">
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

        // Создаём разные цвета сердечек
        const heartColors = ['❤️', '😍', '💕', '💖', '💘', '💝', '💗', '💓', '💞', '💟'];
        const correctColor = '❤️'; // Только красные нужно ловить

        // Создаём сердечки
        const createHeart = () => {
            const heart = document.createElement('div');
            const randomColor = heartColors[Math.floor(Math.random() * heartColors.length)];
            heart.innerHTML = randomColor;
            heart.className = 'heart-game';
            heart.style.position = 'absolute';
            heart.style.fontSize = '2rem';
            heart.style.left = Math.random() * (heartsContainer.offsetWidth - 40) + 'px';
            heart.style.top = Math.random() * (heartsContainer.offsetHeight - 40) + 'px';
            heart.style.zIndex = '10';
            heart.style.userSelect = 'none';

            heart.addEventListener('click', () => {
                if (heart.innerHTML === correctColor && score < 10) {
                    score++;
                    scoreElement.textContent = score;
                    heart.classList.add('correct');
                    
                    if (score >= 10) {
                        setTimeout(() => {
                            this.completeGame('picture');
                        }, 500);
                    }
                } else if (heart.innerHTML !== correctColor) {
                    // Неправильный цвет - убираем без очков
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

        // Создаём 8 фонариков
        for (let i = 0; i < 8; i++) {
            const lantern = document.createElement('img');
            lantern.src = 'images/lantern.svg';
            lantern.alt = 'Фонарик';
            lantern.className = 'lantern';
            lantern.style.width = '50px';
            lantern.style.height = '50px';
            lantern.style.cursor = 'pointer';
            lantern.style.filter = 'brightness(0.5) saturate(0.5)';
            lantern.style.transition = 'all 0.3s ease';
            
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
        let currentLevel = 0;
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
        
        // Устанавливаем начальное положение робота
        robot.style.left = robotX + 'px';
        robot.style.top = robotY + 'px';

        // Функция для создания области очистки
        const createCleanArea = (x, y) => {
            const area = document.createElement('div');
            area.className = 'cleaned-area';
            area.style.left = (x - 20) + 'px';
            area.style.top = (y - 20) + 'px';
            area.style.width = '40px';
            area.style.height = '40px';
            area.style.background = 'linear-gradient(135deg, #ffffff 0%, #f0f8ff 100%)';
            container.appendChild(area);
            cleanedAreas.push(area);
            
            // Обновляем процент очистки
            cleanedPercent = Math.min(100, Math.floor((cleanedAreas.length * 40 * 40) / (container.offsetWidth * container.offsetHeight) * 100));
            percentElement.textContent = cleanedPercent;
            
            if (cleanedPercent >= 90) {
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
            
            robotX = Math.max(20, Math.min(container.offsetWidth - 20, x));
            robotY = Math.max(20, Math.min(container.offsetHeight - 20, y));
            
            robot.style.left = robotX + 'px';
            robot.style.top = robotY + 'px';
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
        });

        container.addEventListener('touchmove', (e) => {
            if (isMoving) {
                e.preventDefault();
                moveRobot(e.touches[0].clientX, e.touches[0].clientY);
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
        
        // Создаём лепестки по кругу
        const centerX = 100;
        const centerY = 100;
        const radius = 80;
        
        for (let i = 0; i < petals; i++) {
            const angle = (i / petals) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            
            const petal = document.createElement('img');
            petal.src = 'images/petal.svg';
            petal.alt = 'Лепесток';
            petal.className = 'petal';
            petal.style.left = x - 15 + 'px';
            petal.style.top = y - 15 + 'px';
            petal.style.width = '30px';
            petal.style.height = '30px';
            petal.style.transform = `rotate(${angle * 180 / Math.PI + 90}deg)`;
            
            petal.addEventListener('click', () => {
                if (!petal.classList.contains('removing')) {
                    petal.classList.add('removing');
                    removedCount++;
                    petalsLeftElement.textContent = petals - removedCount;
                    
                    if (removedCount >= petals) {
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
        }, 3000);
    }
}