const jsonFilePath = '/templates/shaper_helixultimate/json/zhemchug/zhemchug_data.json';
const scriptURL = 'https://script.google.com/macros/s/AKfycbzWyEAmqpTCNlpF8fUr9XKyUjiHrt-Aabvxz3tgc5ccOsy4J9_R-7yry2YWDQ97S_va/exec';

const form = document.forms['rsvp'];
const form2 = document.forms['question'];
const null_value = '0';

function submityes() {
    let quantity = document.getElementById('quantity');
    document.getElementById('rsvp_errors').style.display = 'none';
    document.getElementById('rsvp_null').style.display = 'none';
    const FormNew = new FormData(form);
    FormNew.append('Form', 'rsvp-yes');
    const null_value = '0';
    const textbox_all = form.querySelectorAll('input[type="text"]');
    for (let box of textbox_all) {
        if (!box.value) {
            document.getElementById('rsvp_null').style.display = 'block';
            return false;
            null_value = '1';
        }
    }
    if (null_value == 0) {
        if ((Number.isInteger(Number(quantity.value))) && (Number(quantity.value) <= 10) && (Number(quantity.value) >= 1)) {
            fetch(scriptURL, {
                    method: 'POST',
                    body: FormNew
                })
                .then(response => console.log('Success!', response))
                .catch(error => console.error('Error!', error.message))

            var textboxesall = document.querySelectorAll('input[type="text"]');
            textboxesall.forEach(function(text) {
                text.value = '';
            });
            document.getElementById('rsvp_container').style.display = 'none';
            document.getElementById('rsvp-answ-yes').style.display = 'block';
        } else {
            quantity.style.background = '#e75e7442';
            quantity.style.border = '1px solid #ff0026';
            document.getElementById('rsvp_errors').style.display = 'block';
        }
    }
}

function submitno() {
    let quantity = document.getElementById('quantity');
    document.getElementById('rsvp_errors').style.display = 'none';
    document.getElementById('rsvp_null').style.display = 'none';

    const FormNew = new FormData(form);
    FormNew.append('Form', 'rsvp-no');
    const null_value = '0';
    const textbox_all = form.querySelectorAll('input[type="text"]');
    for (let box of textbox_all) {
        if (!box.value) {
            document.getElementById('rsvp_null').style.display = 'block';
            return false;
            null_value = '1';
        }
    }
    if (null_value == 0) {
        if ((Number.isInteger(Number(quantity.value))) && (Number(quantity.value) <= 10) && (Number(quantity.value) >= 1)) {
            fetch(scriptURL, {
                    method: 'POST',
                    body: FormNew
                })
                .then(response => console.log('Success!', response))
                .catch(error => console.error('Error!', error.message))
            var textboxesall = document.querySelectorAll('input[type="text"]');
            textboxesall.forEach(function(text) {
                text.value = '';
            });
            document.getElementById('rsvp_container').style.display = 'none';
            document.getElementById('rsvp-answ-no').style.display = 'block';

        } else {
            quantity.style.background = '#ff65001c';
            quantity.style.border = '1px solid #ff6500';
            document.getElementById('rsvp_errors').style.display = 'block';
        }
    }
}

