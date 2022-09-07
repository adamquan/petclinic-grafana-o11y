// Scenario: petclinic (executor: ramping-vus)


import { sleep, group } from 'k6'
import http from 'k6/http'

export const options = {
  ext: {
    loadimpact: {
      // See https://k6.io/docs/cloud/creating-and-running-a-test/cloud-tests-from-the-cli/#cloud-execution-options
      projectID: 3569409,
      name: 'Petclinic',
        
      distribution: {
        'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 25 },
        'amazon:ie:dublin': { loadZone: 'amazon:ie:dublin', percent: 25 },
        'amazon:cn:hong kong': { loadZone: 'amazon:cn:hong kong', percent: 25 },
        'amazon:au:sydney': { loadZone: 'amazon:au:sydney', percent: 25 },
      },
      apm: [
        {
          provider: 'prometheus',
          metrics: [
            'http_req_duration',
            'http_reqs',
            'http_req_failed',
            'vus',
            'iterations',
            'data_sent',
            'data_received',
          ],
          includeDefaultMetrics: false,
          includeTestRunId: true, //test run id 

          // Instead of SE demo, send it to my own Grafana Cloud instance
          credentials: {
            password:
              'eyJrIjoiOWYzMmViNDMwNGMzZjM5ZDZjY2JiZTUwZDI4YTlmMDY3MTlkZGM3YSIsIm4iOiJhcXVhbi1lYXN5c3RhcnQtcHJvbS1wdWJsaXNoZXIiLCJpZCI6NjAxMzgwfQ==',
            username: '330312',
          },
          resampleRate: 3,
          remoteWriteURL: 'https://prometheus-prod-10-prod-us-central-0.grafana.net/api/prom/push',
        },
      ],
    },
  },

    
  thresholds: { http_req_duration: ['p(99)<600', 'p(95)<300'], http_req_failed: ['rate<0.1'] },
  scenarios: {
    petclinic: {
      executor: 'ramping-vus',
//      gracefulStop: '30s',
      stages: [
        { target: 50, duration: '30s' },
        { target: 50, duration: '2m' },
        { target: 0, duration: '30s' },
      ],
//      gracefulRampDown: '30s',
      exec: 'petclinic',
    },
  },
}

export function petclinic() {
  let response

  group('page_2 - https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners?lastName=', function () {
    response = http.get('https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners?lastName=', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(5.7)
  })

  group('page_3 - https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/3', function () {
    response = http.get('https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/3', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(5.2)
  })

  group('page_4 - https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/3/edit', function () {
    response = http.get('https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/3/edit', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(4.7)
  })

  group('page_5 - https://pet-clinic-2yrjn5l32q-uc.a.run.app/vets.html', function () {
    response = http.get('https://pet-clinic-2yrjn5l32q-uc.a.run.app/vets.html', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(4)
  })

  group('page_6 - https://pet-clinic-2yrjn5l32q-uc.a.run.app/vets.html/?page=2', function () {
    response = http.get('https://pet-clinic-2yrjn5l32q-uc.a.run.app/vets.html/?page=2', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(2.6)
  })

  group('page_7 - https://pet-clinic-2yrjn5l32q-uc.a.run.app/', function () {
    response = http.get('https://pet-clinic-2yrjn5l32q-uc.a.run.app/', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(3.9)
  })

  group('page_8 - https://pet-clinic-2yrjn5l32q-uc.a.run.app/oups', function () {
    response = http.get('https://pet-clinic-2yrjn5l32q-uc.a.run.app/oups', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(5.2)
  })

  group('page_9 - https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/find', function () {
    response = http.get('https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/find', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(4.3)
  })

  group('page_10 - https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/new', function () {
    response = http.get('https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/new', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(21.8)

    response = http.post(
      'https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/new',
      {
        firstName: 'Adam',
        lastName: 'Quan',
        address: '123 abc',
        city: 'St. Louis',
        telephone: '111-111-111',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'https://pet-clinic-2yrjn5l32q-uc.a.run.app',
          'upgrade-insecure-requests': '1',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(14.3)

    response = http.post(
      'https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/new',
      {
        firstName: 'Adam',
        lastName: 'Quan',
        address: '123 abc',
        city: 'St. Louis',
        telephone: '3143729493',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'https://pet-clinic-2yrjn5l32q-uc.a.run.app',
          'upgrade-insecure-requests': '1',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(2.8)
  })

  group('page_11 - https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/11/pets/new', function () {
    response = http.get('https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/11/pets/new', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(23.4)

    response = http.post(
      'https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/11/pets/new',
      {
        id: '',
        name: 'Little Sweet',
        birthDate: '2021-11-01',
        type: 'dog',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'https://pet-clinic-2yrjn5l32q-uc.a.run.app',
          'upgrade-insecure-requests': '1',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
    sleep(6)
  })

  group('page_12 - https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/find', function () {
    response = http.get('https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/find', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(1.6)
  })

  group('page_13 - https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners?lastName=', function () {
    response = http.get('https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners?lastName=', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(3.2)
  })

  group('page_14 - https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/?page=3', function () {
    response = http.get('https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/?page=3', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(2.4)
  })

  group('page_15 - https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/11', function () {
    response = http.get('https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/11', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(2.8)
  })

  group('page_16 - https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/find', function () {
    response = http.get('https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/find', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(1.8)
  })

  group('page_17 - https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners?lastName=', function () {
    response = http.get('https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners?lastName=', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(7.7)
  })

  group('page_18 - https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/?page=2', function () {
    response = http.get('https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/?page=2', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(3.2)
  })

  group('page_19 - https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/find', function () {
    response = http.get('https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners/find', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(3.8)
  })

  group('page_20 - https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners?lastName=adam', function () {
    response = http.get('https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners?lastName=adam', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(8.7)
  })

  group('page_21 - https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners?lastName=quan', function () {
    response = http.get('https://pet-clinic-2yrjn5l32q-uc.a.run.app/owners?lastName=quan', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(5.9)
  })

  group('page_22 - https://pet-clinic-2yrjn5l32q-uc.a.run.app/vets.html', function () {
    response = http.get('https://pet-clinic-2yrjn5l32q-uc.a.run.app/vets.html', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    sleep(4.9)
  })

  group('page_23 - https://pet-clinic-2yrjn5l32q-uc.a.run.app/', function () {
    response = http.get('https://pet-clinic-2yrjn5l32q-uc.a.run.app/', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
  })
}
