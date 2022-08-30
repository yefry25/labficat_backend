function * generadorIds(id=0001){
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