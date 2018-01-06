require('./setup');
const { TEXT_FORMAT, print, getName } = require('./_utils');

const suite = async (title, callback) => {
    print(TEXT_FORMAT.BOLD, `SUITE: ${title}`);

    callback();
}

const spec = async (title, callback) => {
    try {
        if(callback[Symbol.toStringTag] === 'AsyncFunction') {
            try {
                await callback();
            }
            catch (e) {
                throw e;
            }
        } else {
            callback();
        }
        print(TEXT_FORMAT.GREEN, `[ ✔ ] ${title}`)
    }
    catch (e) {
        print(TEXT_FORMAT.RED, `[ ✕ ] ${title}`)
        if( e.code === 'ERR_ASSERTION') {
            const message = e.toString().split(':').slice(-1)[0];
            const operator = getName(e.operator) 
            const expected = getName(e.expected) 
            const actual = getName(e.actual)

            print(`ASSERTION ERROR:${message}`)

            if(operator === 'fail') {
                print(`  Expected: ${expected}`)
                print(`  Actual:   ${actual}`)
            }
        } else {
            print(`UNHANDLED ERROR`)
            print(e)
        }

    }
}

const xspec = async (title, callback) => {
    print(TEXT_FORMAT.YELLOW, `[ - ] ${title}`)
}

module.exports = {
    suite,
    spec,
    xspec
}