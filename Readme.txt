Intsructions to Run Build Script/s.

Prerequisites:
The build script utilises Jest for unit testing and Electron for packaging.
Install these by running 'npm install' in the root folder.


1. For macOS, run 'chmod +x build.sh' on the command line to grant the script execute permissions. 
    Proceed to step 2 for Windows.

2. Run the build script 
    For macOS: './build.sh'
    For Windows: './build.bat' or 'build.bat'

3. The script will perform the unit test first with the following actions:
    rm -rf resume_builder
    npx jest _tests_/main.test.js --coverage
    if [ $? -eq 0 ]; then
    echo "\nUnit test complete. ALL tests PASSED."
    else
    echo "\nUnit test complete. SOME tests FAILED."
    fi

- Deletes existing resume_builder folder created during packaging and its contents to avoid unit test issues
- Executes Jest to run unit tests located in _tests_/main.test.js. --coverage flag is used to generate test coverage reports
- Checks the test and prints a message to indicate if tests have passed or have FAILED

4. Once unit test is over, a directory named 'coverage' will be made. 
    To view the coverage report, proceed to coverage/lcov-report and open index.html.

5. The script will then create an executable file with the following commands:
    npx electron-packager . resume-builder \
    --platform=darwin \
    --arch=x64 \
    --out=resume_builder \
    --overwrite

- Runs the 'electron-packager' tool to package the application into an Electron application named 'resume-builder'
- Specifies the target platform (darwin for macOS, win32 for Windows)
- Sets the target architecture to 64-bit
- Specifies the output directory 'resume_builder' for the packaged application
- Allows overwriting existing files in the output directory

6. Command line will display 'Executable file 'resume-builder.app' successfully created!' after packaging has been completed.

7. Navigate to the newly created resume_builder directory
    For macOS: Go inside the resume_builder-darwin-x64 folder
    For Windows: Go inside the resume_builder-win32-x64 folder

8. Double-click on the application file to launch the application
    For macOS: resume-builder.app
    For Windows: resume-builder.exe

** Note that it may take around a minute to run the application for the first time.

9. ResumeBuilder application can now be used! 