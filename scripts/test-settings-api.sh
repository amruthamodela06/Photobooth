#!/usr/bin/env bash
# test-settings-api.sh
# Manual curl test script for the /api/settings endpoints.
# Run this while the server is live: npm run server
#
# Usage: bash scripts/test-settings-api.sh

BASE_URL="http://localhost:5000/api/settings"

echo "============================================"
echo "  FlashPoint Settings API – Manual Tests"
echo "============================================"
echo ""

echo "--- [1] GET current settings ---"
curl -s -X GET "$BASE_URL" | python -m json.tool
echo ""

echo "--- [2] PATCH: set boothName and printCopies ---"
curl -s -X PATCH "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"boothName": "My Booth", "printCopies": 2}' | python -m json.tool
echo ""

echo "--- [3] PATCH: enable autoPrint and set countdown to 5s ---"
curl -s -X PATCH "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"autoPrint": true, "countdownDuration": 5}' | python -m json.tool
echo ""

echo "--- [4] PATCH: validation error (printCopies out of range) ---"
curl -s -X PATCH "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"printCopies": 99}' | python -m json.tool
echo ""

echo "--- [5] POST: reset settings to defaults ---"
curl -s -X POST "$BASE_URL/reset" | python -m json.tool
echo ""

echo "--- [6] GET after reset (should show defaults) ---"
curl -s -X GET "$BASE_URL" | python -m json.tool
echo ""

echo "============================================"
echo "  All tests complete."
echo "============================================"
