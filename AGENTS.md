 # AGENTS.md

 This repository is `ibexa/admin-ui-assets`.
 It is a packaging repository for vendored front-end assets plus a tiny Symfony bundle wrapper.
 Most files under `src/bundle/Resources/public/vendors/` are generated or copied from upstream packages.
 Agents should optimize for minimal, surgical changes and avoid hand-editing vendored artifacts unless the task is explicitly to refresh assets.

 ## Rule Files

 - No repository-level Cursor rules were found in `.cursor/rules/`.
 - No `.cursorrules` file was found.
 - No Copilot instructions file was found at `.github/copilot-instructions.md`.
 - Follow this file as the repository-specific agent guide.

 ## Repository Layout

 - `composer.json`: PHP package metadata, PSR-4 autoload, PHP CS Fixer scripts.
 - `package.json`: asset-copy workflow used to populate vendored front-end packages.
 - `src/bundle/IbexaAdminUiAssetsBundle.php`: the only first-party PHP class in the repo.
 - `src/bundle/Resources/encore/ibexa.config.setup.js`: Webpack Encore alias setup used by downstream consumers.
 - `src/bundle/Resources/public/vendors/`: packaged third-party browser assets shipped by this bundle.
 - `bin/prepare_release_files.sh`: canonical script to rebuild vendored assets from `package.json` dependencies.
 - `bin/prepare_release.sh` and `bin/prepare_next.sh`: release automation helpers.

 ## What Counts As Source Of Truth

 - Treat `composer.json`, `package.json`, shell scripts in `bin/`, and the small PHP/Encore wrapper files as the human-maintained source.
 - Treat `src/bundle/Resources/public/vendors/` as generated output unless a task explicitly requires patching a shipped upstream asset.
 - When changing asset versions or package contents, prefer updating dependency versions or copy/prune scripts, then regenerating assets.
 - Do not manually rewrite large minified or vendored files when a scripted regeneration path exists.

 ## Setup Commands

 - Install PHP dependencies: `composer install`
 - Install Node dependencies: `yarn install`
 - Preferred package manager: `yarn` (`packageManager` is pinned to `yarn@1.22.22`).
 - `README.md` mentions `npm install`, but agents should prefer `yarn install` to avoid introducing an `npm` lockfile into a Yarn-managed repo.

 ## Build Commands

 There is no conventional app build here; the main build-like operation is regenerating vendored assets.

 - Rebuild vendored assets from Node dependencies: `yarn run prepare-release`
 - Full scripted asset refresh with cleanup and install: `sh bin/prepare_release_files.sh`
 - Prepare a tagged release locally: `sh bin/prepare_release.sh -v 1.0.0 -b master`
 - Prepare a `[version]-next` branch update: `sh bin/prepare_next.sh -v 1.0.0 -b master`

 Notes:

 - `bin/prepare_release_files.sh` removes and recreates files under `src/bundle/Resources/public/vendors/`.
 - The same script deletes `yarn.lock` as part of its workflow; do not be surprised by that side effect.
 - Run release scripts only when the task is specifically about refreshing packaged assets or cutting a release.

 ## Lint And Formatting Commands

 - Check PHP coding style: `composer check-cs`
 - Auto-fix PHP coding style: `composer fix-cs`
 - Direct fixer invocation: `vendor/bin/php-cs-fixer fix --config=.php-cs-fixer.php --show-progress=dots`
 - Fast syntax check for the first-party PHP file: `php -l src/bundle/IbexaAdminUiAssetsBundle.php`

 Notes:

 - No repository-level ESLint, Prettier, PHPStan, Psalm, PHPUnit, Jest, Vitest, or similar root config was found.
 - For JavaScript in this repo, preserve the existing style of the touched file; there is no enforced root formatter.
 - `.php-cs-fixer.php` applies only to PHP files under `src/`.

 ## Test Commands

 This repository currently has no dedicated root automated test suite.

 - Root test command: none configured
 - PHPUnit config: not present
 - JS unit test config at repo root: not present
 - Best available validation for typical changes:
   - `composer check-cs`
   - `php -l src/bundle/IbexaAdminUiAssetsBundle.php`
   - `yarn run prepare-release` for asset-packaging changes

 ## Running A Single Test

 There is currently no supported root single-test command because the repository does not define a root test runner.

 Use one of these alternatives based on the change:

 - PHP wrapper change: `php -l src/bundle/IbexaAdminUiAssetsBundle.php`
 - PHP style-only change: `composer check-cs`
 - Asset packaging change: rerun the smallest relevant workflow, usually `yarn run prepare-release`

 Do not treat tests embedded inside vendored dependencies as this repository's test suite.
 Files inside `src/bundle/Resources/public/vendors/` may mention `jest`, `mocha`, `karma`, or similar tools, but those belong to upstream packages and are not the canonical validation path for this repo.

 ## PHP Style Guidelines

 - Start PHP files with `declare(strict_types=1);`.
 - Keep the standard Ibexa license header if editing existing PHP files.
 - Use PSR-4 namespaces rooted at `Ibexa\Bundle\AdminUiAssets\`.
 - Prefer one class per file.
 - Match the existing pattern of `final class` for concrete bundle code unless extensibility is explicitly required.
 - Import classes with `use` statements instead of fully qualified names in code bodies.
 - Keep imports minimal and remove unused imports.
 - Follow the formatter and do not hand-format against `php-cs-fixer` output.
 - Use 4-space indentation in PHP.
 - Keep method and property visibility explicit.
 - Prefer typed parameters, typed returns, and typed properties when adding PHP code.
 - Keep code small and declarative; this repository is mostly configuration and packaging glue.

 ## JavaScript And Shell Style Guidelines

 - Preserve the style already used in the touched file.
 - Existing first-party JS uses CommonJS (`require`, `module.exports`); do not switch module systems without a repo-wide reason.
 - Existing first-party JS uses semicolons and 4-space indentation; follow that style.
 - Keep shell scripts POSIX `sh` compatible unless the file already requires another shell.
 - For shell scripts, prefer simple commands and explicit variable names over dense one-liners.
 - Be careful with destructive file operations in `bin/` scripts; many are intentional and part of asset regeneration.

 ## Imports And Dependencies

 - In PHP, group imports at the top of the file after the namespace.
 - In JS, require built-in modules and package modules near the top of the file.
 - Do not add new dependencies casually; this repository primarily republishes upstream assets.
 - When updating dependencies in `package.json`, verify whether `bin/prepare_release_files.sh` also needs pruning logic updates.
 - Keep `composer.json` packages sorted; `sort-packages` is enabled.

 ## Naming Conventions

 - Follow existing namespace and class naming: descriptive PascalCase for classes, matching file names.
 - Use camelCase for JS variables and function names.
 - Use uppercase snake case only for shell-script environment-like variables, matching current scripts.
 - Name scripts and commands after their workflow purpose, not implementation detail.

 ## Error Handling And Safety

 - Fail fast in shell scripts after important commands, following the existing `check_process` helper pattern.
 - Preserve exit codes and meaningful error messages in maintenance scripts.
 - Avoid swallowing errors in release or asset-preparation workflows.
 - For PHP additions, prefer explicit exceptions or propagated framework errors over silent failure.
 - Do not add broad catch-all blocks unless there is a clear recovery path.

 ## Working In Vendored Assets

 - Assume files under `src/bundle/Resources/public/vendors/` are generated copies.
 - Prefer changing `package.json` versions or `bin/prepare_release_files.sh` cleanup rules, then regenerating assets.
 - If you must patch a vendored file directly, document in the PR or commit message why regeneration was not sufficient.
 - Avoid style-only edits in vendored files.
 - Avoid mass formatting of vendored trees.

 ## Change Strategy For Agents

 - First determine whether the task targets first-party wrapper code or generated vendor output.
 - If the task is about shipped library versions, update dependency declarations and regeneration scripts instead of editing copied output by hand.
 - Keep diffs narrow; this repository can explode into very large diffs if asset regeneration is done unnecessarily.
 - Do not run release/tagging scripts unless the task explicitly requires release prep.
 - When validating a change, choose the lightest command that actually exercises the edited area.

 ## Suggested Validation Matrix

 - PHP file change: `composer check-cs && php -l src/bundle/IbexaAdminUiAssetsBundle.php`
 - `composer.json` change: `composer validate` if available locally, then `composer check-cs`
 - `package.json` or asset-copy script change: `yarn run prepare-release`
 - Release-script change: dry-read the script carefully; run only if the task explicitly involves release operations

 ## Things To Avoid

 - Do not add a root test framework unless the task explicitly asks for it.
 - Do not introduce repo-wide formatting tools without evidence they are wanted.
 - Do not edit vendored package internals just to satisfy style preferences.
 - Do not assume upstream package test commands are safe or relevant here.
 - Do not replace Yarn with npm in automation unless the repo is intentionally migrated.

 ## Quick Summary For Agents

 - This is primarily an asset-distribution repository, not a full application.
 - Root validation is light: PHP CS checks, PHP syntax checks, and asset regeneration.
 - There is no root single-test runner today; say so clearly instead of inventing one.
 - Respect generated vendor output and prefer scripted regeneration paths.
