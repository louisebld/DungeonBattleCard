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

Dungeon Battle Card est un jeu de plateau qui se joue en 1 contre 1. 

Le jeu ne se joue malheuresement que contre 1 ordinateur. 

Le but du jeu est de trouver la base enemi et que l'un de vos monstres détruisent cette base pour gagner la partie.

Le jeu se joue en tour par tour. Le déroulé d'un de ces derniers est simple, vous devez poser un monstre sur la grille, au début du plateau. L'ordinateur fera de même. Une fois que vous le joueur à poser sa carte, et appuyer sur le bouton fin de tour, toutes les cartes avaceront d'une case.

Lors du début de partie le coeur de l'ordinateur sera choisit aléatoirement. Le joueur quant à lui, choisira sa base en cliquant sur le coeur de son choix.

Si une carte du joueur et de l'ordinateur viennent à se percuter, il y aura alors une bataille entre ces deux cartes. Si l'une des cartes n'a plus de vie, elle st détruite. 

## Choix de technologie

Nous avons choisit de développer l'application en React. 

Pourquoi React ? Car nous voulions tous les deux découvrir cette technologie. Nous entendons beaucoup parler de React, qui est aujourd'hui présent dans énormement de site web (Twitter, BBC ou encore AirBnB ...). React permet de développer des applications PWA (Progressive Web App) qui permet d'obtnir une application Android/IOS à partir d'un site internet. Pour cela le site doit respecter certaines conditions afin d'avoir les bonnes dimensions, et caractéristiques pour respecter afin d'être éligible PWA.

## Architecture du projet 

Concernant l'architecture du projet, nous avons essayer de suivre les "conventions" de React. Nous avons divisé nos pages en composants (morceaux) afin de pouvoir les réutiliser.   

Le dossier **src** contient le principal du projet. C'est lui qui contient les différents composants que nous injectons dans notre projet. Ces composants se trouve dans le dossier **components**. Ceux-ci seront injectés dans les pages de notre application. On retrouve également le dossier **assets** qui contient les images utilisées dans le projet. Le dossier **views** contient les différentes pages de l'application.

## Problèmes rencontrés

Le premier problème à été la récupération des données de l'API. Nous avons eu beaucoup de mal à récupérer les données de l'API. Nous avons du faire plusieurs tests pour trouver la bonne méthode. Nous avons finalement réussi à récupérer les données de l'API, ainsi qu'à les afficher correctement.

Le plus gros soucis à été le système d'avancement des cartes. 
Les avancements ont été la chose la plus dur à gérer. Nous sommes partis "à l'aveugle". Au fur et à mesure de l'avancement du projet, nous corrigions les bugs liés à la bataille/avancement sur le tas. Mais plus le temps passait et cela devenait compliquer de débugger. 

Nous avons donc prit la décision en fin de projet, de refaire le système. Nous avons mit au clair tous les cas possibles, pour avoir une vision clair de l'ensemble des possibilités de quand, une carte pouvait avancer ou pas. 

Nous avons créer un Miro, pour faire une mind map. Chaque chemin correspond à une possibilité. 

Grâce à cette Mind Map, nous refait notre système entier en quelques heures de travail.

Nous avons donc traduit cette mind map en code, et nous avons réussi à avoir un système qui fonctionne correctement.

## Améliorations/évolutions possibles

Nous avons plusieurs idées d'améliorations pour le projet. 

Une première idée serait de pouvoir jouer à deux sur le même téléphone. A la place de l'ordinateur, nous pourrions avoir un autre joueur. C'etait une de nos idées de départ, mais nous avons préféré nous concentrer sur le développement de l'application, avec dans un premier temps un ordinateur.

Une autre idée serait de pouvoir jouer contre un autre joueur mais en ligne cette fois-ci. Nous pourrions ainsi avoir un sytème de room pour rejoindre son ami.

Une autre idée serait de pouvoir créer son propre deck de carte. Nous pourrions ainsi avoir un système de création de carte, et de deck. 

Une superbe idée serait de pouvoir voir plusieurs animation. Nous pourrions ainsi avoir une animation lors de la bataille, lors de l'avancement des cartes, lors de la destruction d'une carte, etc ...


