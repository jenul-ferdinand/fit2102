# Workshop 2

## Exercises

We will work through the exercises in the following files in the `src/` folder: `flip.ts`, `conslists.ts`, `conslistexperiments.ts` in that order.

Also, `prettyjson.ts` will not be part of the main workshop but remains as an optional and interesting exercise in understanding the power of TypeScript types to help write robust code.

## Download and build

This week, to build and test with npm and vite we will need to download the code
and work locally on our own machines or others' machines via vscode Liveshare.
To download a zip bundle from the Ed workspace, right click on the file tree and select "Download All".

You can run tests and show the html output on your local machine (requires node.js):

```
> npm install
```

Start tests:

```
> npm test
```

Show html output:

```
> npm run dev
```

then click on the ctrl-link displayed in your terminal.

## Work directly in Ed

If you can't get Liveshare working for some reason (highly recommend you try),
it is possible to build typescript from the Ed terminal and see the tests in the webpreview.

1. For a copy of this workspace for your group
2. Click the "Open Terminal" button
3. To build:

```
> tsc
```

4. To see the tests, right click on index.html and "Open in web preview"
