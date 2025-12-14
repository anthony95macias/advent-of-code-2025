import fs from "fs/promises";

function partOne(lines: string[]) {
    // TODO: Implement part 1
    return 0;
}

function partTwo(lines: string[]) {
    // TODO: Implement part 2
    return 0;
}

const input = await fs.readFile("./aoc-2/input.txt", "utf-8");
const lines = input.trim().split("\n");

console.log("Part 1:", partOne(lines));
console.log("Part 2:", partTwo(lines));
