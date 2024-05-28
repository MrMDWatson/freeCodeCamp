const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    constructor() {
        this.currentText = "";
    }

    updateTranslation(target, replacement, currentTranslation) {
        let newWord = "";
        if (currentTranslation[target.index] === currentTranslation[target.index].toUpperCase()) {
            newWord += replacement[0].toUpperCase();
            newWord += replacement.slice(1);
        } else {
            newWord = replacement;
        }
        const transStart = currentTranslation.slice(0, target.index);
        const transEnding = currentTranslation.slice(target.index + target[0].length);
        if (target.index == 0) {
            this.currentText = "<span class=\"highlight\">" + newWord + "</span>" + transEnding;
        } else {
            this.currentText = transStart + " " + "<span class=\"highlight\">" + newWord + "</span>" + transEnding; 
        }
    }
    
    americanToBritish(text) {
        for (let property in americanOnly) {
            const search = new RegExp(`(\\s${property}|^${property})`, 'i');
            const found = this.currentText.match(search);
            if (found) {
                console.log(found);
                this.updateTranslation(found, americanOnly[property], this.currentText);
            }
        }
        for (let property in americanToBritishSpelling) {
            const search = new RegExp(`\\s${property}`, "i");
            const found = this.currentText.match(search);
            if (found) {
                console.log(found);
                this.updateTranslation(found, americanToBritishSpelling[property], this.currentText);
            }
        }
        for (let property in americanToBritishTitles) {
            const search = new RegExp(`(\\s${property.slice(0, property.length - 1)}[.]|^${property.slice(0, property.length - 1)}[.])`, "i");
            let found = this.currentText.match(search);
            if (found) {
                console.log(found);
                this.updateTranslation(found, americanToBritishTitles[property], this.currentText);
            }
        }
        const hasTime = this.currentText.match(/\s\d{1,2}[:]\d\d/);
        if (hasTime) {
            console.log(hasTime);
            let hoursMin = hasTime[0].split(":");
            this.currentText = this.currentText.replace(hasTime, ` <span class=\"highlight\">${hoursMin[0]}.${hoursMin[1]}<span>`);
        }
        if (this.currentText === text) {
            return "Everything looks good to me!"
        }
        return this.currentText;
    }


    britishToAmerican(text) {
        for (let property in britishOnly) {
            const search = new RegExp(`\\s${property}`, 'i');
            const found = this.currentText.match(search);
            if (found) {
                console.log(found);
                this.updateTranslation(found, britishOnly[property], this.currentText);
            }
        }
        for (let property in americanToBritishSpelling) {
            let search = new RegExp(`\\s${americanToBritishSpelling[property]}`, "i");
            let found = this.currentText.match(search);
            if (found) {
                console.log(found);
                this.updateTranslation(found, property, this.currentText);
            }
        }
        for (let property in americanToBritishTitles) {
            let search = new RegExp(`${americanToBritishTitles[property]}`, "i");
            let found = this.currentText.match(search);
            if (found) {
                console.log(found);
                this.updateTranslation(found, property, this.currentText);
            }
        }
        let hasTime = this.currentText.match(/\s\d{1,2}[.]\d\d/);
        if (hasTime) {
            console.log(hasTime);
            let hoursMin = hasTime[0].split(".");
            this.currentText = this.currentText.replace(hasTime, ` <span class=\"highlight\">${hoursMin[0]}:${hoursMin[1]}<span>`);
        }
        if (this.currentText === text) {
            return "Everything looks good to me!"
        }
        return this.currentText;
    }

    translate(text, locale) {
        this.currentText = text;
        let translation;
        if (locale === "american-to-british") {
            translation = this.americanToBritish(text);
        } else if (locale === "british-to-american") {
            translation = this.britishToAmerican(text);
        } else {
            return {error: "Invalid value for locale field"}
        }
        console.log(translation);
        return {text: text, translation: translation};
    }
}

module.exports = Translator;