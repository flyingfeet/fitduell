angular.module('challenger')

.constant("STATUS", {
    "ACCEPTED": "ion-clock",
    "WAITING": "ion-help-circled",
    "DENIED": "ion-minus-circled",
    "TOBEPROOFED": "ion-gear-b",
    "PASSED": "ion-checkmark-circled"
  })

.constant("AUTH_EVENTS", {
    noServer: 'server-not-reachable'
  });
