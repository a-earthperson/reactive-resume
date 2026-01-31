# Workflows

This folder contains GitHub Actions workflows for CI quality checks and Docker image publishing.

## `ci.yml` — CI quality matrix

**Triggers**
- `pull_request`
- `push` to `main`
- `workflow_dispatch`

**What it does**
- Checks out the repo, sets up Node 20 + pnpm, installs dependencies.
- Runs a matrix of quality steps:
  - `lint-nofix` (Biome check without writes)
  - `typecheck` (TypeScript `tsc --noEmit`)
  - `test` (Vitest run)
  - `test:coverage` (Vitest run with coverage)
  - `docs:build` (Mintlify validate; build output is not uploaded)
  - `build` (Build the application)

## `docker-build.yml` — Multi-arch Docker build + publish

**Triggers**
- `workflow_dispatch` only

**What it does**
- Reads the app version from `package.json`.
- Builds and pushes per-arch images (`linux/amd64`, `linux/arm64`) with Buildx.
- Uploads build digests as artifacts, then merges into a multi-arch manifest.
- Tags images (`sha-*`, `latest`, `vX.Y.Z`, `vX.Y`, `vX`) for GHCR and Docker Hub.
- Signs images with Cosign, inspects manifests, and redeploys the stack via SSH.

## Workflow graph

```mermaid
flowchart TD
  classDef ci fill:#e8f0ff,stroke:#4b76ff,color:#0b1e5b,stroke-width:1px;
  classDef build fill:#eafff3,stroke:#2f9e44,color:#0a3518,stroke-width:1px;
  classDef deploy fill:#fff4e6,stroke:#f08c00,color:#5a3b00,stroke-width:1px;

  CI([CI Trigger]):::ci --> Q{{Quality Matrix}}:::ci
  Q --> Q1[lint-nofix]:::ci
  Q --> Q2[typecheck]:::ci
  Q --> Q3[test]:::ci
  Q --> Q4[test:coverage]:::ci
  Q --> Q5[docs:build]:::ci
  Q --> Q6[build]:::ci

  DB([Docker Build Trigger]):::build --> BM{{Buildx Matrix}}:::build
  BM --> B1[amd64 build+push]:::build
  BM --> B2[arm64 build+push]:::build
  B1 --> M[Manifest + Tags]:::deploy
  B2 --> M
  M --> S[Cosign sign + inspect]:::deploy
  S --> R[Redeploy stack]:::deploy
```
