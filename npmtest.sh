#!/bin/bash

# Set the maximum number of retries to 3
MAX_RETRIES=3

# Run the test command and save the output to a variable
npm_test_output=$(npm run test -- --no-watch --no-progress --browsers ChromeHeadlessNoSandbox --code-coverage 2>&1)

# Check if the exit code is 0, which means the tests passed
if [ $? -eq 0 ]
then
  echo "$npm_test_output"   # Output of npm run test if Passed.
  echo "Code Coverage tests passed successfully." 
  exit 0
fi

# Retry the test command if it failed due to a timeout
for i in $(seq 1 $MAX_RETRIES); do
  if [[ $npm_test_output =~ "Disconnected" ]]; then
      echo "$npm_test_output"    # Output of npm run test on timeout
      echo "Test command timed out, re-running (attempt $i of $MAX_RETRIES)..."
      npm_test_output=$(npm run test -- --no-watch --no-progress --browsers ChromeHeadlessNoSandbox --code-coverage 2>&1)
      # Check if the exit code is 0 after retrying the test command
      if [ $? -eq 0 ]
      then
        echo "$npm_test_output"    # Output of npm run test on retry
        echo "Code Coverage tests passed successfully after retry."
        exit 0
      fi
  else
      echo "No Timeout issue found."
      break
  fi
done

# If the test command failed after all retries, exit with a non-zero status code
echo "$npm_test_output"    # Output of npm run test if Failed
echo "Code Coverage Tests failed"
exit 1