function submitquestion() {
    document.getElementById('answ_good').style.display = 'none';
    document.getElementById('answ_null').style.display = 'none';
    const form2 = document.forms['question'];
    const FormNew = new FormData(form2);
    const checkboxes = form2.querySelectorAll('input[type="checkbox"]:checked');
    let checkboxValues = '';

    checkboxes.forEach((checkbox, index) => {
        checkboxValues += checkbox.value;
        if (index < checkboxes.length - 1) {
            checkboxValues += ', ';
        }
    });
    const null_value = '0';
    FormNew.append('Form', 'question');
    FormNew.append('Предпочтения в еде', checkboxValues);

    const textbox_all = form2.querySelectorAll('input[type="text"]');
    for (let box of textbox_all) {
        if (!box.value) {
            document.getElementById('answ_null').style.display = 'block';
            return false;
            null_value = '1';
        }
    }
    if (null_value == 0) {
        fetch(scriptURL, {
                method: 'POST',
                body: FormNew
            })
            .then(response => console.log('Success!', response))
            .catch(error => console.error('Error!', error.message))
        var textboxesall = document.querySelectorAll('input[type="text"]');
        textboxesall.forEach(function(text) {
            text.value = '';
        });
        var checkboxesall = document.querySelectorAll('input[type="checkbox"]');
        checkboxesall.forEach(function(check) {
            check.checked = false;
        });
        var allRadiobuttons = document.querySelectorAll('input[type="radio"]');
        allRadiobuttons.forEach(function(radioButton) {
            radioButton.checked = false;
        });

        document.getElementById('answ_good').style.display = 'block';
    }
}

const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

