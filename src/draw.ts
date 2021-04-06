function draw<A>(ls: A[]): A {
    return ls[Math.floor(Math.random() * ls.length)];
}

export default draw;