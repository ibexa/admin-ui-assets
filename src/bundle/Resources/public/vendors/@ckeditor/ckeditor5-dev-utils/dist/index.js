import { styleText } from "node:util";
import { PassThrough } from "node:stream";
import through from "through2";
import readline from "node:readline";
import isInteractive from "is-interactive";
import cliSpinners from "cli-spinners";
import cliCursor from "cli-cursor";
import fs, { readFileSync } from "node:fs";
import path from "node:path";
import sh from "shelljs";
import { simpleGit } from "simple-git";
import upath from "upath";
import fs$1, { readFile } from "node:fs/promises";
import os from "node:os";
import { randomUUID } from "node:crypto";
import pacote from "pacote";
import { glob } from "glob";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region src/logger/index.ts
/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md.
*/
const levels = /* @__PURE__ */ new Map();
levels.set("silent", /* @__PURE__ */ new Set([]));
levels.set("info", /* @__PURE__ */ new Set(["info"]));
levels.set("warning", /* @__PURE__ */ new Set(["info", "warning"]));
levels.set("error", /* @__PURE__ */ new Set([
	"info",
	"warning",
	"error"
]));
/**
* Logger module which allows configuring the verbosity level.
*
* There are three levels of verbosity:
* 1. `info` - all messages will be logged,
* 2. `warning` - warning and errors will be logged,
* 3. `error` - only errors will be logged.
*
* Usage:
*
*      import { logger } from '@ckeditor/ckeditor5-dev-utils';
*
*      const infoLog = logger( 'info' );
*      infoLog.info( 'Message.' ); // This message will be always displayed.
*      infoLog.warning( 'Message.' ); // This message will be always displayed.
*      infoLog.error( 'Message.' ); // This message will be always displayed.
*
*      const warningLog = logger( 'warning' );
*      warningLog.info( 'Message.' ); // This message won't be displayed.
*      warningLog.warning( 'Message.' ); // This message will be always displayed.
*      warningLog.error( 'Message.' ); // This message will be always displayed.
*
*      const errorLog = logger( 'error' );
*      errorLog.info( 'Message.' ); // This message won't be displayed.
*      errorLog.warning( 'Message.' ); // This message won't be displayed.
*      errorLog.error( 'Message.' ); // This message will be always displayed.
*
* Additionally, the `logger#error()` method prints the error instance if provided as the second argument.
*/
function logger(moduleVerbosity = "info") {
	return {
		info(message) {
			this._log("info", message);
		},
		warning(message) {
			this._log("warning", styleText("yellow", message));
		},
		error(message, error) {
			this._log("error", styleText("red", message), error);
		},
		_log(messageVerbosity, message, error) {
			if (!levels.get(messageVerbosity).has(moduleVerbosity)) return;
			console.log(message);
			if (error) console.dir(error, { depth: null });
		}
	};
}
//#endregion
//#region src/stream/noop.ts
/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md.
*/
function noop(callback) {
	if (!callback) return new PassThrough({ objectMode: true });
	return through({ objectMode: true }, (chunk, encoding, throughCallback) => {
		const callbackResult = callback(chunk);
		if (callbackResult instanceof Promise) callbackResult.then(() => {
			throughCallback(null, chunk);
		}).catch((err) => {
			throughCallback(err);
		});
		else throughCallback(null, chunk);
	});
}
//#endregion
//#region src/stream/index.ts
var stream_exports = /* @__PURE__ */ __exportAll({ noop: () => noop });
/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md.
*/
//#endregion
//#region src/tools/createspinner.ts
/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md.
*/
const INDENT_SIZE = 3;
/**
* A factory function that creates an instance of a CLI spinner. It supports both a spinner CLI and a spinner with a counter.
*
* The spinner improves UX when processing a time-consuming task. A developer does not have to consider whether the process hanged on.
*
* @param title Description of the current processed task.
* @param [options={}]
*/
function createSpinner(title, options = {}) {
	const isEnabled = !options.isDisabled && isInteractive();
	const indentLevel = options.indentLevel || 0;
	const indent = " ".repeat(indentLevel * INDENT_SIZE);
	const emoji = options.emoji || "📍";
	const status = options.status || "[title] Status: [current]/[total].";
	const spinnerType = typeof options.total === "number" ? "counter" : "spinner";
	let timerId;
	let counter = 0;
	return {
		start() {
			if (!isEnabled) {
				console.log(`${emoji} ${title}`);
				return;
			}
			const { frames } = cliSpinners.dots12;
			const getMessage = () => {
				if (spinnerType === "spinner") return title;
				if (typeof options.status === "function") return options.status(title, counter, options.total);
				return `${status}`.replace("[title]", title).replace("[current]", String(counter)).replace("[total]", options.total.toString());
			};
			let index = 0;
			let shouldClearLastLine = false;
			cliCursor.hide();
			timerId = setInterval(() => {
				if (index === frames.length) index = 0;
				if (shouldClearLastLine) clearLastLine();
				process.stdout.write(`${indent}${frames[index++]} ${getMessage()}`);
				shouldClearLastLine = true;
			}, cliSpinners.dots12.interval);
		},
		increase() {
			if (spinnerType === "spinner") throw new Error("The '#increase()' method is available only when using the counter spinner.");
			counter += 1;
		},
		finish(options = {}) {
			const finishEmoji = options.emoji || emoji;
			if (!isEnabled) return;
			clearInterval(timerId);
			clearLastLine();
			if (spinnerType === "counter") clearLastLine();
			cliCursor.show();
			console.log(`${indent}${finishEmoji} ${title}`);
		}
	};
	function clearLastLine() {
		readline.clearLine(process.stdout, 1);
		readline.cursorTo(process.stdout, 0);
	}
}
//#endregion
//#region src/tools/getdirectories.ts
/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md.
*/
/**
* Returns array with all directories under the specified path.
*/
function getDirectories(directoryPath) {
	const isDirectory = (directoryPath) => {
		try {
			return fs.statSync(directoryPath).isDirectory();
		} catch {
			return false;
		}
	};
	return fs.readdirSync(directoryPath).filter((item) => {
		return isDirectory(path.join(directoryPath, item));
	});
}
//#endregion
//#region src/tools/shexec.ts
/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md.
*/
function shExec(command, options = {}) {
	const { verbosity = "info", cwd = process.cwd(), async = false } = options;
	sh.config.silent = true;
	const execOptions = { cwd };
	if (async) return new Promise((resolve, reject) => {
		sh.exec(command, execOptions, (code, stdout, stderr) => {
			try {
				resolve(execHandler({
					code,
					stdout,
					stderr,
					verbosity,
					command
				}));
			} catch (err) {
				reject(err);
			}
		});
	});
	const { code, stdout, stderr } = sh.exec(command, execOptions);
	return execHandler({
		code,
		stdout,
		stderr,
		verbosity,
		command
	});
}
function execHandler({ code, stdout, stderr, verbosity, command }) {
	const log = logger(verbosity);
	const grey = (text) => styleText("grey", text);
	if (code) {
		if (stdout) log.error(grey(stdout));
		if (stderr) log.error(grey(stderr));
		throw new Error(`Error while executing ${command}: ${stderr}`);
	}
	if (stdout) log.info(grey(stdout));
	if (stderr) log.info(grey(stderr));
	return stdout;
}
//#endregion
//#region src/tools/updatejsonfile.ts
/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md.
*/
/**
* Updates JSON file under a specified path.
*
* @param filePath Path to a file on disk.
* @param updateFunction Function that will be called with a parsed JSON object. It should return the modified JSON object to save.
*/
function updateJSONFile(filePath, updateFunction) {
	const contents = fs.readFileSync(filePath, "utf-8");
	let json = JSON.parse(contents);
	json = updateFunction(json);
	fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + "\n", "utf-8");
}
//#endregion
//#region src/tools/commit.ts
/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md.
*/
const CHUNK_LENGTH_LIMIT = 4e3;
async function commit({ cwd, message, files, dryRun = false }) {
	cwd = upath.normalize(cwd);
	const git = simpleGit({ baseDir: cwd });
	const filteredFiles = await getFilesToCommit(cwd, files, git);
	if (!filteredFiles.length) return;
	if (dryRun) {
		const lastCommit = await git.log(["-1"]);
		await makeCommit(git, message, filteredFiles);
		await git.reset([lastCommit.latest.hash]);
	} else await makeCommit(git, message, filteredFiles);
}
async function makeCommit(git, message, filteredFiles) {
	for (const chunk of splitPathsIntoChunks(filteredFiles)) await git.add(chunk);
	if (!(await git.status()).isClean()) await git.commit(message);
}
function splitPathsIntoChunks(filePaths) {
	return filePaths.reduce((chunks, singlePath) => {
		const lastChunk = chunks.at(-1);
		if ([...lastChunk, singlePath].join(" ").length < CHUNK_LENGTH_LIMIT) lastChunk.push(singlePath);
		else chunks.push([singlePath]);
		return chunks;
	}, [[]]);
}
/**
* Returns a set of Git-tracked file paths by parsing `git ls-files --stage`.
* Supports file names with spaces using tab-splitting.
*/
async function getFilesToCommit(cwd, files, git) {
	const gitTracked = await getTrackedFiles(git);
	const filePromises = files.map((filePath) => {
		const normalized = upath.normalize(filePath);
		return upath.win32.isAbsolute(normalized) || upath.posix.isAbsolute(normalized) ? upath.relative(cwd, normalized) : normalized;
	}).map(async (itemPath) => {
		if (gitTracked.has(itemPath)) return itemPath;
		const fullPath = upath.join(cwd, itemPath);
		try {
			await fs$1.access(fullPath);
			return itemPath;
		} catch {
			return null;
		}
	});
	return (await Promise.all(filePromises)).filter((pathOrNull) => pathOrNull !== null);
}
/**
* Returns a set of Git-tracked files in a current repository.
*/
async function getTrackedFiles(git) {
	const gitTracked = (await git.raw(["ls-files", "--stage"])).split("\n").map((line) => line.trim().split("	").pop()).filter(Boolean).map((p) => upath.normalize(p));
	return new Set(gitTracked);
}
//#endregion
//#region src/tools/index.ts
var tools_exports = /* @__PURE__ */ __exportAll({
	commit: () => commit,
	createSpinner: () => createSpinner,
	getDirectories: () => getDirectories,
	shExec: () => shExec,
	updateJSONFile: () => updateJSONFile
});
/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md.
*/
//#endregion
//#region src/npm/pacotecacheless.ts
/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md.
*/
const manifest = cacheLessPacoteFactory(pacote.manifest);
const packument = cacheLessPacoteFactory(pacote.packument);
/**
* Creates a version of a `pacote` function that doesn't use caching.
*/
function cacheLessPacoteFactory(callback) {
	return async (...args) => {
		const [description, options = {}] = args;
		const uuid = randomUUID();
		const cacheDir = upath.join(os.tmpdir(), `pacote--${uuid}`);
		await fs$1.mkdir(cacheDir, { recursive: true });
		try {
			return await callback(description, {
				...options,
				cache: cacheDir,
				memoize: false,
				preferOnline: true
			});
		} finally {
			await fs$1.rm(cacheDir, {
				recursive: true,
				force: true
			});
		}
	};
}
//#endregion
//#region src/npm/checkversionavailability.ts
/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md.
*/
/**
* Error codes meaning that the registry answered and the version does not exist:
* `ETARGET` when the package exists but has no such version, `E404` when the package does not exist.
*/
const NOT_FOUND_ERROR_CODES = ["ETARGET", "E404"];
/**
* Checks if a specific version of a package is available in the npm registry.
*
* Any other error (for example, the registry cannot be reached) is rethrown, because it does not tell
* whether the version exists.
*/
async function checkVersionAvailability(version, packageName) {
	return manifest(`${packageName}@${version}`).then(() => {
		return false;
	}).catch((error) => {
		if (NOT_FOUND_ERROR_CODES.includes(error?.code)) return true;
		throw error;
	});
}
//#endregion
//#region src/npm/index.ts
var npm_exports = /* @__PURE__ */ __exportAll({
	checkVersionAvailability: () => checkVersionAvailability,
	manifest: () => manifest,
	packument: () => packument
});
/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md.
*/
//#endregion
//#region src/workspaces/findpathstopackages.ts
/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md.
*/
/**
* This function locates package.json files for all packages located in `packagesDirectory` in the repository structure.
*/
async function findPathsToPackages(cwd, packagesDirectory, options = {}) {
	const { includePackageJson = false, includeCwd = false, packagesDirectoryFilter = null } = options;
	const packagePaths = await getPackages(cwd, packagesDirectory, includePackageJson);
	if (includeCwd) {
		if (includePackageJson) packagePaths.push(upath.join(cwd, "package.json"));
		else packagePaths.push(cwd);
	}
	const normalizedPaths = packagePaths.map((item) => upath.normalize(item));
	if (packagesDirectoryFilter) return normalizedPaths.filter((item) => packagesDirectoryFilter(item));
	return normalizedPaths;
}
async function getPackages(cwd, packagesDirectory, includePackageJson) {
	if (!packagesDirectory) return Promise.resolve([]);
	const globOptions = {
		cwd: upath.join(cwd, packagesDirectory),
		absolute: true
	};
	let pattern = "*/";
	if (includePackageJson) {
		pattern += "package.json";
		globOptions.nodir = true;
	}
	return (await glob(pattern, globOptions)).map((path) => upath.normalize(path));
}
//#endregion
//#region src/workspaces/getpackagejson.ts
/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md.
*/
/**
* Reads and returns the contents of the package.json file.
*/
function getPackageJson(cwd = process.cwd(), { async = false } = {}) {
	const path = upath.join(cwd, "package.json");
	if (async) return readFile(path, "utf-8").then((data) => JSON.parse(data));
	const data = readFileSync(path, "utf-8");
	return JSON.parse(data);
}
//#endregion
//#region src/workspaces/getrepositoryurl.ts
/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md.
*/
/**
* This function extracts the repository URL for generating links in the changelog.
*/
function getRepositoryUrl(cwd, { async = false } = {}) {
	if (!async) return findRepositoryUrl(getPackageJson(cwd));
	return getPackageJson(cwd, { async: true }).then(findRepositoryUrl);
}
function findRepositoryUrl(packageJson) {
	let repositoryUrl = typeof packageJson.repository === "object" ? packageJson.repository.url : packageJson.repository;
	if (!repositoryUrl) throw new Error(`The package.json for "${packageJson.name}" must contain the "repository" property.`);
	if (repositoryUrl.startsWith("git+")) repositoryUrl = repositoryUrl.slice(4);
	const match = repositoryUrl.match(/^(?:https?:\/\/|git@)github\.com[:/](?<owner>[^/\s]+)\/(?<repo>[^/\s]+?)(?:\.git)?(?:[/?#].*)?$/);
	if (match) {
		const { owner, repo } = match.groups;
		return `https://github.com/${owner}/${repo}`;
	}
	if (/^[^/\s]+\/[^/\s]+$/.test(repositoryUrl)) return `https://github.com/${repositoryUrl}`;
	throw new Error(`The repository URL "${repositoryUrl}" is not supported.`);
}
//#endregion
//#region src/workspaces/index.ts
var workspaces_exports = /* @__PURE__ */ __exportAll({
	findPathsToPackages: () => findPathsToPackages,
	getPackageJson: () => getPackageJson,
	getRepositoryUrl: () => getRepositoryUrl
});
/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md.
*/
//#endregion
//#region src/index.ts
/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md.
*/
//#endregion
export { logger, npm_exports as npm, stream_exports as stream, tools_exports as tools, workspaces_exports as workspaces };
