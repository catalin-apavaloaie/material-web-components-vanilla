# material-web-components-vanilla

[![Build Status](https://travis-ci.org/dolphinkiss/material-web-components-vanilla.svg?branch=master)](https://travis-ci.org/dolphinkiss/material-web-components-vanilla)

## Contributing

Fork the repository, and run:

```bash
npm run init
```

Start the demo server in one terminal:

```bash
npm run demo
```

Start the watcher in second terminal


```bash
npm run watch
```

You add demo elements to demo/ folder together with markup

##Sumitting Pull Requests
1) Create your own form ( go to https://github.com/dolphinkiss/material-web-components-vanilla and click "Fork")
2) This will create a new repository that **you** own. Get its URL and clone it locally
3) Set upstream to this repository by running
```bash
git remote add upstream git@github.com:dolphinkiss/material-web-components-vanilla.git
```
4) To test run `git remote` and you should see (at least) a list with "origin" and "upstream" in it
5) Run `git fetch upstream` to get the latest references from this repository
6) To actually update your repository, while in your master branch, run: `git merge upstream/master`
7) Create a new branch from master in your repository and work there
8) When you are done and your branch is pushed to your repo (`git push -u origin your-branch`) you can create a new PR
9) Since you originated your branch from this repo's master and your master the defaults should be OK and show the two merges that will happen