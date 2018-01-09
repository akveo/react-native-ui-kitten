# Release checklist:

1. Create a new release branch with template `release-vX.X.X`
2. Update package version in package.json
3. Run and test ExplorerApp
4. Run docs
5. Generate changelog (https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli)
6. Fix/expand changelog manually
7. Update readme.md files if needed
8. Push the branch, create PR, approve, merge
9. Switch to master branch and pull changes
10. Run and test ExplorerApp
11. Publish application to expo.io
13. Publish the package to npm
12. Generate public docs (docs:gh-pages)
14. Create and push git tag with template (vX.X.X)
15. Create release on github for the tag
16. Talk to PR to publish updates on social media.
17. Post into #akveo_ad