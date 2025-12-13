import * as cheerio from "cheerio";
import fs from "fs/promises";
import path from "path";

interface DayData {
  title: string;
  description: string;
  input: string;
}

export async function scrapeDayData(
  dayOrUrl: number | string,
  sessionToken: string
): Promise<DayData> {
  let url: string;
  let inputUrl: string;
  let day: number;

  // Check if it's a URL or a day number
  if (typeof dayOrUrl === 'string' && dayOrUrl.startsWith('http')) {
    url = dayOrUrl;
    // Extract day number from URL
    const match = url.match(/day\/(\d+)/);
    if (!match || !match[1]) {
      throw new Error('Invalid AoC URL format. Expected: https://adventofcode.com/2025/day/N');
    }
    day = parseInt(match[1], 10);
    inputUrl = `${url}/input`;
  } else {
    day = typeof dayOrUrl === 'string' ? parseInt(dayOrUrl, 10) : dayOrUrl;
    url = `https://adventofcode.com/2025/day/${day}`;
    inputUrl = `https://adventofcode.com/2025/day/${day}/input`;
  }

  console.log(`Fetching problem from ${url}...`);

  // Fetch the problem page
  const response = await fetch(url, {
    headers: {
      Cookie: `session=${sessionToken}`,
      "User-Agent": "github.com/your-username/advent-of-code-2025 by your@email.com",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch day ${day}: ${response.statusText}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  // Extract title
  const title = $("article.day-desc h2").first().text().replace(/---/g, "").trim();

  // Extract problem description
  const articles = $("article.day-desc");
  let description = "";

  articles.each((_, article) => {
    description += convertArticleToMarkdown(cheerio.load(article), $);
  });

  // Fetch input
  console.log(`Fetching input from ${inputUrl}...`);
  const inputResponse = await fetch(inputUrl, {
    headers: {
      Cookie: `session=${sessionToken}`,
      "User-Agent": "github.com/your-username/advent-of-code-2025 by your@email.com",
    },
  });

  if (!inputResponse.ok) {
    if (inputResponse.status === 404) {
      throw new Error(`Day ${day} is not available yet. Puzzles unlock daily at midnight EST.`);
    }
    if (inputResponse.status === 400) {
      throw new Error(`Day ${day} puzzle hasn't unlocked yet, or there's an authentication issue. Check your session token.`);
    }
    throw new Error(`Failed to fetch input (${inputResponse.status}): ${inputResponse.statusText}`);
  }

  const input = await inputResponse.text();

  return {
    title,
    description,
    input: input.trim(),
  };
}

function convertArticleToMarkdown($article: cheerio.CheerioAPI, $root: cheerio.CheerioAPI): string {
  let markdown = "";

  $article("*").each((_: number, elem: any) => {
    const $elem = $root(elem);
    const tagName = elem.name;

    switch (tagName) {
      case "h2":
        // Skip the title (we handle it separately)
        break;
      case "p":
        markdown += convertParagraph($elem, $root) + "\n\n";
        break;
      case "pre":
        markdown += "```\n" + $elem.find("code").text() + "\n```\n\n";
        break;
      case "ul":
        $elem.find("li").each((_: number, li: any) => {
          markdown += `- ${$root(li).text()}\n`;
        });
        markdown += "\n";
        break;
      case "em":
        if ($elem.parent().prop("tagName") === "article") {
          markdown += convertParagraph($elem, $root) + "\n\n";
        }
        break;
    }
  });

  return markdown;
}

function convertParagraph($p: cheerio.Cheerio<any>, $: cheerio.CheerioAPI): string {
  let text = "";

  $p.contents().each((_: number, node: any) => {
    if (node.type === "text") {
      text += node.data;
    } else if (node.name === "em") {
      text += `**${$(node).text()}**`;
    } else if (node.name === "code") {
      text += `\`${$(node).text()}\``;
    } else if (node.name === "a") {
      const href = $(node).attr("href");
      const linkText = $(node).text();
      text += `[${linkText}](${href})`;
    } else if (node.name === "span") {
      text += $(node).text();
    } else {
      text += $(node).text();
    }
  });

  return text;
}

export async function generateReadme(
  day: number,
  title: string,
  description: string
): Promise<string> {
  return `# [Day ${day}: ${title}](https://adventofcode.com/2025/day/${day})

${description}`;
}

export async function saveDay(day: number, data: DayData, baseDir: string) {
  const dayDir = path.join(baseDir, `aoc-${day}`);

  // Create day directory
  await fs.mkdir(dayDir, { recursive: true });

  // Generate and save README
  const readme = await generateReadme(day, data.title, data.description);
  await fs.writeFile(path.join(dayDir, "README.md"), readme);

  // Save input
  await fs.writeFile(path.join(dayDir, "input.txt"), data.input);

  // Create empty sample-input.txt
  await fs.writeFile(path.join(dayDir, "sample-input.txt"), "");

  console.log(`✅ Created README.md, input.txt, and sample-input.txt`);
}
