npx electron-packager . "SuvaiDesktopApp" --app-bundle-id=com.suvai.desktopApp --helper-bundle-id=com.suvai.desktopApp.helper --app-version=1.4.0 --build-version=8 --platform=mas --arch=x64 --icon=assets/Icon.icns --overwrite
npx electron-osx-sign "SuvaiDesktopApp-mas-x64/SuvaiDesktopApp.app" --verbose
npx electron-osx-flat "SuvaiDesktopApp-mas-x64/SuvaiDesktopApp.app" --verbose
