// namespace
const ND = 'not dangerous';
const TWD = 'teensy-weensy dangerous';
const SD = 'slightly dangerous';
const MD = 'moderately dangerous';
const ED = 'extremely dangerous';
const DAFH = 'dangerous as freakin hell';
const DEAD = 'no chance to survive';

const EMPTY_LINE = '\n';


const dangerTier = {
    list: {
        'Capybaras': ND,
        'Oleg': TWD,
        "Oleg when he's hungry": SD,
        'Expired Ryazhenka': MD,
        'Average Vim user': MD,
        'Sofa made from uranium-235': ED,
        'Batin soup': DAFH,
    },
    add(item, dangerLevel) {
        this.list[item] = dangerLevel;
    },
    del(item) {
        if (item in this.list) {
            delete this.list[item];
        } else {
            console.log(`'${item}' cannot be deleted: item not found.`);
        };
    },
    show() {
        console.log('How dangerous is...' + EMPTY_LINE);
        for (const item in this.list) {
            console.log(`${item} - ${this.list[item]};`);
        };
    }
};


dangerTier.add('Telling Bashkirian that you hate Beshbarmak', DEAD); // Successfully added.
dangerTier.del('Oleg'); // That's enough for you, dude, take a rest.
dangerTier.del('Lego brick on the floor'); // Error (you really can't just find it).

dangerTier.show();