import axios from 'axios';
import cheerio from 'cheerio';

const baseUrl = "https://www.duden.de"

function getExamples(ch, query) {
    var beispiele = [];
    for (var j=1; ch(query + `(${j})`).length; j++){
        beispiele.push(ch(query + `(${j})`).text())
    }
    return beispiele
}

function getVerbForm(ch, i, j, type){
    return ch(`#grammatik > div:nth-child(${type === "prasens" ? '3' : '4'}) > div > div > table > tbody > tr:nth-child(${i}) > td:nth-child(${j})`).text().replace(`\n`,'').trim(); 
}   

function getConjugation(ch, type){
    let conj = [];
    let count = 0;
    for (let i = 1; i <= 6; i++){
        let l = [];
        let initial_j = (type === "prasens" && count % 9 === 0) || (type === "prateritum" && count % 6 === 0) ? 2 : 1;
        let verbtypes = type === "prasens" ? 2 : 1;
        for (let j = initial_j; j <= initial_j + verbtypes; j++){
            l.push(getVerbForm(ch, i, j, type));
            count++;
        }
        conj.push(l);
    }
    return conj;
}



export default class WordsController {


    static async getWord(req, res){
        if (req.query.word){
            var url = `${baseUrl}/rechtschreibung/${req.query.word}`
            var result = await axios.get(url)
            if (result.status != 200){
                res.status(404).json({error: result.statusText});
                res.end();
            }
            res.status(result.status);
            const ch = cheerio.load(result.data);
            const generalInfoSelector = (i) => `body > div.dialog-off-canvas-main-canvas > div > div.tabloid__sheet.tabloid__sheet--has-sidebar.tabloid__sheet--has-insert.tabloid__sheet--has-main > main > article > dl:nth-child(${i}) > dd`;
            var wortart = ch(generalInfoSelector(3)).text()
            var gebrauch = ch(generalInfoSelector(4)).text()    
            var worttrennung = ch('#rechtschreibung > dl > dd').text()
            var bedeutungen = [];
            if (ch('#bedeutung > header').length){
                var text = ch('#bedeutung > p').text();
                var beispiele = getExamples(ch, `#bedeutung > dl > dd > ul > li:nth-child`)
                bedeutungen.push({bedeutung: text, beispiele});
            }
            else {
                var numberOfMeanings = ch('#bedeutungen > header > h2').text().replace(/\D/g, "");    
                for (var i = 1; i <= numberOfMeanings; i++){
                    if (ch(`#Bedeutung-${i}a`).length){
                        for (let letter of 'abcdefghijklmnopqstuvwxyz'){
                            if (ch(`#Bedeutung-${i}${letter}`).length){
                                var text = ch(`#Bedeutung-${i}${letter} > div`).text().replace(`\n`,'').trim();
                                var beispiele = getExamples(ch, `#Bedeutung-${i}${letter} > dl > dd > ul > li:nth-child`)
                                bedeutungen.push({bedeutung: text, beispiel: beispiele}); 
                            }
                        }
                    }
                    else {
                        var text =  ch(`#Bedeutung-${i} > div`).text().replace(`\n`,'').trim();
                        var beispiele = getExamples(ch, `#Bedeutung-${i} > dl > dd > ul > li:nth-child`)
                        bedeutungen.push({bedeutung: text, beispiele});
                    }

                }

            }
            var grammatik = ch(`#grammatik > p`).text().replace(`\n`,'').trim(); 
            if (wortart.includes('Verb')){
                var prasens = getConjugation(ch, "prasens");
                var prateritum = getConjugation(ch, "prateritum");
                var formen = [];
                for (let i = 1; i <= 3; i++){
                    formen.push(ch(`#grammatik > table > tbody > tr:nth-child(${i}) > td`).text().trim());
                }
            }
            res.send({
                word: req.query.word,
                type: wortart,
                usage: gebrauch,
                separation: worttrennung,
                meanings: bedeutungen,
                grammatik,
                prasens: prasens ? prasens : null,
                prateritum: prateritum ? prateritum : null,
                formen: formen ? formen : null
            })
        }
        else{
            res.status(404).json({error: "Not found"});
        }
    
    }
}