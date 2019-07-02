# diva-js-reference-3p-frontend

This repository contains an example/reference frontend implementation that uses [diva-react](https://github.com/Alliander/diva-react) to show a nice GUI for IRMA authorization.

IRMA is a decentralized, attribute based Identity Management protocol that allows easy and fine-grained authentication (and based on specific attributes) authorization. Attributes are issued by trusted issuers and therefore provide easy validation of users.

## Features

This frontend in particular demonstrates
- How attribute based authentication can be integrated into a frontend application.
- How attribute based authorization can be integrated into a frontend application.
- How frontends may use and display authentication/authorization status to their users.
- How issuing of attributes can be done for demo purposes (for production use, you need a backend to establish secure IRMA issuing sessions).

## Note for Diva 1.x users

Diva-js-reference-3p-frontend and Diva-react version 2.0.0 have been refactored to support the new IRMA protocol with the new [IRMA server](https://irma.app/docs/next/api-irma-server/). With this change, Diva doesn't require a backend anymore. Specify the URL to your IRMA server in `src/sagas/index.js` and run it with the version 2.0.0 of [diva-react](https://github.com/Alliander/diva-react).

With this refactor, we also upgraded to Material UI 4.x and React 16.8.

Notable absent features:
- No session support (still uncertain whether we will add that again)
- No Authenticated IRMA JWT issue/disclose support (however JWT token coming from the IRMA server can be verified)

Because `diva-react` 2.0 isn't published on npm, one needs to build it manually, to run:

```
npm install
git submodule init && git submodule update
cd diva-react && npm install && npm run build && npm link && cd ..
npm link diva-react
npm start
```

## Diva-react

This application is just an example implementation: it uses [diva-react](https://github.com/Alliander/diva-react) as its main library, see the documentation of that project for more details on how to integrate `diva-react` in your own application.

## Running the application

- Checkout the code
- Point `irmaConfig.irmaUrl` to a valid [IRMA server](https://irma.app/docs/irma-server/) in `src/sagas/index.js`.
- `npm install`
- `npm start`

Note: for development, use `npm run dev` to run the application in development mode with hot reloading.

## Tests

[Cypress.io](https://cypress.io) is used to perform frontend tests.
To run the tests:

- make sure the frontend is running
- `npm run test`

## IRMA

For more information about IRMA, see: https://privacybydesign.foundation/irma/

The IRMA client apps can be downloaded from their respective app stores:

- [Apple App Store](https://itunes.apple.com/nl/app/irma-authentication/id1294092994?mt=8)
- [Google Play Store](https://play.google.com/store/apps/details?id=org.irmacard.cardemu)

Other components in the IRMA ecosystem include:

- [IRMA Android/iOS app](https://github.com/privacybydesign/irma_mobile)
- [IRMA server](https://irma.app/docs/irma-server/)
- [IRMA Golang library](https://github.com/privacybydesign/irmago)
