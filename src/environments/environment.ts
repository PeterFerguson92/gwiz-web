// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl: 'https://gwiz-admin-ff2827c872e3.herokuapp.com/api',
  apiUrl: 'http://localhost:8000/api',
  stripePublishableKey:
    'pk_test_51Sb9dMLT8MvjHZzurkwyjGMMhGnICvbh4tWhoyOkt7Qu7kBl7EG5MRN0DIqvdzxxpN8KV6qhVA27OicJ4Z9Ue53D00JlBO1wds',
  paymentProvider: 'stripe',
  buildId: '2026-01-09-1',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
