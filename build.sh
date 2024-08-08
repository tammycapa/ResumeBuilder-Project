# Ensure Node.js and npm are available
export PATH=$PATH:/usr/local/bin/

# Delete executable if existing in order to prevent test from duplicating
rm -rf resume_builder

# Run unit tests and save results in a text file
echo -e "\n========== Running unit tests... ==========\n"
npx jest _tests_/main.test.js --coverage

# Check if tests passed
if [ $? -eq 0 ]; then
  echo -e "\nUnit test complete. ALL tests PASSED."
    # Package application
  echo -e "\n========== Packaging application... ==========\n"

  npx electron-packager . resume-builder \
    --platform=darwin \
    --arch=x64 \
    --out=resume_builder \
    --overwrite

  echo -e "\Build SUCCESSFUL\n"
  echo -e "\nExecutable file 'resume-builder.app' successfully created!\n"
else
  echo -e "\nUnit test complete. SOME tests FAILED.\n"
  echo -e "\nBuild FAILED.\n"
  exit 1
fi