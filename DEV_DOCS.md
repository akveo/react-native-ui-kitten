# Release checklist:

1. Create a new release branch with template `release/vX.X.X`
2. Update package version in package.json
3. Run tests: `npm run release:validate`
4. Run [docs](docs)
5. Generate changelog: `npm run version:changelog`
6. Fix/expand changelog manually
7. Update [readme](README.md) files if needed
8. Push the branch, create PR, approve, merge
9. Switch to master branch and pull changes
10. Run tests: `npm run release:validate`
11. Assemble build: `npm run release:prepare`
12. Publish the package to npm: `npm run release`
13. Generate public [docs](docs/DEV_DOCS.md)
14. Create and push [git tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) with template `(vX.X.X)`
15. Create release on GitHub for the tag
