//Test string
//const msg = "c!help \"Web Dev\" asdfasdfasdfasdfsadf \"Game Dev\" \"Hero\" asdfjnsa asjdnfjnasdn askdfk \"Buck Hibana Ash\" \"Thermite\"";

//Parses commandline args from within quotes and returns an array
const parse = msg => {
    let clargs = msg.split('!')[1].split(' '); //array holding all space divided args after '!'

    //array holding all strings within quotation marks
    let qStr = msg.split('"')
        .map((e, i, arr) => {
            if ((i + 1) % 2 === 0)
                return e;
        }).filter(e => e != null);

    //Returns how many times a char occurs within a string
    const charOccurs = (str, char) => {
        let count = 0;
        if (typeof str === 'string' && str) {
            for (let c of str)
                if (c === char)
                    count++;
        } else return -1;
        return count;
    }

    //Array of indices indicating which clargs elements are contain beginning and ending quotation marks
    //Repeating indices indicate a single word within quotes
    let qIndex = [].concat.apply([], clargs.map((e, i) => {
        let c = charOccurs(e, '"');
        if (c === 2)
            return [i, i];
        else if (c > 0 && c < 2)
            return i;
    }).filter(e => e != null));

    qIndex = qIndex.map((e, i, arr) => {
        if (e === arr[i - 1])
            return 'undefined';
        else return e;
    }).filter(e => e != null);

    if (qIndex.length % 2 === 0) {
        for (let i = 0; i < qIndex.length; i += 2) {
            if (typeof qIndex[i] === 'number')
                clargs[qIndex[i]] = qStr.shift();
        }

        for (let i = 1; i < qIndex.length; i += 2) {
            if (typeof qIndex[i] === 'number')
                delete clargs[qIndex[i]];
        }

        return [].concat.apply([], clargs.filter(e => e != null));
    } else return false;
}

module.exports = {
    "parse": parse
};