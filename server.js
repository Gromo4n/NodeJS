// Импортируем встроенные модули
const http = require('http');
const fs = require('fs');
const path = require('path');

// Определяем порт
const PORT = process.env.PORT || 3000;

// Создаем HTTP-сервер
const server = http.createServer((req, res) => {
    // Определяем путь к запрошенному файлу
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    // Определяем расширение файла
    const extname = path.extname(filePath);

    // Устанавливаем тип контента в зависимости от расширения файла
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.mp3':
            contentType = 'audio/mpeg';
            break;
    }

    // Читаем файл
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Если файл не найден, отправляем index.html (для SPA)
                fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('Server Error: Failed to load index.html');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    }
                });
            } else {
                // Обработка других ошибок
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Успешный ответ
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Запускаем сервер
server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});