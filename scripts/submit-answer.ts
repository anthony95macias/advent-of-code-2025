import { config } from "dotenv";

config();

interface SubmitResult {
  success: boolean;
  message: string;
  correct?: boolean;
  waitTime?: string;
  alreadyComplete?: boolean;
}

async function submitAnswer(
  day: number,
  answer: string | number,
  part: 1 | 2 = 1
): Promise<SubmitResult> {
  const sessionToken = process.env.AOC_SESSION_TOKEN;

  if (!sessionToken) {
    console.error("❌ AOC_SESSION_TOKEN not found in .env file");
    process.exit(1);
  }

  const url = `https://adventofcode.com/2025/day/${day}/answer`;
  const formData = new URLSearchParams({
    level: part.toString(),
    answer: answer.toString(),
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: `session=${sessionToken}`,
        "User-Agent":
          "github.com/your-username/advent-of-code-2025 by your@email.com",
      },
      body: formData.toString(),
    });

    const html = await response.text();

    // Parse the response to determine success/failure
    if (html.includes("That's the right answer")) {
      return {
        success: true,
        correct: true,
        message: "✅ Correct! That's the right answer!",
      };
    } else if (html.includes("That's not the right answer")) {
      // Check if it says too high or too low
      let hint = "";
      if (html.includes("too high")) {
        hint = " (your answer is too high)";
      } else if (html.includes("too low")) {
        hint = " (your answer is too low)";
      }
      return {
        success: true,
        correct: false,
        message: `❌ Wrong answer${hint}`,
      };
    } else if (html.includes("You gave an answer too recently")) {
      // Extract wait time if available
      const waitMatch = html.match(/You have (.*?) left to wait/);
      const waitTime = waitMatch ? waitMatch[1] : "some time";
      return {
        success: false,
        waitTime,
        message: `⏳ Too soon! Please wait ${waitTime} before submitting again.`,
      };
    } else if (
      html.includes("Did you already complete it") ||
      html.includes("already complete")
    ) {
      return {
        success: true,
        alreadyComplete: true,
        message: "ℹ️  You've already completed this part!",
      };
    } else {
      // Unknown response
      return {
        success: false,
        message: "⚠️  Unknown response from server. Check the website manually.",
      };
    }
  } catch (error) {
    console.error("❌ Error submitting answer:", error);
    return {
      success: false,
      message: `❌ Network error: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

// Main script execution
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error("Usage: pnpm submit <day> <answer> [--part2]");
    console.error("Example: pnpm submit 1 984");
    console.error("Example: pnpm submit 1 1234 --part2");
    process.exit(1);
  }

  const day = parseInt(args[0], 10);
  const answer = args[1];
  const part = args.includes("--part2") ? 2 : 1;

  if (isNaN(day) || day < 1 || day > 25) {
    console.error("❌ Invalid day number. Must be between 1 and 25.");
    process.exit(1);
  }

  console.log(`\n📤 Submitting answer for Day ${day}, Part ${part}...`);
  console.log(`Answer: ${answer}\n`);

  const result = await submitAnswer(day, answer, part as 1 | 2);

  console.log(result.message);

  if (result.correct) {
    console.log("\n🎉 Congratulations! Moving on to the next part!\n");
    process.exit(0);
  } else if (result.correct === false) {
    console.log("\n💡 Try again with a different answer.\n");
    process.exit(1);
  } else {
    process.exit(1);
  }
}

main();
