import fs from "fs/promises";

const START = 50;
const TOTAL = 100;

function partOne(rotations: string[]) {
    let password = 0;

    rotations.forEach(rotation => {
        if (!rotation) return;

        const direction = rotation[0];
        const value = Number(rotation.slice(1));

        if (direction === "R") password += value;
        if (direction === "L") password -= value;
    });

    return password;
}

const lines = await fs.readFile("./aoc-1/sample-input.txt", "utf-8");

console.log(partOne(lines.trim().split("\n")));
