// Experiment #1
const bonusPony = null;

const maneSixColors = {
    'Twilight Sparkle': 'D19FE4',
    'Pinkie Pie': 'FAB3D1',
    'Fluttershy': 'FCF4A4',
    'Rarity': 'F1F1F3',
    'Applejack': 'FDC363',
    'Rainbow Dash': 'A3DEF8',
    bonusPony: 'muffins?'
};

console.log(maneSixColors);

maneSixColors["Pinkie Pie"] = 'SuperDuperAwesome string!';
maneSixColors.Fluttershy = 'YAY :3';
maneSixColors.Rarity = 'This is... The WORST. POSSIBLE. STRING!!!';
maneSixColors.Applejack = "What the tarnation y'all doing?!";
maneSixColors.Spike = "Finally, I wasn't forgotten";

delete maneSixColors.bonusPony; // I'm sorry, Derpy :(

console.log(maneSixColors);
console.log(maneSixColors.oleg); // undefined


// Experiment #2
let theLastMatreshka;

const objectMatreshka = {
    'firstMatreshka': {
        'secondMatreshka': {
            'thirdMatreshka': {
                'fourthMatreshka': {
                    theLastMatreshka // Here you are!
                }
            }
        }
    }
};
// Mavrodi smokes on the sidelines...

console.log(objectMatreshka); // { firstMatreshka: { secondMatreshka: { thirdMatreshka: [Object] } } }
console.log(objectMatreshka.firstMatreshka.secondMatreshka.thirdMatreshka.fourthMatreshka.theLastMatreshka); // undefined

theLastMatreshka = { 'We need more matreshkas': "Let's add it!" };

console.log(objectMatreshka.firstMatreshka.secondMatreshka.thirdMatreshka.fourthMatreshka.theLastMatreshka); // Still undefined!

objectMatreshka.firstMatreshka = 'There can only be one matreshka in this town';

console.log(objectMatreshka); // { firstMatreshka: 'There can only be one matreshka in this town' }


// Experiment #3
const dynamite = {
    'goodbye': 'Eddie'
};

const eddie = {
    'ate': dynamite
};

console.log(eddie); // *explosion noise*

delete dynamite.goodbye;
dynamite["So long"] = 'And thanks for all the fish';

console.log(eddie); // We see the changes of value and key in { dynamite } object that we've made.