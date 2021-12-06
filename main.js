// 'use strict'
const appData = {
  rollback: 10,
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  allServicePrices : 0,
  fullPrice : 0,
  servicePercentPrice: 0,
  services: {},
  asking: function () {
    do {
      appData.title = prompt('Как называется Ваш проект?', 'Калькулятор вёрстки')
      } while (appData.isNumber(appData.title))

    for (let i = 0; i < 2; i++) {
      let price = 0
      let name
      do {
        name = prompt('Какие типы экранов нужно разработать?')
      } while (appData.isNumber(name))
      
      do {
        price = prompt('Сколько будет стоить данная работа?', 10000)
      } while (!appData.isNumber(price))

      appData.screens.push({id: i, name: name, price: price})
    }

    for (let i = 0; i < 2; i++) {
      let price = 0
      let name
      // do {
      //   name = prompt('Какой дополнительный тип услуги нужен?', 'Форма')
      // } while (appData.isNumber(name))

      if (i === 0) {
        do {
          name = 'Вопрос 1: ' + prompt('Какой дополнительный тип услуги нужен?', 'Форма')
        } while (appData.isNumber(name))

      } else if (i === 1) {
        do {
          name = 'Вопрос 2: ' + prompt('Какой дополнительный тип услуги нужен?', 'Форма')
        } while (appData.isNumber(name))
      }     

        price = prompt('Сколько это будет стоить', 4000)
        while (!appData.isNumber(price)) {
          price = prompt('Сколько это будет стоить', 4000)
        }
        
        appData.services[name] = +price
    }
    appData.adaptive = confirm('Нужен ли адаптив на сайте?')
  },
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price
    }

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key]
    }
  },
  isNumber: function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
  },
  showTypeOf: function (variable) {
    console.log(variable, typeof variable)
  },
  getFullPrice: function() {
    appData.fullPrice = appData.allServicePrices + appData.screenPrice
  },
  getRollbackMessage: function (price) {
      if (price  >= 30000) {
      return 'Даем скидку в 10%'
    } else if (price  >= 15000 && price  < 30000) {
      return 'Даем скидку в 5%'
    } else if (price < 15000 && price >= 0) {
      return 'Скидка не предусмотрена'
    } else if (price < 0) {
      return 'Что-то пошло не так'
    }
  },
  getTitlel: function () {
    let arrTitle = appData.title.split(' ').filter(arr => arr !== '');
    let newTitle = ''
    for (let i = 0; i <= arrTitle.length-1; i++) {
      newTitle += arrTitle[i] + ' '
    }
    newTitle = newTitle[0].toUpperCase() + newTitle.slice(1)
    appData.title = newTitle
  },
  getServicePercentPrices: function () {
    appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback/100)))
  },
  logger: function() {
      console.log(appData.fullPrice)
      console.log(appData.servicePercentPrice)
      console.log(appData.screens)
      console.log(appData.services)

      
  },
  start: function() {
    appData.asking(),
    appData.addPrices(),
    appData.getFullPrice(),
    appData.getServicePercentPrices(),
    appData.getTitlel(),

    appData.logger()
  }
}

appData.start()

