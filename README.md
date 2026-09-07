# Dossier photos

Mettez vos fichiers image ici (jpg, png ou webp — webp est le plus léger).

Ensuite, dans `products-config.js`, indiquez juste le nom du fichier précédé
de `pics/` :

```js
heroPhoto: 'pics/tapis-de-souris-hero.jpg',
```

## Conventions de nom conseillées

- Photo principale d'un produit : `pics/<slug-du-produit>-hero.jpg`
  (ex : `pics/clavier-hero.jpg`)
- Photos des sections de détail : `pics/<slug>-1.jpg`, `pics/<slug>-2.jpg`, etc.
- Photos de la galerie : `pics/<slug>-galerie-1.jpg`, `pics/<slug>-galerie-2.jpg`, etc.

Tant qu'un champ photo est laissé à `null` dans le config, un emplacement
"Photo à venir" s'affiche automatiquement à la place — pas besoin d'avoir
toutes les photos prêtes pour publier un produit.

## Poids conseillé

Gardez chaque photo sous 300 Ko environ (redimensionnée à 1600 px de large
maximum).
