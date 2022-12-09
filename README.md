# Dungeon Battle Card - Compte-Rendu INFO706
## Louise Bollard & Tom Thierry

J’en profite pour vous annoncer que lors du rendu: une démo est attendue (je peux mettre une borne wifi "non saturée » pour la démo). 

En termes de rendu, il faudra:
	 un petit compte-rendu: 
        - expliquant l’appli (but du jeu + deroulement )✅
        - les fonctionnalités, 
        - les choix (techno ✅ (pk react / implementation), 
        - l’architecture ✅
        - les problèmes rencontrés (organisation, recuperation des donnees
            , et ce con de Avance1 )✅
        - les améliorations/évolutions possibles. ✅
        - Il faudra aussi me fournir un mode d’installation ✅

     - Le code commenté sera fourni dans un zip ou un lien git. Si un « exécutable » existe (une version compilée, un .apk), il est important de le fournir également (sans oublier le source). 

Tout ce contenu sera envoyé par mail à mon adresse.

## Lancer le projet
Après avoir cloner le git du projet, rendez vous à la racine du projet. Ouvrez une console et lancez : _npm i start_

Cette commande permet de télécharger les élèments essentiels au projet, comme les librairies.

Pour lancer le projet, lancez la commande dans le même terminal : _npm run start_

Le projet est accessible à l'addresse suivante : http://localhost:3000/

## Qu'est ce que Dungeon Battle Card ?

Dungeon Battle Card est un jeu de plateau en 1 contre 1. 

Le jeu se joue contre 1 ordinateur. 

Le but du jeu est de trouver la base ennemi et de la détruire.
La base ennemi est détruire lorsqu'un de vos montres l'attaque.

Le jeu se joue en tour par tour. Le déroulé d'un de ces derniers est simple, vous devez poser un monstre sur la grille, au début du plateau. L'ordinateur fera de même. Une fois que vous le joueur à poser sa carte, et appuyer sur le bouton fin de tour, toutes les cartes avanceront d'une case.

Lors du début de partie le coeur de l'ordinateur sera choisit aléatoirement. Le joueur quant à lui, choisira sa base en cliquant sur le coeur de son choix.

Si une carte du joueur et de l'ordinateur viennent à se percuter, il y aura alors une bataille entre ces deux cartes. Si l'une des cartes n'a plus de vie, elle est détruite. 


## Fonctionnalités

Lorsque l'on arrive sur la page d'accueil du jeu on peut visionner les règles ou alors jouer.
Lorsqu'on lance un jeu, le joueur doit choisir où placer son coeur, c'est ce qu'il va tenter de protéger pendant toute la partie.
Vous seul savez où vous avez placé votre coeur.

Pendant une partie vous pouvez placer une carte sur une de case située sur la première ligne en partant d'en bas.

Le reste du jeu est géré 

## Choix de technologies

Nous avons choisit de développer l'application en React. 

Pourquoi React ? Car nous voulions tous les deux découvrir cette technologie. Nous entendons beaucoup parler de React, qui est aujourd'hui présent dans énormement de site web (Twitter, BBC ou encore AirBnB ...). React permet de développer des applications PWA (Progressive Web App) qui permet d'obtnir une application Android/IOS à partir d'un site internet. Pour cela le site doit respecter certaines conditions afin d'avoir les bonnes dimensions, et caractéristiques pour respecter afin d'être éligible PWA.

Du côté du back, nous avons choisi de ne pas en faire et de partir sur une base de données hébergée en ligne. Nous avons donc utilisé Firebase qui permet d'héberger une base de données gratuitement (légère). Nous stockons donc les différentes cartes dans cette base de données.

## Architecture du projet 

Concernant l'architecture du projet, nous avons essayer de suivre les "conventions" de React. Nous avons divisé nos pages en composants afin de pouvoir les réutiliser.   

Le dossier **src** contient le principal du projet. C'est ici qu'il y a les pages, le css, les composants, les images. Ces composants se trouve dans le dossier **components**. Ceux-ci seront injectés dans les pages de notre application. On retrouve également le dossier **assets** qui contient les images utilisées dans le projet. Le dossier **views** contient les différentes pages de l'application.

## Problèmes rencontrés

Le premier problème a été la récupération des données de l'API.
Nous avons eu des soucis pour récupérer les cartes dans la base de données. En effet, lors de la récupération la requête doit être asynchrone. Or nous créions le deck avant d'avoir récupérer les informations des cartes auprès de firebase. Nous obtenions donc un objet "Promise" au lieu d'avoir des objets "Card" et il était pour nous impossible de récupérer les informations des cartes par la suite. 
Nous avons du faire plusieurs tests pour trouver la bonne méthode. Notre solution est de récupérer le deck dans un useEffect pour gérer la requête asynchrone. Néanmoins, il y a un petit délai pour récupérer les informations auprès de la base de données donc l'affichage du deck n'est pas instantannée au lancement du jeu. C'est pour cela que pour la génération des cartes suivantes (Lorsqu'on pose une carte, une nouvelle carte la remplace), nous avons décidé de récupérer l'intégralité des cartes au lancement du jeu, et de prendre une carte aléatoire dans la liste de toutes les cartes. Nous avons fait ce choix pour qu'il y ait le moins possible d'accès à la base de données et donc pas de temps d'attente pour le joueur, pour un meilleur confort d'utilisation.
En effet, quand il pose une carte, il n'a pas envie d'attendre à chaque fois que la carte soit regenérée.


Le plus gros soucis a été le système d'avancement des cartes. 
Les avancements ont été la chose la plus dure à gérer. Nous sommes partis "à l'aveugle". Au fur et à mesure de l'avancement du projet, nous corrigions les bugs liés à la bataille/avancement sur le tas. Mais plus le temps passait et cela devenait compliquer de débugger. 
Nous avons donc prit la décision en fin de projet, de refaire le système. Nous avons mit au clair tous les cas possibles, pour avoir une vision clair de l'ensemble des possibilités de quand une carte peut avancer ou non. 
Nous avons créer un Miro, pour faire une mind map (carte mentale). Chaque chemin correspond à une possibilité. 
Grâce à cette Mind Map, nous refait notre système entier en quelques heures de travail.
Nous avons donc traduit cette mind map en code, et nous avons réussi à avoir un système qui fonctionne correctement.

## Améliorations/évolutions possibles

Nous avons plusieurs idées d'améliorations pour le projet. 

Une première idée serait de pouvoir jouer à deux joueur. A la place de l'ordinateur, nous pourrions avoir un autre joueur, avec un système donc de gestion de partie, de "room" pour rejoindre son ami. Nous avons préféré nous concentrer sur le développement de l'application, avec dans un premier temps un ordinateur.

Une autre idée serait de pouvoir créer son propre deck de carte. Nous pourrions ainsi avoir un système de création de deck. Le joueur pourrait alors choisir une sélection de carte à mettre dans son deck et les cartes seraient tirées aléatoirement dans ce deck là et non dans l'ensemble du jeu de cartes.

Une autre idée serait de pouvoir gagner de l'expérience au fur et à mesure des parties, il pourrait donc y avoir un classement en fonction de l'expérience, du nombre de partie gagnée, du temps de jeux.
On pourrait également imaginer que la difficulté de l'ordinateur évolue en fonction de l'expérience du joueur, plus on est expérimenté plus il faut réfléchir pour battre l'ordinateur.

Une superbe idée serait d'avoir plusieurs animations. Nous pourrions ainsi avoir une animation lors de la bataille, lors de l'avancement des cartes, lors de la destruction d'une carte, etc ...


