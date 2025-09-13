#!/usr/bin/env tsx

import { execSync } from 'child_process';
import { parseArgs } from 'util';

interface VersionInfo {
  major: number;
  minor: number;
  patch: number;
}

interface CliArgs {
  major?: string;
  minor?: string;
  desc?: string;
  set?: string;
  push?: boolean;
  'no-push'?: boolean;
  help?: boolean;
}

function showHelp() {
  console.log(`
Amend Commit Tool - Automatically version and fix commit messages

Usage:
  tsx scripts/amend-commit.ts --major M --minor N --desc "Description"
  tsx scripts/amend-commit.ts --set M.N --desc "Description"

Options:
  --major M           Major version number
  --minor N           Minor version number  
  --desc "text"       Commit description (required)
  --set M.N           Set major.minor and reset patch to next available
  --push              EXPLICITLY push after amending (default: NO PUSH)
  --no-push           Explicitly prevent pushing (default behavior)
  --help              Show this help

WARNING: By default, this tool NEVER pushes changes. Use --push only if you want to push immediately.

Examples:
  tsx scripts/amend-commit.ts --major 0 --minor 9 --desc "Fix navigation bug"
  tsx scripts/amend-commit.ts --set 1.0 --desc "Major release"
  tsx scripts/amend-commit.ts --major 0 --minor 9 --desc "Add new feature" --push
`);
}

function execGit(command: string): string {
  try {
    return execSync(`git ${command}`, { encoding: 'utf8' }).trim();
  } catch (error) {
    return '';
  }
}

function getCurrentCommitMessage(): string {
  return execGit('log -1 --pretty=format:%s');
}

function getAllTags(): string[] {
  const tags = execGit('tag -l');
  return tags ? tags.split('\n').filter(tag => tag.match(/^v\d+\.\d+\.\d+$/)) : [];
}

function parseVersion(tag: string): VersionInfo | null {
  const match = tag.match(/^v(\d+)\.(\d+)\.(\d+)$/);
  if (!match) return null;
  
  return {
    major: parseInt(match[1]),
    minor: parseInt(match[2]),
    patch: parseInt(match[3])
  };
}

function getLatestPatchForVersion(major: number, minor: number): number {
  const tags = getAllTags();
  let maxPatch = -1;
  
  for (const tag of tags) {
    const version = parseVersion(tag);
    if (version && version.major === major && version.minor === minor) {
      maxPatch = Math.max(maxPatch, version.patch);
    }
  }
  
  return maxPatch;
}

function getNextVersion(major: number, minor: number): VersionInfo {
  const latestPatch = getLatestPatchForVersion(major, minor);
  return {
    major,
    minor,
    patch: latestPatch + 1
  };
}

function isValidCommitMessage(message: string): boolean {
  return /^v\d+\.\d+\.\d+:\s.+/.test(message);
}

function tagExists(version: VersionInfo): boolean {
  const tagName = `v${version.major}.${version.minor}.${version.patch}`;
  const tags = getAllTags();
  return tags.includes(tagName);
}

function isTagAtCurrentCommit(version: VersionInfo): boolean {
  const tagName = `v${version.major}.${version.minor}.${version.patch}`;
  try {
    const tagCommit = execGit(`rev-list -n 1 ${tagName}`);
    const currentCommit = execGit('rev-parse HEAD');
    return tagCommit === currentCommit;
  } catch {
    return false;
  }
}

