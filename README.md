# DevMobile_AppMovies

Notre objectif est de créer une application sur le thème des films.

Pour cela nous utiliserons l'api TheMovie Database (https://www.themoviedb.org/)


Notre application permettra de :
 chercher un film parmis une base de données (API ) par :
genre
réalisateur
titre
date
pays
...



créer une liste de films à voir
créer liste de films vus avec une note et un commentaire

utiliser le calendrier pour ajouter une date de film à voir et recevoir les rappels ainsi qu’une invitation à noter le film une fois la séance passée
et éventuellement de partager un film (SMS) et d'utiliser le shake pour trouver un film aléatoire
GROUPE : Jason Coltier, Jérémie Robles, wafo fotso ulrich kevin

Voici le lien de la présentation du projet :
	https://docs.google.com/presentation/d/1v8EWK86qYdfQWyew18MpYeSYLocC4NABBvbnqAZw2zc/edit#slide=id.p




procedure d'installation du projet :

- Etape 1 : Après avoir clone le projet, veuillez lancer "npm install"

- Etape 2 : Ensuite allez dans le dossier "./node_modules/react-native-calendar-events/android/src/main/java/com/calendarevents/CalendarEvents.java"

	et changer 

		. import android.support.v4.app.ActivityCompat;
		. import android.support.v4.content.ContextCompat;
	en
 
		. import androidx.core.app.ActivityCompat;
		. import androidx.core.content.ContextCompat;

- Etape 3 : Lancer la commande "npx jetify" afin de mettre à jour les composant de "node_modules" en Android.

- Etape 4 : Lancer votre application sur votre téléphone Android via cette commande "react-native run-android"

 	( error 1: si le sdk est introuvable, veuillez changer le chemin d'acces dans le fichier local.proprieties du dossier android)
 	( error 2: si le projet compile mais ne s'execute pas sur votre mobile, veuillez relancer l'application avec la commande)








-----------------------------------------------------------------------------------------------------------

ma petite note :

pour generer le dossier android :
- npm run eject


{
	installation linux 

	Dans le dossier "local.proprieties" affectez la variable sdk.dir sur le chemin de votre
	fichier Sdk Android sur comme ci dessous :
	
	sdk.dir=/home/jrmr/Android/Sdk
}

build android app :
- sudo react-native run-android
- npx react-native run-android

ou (pour generer l'apk) 

- ./gradlew assembleRelease


	comment build la librairie Calendar event sous react 0.59.10:

- suivre cette installation :
	https://github.com/wmcmahan/react-native-calendar-events/wiki/Android-setup

- dans "../node_modules/react-native-calendar-events/android/src/main/java/com/calendarevents/CalendarEvents.java"
	changer 

		. import android.support.v4.app.ActivityCompat;
		. import android.support.v4.content.ContextCompat;
	en
 
		. import androidx.core.app.ActivityCompat;
		. import androidx.core.content.ContextCompat;

- Veuillez netoyer les ressources graddle avec la commande
	./gradlew clean

- Dans le dossier root, avant de compiler votre application avec la commande ci dessous, veillez
  executez la commande ci dessous pour mettre a jour les dépendances :
	npx jetify

- Pour lancer votre application veuillez utiliser cette commande :  
	react-native run-android

(source de l'issues : https://github.com/jsierles/react-native-audio/issues/335 )


pour nettoyer votre projet :

  1. Clear watchman watches: `watchman watch-del-all`.
  2. Delete the `node_modules` folder: `rm -rf node_modules && npm install`.
  3. Reset Metro Bundler cache: `rm -rf /tmp/metro-bundler-cache-*` or `npm start -- --reset-cache`.
  4. Remove haste cache: `rm -rf /tmp/haste-map-react-native-packager-*`.. Run CLI with --verbose flag for more details.
