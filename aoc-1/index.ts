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
        // console.log({change, current, value})


        if (current === 0) {
            password += 1;
        }
    });
    console.log(password);
    return password;
}

function modulus(value: number, divisor: number) {
    return value - (divisor * Math.floor(value /divisor))
}

function partTwo(rotations: string[]) {
    let password = 0;
    let current = START;

    rotations.forEach((rotation) => {
        if (!rotation) return;

        const dir = rotation[0];
        let value = Number(rotation.slice(1));

        if (dir == "L") {
            // Moving left - simulate each click
            for (let i = 0; i < value; i++) {
                current--;
                if (current < 0) {
                    current = TOTAL - 1;
                }
                if (current === 0) {
                    password++;
                }
            }
        } else {
            // Moving right - simulate each click
            for (let i = 0; i < value; i++) {
                current++;
                if (current >= TOTAL) {
                    current = 0;
                }
                if (current === 0) {
                    password++;
                }
            }
        }
    });
    console.log(password);
    return password;
}

const sampleData = await fs.readFile("aoc-1/sample-input.txt", "utf-8");
const inputData = await fs.readFile("aoc-1/input.txt", "utf-8");

console.log("Part 1:");
console.log("Sample input:");
partOne(sampleData.split("\n"));
console.log("Input:");
partOne(inputData.split("\n"));

console.log("\nPart 2:");
console.log("Sample input:");
partTwo(sampleData.split("\n"));
console.log("Input:");
partTwo(inputData.split("\n"));