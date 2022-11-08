### INSTRUCCIONES PARA CORRER EL JUEGO

Todo el juego se correra por medio de la consola, en donde usaremos la aplicacion de Insomnia para poder mandar la informacion dentro de la consola

-Por medio de un metodo get iniciamos el juego utilizando la URL http://localhost:3000/api/diccionarios

-Seguidamente despues de iniciarlo usamos un metodo POST con la URL http://localhost:3000/api/diccionarios/category para seleccionar la categoria a jugar,
se debe de hacer de la siguiente manera en el programa de insomnia:

{
	"category":"fruta"
}
despues de colocar category entre comillas y colocar los 2 puntos, entre comillas colocamos la categoria a acceder

-Despues de tener la categoria seleccionaremos un indice para elegir que palabra jugar y adivinar, la palabra esta oculta por medio de guiones bajos para no ser descubierta hasta que se complete, usaremos un metodo POST para enviar estos parametros con la siguiente URL http://localhost:3000/api/diccionarios/indice. Al igual que la categoria vamos a colocar el dato como ejemplo de la siguiente manera:

{
	"indice":"2"
}
en donde se coloca el numero 2 se podra colocar cualquier numero que muestre en la lista para encontrar la palabra

-Ahora con otro metodo POST con la URL http://localhost:3000/api/diccionarios/enviardato podremos colocar las letras para ir jugando, como ejemplo nuevamente se hara de la siguiente manera:

{
	"dato":"g"
}

en donde se colocaran las letras dentro las comillas donde se encuentra la letra g que es de ejemplo.