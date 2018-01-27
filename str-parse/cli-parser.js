//Test string
// const msg = "c!help \"Web Dev\" asdfasdfasdfasdfsadf \"Game Dev\" \"Hero\" asdfjnsa asjdnfjnasdn askdfk \"Buck Hibana Ash\" \"Thermite\"";

//Parses commandline args from within quotes and returns an array
const parse = msg => {
    let clargs = msg.split('!')[1].split(' '); //array holding all space divided args after '!'

    let qStr = msg.split('"').map((e, i) => { if ((i + 1) % 2 === 0) return e; }).filter(e => e != null); //array holding all strings within quotation marks

    //Returns how many times a char occurs within a string
    const charOccurs = (str, char) => {
        let count = 0;
        if (typeof str === 'string' && str) {
            for (let c of str)
                if (c === char)
                    count++;
        } else
            return -1;
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

    if (qIndex.length % 2 === 0) {
        let sc = 0; //Splice count
        for (let i = 0; i < qIndex.length; i += 2) {
            let d = Math.abs((qIndex[i] - sc) - (qIndex[i + 1] - sc));

            if (d > 0) {
                console.log(clargs.splice(qIndex[i] - sc, d));
                clargs[qIndex[i] - sc] = qStr.splice(0, 1);
                sc += d;
            } else
                clargs[qIndex[i] - sc] = qStr.splice(0, 1);
        }

        // console.log([].concat.apply([], clargs));
        return [].concat.apply([], clargs);
    } else return false;
}

module.exports = {
    "parse": parse
};