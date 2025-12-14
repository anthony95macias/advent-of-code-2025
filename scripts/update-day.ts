import { config } from "dotenv";
import { scrapeDayData, saveDay } from "./scraper.js";
import fs from "fs/promises";
import path from "path";

config();

async function main() {
  const dayArg = process.argv[2];

  if (!dayArg) {
    console.error("Usage: pnpm update-day <day>");
    console.error("Example: pnpm update-day 1");
    process.exit(1);
  }

  const day = parseInt(dayArg, 10);

  if (isNaN(day) || day < 1 || day > 25) {
    console.error("❌ Invalid day number. Must be between 1 and 25.");
    process.exit(1);
  }

  const sessionToken = process.env.AOC_SESSION_TOKEN;

  if (!sessionToken) {
    console.error("❌ AOC_SESSION_TOKEN not found in .env file");
    console.error("Please follow the setup instructions in README.md");
    process.exit(1);
  }

  const dayDir = path.join(process.cwd(), `aoc-${day}`);

  // Check if day exists
  try {
    await fs.access(dayDir);
  } catch {
    console.error(`❌ Day ${day} hasn't been set up yet.`);
    console.error(`Run: pnpm setup-day ${day}`);
    process.exit(1);
  }

  console.log(`\n🔄 Updating Day ${day} with latest content (including Part 2 if unlocked)...\n`);

  try {
    const data = await scrapeDayData(day, sessionToken);
    await saveDay(day, data, process.cwd(), true);

    console.log(`\n✨ Day ${day} updated successfully!`);
    console.log(`📖 Check aoc-${day}/README.md for Part 2 (if unlocked)\n`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`\n❌ Error: ${error.message}\n`);
    } else {
      console.error("\n❌ An unknown error occurred\n");
    }
    process.exit(1);
  }
}

main();
