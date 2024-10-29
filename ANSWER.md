I guess this this form will be used to transfer money between user accounts, but not just convert them like a calculator. So I've made some changes.

Initially given template was rewritten.

Naming was changed
Convert/exchange replaced with send/transfer money.

1. Code related to transfer moved to separate module src/modules/accounts
2. Code related to successful transfer moved to separate screen 
3. Code related to transfer and its calculation moved to api layer. It should be on client
4. Code related to form fields moved to separate components for reusability - src\lib\ui

Screen with transfer form located at index page
Screen with information about successful transfer located at URL /success-transfer/$transferId
App redirecting you to a success screen after successful transfer.

For routing used tanstack router.
For state managing used only custom react hooks.

In real project I would use nanostores for client state and react-query for server state(cache)

Haven't changed eslint config because it covers most of problems that other devs can do in the project. Other rules should be added only if they needed for specific project

To start project you need nodejs with version 20.16.0 or above to be installed

## install pnpm 
```
npm install -g pnpm
```

## run in dev mode
```
pnpm dev
```
