module.exports = (a, b) => {
    return new Promise((resolve, reject) => {
        const saneA = Number.parseInt(a, 10);
        const saneB = Number.parseInt(b, 10);

        if(isNaN(saneA)) {
            reject('First argument is not number')
        }

        if(isNaN(saneB)) {
            reject('Second argument is not number')
        }

        resolve(saneA + saneB);
    })
}