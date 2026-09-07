// ============================================================================
// CONFIG PRODUITS — ClicNet
// ============================================================================
// Ce fichier liste les produits qui doivent avoir une fiche complète sur le
// site (comme les pages Clavier et Souris), avec plusieurs sections, une
// galerie photo, un tableau de caractéristiques, le contenu de la boîte et
// une FAQ. La fiche est générée automatiquement par produit.html à partir
// de ces données — pas besoin de coder une nouvelle page à chaque fois.
//
// POUR AJOUTER UN NOUVEAU PRODUIT :
// 1. Copiez tout le bloc { ... } ci-dessous (de "slug:" jusqu'à la accolade
//    fermante correspondante), collez-le juste avant le "];" final.
// 2. Changez au minimum : slug, name, tagline, price, description.
// 3. "slug" doit être unique, en minuscules, sans espace ni accent
//    (ex: "tapis-de-souris"). C'est ce qui sert dans l'adresse de la page :
//    produit.html?slug=tapis-de-souris
// 4. Les photos : déposez le fichier image dans le dossier pics/ (voir
//    pics/README.md), puis écrivez son nom ici, ex: 'pics/clavier-hero.jpg'.
//    Laissez `null` en attendant d'avoir la vraie photo — un emplacement
//    "Photo à venir" s'affichera automatiquement à la place.
// 5. Les sections, la galerie, les caractéristiques, le contenu de la boîte
//    et la FAQ sont chacun une liste : ajoutez, supprimez ou modifiez les
//    lignes librement, il n'y a pas de nombre minimum ou maximum.
// 6. "stripeLink" : le lien de paiement créé dans le tableau de bord Stripe
//    (Paiements > Liens de paiement > Créer un lien), ex :
//    'https://buy.stripe.com/xxxxxxxxxxxx'. Laissez `null` en attendant —
//    le bouton "Payer" indiquera alors que le produit n'est pas encore
//    en vente.
// ============================================================================

const PRODUCT_CONFIG = [
  {
    slug: 'tapis-de-souris',
    name: 'ClicNet Tapis',
    tagline: 'Une surface qui ne bouge pas.',
    price: 0,
    description: "Un tapis en tissu tramé, pensé pour un glissé constant du bord à bord, avec une base en caoutchouc qui reste fixée au bureau.",
    heroPhoto: null, // ex: 'pics/tapis-de-souris-hero.jpg'
    stripeLink: null, // ex: 'https://buy.stripe.com/xxxxxxxxxxxx'
    sections: [
      {
        kicker: 'Surface',
        title: 'Un tramage pensé pour la précision.',
        text: "La texture est resserrée pour offrir un contrôle fin à basse vitesse, tout en restant assez fluide pour les mouvements rapides.",
        photo: null, // ex: 'pics/tapis-de-souris-1.jpg'
        features: [
          'Surface tissée résistante à l\u2019usure',
          'Bords cousus, ne s\u2019effilochent pas',
          'Compatible tous types de capteurs'
        ]
      },
      {
        kicker: 'Stabilité',
        title: 'Une base qui reste en place.',
        text: "Le dessous en caoutchouc épouse le bureau et empêche le tapis de glisser, même pendant les sessions les plus intenses.",
        photo: null, // ex: 'pics/tapis-de-souris-2.jpg'
        features: []
      }
    ],
    gallery: [null, null, null], // ex: ['pics/tapis-de-souris-galerie-1.jpg', ...]
    specs: [
      ['Dimensions', '900 x 400 x 3 mm'],
      ['Surface', 'Tissu tramé'],
      ['Base', 'Caoutchouc antidérapant'],
      ['Entretien', 'Lavable à la main']
    ],
    inBox: [
      'Tapis ClicNet',
      'Guide d\u2019entretien'
    ],
    faq: [
      {
        q: 'Le tapis est-il compatible avec un capteur optique et laser ?',
        a: "Oui, la surface a été testée avec les deux types de capteurs, sans perte de suivi."
      },
      {
        q: 'Peut-on le laver ?',
        a: "Oui, à la main, à l\u2019eau tiède avec un savon doux, puis à plat pour le séchage."
      }
    ]
  }

  // Ajoutez vos prochains produits ici, sous le même modèle :
  // ,
  // {
  //   slug: 'mon-nouveau-produit',
  //   name: 'ClicNet ...',
  //   tagline: '...',
  //   price: 0,
  //   description: '...',
  //   heroPhoto: null,
  //   stripeLink: null,
  //   sections: [],
  //   gallery: [],
  //   specs: [],
  //   inBox: [],
  //   faq: []
  // }
];

// ============================================================================
// CODES PROMO — ClicNet
// ============================================================================
// Ces codes s'appliquent sur le total affiché dans le panier (page panier.html).
// Le client tape le code, la réduction est calculée automatiquement.
//
// POUR AJOUTER UN CODE PROMO :
// 1. Ajoutez une ligne { code: '...', percent: ... } dans la liste ci-dessous.
// 2. "code" : ce que le client doit taper. Peu importe les majuscules/minuscules
//    utilisées ici, la comparaison les ignore.
// 3. "percent" : le pourcentage de réduction (20 pour 20 %).
//
// IMPORTANT : cette réduction n'agit que sur le total affiché sur le site.
// Le paiement réel passe par les liens Stripe (prix fixes). Pour que la
// réduction s'applique aussi au moment de payer, créez le même code comme
// "code promotionnel" dans Stripe (Produits > Coupons, puis Codes
// promotionnels) avec le même pourcentage, et activez "Autoriser les codes
// promotionnels" sur vos liens de paiement.
// ============================================================================

const PROMO_CODES = [
  { code: 'CLICNET20', percent: 20 }
];
