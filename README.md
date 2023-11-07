# Prepojenie react aplikácie a REST API cez Node.js

Projekt využíva react-router-dom a SPA. 

## Frontend časť

1.  Spustenie projektu

### `npm start`

2.  localhost:3000/home - zobrazenie úvodnej obrazovky
    localhost:3000/about - zobrazenie obrázkov
    localhost:3000/crud - zobrazenie prostredia pre požiadavky API

## Backend časť

1.  Spustenie servera

### `node server.js`

(server beží na localhost:3003)

### Práca s API cez /crud

1.  Prianie galérie:

       1.1.  Zadanie názvu galérie do input poľa
       1.2.  Stlačením tlačidla Create Gallery sa vytvorí galéria (možné vidieť aj na localhost:3000/home)

2.  Zobrazenie galérií:

       2.1. Stlačením tlačidla Get Galleries sa v tabuľke zobrazia všetky galérie

3.  Vymazanie galérie:

       3.1. Stlačením tlačidla Delete v tabuľke pri niektorej z galérií sa daná galéria odstráni 

4.  Zborazenie údajov galérie:

       4.1. Stlačením tlačidla Get v tabuľke pri niektorej z galérií sa zobrazia v novej tabuľke údaje o danej galérii

5. Upload súboru pre galériu:

       5.1.  Do input poľa je potrebné zadať cestu (názov galérie)
       5.2.  Nalseduje výber súboru
       5.3.  Odoslanie údajov o súbore do poľa images v danej galérii
       ( pri vkladaní vzniká problém, ktorý vloží prázdny objekt do poľa images )


