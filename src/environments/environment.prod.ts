// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  apiUrl: 'https://gwiz-admin-ff2827c872e3.herokuapp.com/api',
  stripePublishableKey:
    'pk_live_51Sb9d7Q1tLsYGMLeVLonQ2A3Jr5nD81qZd7vzp3bxx8TgcUhZHZwSJdSNkG1lbPqvD8lRyvgNJGrwLT1brMXrrLe00o8A5MdTv',
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
