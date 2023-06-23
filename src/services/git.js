// Child process needed to execute git commands
/* eslint-disable security/detect-child-process */

const { promisify } = require("util");
const exec = promisify(require("child_process").exec);
const logger = require("../utils/logger");

const logExecResults = (stdout, stderr) => {
	if (stdout) {
		logger.debug(stdout);
	}
	if (stderr) {
		logger.debug(stderr);
	}
};

/**
 * Sets local git user identity
 *
 * @param email
 * @param name
 * @return {Promise<void>}
 */
const setGitUser = async (email, name) => {
	await setGitConfig("user.email", email);
	await setGitConfig("user.name", name);
};

/**
 * Sets a local git configuration variable
 *
 * @param {string} name
 * @param {string} value
 * @return {Promise<void>}
 */
const setGitConfig = async (name, value) => {
	const { stdout, stderr } = await exec(`git config --local ${name} "${value}"`);
	logExecResults(stdout, stderr);
};

/**
 * Creates a git tag using npm version command with the specified version type
 * @param {string} versionType patch, minor, or major. Defaults to patch
 * @return {Promise<string>} Created version, e.g. v1.2.3
 */
const createVersion = async (versionType = "patch") => {
	const { stdout, stderr } = await exec(`npm version ${versionType} -m "%s\n\n[skip actions]"`);
	logExecResults(stdout, stderr);
	const version = stdout
		.split("\n")
		.filter(line => line)
		.pop();
	return version;
};
const pushHead = async () => {
	const { stdout, stderr } = await exec("git push origin HEAD");
	logExecResults(stdout, stderr);
};
const pushTag = async tagName => {
	const { stdout, stderr } = await exec(`git push origin ${tagName}`);
	logExecResults(stdout, stderr);
};

module.exports = {
	setGitUser,
	createVersion,
	pushHead,
	pushTag
};
