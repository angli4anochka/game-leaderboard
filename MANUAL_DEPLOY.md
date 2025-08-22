# 🚀 Ручной деплой на GitHub Pages

## Способ 1: Через веб-интерфейс GitHub (САМЫЙ ПРОСТОЙ)

1. **Откройте папку с билдом:**
   ```
   C:\Users\angli\LeaderSchoolBoard\game-leaderboard\dist
   ```

2. **Создайте ветку gh-pages на GitHub:**
   - Откройте https://github.com/angli4anochka/game-leaderboard
   - Нажмите на выпадающее меню "main" (слева вверху)
   - В поле "Find or create a branch" введите: `gh-pages`
   - Нажмите "Create branch: gh-pages from main"

3. **Переключитесь на ветку gh-pages:**
   - В том же меню выберите `gh-pages`

4. **Удалите все файлы:**
   - Нажмите на каждый файл и удалите его через веб-интерфейс
   - Или используйте "Upload files" и загрузите пустую папку

5. **Загрузите файлы из dist:**
   - Нажмите "Upload files"
   - Перетащите ВСЕ файлы из папки `dist` (не саму папку, а её содержимое!)
   - Commit message: "Deploy"
   - Нажмите "Commit changes"

6. **Настройте GitHub Pages:**
   - Откройте https://github.com/angli4anochka/game-leaderboard/settings/pages
   - Source: **Deploy from a branch**
   - Branch: **gh-pages**
   - Folder: **/ (root)**
   - Нажмите Save

7. **Готово!** Через 2-3 минуты сайт будет доступен:
   https://angli4anochka.github.io/game-leaderboard/

## Способ 2: Через PowerShell (если настроен git)

```powershell
# 1. Сначала закоммитьте все изменения
git add .
git commit -m "Update"
git push origin main

# 2. Соберите проект
npm run build

# 3. Деплой на gh-pages
npx gh-pages -d dist
```

## Способ 3: GitHub Desktop + ручная загрузка

1. **В GitHub Desktop:**
   - Создайте новую ветку `gh-pages`
   - Удалите все файлы кроме папки dist
   - Переместите содержимое dist в корень
   - Закоммитьте и запушьте

2. **Настройте GitHub Pages как в способе 1, пункт 6**

## Проверка

- Статус деплоя: https://github.com/angli4anochka/game-leaderboard/deployments
- Ваш сайт: https://angli4anochka.github.io/game-leaderboard/

## Обновление сайта

Каждый раз когда нужно обновить:
1. `npm run build` - собрать новую версию
2. Повторить процесс загрузки файлов из dist в ветку gh-pages