import fs from "fs/promises";

function partOne(lines: string[]) {
    // TODO: Implement part 1
    const result = 0;
    console.log(result);
    return result;
}

function partTwo(lines: string[]) {
    // TODO: Implement part 2
    const result = 0;
    console.log(result);
    return result;
}

const sampleData = await fs.readFile("aoc-2/sample-input.txt", "utf-8");
const inputData = await fs.readFile("aoc-2/input.txt", "utf-8");

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