function amendCommit(version: VersionInfo, description: string): void {
  const newMessage = `v${version.major}.${version.minor}.${version.patch}: ${description}`;
  console.log(`Amending commit with: ${newMessage}`);
  
  try {
    execSync(`git commit --amend -m "${newMessage}"`, { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to amend commit:', error);
    process.exit(1);
  }
}

function createTag(version: VersionInfo, description: string): void {
  const tagName = `v${version.major}.${version.minor}.${version.patch}`;
  const tagMessage = `Release ${tagName}: ${description}`;
  
  console.log(`Creating tag: ${tagName}`);
  
  try {
    execSync(`git tag -a ${tagName} -m "${tagMessage}"`, { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to create tag:', error);
    process.exit(1);
  }
}

function pushChanges(): void {
  console.log('Pushing changes and tags...');
  
  try {
    execSync('git push && git push --tags', { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to push changes:', error);
    process.exit(1);
  }
}

function main() {
  const { values: args } = parseArgs({
    options: {
      major: { type: 'string' },
      minor: { type: 'string' },
      desc: { type: 'string' },
      set: { type: 'string' },
      push: { type: 'boolean', default: false },
      'no-push': { type: 'boolean', default: true },
      help: { type: 'boolean', default: false }
    }
  }) as { values: CliArgs };

  if (args.help) {
    showHelp();
    return;
  }

  // Validate required description
  if (!args.desc) {
    console.error('Error: --desc is required');
    console.error('Use --help for usage information');
    process.exit(1);
  }

  let major: number, minor: number;

  // Handle --set option
  if (args.set) {
    const setMatch = args.set.match(/^(\d+)\.(\d+)$/);
    if (!setMatch) {
      console.error('Error: --set must be in format M.N (e.g., --set 1.0)');
      process.exit(1);
    }
    major = parseInt(setMatch[1]);
    minor = parseInt(setMatch[2]);
  } else {
    // Handle --major and --minor options
    if (!args.major || !args.minor) {
      console.error('Error: --major and --minor are required (or use --set)');
      console.error('Use --help for usage information');
      process.exit(1);
    }
    
    major = parseInt(args.major);
    minor = parseInt(args.minor);
    
    if (isNaN(major) || isNaN(minor)) {
      console.error('Error: --major and --minor must be numbers');
      process.exit(1);
    }
  }

  // Get current commit message
  const currentMessage = getCurrentCommitMessage();
  if (!currentMessage) {
    console.error('Error: No commit found to amend');
    process.exit(1);
  }

  // Check if commit message is already valid
  if (isValidCommitMessage(currentMessage)) {
    console.log(`Current commit message is already valid: ${currentMessage}`);
    
    // Check if we're trying to re-apply the same version
    const match = currentMessage.match(/^v(\d+)\.(\d+)\.(\d+):/);
    if (match) {
      const currentVersion = {
        major: parseInt(match[1]),
        minor: parseInt(match[2]),
        patch: parseInt(match[3])
      };
      
      if (currentVersion.major === major && currentVersion.minor === minor && 
          isTagAtCurrentCommit(currentVersion)) {
        console.log('No changes needed - commit and tag are already correct');
        return;
      }
    }
  }

  // Calculate next version
  const nextVersion = getNextVersion(major, minor);
  
  // Check if tag already exists at a different commit
  if (tagExists(nextVersion) && !isTagAtCurrentCommit(nextVersion)) {
    console.error(`Error: Tag v${nextVersion.major}.${nextVersion.minor}.${nextVersion.patch} already exists at a different commit`);
    process.exit(1);
  }

  console.log(`Processing commit: ${currentMessage}`);
  console.log(`Next version: v${nextVersion.major}.${nextVersion.minor}.${nextVersion.patch}`);

  // Amend the commit
  amendCommit(nextVersion, args.desc);

  // Create tag if it doesn't exist
  if (!tagExists(nextVersion)) {
    createTag(nextVersion, args.desc);
  } else {
    console.log(`Tag v${nextVersion.major}.${nextVersion.minor}.${nextVersion.patch} already exists`);
  }

  // Explicit push control - NEVER push unless explicitly requested
  if (args.push && !args['no-push']) {
    console.log('🚨 PUSHING to GitHub as requested with --push flag...');
    pushChanges();
  } else {
    console.log('✅ LOCAL CHANGES ONLY - Not pushing to GitHub');
    console.log('   To push manually run: git push && git push --tags');
    console.log('   To auto-push next time use: --push flag');
  }

  console.log(`✅ Successfully amended commit to v${nextVersion.major}.${nextVersion.minor}.${nextVersion.patch}: ${args.desc}`);
}

// ES module equivalent of require.main === module
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}