# Vibe Jobs - Development Commands

.PHONY: dev build start test test-watch test-coverage test-e2e test-e2e-ui test-e2e-headed lint lint-fix typecheck knip check validate db-validate

# Development
dev:
	npm run dev

build:
	npm run build

start:
	npm run start

# Testing
test:
	npm run test

test-watch:
	npm run test:watch

test-coverage:
	npm run test:coverage

# E2E Testing
test-e2e:
	npm run test:e2e

test-e2e-ui:
	npm run test:e2e:ui

test-e2e-headed:
	npm run test:e2e:headed

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

# Database
db-validate:
	npm run db:validate

# Combined Commands
check: lint knip typecheck test build

validate: check
