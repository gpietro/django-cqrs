let types = [
    'LOAD',
    'CREATE'
].reduce((prec, next) => {prec[next] = next; return prec}, {})

export default types