Add a JSON Patch–based PATCH endpoint for resumes (server route + ORPC) that applies patches to a whitelisted view, resolves section/item IDs, injects required defaults, validates with the canonical `ResumeData` schema, and persists without breaking current PUT flows. Includes route-level API tests and patch helper unit tests.

todos:
  - [x] Define JSON Patch ops, path whitelist, by-id rules
  - [x] Implement patch apply + normalization helper
  - [x] Add resumeService.patch and PATCH route
  - [x] Add tests (helper + API endpoint) and update route docs

## Scope and invariants

- Implement `PATCH /resume/{id}` in the ORPC router (`src/integrations/orpc/router/resume.ts`) and the server route handler (`src/routes/api/resume/$id.ts`).
- Patch scope includes `/data/*` plus top-level `name`, `slug`, `tags`, `isPublic`; all other fields (`id`, `userId`, `password`, `isLocked`) are immutable.
- Preserve the canonical storage invariant by validating the post-patch document with `resumeDataSchema` (`src/schema/resume/data.ts`) before persisting.

## Patch contract (JSON Patch)

- **Accepted Content-Type**: `application/json-patch+json` and `application/json` (charset tolerated).
- **Allowed ops**: `add`, `replace`, `remove`, `test`, `move`, `copy`.
- **Path grammar extensions (by-id resolution):**
  - `/data/sections/{sectionType}/items/{itemId}` resolves `{itemId}` to array index by matching `item.id`.
  - `/data/customSections/{customSectionId}` resolves to the index in `customSections`.
  - `/data/customSections/{customSectionId}/items/{itemId}` resolves to index by `item.id`.
  - `/data/sections/{sectionType}/items/-` supports append.
- **Validation rule**: any path outside the whitelist -> `ORPCError("INVALID_PATCH_PATH")`.

## Patch application + normalization helper

Implemented in `src/integrations/orpc/helpers/resume-patch.ts`:

1. **Load current resume** (id, name, slug, tags, isPublic, data, isLocked).
2. **Enforce lock** (`isLocked` -> reject) and ownership.
3. **Preprocess ops**:
   - Validate op + path format/whitelist.
   - Resolve by-id segments to concrete indices.
4. **Apply patch** to a patchable view `{ name, slug, tags, isPublic, data }` via an in-house applier.
5. **Normalize defaults for newly added items**:
   - Inject `id` (via `generateId`), `hidden: false` if missing.
   - Normalize `website` objects to `{ url: "", label: "" }` where applicable.
   - Do **not** fabricate `.min(1)` fields; those must be provided.
6. **Layout coupling**:
   - When custom sections are added, append new IDs to `pages[0].main` if layout wasn't explicitly patched.
   - When layout is patched directly, do not re-insert custom sections.
7. **Validate** the resulting document via `resumeDataSchema` and surface structured errors.

## Service method and router endpoint

- **Service**: `resumeService.patch(...)` in `src/integrations/orpc/services/resume.ts`:
  - Applies patch helper.
  - Updates only changed fields (data + optional top-level fields).
  - Preserves existing error semantics (`RESUME_SLUG_ALREADY_EXISTS`, `RESUME_LOCKED`).
- **Router**: `patch` procedure in `src/integrations/orpc/router/resume.ts`:
  - method `PATCH`, path `/resume/{id}`
  - input `{ id: string, patch: JSONPatchOp[] }`
  - output returns the updated resume (same shape as `getById`)

## Error handling and ergonomics

- Explicit error codes:
  - `INVALID_PATCH_PATH`, `PATCH_TARGET_NOT_FOUND`, `PATCH_CONFLICT`, `RESUME_LOCKED`
- Handler maps ORPC errors to JSON payloads with correct status codes.

## Tests and safety checks

- Unit tests for patching logic + path resolution:
  - Append item, update by id, remove item
  - Add custom section + layout sync behavior
  - Layout patching edge cases
  - Path validation and test-op conflicts
- API-level tests for `/api/resume/:id`:
  - Content-Type handling
  - Auth enforcement
  - Invalid JSON and invalid patch schema
  - Not found / wrong owner
  - Locked resume
  - Patch path errors and test conflicts
  - Successful patch flow with defaults

## Documentation updates

- Route summary/description updated in `src/integrations/orpc/router/resume.ts` to describe:
  - Supported ops
  - By-id path extension
  - Default injection rules
  - Validation behavior