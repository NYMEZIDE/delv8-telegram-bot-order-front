import {reactive, readonly} from 'vue';

export const createStore = () => {
  const state = reactive({ value: {
      webAppData: {},
      peopleAmount: 0,

      kitchenList: [
        // {
        //   "id": "GUID1",
        //   "name": "Суши",
        //   "minAmount": "500"
        // },
        // {
        //   "id": "GUID2",
        //   "name": "Пицца",
        //   "minAmount": "600"
        // },
        // {
        //   "id": "GUID3",
        //   "name": "Бургеры",
        //   "minAmount": "700"
        // },
        // {
        //   "id": "GUID4",
        //   name: 'Русская',
        //   "minAmount": "700"
        // },
        // {
        //   "id": "GUID5",
        //   name: 'Грузинская',
        //   "minAmount": "700"
        // },
      ],
      kitchenSelected: [],

      orderAmount: 0,

      orderResult:  {
        // orderId: "b04f5276-458e-49c6-a6cc-5a2ce0e42e8e",
        // dishList: [
        //   {
        //     "kitchenId": "dce92772-d42e-4685-8a57-b0f7cdfc2c96",
        //     "kitchenName": "Суши",
        //     "name": "Суши 320",
        //     "quantity": 1,
        //     "amount": 320.0
        //   },
        //   {
        //     "kitchenId": "dce92772-d42e-4685-8a57-b0f7cdfc2c96",
        //     "kitchenName": "Суши",
        //     "name": "Суши 300",
        //     "quantity": 1,
        //     "amount": 300.0
        //   },
        //   {
        //     "kitchenId": "117d5a8f-7d83-494d-9833-ef2c50cd5815",
        //     "kitchenName": "Бургеры",
        //     "name": "Бургеры 300",
        //     "quantity": 1,
        //     "amount": 300.0
        //   },
        //   {
        //     "kitchenId": "069f41f2-edf5-4071-815c-0921c5a22da8",
        //     "kitchenName": "Напитки",
        //     "name": "напиток 150",
        //     "quantity": 3,
        //     "amount": 450.0
        //   }
        // ],
        // fullAmount: 1370.0
      },
    }
  })

  const setters = {
    setPeopleAmount: (value) => state.value.peopleAmount = value,
    setKitchen: (value) => state.value.kitchenSelected = value,
    setOrderAmount: (value) => state.value.orderAmount = value,
    setOrderResult: (value) => state.value.orderResult = value,
    setWebAppData: (value) => state.value.webAppData = value,
  }

  const actions = {
    async getKitchens() {
      try {
        const response = await fetch(`https://delivery.ucs.ru/orders/api/v1/lazy/kitchens`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'secret': 'ce939b6c-___-___-___-_____________',
          }
        })
        const { result } = await response.json();

        state.value.kitchenList = result;
      } catch (e) {
        console.error(`getKitchens error ${e}`)
      }
    },

    async getOrder(orderId) {
      try {
        const response = await fetch(`https://delivery.ucs.ru/orders/api/v1/lazy/orders/${orderId}`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'secret': 'ce939b6c-___-___-___-_____________',
          }
        })
        const { result } = await response.json();

        console.dir(result)
      } catch (e) {
        console.error(`getOrder error ${e}`)
      }
    },

    async createLazyOrder() {
      try {
        const response = await fetch(`https://delivery.ucs.ru/orders/api/v1/lazy/orders`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'secret': 'ce939b6c-___-___-___-_____________',
          },
          body: JSON.stringify({
            phone: "79225308162",
            quantity: state.value.peopleAmount,
            amount: state.value.orderAmount,
            kitchensId: state.value.kitchenSelected.map(e => e.id)
          })
        })
        const { result } = await response.json();

        state.value.orderResult = result;
      } catch (e) {
        console.error(`createLazyOrder error ${e}`)
      }
    },

    async confirmLazyOrder() {
      try {
        let orderId = state.value.orderResult.orderId;

        const response = await fetch(`https://delivery.ucs.ru/orders/api/v1/lazy/orders/${orderId}/ok`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'secret': 'ce939b6c-___-___-___-_____________',
          }
        })

        const { result } = await response.json();

        console.dir(result)
      } catch (e) {
        console.error(`confirmLazyOrder error ${e}`)
      }
    },

    async reCreateLazyOrder() {
      try {
        let orderId = state.value.orderResult.orderId;

        const response = await fetch(`https://delivery.ucs.ru/orders/api/v1/lazy/orders/${orderId}/more`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'secret': 'ce939b6c-___-___-___-_____________',
          }
        })

        const { result } = await response.json();

        state.value.orderResult = result;
      } catch (e) {
        console.error(`confirmLazyOrder error ${e}`)
      }
    },

    async sendDataToBot() {
      try {
        const description = state.value.orderResult.dishList.map(d => d.name).join(', ').replace(/,\s*$/, '');
        const amount = state.value.orderResult.fullAmount * 100;

        const response = await fetch('https://api.telegram.org/bot_________:____________________________/sendInvoice', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({
            chat_id: state.value.webAppData.user.id,
            title: 'Осталось оплатить заказ',
            description,
            currency: 'RUB',
            prices: [{label: 'total', amount}],
            payload: '{CURRENCY_TOTAL_AMOUNT: 240}',
            provider_token: '123123123:TEST:12345',
          })
        })

        const { result } = await response.json();

        console.dir(result)
      } catch (e) {
        console.error(`confirmLazyOrder error ${e}`)
      }
    },
  }

  return { state: readonly(state), actions, setters }
}
