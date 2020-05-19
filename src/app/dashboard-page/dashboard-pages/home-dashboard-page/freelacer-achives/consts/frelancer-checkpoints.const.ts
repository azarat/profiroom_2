export const freelancerCheckpointConst: {

  title: string,
  class: string,
  rank: number,
  checkpoints: any[]
}[] = [
    {
      title: 'Стартовый',
      rank: 0,
      class: 'zero',
      checkpoints: [
        {
          name: 'Регистрация',
          target: '100%',
        },
        {
          name: 'Подтверждение почты',
          target: '100%',
        }
      ]
    },
    {
      title: 'Начинающий',
      class: 'start',
      rank: 1,
      checkpoints: [
        {
          name: 'Заполнение профиля',
          target: '100%',
        },
        {
          name: 'Создание первой услуги',
          target: '100%',
        },
        {
          name: 'Закрытие первой сделки',
          target: '100%',
        },
      ]
    },
    {
      title: 'Уверенный',
      class: 'middle',
      rank: 2,
      checkpoints: [
        {
          name: 'Рейтинг',
          target: '4',
          type: 'rating'
        },
        {
          name: 'Успешных сделок',
          target: '60%',
          type: 'deals'
        },
        {
          name: 'Кол-во рабочих дней',
          type: 'days',
          target: 50
        },

      ]
    },
    {
      title: 'Опытный',
      class: 'pro',
      rank: 3,
      checkpoints: [
        {
          name: 'Рейтинг',
          target: '4,5',
          type: 'rating'
        },
        {
          name: 'Успешных сделок',
          target: '75%',
          type: 'deals'
        },
        {
          name: 'Кол-во рабочих дней',
          type: 'days',
          target: 200
        },

      ]
    },
    {
      title: 'Мастер',
      class: 'master',
      rank: 4,
      checkpoints: [
        {
          name: 'Рейтинг',
          target: '4,8',
          type: 'rating'
        },
        {
          name: 'Успешных сделок',
          target: '90%',
          type: 'deals'
        },
        {
          name: 'Кол-во рабочих дней',
          type: 'days',
          target: 320
        },

      ]
    },

  ];
