# Contributing to UI Kitten

We would love for you to contribute to UI Kitten and help make it even better together! :rocket:

 - [Code of Conduct](#code-of-conduct)
 - [Question or Problem?](#got-a-question-or-problem)
 - [Issues and Bugs](#found-an-issue)
 - [Feature Requests](#want-a-feature)
 - [Submission Guidelines](#submitting-an-issue)
 - [Coding Rules](#coding-rules)
 - [Debugging your changes](#debugging-your-changes)
 - [Commit Message Guidelines](#commit-message-guidelines)

## Code of Conduct

Help us keep UI Kitten open and inclusive. Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Got a Question or Problem?

Please do not open issues for general support questions as we want to keep GitHub issues for bug reports and feature requests. You've got much better chances of getting your question answered on [StackOverflow](https://stackoverflow.com/search?q=ui-kitten) where the questions should be tagged with tag `ui-kitten`.

StackOverflow is a much better place to ask questions since:

- there are thousands of people willing to help on StackOverflow
- questions and answers stay available for public viewing so your question/answer might help someone else
- StackOverflow's voting system assures that the best answers are prominently visible.

To save your and our time, we will be systematically closing all the issues that are requests for general support and redirecting people to StackOverflow.

## Found an Issue?

If you find a bug in the source code or a mistake in the documentation, you can help us by [submitting an issue](#submitting-an-issue) to our [GitHub Repository](https://github.com/akveo/react-native-ui-kitten/issues/new/choose). Including an issue, reproduction is the absolute best way to help the team quickly diagnose the problem. Screenshots and error stack traces are also helpful.

Please follow this simple checklist before submitting:

* If you have a question about using UI Kitten, please ask on the [StackOverflow](https://stackoverflow.com/search?q=ui-kitten).

* It is required that you clearly describe the steps necessary to reproduce the issue you are running into. Although we would love to help our users as much as possible, diagnosing issues without clear reproduction steps is extremely time-consuming and simply not sustainable.

* The issue list of this repository is exclusively for bug reports and feature requests. Non-conforming issues will be closed immediately.

* Issues with no clear steps to reproduce will not be triaged. If an issue is labeled with "needs info" and receives no further replies from the author of the issue for more than 5 days, it will be closed.

* If you think you have found a bug, or have a new feature idea, please start by making sure it hasn't already been [reported](https://github.com/akveo/react-native-ui-kitten/issues). You can search through existing issues to see if there is a similar one reported. Include closed issues as it may have been closed with a solution.

* Next, [create a new issue](#submitting-an-issue) that thoroughly explains the problem. Please fill out the populated issue form before submitting the issue.

## Want a Feature?

You can *request* a new feature by [submitting an issue](https://github.com/akveo/react-native-ui-kitten/issues/new/choose) to our GitHub Repository. If you would like to *implement* a new feature, please submit an issue with a proposal for your work first, to be sure that we can use it. Please consider what kind of change it is:

* **Small Features** can be crafted and directly [submitted as a Pull Request](#submitting-a-pull-request-pr).

* For a **Major Feature**, first open an issue and outline your proposal so that it can be
discussed. This will also allow us to better coordinate our efforts, prevent duplication of work,
and help you to craft the change so that it is successfully accepted into the project.

### Submitting an Issue
 
Before you submit an issue, search the archive, maybe your question was already answered.

If your issue appears to be a bug and hasn't been reported, [open a new issue](https://github.com/akveo/react-native-ui-kitten/issues/new/choose). Help us to maximize the effort we can spend fixing issues and adding new features by not reporting duplicate issues. Please make sure to fill out the populated issue form before submitting the issue.

### Submitting a Pull Request (PR)

Before you submit your Pull Request (PR) consider the following guidelines:

* Search [GitHub](https://github.com/akveo/react-native-ui-kitten/pulls) for an open or closed PR
  that relates to your submission. You don't want to duplicate effort.
  
* Make your changes in a new git branch:

    ```shell
    git checkout -b fix/my-fix-branch master
    ```
  
* Read the [developer documentation](./DEV_DOCS.md).

* Create your patch, **including appropriate test cases**.

* Follow our [Coding Rules](#coding-rules).

* Test your changes.

* Commit your changes using a descriptive commit message that follows our [commit message conventions](#commit-message-guidelines). Adherence to these conventions is necessary because release notes are automatically generated from these messages.

     ```shell
     git commit -a
     ```
  Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

* Push your branch to GitHub:

    ```shell
    git push my-fork my-fix-branch
    ```

* In GitHub, send a pull request to `master`.

* If we suggest changes then:

  * Make the required updates.
  
  * Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```shell
    git rebase master -i
    git push -f
    ```

That's it! Thank you for your contribution!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

* Delete the remote branch on GitHub either through the GitHub web UI or your local shell as
    follows:

    ```shell
    git push my-fork --delete my-fix-branch
    ```

* Check out the master branch:

    ```shell
    git checkout master -f
    ```

* Delete the local branch:

    ```shell
    git branch -D my-fix-branch
    ```

* Update your master with the latest upstream version:

    ```shell
    git pull --ff upstream master
    ```

## Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

* All features or bug fixes **must be tested** by one or more specs (unit-tests).
* All public API methods **must be documented** following JsDoc notation.

## Debugging your changes

See [developer documentation](./DEV_DOCS.md#start-a-demo-application) for this step.

## Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted.  This leads to **more
readable messages** that are easy to follow when looking through the **project history**.  But also,
we use the git commit messages to **generate the UI Kitten change log**.

### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of
the reverted commit. In the body, it should say: `These reverts commit <hash>.`, where the hash is
the SHA of the commit being reverted.

### Type

Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug or adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests or correcting existing tests
* **build**: Changes that affect the build system, CI configuration or external dependencies
            (example scopes: gulp, broccoli, npm)
* **chore**: Other changes that don't modify `src` or `test` files
* **release**: Release version commit

### Scope

* For [components ui module](src/components/ui) the scope should be the name of the component that was affected:
```
style(button): add styles for pressed state
```
* For changes in other modules (like [moment](src/moment) or [date-fns](src/date-fns)) the scope should be module name:
```
feat(date-fns): description of awesome feature
```

### Subject

The subject contains a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end

### Body

Optional. Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer

Optional. The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with space or two newlines.
The rest of the commit message is then used for this.
