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





petite note :


generate android folder :
- npm run eject


installation linux 
{
	Dans le dossier "local.proprieties" affectez la variable sdk.dir sur le chemin de votre
	fichier Sdk Android sur comme ci dessous :
	
	sdk.dir=/home/jrmr/Android/Sdk
}

build android app :
- sudo react-native run-android
- npx react-native run-android



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

- Dans le dossier root executez la commande ci dessous pour mettre a jour les dépendances
	npx jetify

- Puis recompiler les ressources avec 
	./gradlew assembleRelease

- Enfin compiler votre application avec 
	react-native run-android

(source de l'issues : https://github.com/jsierles/react-native-audio/issues/335 )


clear cache :


  1. Clear watchman watches: `watchman watch-del-all`.
  2. Delete the `node_modules` folder: `rm -rf node_modules && npm install`.
  3. Reset Metro Bundler cache: `rm -rf /tmp/metro-bundler-cache-*` or `npm start -- --reset-cache`.
  4. Remove haste cache: `rm -rf /tmp/haste-map-react-native-packager-*`.. Run CLI with --verbose flag for more details.
