# Sudoku Puzzle Solver

A browser-based Sudoku puzzle solver implemented as a single self-contained HTML file.

## Origin

This file was originally written by **Guyon Roche** (www.silver-daggers.co.uk) and published on
[webreference.com](http://www.webreference.com/programming/javascript/gr/column16/index.html).
It was subsequently modified by **Warren Porter** (modifications documented in the "About" section
of the page). The file is dated May 23, 2009.

This repository is an archival copy. No further development is planned.

## What It Does

- Configurable puzzle dimensions (not just 9×9 — any width × height group size)
- Browser-based grid entry with arrow key and Enter key navigation
- Iterative constraint-propagation solver using four strategies:
  1. Eliminate confirmed values from all peers in the same row, column, and group
  2. Isolate tokens that appear as a candidate in only one cell of a row, column, or group
  3. Detect naked subsets — N cells sharing exactly N candidates, eliminating those candidates elsewhere
  4. Detect tokens confined to a single row or column within a group, eliminating them from that row/column outside the group

## Usage

Open `index.html` directly in any browser. No server, build step, or dependencies required.

## License

The original code is the work of Guyon Roche. No explicit license was stated in the source.
If you are the author and have licensing preferences, please open an issue.
