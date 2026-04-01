import { sleep, check, group, fail } from 'k6'
import http from 'k6/http'
import jsonpath from 'https://jslib.k6.io/jsonpath/1.0.2/index.js'

export const options = {
  cloud: {
    distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
    apm: [],
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 20, duration: '1m' },
        { target: 20, duration: '3m30s' },
        { target: 0, duration: '1m' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response

  const vars = {}

  group('page_1 - https://pizza.simicninja.click/', function () {
    response = http.get('https://pizza.simicninja.click/', {
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'max-age=0',
        'if-modified-since': 'Fri, 06 Mar 2026 06:08:50 GMT',
        'if-none-match': '"f73f80c3a312943d3374b04fefe89d84"',
        priority: 'u=0, i',
        'sec-ch-ua': '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(142.2)

    // Login
    response = http.put(
      'https://pizza-service.simicninja.click/api/auth',
      '{"email":"a@jwt.com","password":"admin"}',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/json',
          origin: 'https://pizza.simicninja.click',
          priority: 'u=1, i',
          'sec-ch-ua': '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    if(!check(response, { 'status equals 200': response => response.status.toString() === '200' })) {
      console.log(response.body);
      fail('Login was *not* 200');
    }

    vars['authToken'] = jsonpath.query(response.json(), '$.token')[0]

    response = http.options('https://pizza-service.simicninja.click/api/auth', null, {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'access-control-request-headers': 'content-type',
        'access-control-request-method': 'PUT',
        origin: 'https://pizza.simicninja.click',
        priority: 'u=1, i',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
    })
    sleep(36.4)

    response = http.get('https://pizza-service.simicninja.click/api/order/menu', {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        authorization: `Bearer ${vars['authToken']}`,
        'content-type': 'application/json',
        origin: 'https://pizza.simicninja.click',
        priority: 'u=1, i',
        'sec-ch-ua': '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
    })

    response = http.options('https://pizza-service.simicninja.click/api/order/menu', null, {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'access-control-request-headers': 'authorization,content-type',
        'access-control-request-method': 'GET',
        origin: 'https://pizza.simicninja.click',
        priority: 'u=1, i',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
    })

    response = http.get(
      'https://pizza-service.simicninja.click/api/franchise?page=0&limit=20&name=*',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          authorization: `Bearer ${vars['authToken']}`,
          'content-type': 'application/json',
          origin: 'https://pizza.simicninja.click',
          priority: 'u=1, i',
          'sec-ch-ua': '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    response = http.options(
      'https://pizza-service.simicninja.click/api/franchise?page=0&limit=20&name=*',
      null,
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          'access-control-request-headers': 'authorization,content-type',
          'access-control-request-method': 'GET',
          origin: 'https://pizza.simicninja.click',
          priority: 'u=1, i',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(25.5)

    response = http.get('https://pizza-service.simicninja.click/api/user/me', {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        authorization: `Bearer ${vars['authToken']}`,
        'content-type': 'application/json',
        origin: 'https://pizza.simicninja.click',
        priority: 'u=1, i',
        'sec-ch-ua': '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
    })

    response = http.options('https://pizza-service.simicninja.click/api/user/me', null, {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'access-control-request-headers': 'authorization,content-type',
        'access-control-request-method': 'GET',
        origin: 'https://pizza.simicninja.click',
        priority: 'u=1, i',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
    })
    sleep(1.5)

    response = http.post(
      'https://pizza-service.simicninja.click/api/order',
      '{"items":[{"menuId":7,"description":"Pepperoni","price":0.0042},{"menuId":7,"description":"Pepperoni","price":0.0042},{"menuId":2,"description":"Pepperoni","price":0.0042},{"menuId":2,"description":"Pepperoni","price":0.0042}],"storeId":"1","franchiseId":1}',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          authorization: `Bearer ${vars['authToken']}`,
          'content-type': 'application/json',
          origin: 'https://pizza.simicninja.click',
          priority: 'u=1, i',
          'sec-ch-ua': '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )

    if (!check(response, { 'order status equals 200': (response) => response.status.toString() === '200' })) {
      console.log(response.body);
      fail('Order was *not* 200');
    }

    vars['orderJWT'] = jsonpath.query(response.json(), '$.jwt')[0]

    response = http.options('https://pizza-service.simicninja.click/api/order', null, {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'access-control-request-headers': 'authorization,content-type',
        'access-control-request-method': 'POST',
        origin: 'https://pizza.simicninja.click',
        priority: 'u=1, i',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
    })
    sleep(2.9)

    response = http.post(
      'https://pizza-factory.cs329.click/api/order/verify',
      JSON.stringify({ jwt: vars['orderJWT'] }),
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          authorization: `Bearer ${vars['authToken']}`,
          'content-type': 'application/json',
          origin: 'https://pizza.simicninja.click',
          priority: 'u=1, i',
          'sec-ch-ua': '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
          'sec-fetch-storage-access': 'none',
        },
      }
    )

    response = http.options('https://pizza-factory.cs329.click/api/order/verify', null, {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'access-control-request-headers': 'authorization,content-type',
        'access-control-request-method': 'POST',
        origin: 'https://pizza.simicninja.click',
        priority: 'u=1, i',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
    })
  })
}