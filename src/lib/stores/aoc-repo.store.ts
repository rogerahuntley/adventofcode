import { Octokit } from 'octokit';
import { GITHUB_API_KEY } from '$env/static/private';

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
  auth: GITHUB_API_KEY
});

const getAllFiles = async () => {
  return octokit.request('GET /repos/{owner}/{repo}/git/trees/{branch}', {
    owner: 'rogerahuntley',
    repo: 'adventofcode-solutions',
    branch: 'main',
    recursive: 3
  });
};

const getFile = async (path: string) => {
  const fileData = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'rogerahuntley',
    repo: 'adventofcode-solutions',
    path
  });
  return fetch(fileData.data.download_url).then((seth) => seth.text());
};

const rawFiles = await getAllFiles();

// get all .js files
const jsFiles = rawFiles.data.tree
  .filter((f) => {
    const path = f.path.split('/');
    return path.length == 3 && path[2].includes('.js');
  })
  .map((f) => f.path);

const files = {} as { [key: number]: { [key: number]: { [key: string]: string } } };

// now that we have all our valid .js files, lets build our year / months array
for (const file of jsFiles) {
  const fileContent = await getFile(file);
  const path = file.split('/');
  const [year, day, name]: [number, number, string] = path;
  const yearObj = (files[Number(year)] ||= {});
  const daysObject = (yearObj[Number(day)] ||= {});
  daysObject[name] = fileContent;
}

export { files };
