import fs from "fs/promises"
import { totalmem } from "os";

const START = 50;
const TOTAL = 100;

function partOne(rotations: string[]) {
    let password = 0;
    let current =  START;
    // console.log(rotations);
    rotations.forEach((rotations) =>{
        const dir = rotations[0];
        let value = Number(rotations.slice(1));
        if (dir == "L") {
            value *= -1;
        }
        let change = current + value;
        while (change < 0 ) {
            change = TOTAL + change;
        }
        current = change % TOTAL;
        console.log({change, current, value})


        if (current === 0) {
            password += 1;
        }
    });
    console.log(password)
}

const lines = await fs.readFile("aoc-1/input.txt", "utf-8")

partOne(lines.split("\n"));