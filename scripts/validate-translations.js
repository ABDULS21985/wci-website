#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Translation File Validation Script
 *
 * This script validates that all translation files have identical key structures.
 * The English file (en.json) is used as the source of truth.
 *
 * Run: node scripts/validate-translations.js
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'messages');
const LANGUAGES = ['en', 'ar', 'fr', 'es', 'pt'];
const SOURCE_LANGUAGE = 'en';

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Recursively get all keys from an object with dot notation
 */
function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

/**
 * Load a JSON translation file
 */
function loadTranslationFile(lang) {
  const filePath = path.join(MESSAGES_DIR, `${lang}.json`);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    log('red', `Error loading ${lang}.json: ${error.message}`);
    return null;
  }
}

/**
 * Compare two sets of keys and find differences
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function compareKeys(sourceKeys, targetKeys, sourceLang, targetLang) {
  const sourceSet = new Set(sourceKeys);
  const targetSet = new Set(targetKeys);

  const missingInTarget = sourceKeys.filter(key => !targetSet.has(key));
  const extraInTarget = targetKeys.filter(key => !sourceSet.has(key));

  return {
    missingKeys: missingInTarget,
    extraKeys: extraInTarget,
  };
}

/**
 * Check for empty or placeholder translations
 */
function checkEmptyTranslations(obj, lang, prefix = '') {
  const issues = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      issues.push(...checkEmptyTranslations(obj[key], lang, fullKey));
    } else if (typeof obj[key] === 'string') {
      if (obj[key].trim() === '') {
        issues.push({ key: fullKey, issue: 'empty' });
      } else if (obj[key].includes('TODO') || obj[key].includes('TRANSLATE')) {
        issues.push({ key: fullKey, issue: 'placeholder' });
      }
    }
  }
  return issues;
}

/**
 * Main validation function
 */
function validateTranslations() {
  log('cyan', '\n=== Translation File Validation ===\n');

  // Load source (English) translation file
  const sourceData = loadTranslationFile(SOURCE_LANGUAGE);
  if (!sourceData) {
    log('red', 'Failed to load source translation file (en.json). Aborting.');
    process.exit(1);
  }

  const sourceKeys = getAllKeys(sourceData);
  log('blue', `Source file (${SOURCE_LANGUAGE}.json) has ${sourceKeys.length} keys\n`);

  let hasErrors = false;
  const results = {};

  // Validate each language file
  for (const lang of LANGUAGES) {
    if (lang === SOURCE_LANGUAGE) continue;

    log('cyan', `Checking ${lang}.json...`);

    const targetData = loadTranslationFile(lang);
    if (!targetData) {
      hasErrors = true;
      continue;
    }

    const targetKeys = getAllKeys(targetData);
    const { missingKeys, extraKeys } = compareKeys(sourceKeys, targetKeys, SOURCE_LANGUAGE, lang);
    const emptyIssues = checkEmptyTranslations(targetData, lang);

    results[lang] = {
      totalKeys: targetKeys.length,
      missingKeys,
      extraKeys,
      emptyIssues,
    };

    if (missingKeys.length === 0 && extraKeys.length === 0 && emptyIssues.length === 0) {
      log('green', `  ✓ ${lang}.json is in sync (${targetKeys.length} keys)`);
    } else {
      hasErrors = true;

      if (missingKeys.length > 0) {
        log('red', `  ✗ Missing ${missingKeys.length} keys:`);
        missingKeys.slice(0, 10).forEach(key => {
          console.log(`    - ${key}`);
        });
        if (missingKeys.length > 10) {
          console.log(`    ... and ${missingKeys.length - 10} more`);
        }
      }

      if (extraKeys.length > 0) {
        log('yellow', `  ! Extra ${extraKeys.length} keys (not in source):`);
        extraKeys.slice(0, 5).forEach(key => {
          console.log(`    - ${key}`);
        });
        if (extraKeys.length > 5) {
          console.log(`    ... and ${extraKeys.length - 5} more`);
        }
      }

      if (emptyIssues.length > 0) {
        log('yellow', `  ! ${emptyIssues.length} empty/placeholder translations:`);
        emptyIssues.slice(0, 5).forEach(({ key, issue }) => {
          console.log(`    - ${key} (${issue})`);
        });
        if (emptyIssues.length > 5) {
          console.log(`    ... and ${emptyIssues.length - 5} more`);
        }
      }
    }
    console.log();
  }

  // Print summary
  log('cyan', '=== Summary ===\n');

  console.log(`Source: ${SOURCE_LANGUAGE}.json (${sourceKeys.length} keys)`);
  console.log('');

  for (const lang of LANGUAGES) {
    if (lang === SOURCE_LANGUAGE) continue;
    const r = results[lang];
    if (r) {
      const status = r.missingKeys.length === 0 && r.extraKeys.length === 0
        ? `${colors.green}✓ OK${colors.reset}`
        : `${colors.red}✗ Issues${colors.reset}`;
      console.log(`${lang}.json: ${r.totalKeys} keys - ${status}`);
      if (r.missingKeys.length > 0) {
        console.log(`  Missing: ${r.missingKeys.length} keys`);
      }
      if (r.extraKeys.length > 0) {
        console.log(`  Extra: ${r.extraKeys.length} keys`);
      }
    }
  }

  console.log('');

  if (hasErrors) {
    log('red', 'Validation FAILED - Translation files are out of sync');
    process.exit(1);
  } else {
    log('green', 'Validation PASSED - All translation files are in sync!');
    process.exit(0);
  }
}

// Run validation
validateTranslations();
