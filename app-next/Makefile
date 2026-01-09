# Vibe Jobs - Development Commands

.PHONY: dev build start test test-watch test-coverage lint lint-fix typecheck knip check validate

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
