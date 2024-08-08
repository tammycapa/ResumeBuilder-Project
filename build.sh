# Delete executable if existing in order to prevent test from duplicating
rm -rf resume_builder

# Run unit tests and save results in a text file
echo "\n========== Running unit tests... ==========\n"
npx jest _tests_/main.test.js --coverage

# Check if tests passed
if [ $? -eq 0 ]; then
  echo "\nUnit test complete. ALL tests PASSED."
    # Package application
  echo "\n========== Packaging application... ==========\n"

  npx electron-packager . resume-builder \
    --platform=darwin \
    --arch=x64 \
    --out=resume_builder \
    --overwrite

  echo "\Build SUCCESSFUL\n"
  echo "\nExecutable file 'resume-builder.app' successfully created!\n"
else
  echo "\nUnit test complete. SOME tests FAILED.\n"
  echo "\nBuild FAILED due to failing unit test.\n"
  exit 1
fi