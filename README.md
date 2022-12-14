# Тестовое задание для NodeJs разработчика

## Стек:
DB: PostgresSQL
Framework: express, nestJS, Typeorm
## Описание

CRUD для сущностей User и Tags.

[x] **password**: должен содержать как минимум одну цифру, одну заглавную и одну строчную буквы.

[x] **password**: минимальная длинна 8 символов

[x] **creator** uid пользователя создавшего тэг, только он может его менять и удалять из базы

[x] Сделать сервис с REST API и авторизациею по JWT bearer token.

[x] Настроить CORS для доступа с любого origin.

## Обязательные требования

[x] 1) Пароли не хранить в открытом виде

[x] 2) Реализовать валидацию полей на api запросы с кодами ответов и сообщениями об ошибке в теле ответа.

[ ] 3) Развернуть проект в любом удобном месте, что бы можно было прогнать тесты и проверить.

[x] 4) Код на github или gitlab

[x] 5) Придерживаться принципам SOLID

[x] 6) Токен авторизации живет 30 минут

[x] 7) Реализовать endpoint для обновления токена

[x] 8) Создать миграции

[x] 9)Написать сопроводительную документация в README.md для разворота

[x] 10) Реализовать offset или пагинацию для сущности **TAG**

[x] 11) Реализовать Сортировку по полю **sortOrder** и(или) полю **name** для сущности **TAG**


## Дополнительные требования

[x] 1) Использовать DTO

[ ] 2) Писать интерфейсы и реализовывать их

[ ] 3) Желательно не использовать ORM

[ ] 4) Написать DockerFile для приложения

[ ] 5) Написать docker-composer для локального разворота приложения

[ ] 6) Реализовать кеширование

[ ] 7)Покрыть тестами сами api

[x] 8) Добавить генерацию swagger документации для api методов (или написать ручками и положит в проект в директорию /doc)
