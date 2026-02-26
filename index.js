import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";

const makeSnakeCommits = async (totalWeeks) => {
  const git = simpleGit();

  for (let x = 0; x <= totalWeeks; x++) {
    // Sinusoidal wave: y oscillates between 0 and 6
    const y = Math.round(3 + 3 * Math.sin(x / 4));

    const date = moment("2025-01-01")
      .add(x, "w")
      .add(y, "d")
      .format();

    const data = { date };

    try {
      await jsonfile.writeFile(path, data);
      await git.add([path]);
      const result = await git.commit(`Snake commit: ${date}`, { "--date": date });
      console.log(`[${x}/${totalWeeks}] Commit created: ${result.commit} for ${date}`);
    } catch (err) {
      console.error(`Error at week ${x}:`, err);
    }
  }

  console.log("Snake pattern complete! Pushing to remote...");
  try {
    await git.push();
    console.log("Push successful!");
  } catch (pushErr) {
    console.error("Push failed:", pushErr);
  }
};

// 104 weeks = 2 years
makeSnakeCommits(104);
