# suite-drawer

Utilitaire de création de suite et d'affichage

Un exemple basique est la suite de fibonacci, représentée par 'new RecurrenceSuite([0,1], (x, y) => x+y). Cette suite est une suite de récurrence 2 et nécessite donc de donner une liste avec les deux valeurs par défaut ainsi que la fonction de récurrence qui dépend des deux valeurs précédentes, ici x est u(n), y est u(n+1) et le résultat de la fonction est u(n+2)

# Création d'une suite sans la relation de récurence

Pour ce faire, il faut créer une classe qui implémente un constructeur et une méthode get, qui prend un entier naturel. Un exemple ici est la suite arithmétique de raison 2 et de valeur par défaut de 1. Cela peut-être écrit comme ceci

class TNPOSuite { constructor() {} get(n) {return 2 * n + 1;}}

# Affichage d'une suite

Pour afficher une suite, il faut d'abord créer un canvas d'une taille [x,h], lui placer un offset et dire combien de pixel un déplacement sur un axe représente. Par exemple

canvas = new SuiteCanvas(document.querySelector("canvas"), [width, height], [originx, originy], [offx, offy])

Par défaut, il faut initialiser le quadrillage avec les couleurs et tailles de lignes pour les axes et lignes du quadrillage :

canvas.drawQuad(color_axis, ?color_quad, ?axislinewidth, ?quadlinewidth)

Il est ensuite possible à l'aide d'un objet SuiteDrawer initialisé avec la suite de tracer sur un canvas les points consécutifs d'une suite. Le début et la fin sont inclut. Si la fin n'est pas donnée dans la fonction, la fin sera par défaut le start et la suite sera calculée à partir de 0.

sd = new SuiteDrawer(suite)
sd.draw(canvas, color, start, end) ou sd.draw(canvas, color, end)