function generateCalendar(year, month, weddingDay) {
  const calendarContainer = document.querySelector(".date-calendar");
  calendarContainer.innerHTML = ""; // Очистить предыдущий календарь

  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const monthName = monthNames[month - 1];
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const daysInMonth = lastDay.getDate();
  let firstDayOfWeek = firstDay.getDay(); // 0 (Вс) - 6 (Сб)

 // Корректный сдвиг первого дня недели на понедельник
firstDayOfWeek = (firstDayOfWeek === 0) ? 6 : firstDayOfWeek - 1;
  
  

  // Создаем заголовок календаря (месяц, год)
  const calendarHeader = document.createElement("h3");
  calendarHeader.textContent = `${monthName}, ${year}`;
  calendarContainer.appendChild(calendarHeader);

  // Создаем таблицу для календаря
  const calendarTable = document.createElement("table");
  calendarContainer.appendChild(calendarTable);

  // Создаем строку для дней недели
  const daysOfWeekRow = document.createElement("tr");
const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  for (let i = 0; i < 7; i++) {
    const dayOfWeekCell = document.createElement("th");
    dayOfWeekCell.textContent = daysOfWeek[i];
    daysOfWeekRow.appendChild(dayOfWeekCell);
  }
  calendarTable.appendChild(daysOfWeekRow);

  // Создаем строки и ячейки для дней месяца
  let dayCounter = 1;
   let weekCounter = 0; //добавляем переменную для подсчета недель
  for (let i = 0;  ; i++) { 
    const weekRow = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      const dayCell = document.createElement("td");
      if (i === 0 && j < firstDayOfWeek) {
        // Пустые ячейки до первого дня месяца
        dayCell.textContent = "";
      } else if (dayCounter <= daysInMonth) {
        dayCell.textContent = dayCounter;
        if (dayCounter === weddingDay) {
          // Отмечаем день свадьбы
          dayCell.classList.add("wedding-day");
        }
        dayCounter++;
      } else {
        // Пустые ячейки после последнего дня месяца
        dayCell.textContent = "";
      }
      weekRow.appendChild(dayCell);
    }
    calendarTable.appendChild(weekRow);
    weekCounter++; // Увеличиваем счетчик недель
    if (dayCounter > daysInMonth) {
      break; // Завершаем цикл, если все дни месяца отрисованы
    }
  }
}
document.addEventListener('DOMContentLoaded', function() {



fetch(jsonFilePath)
    .then(response => response.json())
    .then(data => {
        const {
            showDresscodeColors,
            separateDresscode,
            showPinterestLink,
            showDresscodeColorsMen,
            menShowPinterestLink,
            showDresscodeColorsWomen,
            womenShowPinterestLink,
            showDetails,
            showRsvp,
            showTimeline,
            showQuestions,
            showDresscode
        } = data.checkboxes;

        const dateParts = data.date.split('-');
        const dayWithZero = dateParts[2];
        const day = parseInt(dateParts[2], 10);
        const monthNumberWithZero = dateParts[1];
        const monthNumber = parseInt(dateParts[1], 10);
        const year = dateParts[0].slice(-2);
        const fullYear = dateParts[0];
        const dayOfWeek = data.dayOfWeek.toLowerCase();
        const timeArParts = data.time.guestsArrival.split(':');
        const timeArPartsOne = timeArParts[0];
        const monthName = months[monthNumber - 1];
        document.getElementById('wedding_day').textContent = data.date;
         document.getElementById('groom').textContent = data.names.groom;
           document.getElementById('bride').textContent = data.names.bride;
          document.getElementById('groom-footer').innerHTML = `${data.names.groom}`;
           document.getElementById('bride-footer').innerHTML = `${data.names.bride}`;
        
      /*  
        document.getElementById('date-main').innerHTML = `${day} ${monthName} ${fullYear} года`;*/

 // Получаем дату из JSON
  const weddingDateString = data.date; // Предполагаем, что data.date имеет формат "YYYY-MM-DD"
  const datePartsCalendar = weddingDateString.split("-");
  const yearCalendar = parseInt(datePartsCalendar[0]);
  const monthCalendar = parseInt(datePartsCalendar[1]); // Месяцы в JavaScript начинаются с 0
  const weddingDayCalendar = parseInt(datePartsCalendar[2]);

  generateCalendar(yearCalendar, monthCalendar, weddingDayCalendar);

    document.getElementById('welcome-text').innerHTML = `${data.texts.welcome}`;

document.querySelector('.date-welcome').textContent = `${day} ${monthName}`;

        

        
   var audio = document.getElementById("backgroundAudio");
    var playButton = document.getElementById("playButton");
    var isPlaying = false;

    playButton.addEventListener('click', function() {
        if (!isPlaying) {
            audio.muted = false;
            audio.play().catch(function(error) {
                console.error("Ошибка воспроизведения:", error);
            });
            playButton.src = "/images/sites/music-off2.png"; // Изображение выключенного динамика
            playButton.alt = "Выключить музыку";
            isPlaying = true;
            document.getElementById("music-text").textContent="Выключить музыку";
            
        } else {
            audio.pause();
            playButton.src = "/images/sites/music-on2.png"; // Изображение включенного динамика
            playButton.alt = "Включить музыку";
            isPlaying = false;
             document.getElementById("music-text").textContent="Включить музыку";
        }
    });    
      

        const detailsContainer = document.getElementById('details-container');
        detailsContainer.innerHTML = '';
       data.texts.details.forEach((detailText, index) => {
    const detailBlock = document.createElement('div');
    detailBlock.innerHTML = `<p class="details__text">${detailText}</p>`;
    detailsContainer.appendChild(detailBlock);

    // Добавляем картинку после каждого блока, кроме последнего
    if (index < data.texts.details.length - 1) {
        const img = document.createElement('img');
        img.src = "/images/sites/zhemchug/pearl-mini-01.png";
        img.classList.add('timetable-line-img');
        detailsContainer.appendChild(img);
    }
});

        const registrationPlace = document.getElementById('place-one');
        const banquetPlace = document.getElementById('place-two');
        const registrationTitle = document.getElementById('registration-title');

        if (data.placesMode === 1) {
            banquetPlace.style.display = 'none';
            registrationTitle.style.display = 'none';
            registrationPlace.style.display = 'block';
            registrationTitle.textContent = data.texts.WhereTitle;
            document.getElementById('registration-name').textContent = data.places.banquet.name;
            document.getElementById('registration-address').textContent = data.places.banquet.address;
            document.getElementById('registration-time').textContent = `Начало в ${data.time.registrationStart}`;

        } else if (data.placesMode === 2) {
            banquetPlace.style.display = 'block';
            registrationPlace.style.display = 'block';
            document.getElementById('registration-name').textContent = data.places.registration.name;
            document.getElementById('registration-address').textContent = data.places.registration.address;
            document.getElementById('registration-time').textContent = `Начало в ${data.time.registrationStart}`;
            document.getElementById('banquet-time').textContent = `Начало в ${data.time.banquetStart}`;
            document.getElementById('banquet-title').textContent = data.texts.banquetTitle;
            registrationTitle.textContent = data.texts.registrationTitle;
            document.getElementById('banquet-name').textContent = data.places.banquet.name;
            document.getElementById('banquet-address').textContent = data.places.banquet.address;
        }
        /*
        document.querySelector('.rsvp__text').textContent = `Пожалуйста, подтвердите ваше присутствие на нашем празднике до ${data.rsvpDate} любым удобным для вас способом или заполните форму ниже:`;
*/
        const questionForm = document.getElementById('question');
        data.questions.forEach((question, index) => {
            const questionString = document.createElement('p');
            questionString.classList.add('question__string');
            const label = document.createElement('label');
            label.classList.add('question__label-input');
            label.classList.add('opros-grup-title');
            label.textContent = question.label;
            

            if (question.type === 'radio' || question.type === 'checkbox') {
                questionString.appendChild(label);
                const fieldset = document.createElement('fieldset');
                fieldset.classList.add('question__string');
                fieldset.classList.add('options');
                question.options.forEach((option, optionIndex) => {
                    const optionLabel = document.createElement('label');
                    optionLabel.classList.add('question__label');
                    optionLabel.setAttribute('for', `${option.value}-${index}`);

                    const input = document.createElement('input');
                    input.classList.add('question__unvisible');
                    input.type = question.type;
                    input.name = question.label;
                    input.id = `${option.value}-${index}`;
                    input.value = option.value;
                    if (question.type === 'radio' && optionIndex === 0) {
                        input.checked = true;
                    }
                    optionLabel.appendChild(input);

                    const visibleInput = document.createElement('span');
                    visibleInput.classList.add('question__visible-' + question.type);
                    optionLabel.appendChild(visibleInput);

                    const textSpan = document.createElement('span');
                    textSpan.classList.add('question__text-span');
                    textSpan.textContent = option.text;
                    optionLabel.appendChild(textSpan);
                    fieldset.appendChild(optionLabel);
                });
                questionString.appendChild(fieldset);

            } else if (question.type === 'text') {
                const input = document.createElement('input');
                input.type = 'text';
                input.name = question.label;
                input.classList.add('question__input')
                input.required = true;
                input.placeholder=question.label;
                questionString.appendChild(input);
            }
            questionForm.appendChild(questionString);
        });

        const submitButtonContainer = document.createElement('div');
        submitButtonContainer.style.textAlign = 'left';
        const answGood = document.createElement('div');
        answGood.id = "answ_good";
        answGood.classList.add('rsvp-message');
        answGood.style = "display:none;";
        answGood.textContent = "Спасибо, ваш ответ учтен. Не забудьте заполнить форму на каждого гостя";
        submitButtonContainer.appendChild(answGood);

        const answNull = document.createElement('div');
        answNull.id = "answ_null";
        answNull.classList.add('error-rsvp');
        answNull.style = "display:none; text-align: left;";
        answNull.textContent = "Заполните, пожалуйста, все поля.";
        submitButtonContainer.appendChild(answNull);

        const submitButton = document.createElement('button');
        submitButton.name = 'Принято';
        submitButton.classList.add('button');
        submitButton.classList.add('rsvp__button');
        submitButton.textContent = 'Подтвердить';
        submitButton.onclick = function() {
            submitquestion();
            return false;
        };
        submitButtonContainer.appendChild(submitButton);
        questionForm.appendChild(submitButtonContainer);


        const timelineBlock = document.querySelector('.timetable__block');
        timelineBlock.innerHTML = '';

        data.timeline.forEach((item, index) => {
              const planBlock = document.createElement('div');
              planBlock.classList.add('timetable__block-stroke');
              timelineBlock.appendChild(planBlock);
             
              if (index != 0){
              const lineBlock = document.createElement('div');
              lineBlock.classList.add('timetable__block-line');
               planBlock.appendChild(lineBlock);
               
                const lineimg = document.createElement('div');
             lineimg.classList.add('timetable__block-line-img');
               lineBlock.appendChild(lineimg);
               
                const line = document.createElement('img');
                line.src = `/images/sites/zhemchug/pearl-mini-01.png`;
                line.alt = item.line;
                 line.classList.add('timetable-line-img');
               lineBlock.appendChild(line);
        }
               const imgBlock = document.createElement('div');
              imgBlock.classList.add('timetable__block-img');
               planBlock.appendChild(imgBlock);
               
               const icon = document.createElement('img');
                icon.src = `/images/sites/timeline/icon-zhemchug/${item.icon}-01.svg`;
                icon.alt = item.icon;
                 icon.classList.add('timetable-img');
                imgBlock.appendChild(icon);
                
                
               
               
              const timeDiv = document.createElement('div');
               timeDiv.classList.add('timetable__block-time')
               timeDiv.textContent = item.time;
                 planBlock.appendChild(timeDiv);
            
                const nameDiv = document.createElement('div');
                nameDiv.classList.add('timetable__block-name');
                nameDiv.textContent = item.title;
                planBlock.appendChild(nameDiv);
               
               
                

        });

     const dresscodeColorsContainer = document.querySelector('.dresscode__colors');

if (dresscodeColorsContainer) {
    dresscodeColorsContainer.innerHTML = '';
    const colors = data.texts.dresscodeColors;
    document.getElementById('dresscode__description').innerHTML = `${data.texts.dresscode}`;
    document.getElementById('dresscode__description_man').textContent = data.texts.dresscodeGendered.men.text;
    document.getElementById('dresscode__description_woman').textContent = data.texts.dresscodeGendered.women.text;

    if (colors) {
        const colorCount = Object.keys(colors).length;
        const containerWidth = dresscodeColorsContainer.offsetWidth * 0.9*0.9; // 90% of the container width
       const maxPerRow = colorCount > 5 ? Math.ceil(colorCount / 2) : colorCount; // Вычисляем maxPerRow в зависимости от colorCount
       const rowCount = Math.ceil(colorCount / maxPerRow); // Количество строк
    let firstRowCircleSize = 0; // Храним размер кружков первой строки
    
        for (let i = 0; i < rowCount; i++) {
            const rowContainer = document.createElement('div');
            rowContainer.classList.add('dresscode__row');
            dresscodeColorsContainer.appendChild(rowContainer);

            const circlesInThisRow = (i === rowCount - 1 && colorCount % maxPerRow !== 0) ? colorCount % maxPerRow : maxPerRow;// Проверяем сколько кружков в последней строке
        // Вычисляем circleSize только для первой строки, используем повторно для последующих строк
        const circleSize = i === 0 ? Math.max((containerWidth / circlesInThisRow) - 10, 20) : firstRowCircleSize;
         if (i === 0) {
            firstRowCircleSize = circleSize; // Сохраняем вычисленный размер
        }


            for (let j = 0; j < circlesInThisRow; j++) {
                const colorIndex = i * maxPerRow + j;
                const colorKey = Object.keys(colors)[colorIndex]; // Get the color key by index

                if (colorKey && colors.hasOwnProperty(colorKey)) {
                    const colorValue = colors[colorKey];
                    const colorCircle = document.createElement('div');
                    colorCircle.classList.add('dresscode__color');
                    colorCircle.classList.add(`dresscode-color-${colorIndex + 1}`); // Add unique class
                    colorCircle.style.backgroundColor = colorValue; // Keep for initial color, background-image will be set later
                    colorCircle.style.width = `${circleSize}px`;
                    colorCircle.style.height = `${circleSize}px`;
                    rowContainer.appendChild(colorCircle);
                }
            }
        }
    }
}
    })
    .catch(error => console.error('Ошибка загрузки данных:', error));
});