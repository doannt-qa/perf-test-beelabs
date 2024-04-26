import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';

export const options = {
    vus: 1, // number of virtual user
    duration: '30s', // duration test
};

export default function () {

    // Create new order 
    const postData = JSON.stringify({
        "type": "BracketOrder",
        "oneCancelsOtherOrder": {
          "FirstOrder": {},
          "SecondOrders": []
        },
        "oneTriggersTheOtherOrder": {
          "TriggerOrder": {},
          "FollowingOrders": []
        },
        "oneTriggersAOneCancelsTheOther": {
          "TriggerOrder": {},
          "OneCancelsOtherOrder": {
            "FirstOrder": {},
            "SecondOrders": []
          }
        },
        "bracketOrder": {
          "MainOrder": {
            "Id": "0.377795154325796",
            "Symbol": "BNBUSDT",
            "OrderDirection": "Sell",
            "Quantity": 0.1,
            "OrderType": "Limit",
            "TimeInForce": {
              "$type": "QuantConnect.Orders.TimeInForces.GoodTilCanceledTimeInForce"
            },
            "Price": 616
          },
          "TakeProfitOrder": {
            "Id": "0.6263750363572145",
            "Symbol": "BNBUSDT",
            "OrderDirection": "Sell",
            "Quantity": 0.1,
            "OrderType": "Limit",
            "TimeInForce": {
              "$type": "QuantConnect.Orders.TimeInForces.GoodTilCanceledTimeInForce"
            },
            "Price": 618
          },
          "StopLossOrder": {
            "Id": "0.9290896864649882",
            "Symbol": "BNBUSDT",
            "OrderDirection": "Buy",
            "Quantity": 0.1,
            "OrderType": "Limit",
            "TimeInForce": {
              "$type": "QuantConnect.Orders.TimeInForces.GoodTilCanceledTimeInForce"
            },
            "Price": 613
          }
        }
      });

    let createOrderRes = http.post('https://api.beelabs.ai/trading/new-advance-order/4', postData, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBiZWVsYWJzLmFpIiwiZmlyc3ROYW1lIjoiQWRtaW4iLCJsYXN0TmFtZSI6Ik1hbmFnZXIiLCJyb2xlIjoiQURNSU4iLCJwaG9uZSI6bnVsbCwiZW1haWxWZXJpZmllZCI6ZmFsc2UsImF2YXRhciI6bnVsbCwiZ2VuZGVyIjpudWxsLCJzdGF0dXMiOiJBQ1RJVkUiLCJjcmVhdGVkQnlJZCI6bnVsbCwiZGVsZXRlZEJ5SWQiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjQtMDMtMDVUMTY6MzM6MDkuNDUxWiIsInVwZGF0ZWRBdCI6IjIwMjQtMDQtMjZUMDE6MjA6MDYuMTI1WiIsImlhdCI6MTcxNDA5NDY1NSwiZXhwIjoxNzE0MTgxMDU1fQ.15W83m1cMVnzhSHNB9IeliV7lXpTPZQ3YXyZzCFN3fg',
            'Content-Type': 'application/json'
        },
    });

    console.log('Status: ', createOrderRes.status)
    console.log('Response: ', createOrderRes.body)

    check(createOrderRes, {
        'is status 201': (r) => r.status === 201,
    });

    sleep(3)

}
