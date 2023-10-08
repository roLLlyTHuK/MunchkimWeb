import Swal from 'sweetalert2';

const dialogStartGame = Swal.fire({
  title: 'Ты готов начать приключение?',
  showDenyButton: true,
    confirmButtonText: 'Начнем',
  confirmButtonColor: '#3085d6',
    denyButtonText: `Я боюсь`,
  denyButtonColor: '#d33',
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    Swal.fire('Начинаем!', '', 'success')
  } else if (result.isDenied) {
    Swal.fire('Трус', '', 'succees')
  }
})

const dialogDiceRoll = Swal.fire({
  title: 'Попытаемся сбежать от монстров?',
  showDenyButton: true,
    confirmButtonText: 'Бросаем кубик на смывку',
  confirmButtonColor: '#3085d6',
    denyButtonText: `Пусть будет то что будет!`,
  denyButtonColor: '#d33',
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    Swal.fire('Начинаем!', '', 'success')
  } else if (result.isDenied) {
    Swal.fire('Монстры надругались над твоим бездушным телом', '', 'succees')
  }
})

const dialogPlayerName = Swal.fire({
  title: 'Как тебя зовут?',
  input: 'text',
  showCancelButton: true,
    confirmButtonText: 'Сохранить',
  confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Отмена',
}).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Сохранено!', '', 'success')
    } else {
      Swal.fire('Отменено!', '', 'error')
    }
})