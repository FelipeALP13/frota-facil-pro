#!/usr/bin/env bash
set -euo pipefail
project_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
dist_root="$project_root/dist"
rm -rf "$dist_root"
mkdir -p "$dist_root/server" "$dist_root/.openai" "$dist_root/drizzle/meta"
cp "$project_root/worker/index.js" "$dist_root/server/index.js"
cp "$project_root/worker/ui.js" "$dist_root/server/ui.js"
cp "$project_root/.openai/hosting.json" "$dist_root/.openai/hosting.json"
cp "$project_root"/drizzle/*.sql "$dist_root/drizzle/"
cp "$project_root/drizzle/meta/_journal.json" "$dist_root/drizzle/meta/_journal.json"
echo "Built $dist_root"
