# Bagad Heol - Front-End

Application réalisé sous React

Librairie :
* create-react-app
* node-sass
* react-bootstrap

```
npm run start
```

Pour créer une page
* importer la dans le ./src/pages/index.js (pour pouvoir l'utiliser dans les routes)
* renseigner vos styles dans le dossier ./src/styles/index.scss (pas besoin de l'importer dans la page)

Le fichier ./src/styles/global.scss permet d'indiquer les règles à utiliser partout

Pour créer un component
* rien n'est nécessaire

Créer une url
```
export const VIEW_HOME = {
    path: '/', // URL PARENT
    layout: (<div>Ceci est un Layout</div>), // LAYOUT A AFFICHER SUR TOUS LES CHILDS
    childRoutes: [
        {path:'/', component: pages.Home}, // URL FINAL = URL PARENT + URL CHILD, COMPONENT DE LA PAGE
        {path:'/contact', component: pages.Authentification},
        {path:'/login', component: pages.Authentification},
    ]
};
```
* pas d'obligation de créer une const, vous pouvez l'introduire dans une const déjà existante

Pour créer un "redux"
* Copier/Coller le dossier example et modifier en fonction :D
* Importer le ./src/redux/VOTREREDUX/reducer dans ./src/redux/rootReducer

Pour créer une action redux
* Copier/Coller un exemple :D
* Bien remplacer vos const ACTIONS (et les renseigner dans le fichier)
* Ajouter votre valeur à l'action SUCCESS (pour une async) avec une clé spécifique et unique pour votre redux
* Bien importer les hooks dans ./src/redux/VOTREREDUX/hooks
* Bien importer les actions dans ./src/redux/VOTREREDUX/actions
* Rajouter si besoin un initialState (état initial de votre clé action)

Pour réaliser un build de l'app et pouvoir utiliser PWA
```
npm run build
```
