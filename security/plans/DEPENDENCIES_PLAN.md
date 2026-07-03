# DEPENDENCIES Fix Plan

## Changes

- `package.json` — Pin all dependency versions to exact versions (remove ^)

## New files

None.

## Verification goals

After implementation, ALL of these must be true:

- [ ] All dependencies in package.json use exact versions (no ^ or ~)
- [ ] package-lock.json still exists and is committed
- [ ] npm audit shows 0 vulnerabilities
- [ ] Application still builds and runs correctly
- [ ] No breaking changes from version pinning

## Manual verification (for the human)

- Step 1: Run `npm install` to verify exact versions work
- Step 2: Run `npm run build` to verify build still works
- Step 3: Run `npm run dev` to verify application starts correctly
- Step 4: Run `npm audit` to verify no new vulnerabilities
