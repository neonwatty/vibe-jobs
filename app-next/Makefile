# Vibe Jobs - Development Commands

.PHONY: dev build start test test-watch test-coverage test-e2e test-e2e-ui test-e2e-headed lint lint-fix typecheck knip check validate

# Development (uses Doppler for secrets)
dev:
	doppler run -- npm run dev

build:
	doppler run -- npm run build

start:
	doppler run -- npm run start

# Testing
test:
	npm run test

test-watch:
	npm run test:watch

test-coverage:
	npm run test:coverage

# E2E Testing (uses Doppler for secrets)
test-e2e:
	doppler run -- npm run test:e2e

test-e2e-ui:
	doppler run -- npm run test:e2e:ui

test-e2e-headed:
	doppler run -- npm run test:e2e:headed

# Code Quality
lint:
	npm run lint

lint-fix:
	npm run lint:fix

typecheck:
	npm run typecheck

knip:
	npm run knip

knip-production:
	npm run knip:production

# Combined Commands
check: lint knip typecheck test build

validate: check
