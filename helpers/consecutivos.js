function * generadorIds(id=1){
    while(true){
        yield id;
        ++id;
    }
}

let generador = generadorIds();

console.log(generador.next());
console.log(generador.next());
console.log(generador.next());
console.log(generador.next());
console.log(generador.next());