# Release checklist:

1. Create a new release branch with template `release-vX.X.X`
2. Update package version in package.json
3. Run and test [Playground](src/playground) ([guide](CONTRIBUTING.md#run))
4. Run [docs](docs)
5. Generate [changelog](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli)
6. Fix/expand changelog manually
7. Update [readme](README.md) files if needed
8. Push the branch, create PR, approve, merge
9. Switch to master branch and pull changes
10. Run and test [Playground](src/playground)
11. Publish application to [Expo](https://docs.expo.io/versions/latest/workflow/publishing)
13. Publish the package to [npm](https://docs.npmjs.com/getting-started/publishing-npm-packages)
12. Generate public [docs](docs/DEV_DOCS.md)
14. Create and push [git tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) with template `(vX.X.X)`
15. Create release on github for the tag
16. Talk to PR to publish updates on social media.
17. Post into [#akveo_ad](https://akveo.slack.com/messages/C6AGWCWMU/)