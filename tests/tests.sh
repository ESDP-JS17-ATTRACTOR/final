#!/bin/bash

REL_PATH=$(dirname "$0")
cd "$REL_PATH" || exit 1
CURRENT_DIR=$(pwd)

echo "$CURRENT_DIR"
cd "$CURRENT_DIR" || exit 1

if ! command -v pm2 &> /dev/null
then
  echo "pm2 is not installed or not in PATH"
  exit 1
fi

echo '###################'
echo "# Running tests! #"
echo '###################'

echo '# API'

cd ../back || exit 1

echo "# Running fixtures! #"
npm run cli:test seed

echo '# Running API server in test mode'
pm2 start "npm run dev:test" --name="final-api-test"

echo '# Running frontend in test mode'
cd ../front || exit 1
pm2 start "npm run dev:test" --name="final-frontend-test"

while ! nc -z localhost 3010; do
    sleep 0.1
done

echo "# Running tests"
cd ../tests || exit 1
npx codeceptjs run --steps "$@"
EXIT_CODE=$?

echo '$ Killing test processes'
pm2 kill

exit ${EXIT_CODE}


