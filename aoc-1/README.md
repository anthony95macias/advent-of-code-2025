# [Day 1: Secret Entrance](https://adventofcode.com/2025/day/1)

## Story

The Elves have good news and bad news.

**Good news:** They've discovered project management! This has given them the tools to prevent their usual Christmas emergency. They now know that the North Pole decorations need to be finished soon so other critical tasks can start on time.

**Bad news:** They've realized they have a different emergency: according to their resource planning, none of them have any time left to decorate the North Pole!

To save Christmas, the Elves need you to finish decorating the North Pole by December 12th.

---

## Part 1: The Safe Combination

You arrive at the secret entrance to the North Pole base ready to start decorating. Unfortunately, the password has been changed, so you can't get in. A document taped to the wall helpfully explains:

> "Due to new security protocols, the password is locked in the safe below. Please see the attached document for the new combination."

### The Safe

- The safe has a dial with only an arrow on it
- Around the dial are numbers **0 through 99** in order
- As you turn the dial, it makes a small click noise at each number
- **The dial starts pointing at 50**

### Instructions Format

The attached document (your puzzle input) contains a sequence of rotations, one per line:

- `L` or `R` indicates the direction:
  - **L** = Left (toward lower numbers)
  - **R** = Right (toward higher numbers)
- The number indicates how many clicks to rotate

### Examples

- If the dial is at `11`, a rotation of `R8` � dial points at `19`
- From `19`, a rotation of `L19` � dial points at `0`

### Wrapping Around

Because the dial is a circle:
- Turning left from `0` by one click � points at `99`
- Turning right from `99` by one click � points at `0`

More examples:
- If the dial is at `5`, a rotation of `L10` � points at `95`
- From `95`, a rotation of `R5` � points at `0`

### The Trick

The safe is actually a decoy! The **actual password** is:

**The number of times the dial points at 0 after any rotation in the sequence.**

### Sample Input

```
L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
```

### Sample Walkthrough

| Step | Rotation | Dial Points At | Count at 0 |
|------|----------|----------------|------------|
| Start | - | 50 | 0 |
| 1 | L68 | 82 | 0 |
| 2 | L30 | 52 | 0 |
| 3 | R48 | **0** | 1 |
| 4 | L5 | 95 | 1 |
| 5 | R60 | 55 | 1 |
| 6 | L55 | **0** | 2 |
| 7 | L1 | 99 | 2 |
| 8 | L99 | **0** | 3 |
| 9 | R14 | 14 | 3 |
| 10 | L82 | 32 | 3 |

Because the dial points at `0` a total of **three times** during this process, the password in this example is **3**.

### Your Task

Analyze the rotations in your attached document. **What's the actual password to open the door?**