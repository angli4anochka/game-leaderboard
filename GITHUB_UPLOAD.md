# 📤 Инструкция по загрузке на GitHub

## Шаг 1: Создайте репозиторий на GitHub

1. Откройте https://github.com/angli4anochka
2. Нажмите зеленую кнопку **"New"** или перейдите на https://github.com/new
3. Заполните форму:
   - **Repository name**: `game-leaderboard`
   - **Description**: `Таблица успеваемости класса с игровой системой баллов`
   - Выберите **Public** или **Private**
   - ⚠️ **НЕ** отмечайте "Add a README file"
   - ⚠️ **НЕ** выбирайте .gitignore или License
4. Нажмите **"Create repository"**

## Шаг 2: Загрузите код

После создания репозитория, GitHub покажет страницу с инструкциями.

### Вариант А: Если у вас настроен git с аутентификацией

В терминале выполните:

```bash
# Удалите старый remote если есть
git remote remove origin

# Добавьте ваш репозиторий
git remote add origin https://github.com/angli4anochka/game-leaderboard.git

# Отправьте код
git push -u origin main
```

### Вариант Б: Через веб-интерфейс GitHub

1. На странице нового пустого репозитория нажмите **"uploading an existing file"**
2. Перетащите все файлы из папки `game-leaderboard` (кроме папки `node_modules`)
3. Напишите commit message: "Initial commit"
4. Нажмите **"Commit changes"**

### Вариант В: Используя GitHub Desktop

1. Скачайте GitHub Desktop: https://desktop.github.com/
2. Войдите в свой аккаунт
3. File → Add Local Repository
4. Выберите папку `/mnt/c/Users/angli/LeaderSchoolBoard/game-leaderboard`
5. Publish repository

## Шаг 3: Проверьте результат

После загрузки ваш проект будет доступен по адресу:
https://github.com/angli4anochka/game-leaderboard

## 🎉 Готово!

Теперь ваш проект на GitHub и вы можете:
- Делиться ссылкой
- Работать с ним с любого компьютера
- Совместно разрабатывать с другими

## Дополнительно: GitHub Pages

Чтобы опубликовать приложение онлайн:

1. В репозитории перейдите в Settings → Pages
2. Source: Deploy from a branch
3. Branch: main, folder: / (root)
4. Сохраните

Затем в проекте:
```bash
npm run build
git add dist -f
git commit -m "Add dist for GitHub Pages"
git push
```

Приложение будет доступно по адресу:
https://angli4anochka.github.io/game-leaderboard/