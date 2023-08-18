const IN_PROGRESS = "In Progress";
const DONE = "Done";
const TO_DO = "To Do";

const list = {
	"create a new practice task": "In Progress", 
	"make a bed": "Done", 
	"write a post": "To Do",
}

function changeStatus (task, status) {
    if (task in list) {
        if (status === IN_PROGRESS || status === DONE || 
            status === TO_DO) {
            list[task] = status;
        } else {
            console.log("unknown status");
        }
    } else {
        console.log("no such task");
    }
}

function addTask(task) {
    if (task in list) {
        console.log("such a task already exists");
    } else {
        list[task] = "";
    }
}

function deleteTask(task) {
    delete list[task];
}

// function showList() {
//     for (key in list) {
//         console.log(`"${key}": ${list[key]}`);
//     }
// }

function showList() {
    let flag;

    for (i = 3; i >= 1; i--) {
        switch (i) {
            case 3:
                console.log(`${TO_DO}:`);
                flag = false;
                for (key in list) {
                    if (list[key] === TO_DO) {
                        console.log(`\t"${key}"`);
                        flag = true;
                    }
                }
                if (flag === false) {
                    console.log("\t-")
                }
                break;
            case 2:
                console.log(`${IN_PROGRESS}:`);
                flag = false;
                for (key in list) {
                    if (list[key] === IN_PROGRESS) {
                        console.log(`\t"${key}"`);
                        flag = true;
                    }
                }
                if (flag === false) {
                    console.log("\t-")
                }
                break;
            case 1:
                console.log(`${DONE}:`);
                flag = false;
                for (key in list) {
                    if (list[key] === DONE) {
                        console.log(`\t"${key}"`);
                        flag = true;
                    }
                }
                if (flag === false) {
                    console.log("\t-")
                }
                break;
        }
    }
}

changeStatus("create a new practice task", TO_DO);
changeStatus("make a bed", TO_DO);
changeStatus("write a post", IN_PROGRESS);

showList();