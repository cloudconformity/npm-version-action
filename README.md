# npm-version-action

A GitHub action for automatically versioning repos using `npm version ${type}` after PRs are merged

Follows [Semantic commit message format](https://seesparkbox.com/foundry/semantic_commit_messages) to version;

-   If any commit has "BREAKING CHANGE" in it, does a MAJOR semver increase
-   If any commit starts with "feat:", does a MINOR semver increase
-   Default to a "patch" semver increase.
