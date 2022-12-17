# example_for_course_work
Simple example of how Python backend can works with frontend

Развертывание Python проекта локально:
1) создаём и подключаем виртуальное окружение
	- python -m venv **your_virtual_environment_name**
	- For Linux:
		- source **your_virtual_environment_name**/bin/activate
	- For Windows:
		- **your_virtual_environment_name**\Scripts\activate.bat
2) устанавливаем зависимости: pip install -r requirements.txt
3) запускаем проект uvicorn simple-api:app --reload

Документация и примеры работы доступны по адресу http://127.0.0.1:8000/docs

OpenApi: http://127.0.0.1:8000/openapi.json

Frontend часть расположена в одноимённой папке.
Отправка сообщения на backend и обработка ответа в файле js/script.js
