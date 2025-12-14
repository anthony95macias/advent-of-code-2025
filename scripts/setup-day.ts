import { scrapeDayData, saveDay } from "./scraper.js";
import fs from "fs/promises";
import path from "path";
import { config } from "dotenv";

// Load environment variables
config();

const dayOrUrl = process.argv[2];

if (!dayOrUrl) {
  console.error("❌ Please provide a day number or URL:");
  console.error("   pnpm setup-day <day>");
  console.error("   pnpm setup-day https://adventofcode.com/2025/day/<day>");
  process.exit(1);
}

let dayNum: number;

// Check if it's a URL
if (dayOrUrl.startsWith('http')) {
  const match = dayOrUrl.match(/day\/(\d+)/);
  if (!match || !match[1]) {
    console.error("❌ Invalid AoC URL format. Expected: https://adventofcode.com/2025/day/N");
    process.exit(1);
  }
  dayNum = parseInt(match[1], 10);
} else {
  dayNum = parseInt(dayOrUrl, 10);
  if (isNaN(dayNum) || dayNum < 1 || dayNum > 25) {
    console.error("❌ Day must be a number between 1 and 25");
    process.exit(1);
  }
}

const sessionToken = process.env.AOC_SESSION_TOKEN;

if (!sessionToken) {
  console.error("❌ AOC_SESSION_TOKEN not found in .env file");
  console.error("   Please copy .env.example to .env and add your session token");
  process.exit(1);
}

const baseDir = process.cwd();
const dayDir = path.join(baseDir, `aoc-${dayNum}`);

// Check if day already exists
try {
  await fs.access(dayDir);
  console.error(`❌ Day ${dayNum} already exists at ${dayDir}`);
  process.exit(1);
} catch {
  // Directory doesn't exist, continue
}

console.log(`\n🎄 Setting up Day ${dayNum}...\n`);

try {
  // Scrape data from Advent of Code (pass original input to preserve URL if given)
  const data = await scrapeDayData(dayOrUrl, sessionToken);

  // Save README, input, and sample-input
  await saveDay(dayNum, data, baseDir);

  // Copy template index.ts
  const templatePath = path.join(baseDir, "templates", "index.ts");
  const indexPath = path.join(dayDir, "index.ts");

  let template = await fs.readFile(templatePath, "utf-8");
  template = template.replace(/DAY_NUMBER/g, dayNum.toString());

  await fs.writeFile(indexPath, template);

  console.log(`✅ Created index.ts from template\n`);
  console.log(`✅ Day ${dayNum} setup complete!`);
  console.log(`\nNext steps:`);
  console.log(`  1. Add sample input to aoc-${dayNum}/sample-input.txt`);
  console.log(`  2. Implement your solution in aoc-${dayNum}/index.ts`);
  console.log(`  3. Run with: pnpm day${dayNum}\n`);
} catch (error) {
  console.error(`\n❌ Error setting up day ${dayNum}:`);
  if (error instanceof Error) {
    console.error(`   ${error.message}`);
  }
  process.exit(1);
}
