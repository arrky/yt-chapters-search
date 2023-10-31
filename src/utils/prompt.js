import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

async function promptVideoId() {
  const rl = readline.createInterface({ input, output });

  const answer = await rl.question('Video id: ');

  rl.close();

  return answer;
};

export { promptVideoId };
