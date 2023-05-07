/**
 * https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript
 * @param {number} num 
 * @returns 
 */
function romanize (num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}


function getTimePassedStr(frameCount) {
    const totalMs = frameCount * 1000 / 60;  // Assuming game runs at 60 fps
    let cs = Math.floor(totalMs / 10) % 100;
    let s = Math.floor(totalMs / 1000) % 60;
    let min = Math.floor(totalMs / 60000);
    cs = cs >= 10 ? cs : "0" + cs;
    s = s >= 10 ? s : "0" + s;
    min = min >= 10 ? min : "0" + min;
    return `${min}:${s}.${cs}`;
}
