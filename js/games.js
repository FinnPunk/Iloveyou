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
            <button id="finish-picture" class="btn" style="margin-top: 15px;">Завершить игру</button>
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
            <button id="charge-battery" class="btn" style="padding: 15px 30px; font-size: 1.2rem;">Заряжай!</button>
        `;
    }

    createTeaGame() {
        return `
            <div class="game-title">
                <h2>🍵 Идеальная температура!</h2>
                <div style="font-size: 2rem;">🌡️</div>
            </div>
            <div class="game-stats">
                <span>Попыток: <span id="attempts">3</span></span>
            </div>
            <div style="text-align: center; margin: 20px 0;">
                <div id="thermometer" style="width: 30px; height: 200px; background: #ddd; border-radius: 15px; margin: 0 auto; position: relative; overflow: hidden;">
                    <div id="temperature-level" style="position: absolute; bottom: 0; width: 100%; background: linear-gradient(to top, #3498db, #2980b9); height: 0%;"></div>
                    <div id="temperature-pointer" style="position: absolute; top: 50%; width: 100%; height: 2px; background: red; z-index: 10;"></div>
                    <div style="position: absolute; top: 25%; width: 100%; height: 2px; background: green;"></div> <!-- Зелёная зона -->
                    <div style="position: absolute; top: 75%; width: 100%; height: 2px; background: green;"></div>
                </div>
            </div>
            <button id="click-temperature" class="btn">Нажми в нужный момент!</button>
        `;
    }

    createWindowGame() {
        return `
            <div class="game-title">
                <h2>🪟 Помой окно!</h2>
                <div style="font-size: 2rem;">🧽</div>
            </div>
            <div id="window-container" style="width: 100%; height: 300px; background: #87CEEB; border-radius: 10px; position: relative; overflow: hidden;">
                <!-- Грязные пятна будут здесь -->
            </div>
            <div class="game-stats">
                <span>Чисто: <span id="cleaned-spots">0</span>/10</span>
            </div>
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
            <div style="text-align: center; margin: 30px 0;">
                <div id="daisy" style="position: relative; width: 200px; height: 200px; margin: 0 auto;">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 4rem; z-index: 1;">🌸</div>
                    <!-- Лепестки будут добавляться сюда -->
                </div>
            </div>
            <div id="result-message" style="margin: 20px 0; font-size: 1.5rem; font-weight: bold; color: #e74c3c; display: none;">
                <!-- Результат появится здесь -->
            </div>
            <button id="pull-petal" class="btn" style="padding: 15px 30px; font-size: 1.2rem; margin: 20px 0;">Сорвать лепесток</button>
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

        // Создаём сердечки
        const createHeart = () => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.fontSize = '2rem';
            heart.style.left = Math.random() * (heartsContainer.offsetWidth - 40) + 'px';
            heart.style.top = Math.random() * (heartsContainer.offsetHeight - 40) + 'px';
            heart.style.cursor = 'pointer';
            heart.style.zIndex = '10';
            heart.style.userSelect = 'none';

            heart.addEventListener('click', () => {
                if (score < 10) {
                    score++;
                    scoreElement.textContent = score;
                    heart.remove();
                    
                    if (score >= 10) {
                        this.completeGame('picture');
                    }
                }
            });

            heartsContainer.appendChild(heart);

            // Удаляем сердечко через 2 секунды если не поймано
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, 2000);
        };

        // Создаём сердечки каждые 500ms
        const heartInterval = setInterval(createHeart, 500);

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
                        this.parent.showScreen('scanner-screen');
                    }, 2000);
                }
            }
        }, 1000);

        // Кнопка завершения (для тестирования)
        document.getElementById('finish-picture').addEventListener('click', () => {
            if (score >= 10) {
                this.completeGame('picture');
            } else {
                this.parent.showMessage('Собери 10 сердечек!');
            }
        });
    }

    initLanternGame() {
        let litCount = 0;
        const container = document.getElementById('lanterns-container');
        const countElement = document.getElementById('lit-lanterns');

        // Создаём 8 фонариков
        for (let i = 0; i < 8; i++) {
            const lantern = document.createElement('div');
            lantern.innerHTML = '🏮';
            lantern.style.fontSize = '2rem';
            lantern.style.cursor = 'pointer';
            lantern.style.opacity = '0.5';
            lantern.style.transition = 'all 0.3s ease';
            
            lantern.addEventListener('click', () => {
                if (lantern.style.opacity !== '1') {
                    lantern.style.opacity = '1';
                    lantern.style.transform = 'scale(1.2)';
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
        const button = document.getElementById('charge-battery');

        button.addEventListener('click', () => {
            charge += 2;
            if (charge > 100) charge = 100;
            
            levelElement.textContent = charge;
            barElement.style.width = charge + '%';
            
            if (charge >= 100) {
                setTimeout(() => {
                    this.completeGame('watch');
                }, 500);
            }
        });
    }

    initTeaGame() {
        let attempts = 3;
        let success = false;
        const attemptsElement = document.getElementById('attempts');
        const pointer = document.getElementById('temperature-pointer');
        const button = document.getElementById('click-temperature');

        // Анимация движения указателя
        let direction = 1;
        let position = 50; // Процент от высоты

        const movePointer = () => {
            if (!success && attempts > 0) {
                position += direction * 2;
                
                if (position >= 90) {
                    direction = -1;
                    position = 90;
                } else if (position <= 10) {
                    direction = 1;
                    position = 10;
                }
                
                pointer.style.top = position + '%';
                
                requestAnimationFrame(movePointer);
            }
        };

        movePointer();

        button.addEventListener('click', () => {
            if (success || attempts <= 0) return;

            // Проверяем, в зелёной ли зоне (между 25% и 75%)
            if (position >= 25 && position <= 75) {
                success = true;
                this.completeGame('tea');
            } else {
                attempts--;
                attemptsElement.textContent = attempts;
                
                if (attempts <= 0) {
                    setTimeout(() => {
                        this.parent.showMessage('❌ Попытки закончились! Попробуй снова.');
                        setTimeout(() => {
                            this.parent.showScreen('scanner-screen');
                        }, 2000);
                    }, 1000);
                }
            }
        });
    }

    initWindowGame() {
        let cleaned = 0;
        const container = document.getElementById('window-container');
        const countElement = document.getElementById('cleaned-spots');
        const spots = [];

        // Создаём 10 грязных пятен
        for (let i = 0; i < 10; i++) {
            const spot = document.createElement('div');
            spot.style.position = 'absolute';
            spot.style.width = '30px';
            spot.style.height = '30px';
            spot.style.backgroundColor = '#8B4513';
            spot.style.borderRadius = '50%';
            spot.style.left = Math.random() * (container.offsetWidth - 30) + 'px';
            spot.style.top = Math.random() * (container.offsetHeight - 30) + 'px';
            spot.style.cursor = 'pointer';
            spot.style.zIndex = '5';

            spot.addEventListener('click', () => {
                if (spot.style.backgroundColor !== 'transparent') {
                    spot.style.backgroundColor = 'transparent';
                    spot.style.border = '2px solid transparent';
                    cleaned++;
                    countElement.textContent = cleaned;
                    
                    if (cleaned >= 10) {
                        setTimeout(() => {
                            this.completeGame('window');
                        }, 1000);
                    }
                }
            });

            container.appendChild(spot);
            spots.push(spot);
        }
    }

    initFinalGame() {
        const daisy = document.getElementById('daisy');
        const petalsLeft = document.getElementById('petals-left');
        const pullButton = document.getElementById('pull-petal');
        const resultMessage = document.getElementById('result-message');
        const finalMessage = document.getElementById('final-message');
        
        let petals = 10;
        let loveCount = 0;
        let hateCount = 0;
        
        // Создаём лепестки
        this.createPetals(daisy, petals);
        
        pullButton.addEventListener('click', () => {
            if (petals > 0) {
                // Удаляем один лепесток
                const petal = daisy.querySelector('.petal');
                if (petal) {
                    // Анимация исчезновения
                    petal.style.animation = 'fadeOut 0.5s ease';
                    setTimeout(() => {
                        petal.remove();
                        
                        petals--;
                        petalsLeft.textContent = petals;
                        
                        // Случайно определяем "любит" или "не любит"
                        const isLove = Math.random() > 0.5;
                        
                        if (isLove) {
                            loveCount++;
                            resultMessage.textContent = 'ЛЮБИТ! ❤️';
                        } else {
                            hateCount++;
                            resultMessage.textContent = 'НЕ ЛЮБИТ... 😢';
                        }
                        
                        resultMessage.style.display = 'block';
                        resultMessage.style.color = isLove ? '#27ae60' : '#e74c3c';
                        
                        // Через 1.5 секунды скрываем результат
                        setTimeout(() => {
                            resultMessage.style.display = 'none';
                            
                            if (petals === 0) {
                                // Все лепестки сорваны - показываем финальное сообщение
                                this.showFinalMessage(loveCount, hateCount);
                            }
                        }, 1500);
                    }, 500);
                }
            }
        });
    }

    createPetals(container, count) {
        const centerX = 100;
        const centerY = 100;
        const radius = 80;
        
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.innerHTML = '瓣';
            petal.style.position = 'absolute';
            petal.style.left = x - 10 + 'px';
            petal.style.top = y - 10 + 'px';
            petal.style.fontSize = '1.5rem';
            petal.style.cursor = 'pointer';
            petal.style.zIndex = '2';
            petal.style.userSelect = 'none';
            petal.style.transition = 'transform 0.3s ease';
            
            petal.addEventListener('mouseover', () => {
                petal.style.transform = 'scale(1.2)';
            });
            
            petal.addEventListener('mouseout', () => {
                petal.style.transform = 'scale(1)';
            });
            
            container.appendChild(petal);
        }
    }

    showFinalMessage(loveCount, hateCount) {
        const pullButton = document.getElementById('pull-petal');
        const finalMessage = document.getElementById('final-message');
        const resultMessage = document.getElementById('result-message');
        
        // Скрываем кнопку
        pullButton.style.display = 'none';
        
        // Показываем результат
        resultMessage.style.display = 'block';
        resultMessage.style.color = '#e74c3c';
        
        if (loveCount >= hateCount) {
            resultMessage.innerHTML = 'ЛЮБИТ! ❤️<br><span style="font-size: 1rem;">(и даже больше, чем ты думаешь)</span>';
        } else {
            resultMessage.innerHTML = 'ВСЁ РАВНО ЛЮБИТ! ❤️<br><span style="font-size: 1rem;">(потому что это игра)</span>';
        }
        
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

        // Возвращаемся к сканеру через 3 секунды
        setTimeout(() => {
            this.parent.showScreen('scanner-screen');
        }, 3000);
    }
}