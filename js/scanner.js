class QRScanner {
    constructor(parent) {
        this.parent = parent; // Ссылка на основной класс
        this.scannerActive = false;
        this.video = null;
        this.canvas = null;
        this.ctx = null;
    }

    async startCamera() {
        this.video = document.getElementById('camera-feed');
        this.canvas = document.getElementById('qr-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 1280 } // Квадратный формат
                } 
            });
            
            this.video.srcObject = stream;
            this.video.play();
            
            // Ждем, пока видео загрузится
            this.video.onloadedmetadata = () => {
                this.canvas.width = this.video.videoWidth;
                this.canvas.height = this.video.videoHeight;
                this.startQRScanning();
            };
        } catch (err) {
            console.error("Ошибка камеры:", err);
            
            // Показываем пользовательское сообщение
            if (err.name === 'NotAllowedError') {
                alert("Пожалуйста, разрешите доступ к камере для работы приложения.");
            } else if (err.name === 'NotFoundError') {
                alert("Камера не найдена. Пожалуйста, используйте устройство с камерой.");
            } else {
                alert("Ошибка доступа к камере: " + err.message);
            }
        }
    }

    startQRScanning() {
        this.scannerActive = true;
        this.scanFrame();
    }

    scanFrame() {
        if (!this.scannerActive) return;
        
        if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
            this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
            const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            
            if (code) {
                this.handleQRCode(code.data);
                return; // Останавливаем сканирование после нахождения кода
            }
        }
        
        requestAnimationFrame(() => this.scanFrame());
    }

    handleQRCode(qrData) {
        this.stopScanner();
        
        // Определяем тип игры по QR-коду
        const gameType = this.getGameTypeFromQR(qrData);
        
        if (gameType) {
            this.parent.startGame(gameType);
        } else {
            this.parent.showMessage('❌ Неизвестный QR-код. Попробуй другой.');
            // Возобновляем сканирование через 3 секунды
            setTimeout(() => {
                if (this.parent.currentScreen === 'scanner-screen') {
                    this.startQRScanning();
                }
            }, 3000);
        }
    }

    getGameTypeFromQR(qrData) {
        // QR-коды будут содержать тип игры
        // Например: "game:picture", "game:lantern", etc.
        if (qrData.startsWith('game:')) {
            const gameType = qrData.split(':')[1];
            return gameType;
        }
        return null;
    }

    stopScanner() {
        this.scannerActive = false;
        
        if (this.video && this.video.srcObject) {
            const tracks = this.video.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        }
    }

    // Метод для проверки поддержки камеры
    checkCameraSupport() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }
}