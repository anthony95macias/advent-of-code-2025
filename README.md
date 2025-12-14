# 🎄 Advent of Code 2025 - TypeScript

My solutions for [Advent of Code 2025](https://adventofcode.com/2025) written in TypeScript.

## 📁 Project Structure

```
advent-of-code-2025-ts/
├── scripts/
│   ├── scraper.ts       # Fetches problems and inputs from AoC
│   ├── setup-day.ts     # CLI to initialize a new day
│   ├── update-day.ts    # CLI to update day with Part 2
│   └── submit-answer.ts # CLI to submit answers
├── templates/
│   └── index.ts         # Template for daily solutions
├── aoc-1/
│   ├── README.md        # Problem statement
│   ├── index.ts         # Solution code
│   ├── input.txt        # Personal puzzle input
│   └── sample-input.txt # Example input from problem
├── aoc-2/
│   └── ... (same structure)
└── ... (up to aoc-25)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm package manager (`npm install -g pnpm`)

### Initial Setup

1. **Install dependencies**:
   ```bash
   cd advent-of-code-2025-ts
   pnpm install
   ```

2. **Configure your session token**:
   ```bash
   cp .env.example .env
   ```

3. **Get your Advent of Code session token**:
   - Go to [adventofcode.com](https://adventofcode.com) and log in
   - Open browser DevTools (F12)
   - Go to Application/Storage → Cookies
   - Copy the value of the `session` cookie
   - Paste it in `.env`:
     ```
     AOC_SESSION_TOKEN=your_token_here
     ```

## 🎯 Daily Workflow

### Setup a New Day

You can setup a day using either a day number or a direct URL:

**Option 1: Day Number**
```bash
pnpm setup-day <day>
```

**Option 2: Direct URL**
```bash
pnpm setup-day https://adventofcode.com/2025/day/<day>
```

**Examples:**
```bash
pnpm setup-day 2
pnpm setup-day https://adventofcode.com/2025/day/2
pnpm setup-day https://adventofcode.com/2025/day/3
```

This will:
- ✅ Create `aoc-<N>/` folder
- ✅ Scrape problem from adventofcode.com
- ✅ Generate `README.md` with formatted problem statement
- ✅ Download your personal `input.txt`
- ✅ Create empty `sample-input.txt` (paste example manually)
- ✅ Create `index.ts` from template

### Run Your Solution

```bash
pnpm day<N>
```

**Examples:**
```bash
pnpm day1   # Run day 1
pnpm day2   # Run day 2
pnpm day25  # Run day 25
```

### Submit Your Answer

Once you have your answer, submit it directly to Advent of Code:

```bash
pnpm submit <day> <answer>
```

**Examples:**
```bash
pnpm submit 1 984        # Submit answer for day 1, part 1
pnpm submit 1 1234 --part2  # Submit answer for day 1, part 2
```

**Response Types:**

- ✅ **Correct** - Your answer is right! Move to the next part
- ❌ **Wrong** - Try again (may include hint if too high/low)
- ⏳ **Too soon** - Wait before submitting again
- ℹ️ **Already complete** - You've already solved this part

### Update Day with Part 2

After completing Part 1, fetch Part 2 of the puzzle:

```bash
pnpm update-day <day>
```

**Example:**
```bash
pnpm update-day 1  # Updates aoc-1/README.md with Part 2
```

This will refresh the README.md with the latest content from Advent of Code, including Part 2 if it's been unlocked.

### Development Mode (Watch)

```bash
pnpm dev --day=<N>
```

**Example:**
```bash
pnpm dev --day=1  # Auto-reload on file changes
```

## 📝 Solution Template

Each day's `index.ts` follows this structure:

```typescript
import fs from "fs/promises";

function partOne(lines: string[]) {
    // TODO: Implement part 1
    return 0;
}

function partTwo(lines: string[]) {
    // TODO: Implement part 2
    return 0;
}

const input = await fs.readFile("./aoc-N/input.txt", "utf-8");
const lines = input.trim().split("\n");

console.log("Part 1:", partOne(lines));
console.log("Part 2:", partTwo(lines));
```

## 📊 Progress

| Day | Part 1 | Part 2 | Notes |
|-----|--------|--------|-------|
| 1   | ⭐     | ⭐     | Secret Entrance |
| 2   | -      | -      | |
| 3   | -      | -      | |
| ... | -      | -      | |

## 🛠️ Tech Stack

- **TypeScript** - Type-safe JavaScript
- **tsx** - Fast TypeScript execution
- **cheerio** - HTML parsing for scraping
- **dotenv** - Environment variable management

## 📜 Scripts Reference

| Command | Description |
|---------|-------------|
| `pnpm setup-day <N>` | Initialize day N with problem + inputs |
| `pnpm update-day <N>` | Update day N README with Part 2 |
| `pnpm day<N>` | Run solution for day N |
| `pnpm submit <N> <answer>` | Submit answer to Advent of Code |
| `pnpm dev --day=<N>` | Run day N in watch mode |

## 🔒 Privacy

- `.env` is gitignored (contains your session token)
- `input.txt` files contain your personal puzzle inputs
- Never commit these to version control

## 📚 Resources

- [Advent of Code 2025](https://adventofcode.com/2025)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [AoC Subreddit](https://www.reddit.com/r/adventofcode/)

## 📄 License

MIT

---

**Happy Coding! 🎄✨**
