# ToursEstCharlie

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.6. + gh-pages

https://mrpyrotek.github.io/ToursEstCharlie/

En cours de dev 

Trello de dev: https://trello.com/b/4GR7Xm2P/toursestcharlie

-- Prochainement --

App de generation de QR code "ou est charlie" et creation d'un leaderboard de qui trouve le plus charlie a TOURS.git 


## Build

site host par github grace a gh-page et a du hashrouting angular
bdd hoster sur firebase

git checkout master

git push origin --delete gh-pages


ng build --configuration production --base-href "https://MrPyroTek.github.io/ToursEstCharlie/"

npx angular-cli-ghpages --dir=dist/tours-est-charlie

## Test local

test

ng serve --configuration development
