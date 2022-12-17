window.onload = function() {
  $('.submit.btn').on('click', (e) => call(e));

  const menuList = document.querySelectorAll('.menu-element');
  menuList.forEach(function(element) {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      const elementLink = element.dataset.link;
      document.getElementById(elementLink).scrollIntoView({ behavior: 'smooth'});
    });
  });
}

function call (e) {
  e.preventDefault();
  const msg = $('#exampleForm').serialize();
  $.ajax({
    // Метод передачи
    type: 'POST',
     // Файл которому передаем запрос и получаем ответ
    url: 'http://localhost:8000/request',
     // Кеширование
    cache: false,
     // Верямя ожидания ответа, в мили секундах 1000 мс = 1 сек
    timeout:3000,
    data: msg,
    // Функция сработает при успешном получении данных
    success: (data) => {
      // Отображаем данные в форме
      $('#result').html('');
      console.log(data);
      showResult(data);
    },
    // Функция срабатывает в период ожидания данных
    beforeSend: (data) => {
      $('#result').html('<p>Ожидание данных...</p>');
    },
     // Тип данных
    dataType:"html",
     // Функция сработает в случае ошибки
    error: (data) => {
      $('#result').html('<p>Возникла неизвестная ошибка. Пожалуйста, попробуйте чуть позже...</p>');
    }
  });
}

function showResult(data) {
	const dataJSON = JSON.parse(data);

	if(dataJSON.result == 'False')
        $('#result').html('<p>Клиент уйдёт' + ' <br> Вероятность правильного ответа = '+ dataJSON.probability + '%</p>');

    else if(dataJSON.result == 'True')
        $('#result').html('<p>Клиент останется' + ' <br> Вероятность правильного ответа = '+ dataJSON.probability + '%</p>');
}
