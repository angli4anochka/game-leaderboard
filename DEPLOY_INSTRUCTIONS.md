пш# 🚀 Инструкция по публикации на GitHub Pages

## Шаг 1: Отправьте изменения на GitHub

### Вариант А: Через терминал (если настроен git)
```bash
git push origin main
```

### Вариант Б: Через GitHub Desktop
1. Откройте GitHub Desktop
2. Выберите репозиторий `game-leaderboard`
3. Нажмите "Push origin"

### Вариант В: Через веб-интерфейс
1. Откройте папку проекта `C:\Users\angli\LeaderSchoolBoard\game-leaderboard`
2. Скопируйте все файлы (кроме node_modules)
3. Перейдите на https://github.com/angli4anochka/game-leaderboard
4. Нажмите "Upload files"
5. Перетащите файлы
6. Commit changes

## Шаг 2: Настройте GitHub Pages

1. Откройте ваш репозиторий: https://github.com/angli4anochka/game-leaderboard
2. Перейдите в **Settings** (Настройки) - это вкладка в верхней части страницы
3. В левом меню найдите **Pages**
4. В разделе **Build and deployment**:
   - **Source**: выберите **GitHub Actions**
5. Сохраните изменения

## Шаг 3: Запустите деплой

### Автоматический способ:
После пуша на main ветку, GitHub Actions автоматически запустит деплой.

### Ручной способ:
1. Перейдите во вкладку **Actions** в репозитории
2. Слева выберите **Deploy to GitHub Pages**
3. Справа нажмите **Run workflow** → **Run workflow**

## Шаг 4: Проверьте результат

1. Подождите 2-3 минуты пока идет деплой
2. Во вкладке **Actions** убедитесь что workflow завершился успешно (зеленая галочка)
3. Ваше приложение будет доступно по адресу:
   
   ### 🎉 https://angli4anochka.github.io/game-leaderboard/

## Проверка статуса

- **Actions**: https://github.com/angli4anochka/game-leaderboard/actions
- **Deployments**: https://github.com/angli4anochka/game-leaderboard/deployments

## Возможные проблемы

### Если сайт не открывается:
1. Проверьте что GitHub Actions workflow завершился успешно
2. Подождите еще 5 минут (GitHub Pages иногда требует время)
3. Очистите кеш браузера (Ctrl+F5)

### Если есть ошибки в Actions:
1. Проверьте вкладку Actions на наличие красных крестиков
2. Кликните на failed workflow чтобы увидеть детали ошибки

## Обновление сайта

Каждый раз когда вы делаете изменения:
1. Коммитите изменения
2. Пушите на GitHub
3. GitHub Actions автоматически обновит сайт (займет 2-3 минуты)

## Локальная проверка

Перед деплоем можете проверить локально:
```bash
npm run build
npm run preview
```

Откройте http://localhost:4173/game-leaderboard/ для проверки.