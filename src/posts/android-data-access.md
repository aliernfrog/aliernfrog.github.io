---
title: Android/data access
date: 2023-12-10T12:00Z
updated: 2025-07-19T21:00Z
description: Solutions for accessing Android/data folder on Android 11+
---

# Summary
- On Android 11 and later, access to `Android/data` using `java.io.File` was made impossible.
- A loophole in DocumentsUI allowed apps to get access to Android/data, if the app set the initial URI to that folder.
- A patch was made later, which prevented apps from getting access to Android/data. However, it was still possible to set the initial URI to specific folders inside this folder and get access to them.
- In September 2023, a new version of DocumentsUI started rolling out. Which made it impossible to get access to anything inside `Android/data`.

# Solutions
## Method 1: Custom ROMs
Some custom ROMs allow users to disable `Android/data` restrictions from DocumentsUI, allowing file explorers to request access to folders and files inside.

## Method 2: Uninstall updates of Files app (temporary, might not work)
In some cases, users can uninstall updates of the Files (DocumentsUI) app, and revert to a version which has partial restrictions.
To do this: `Device settings > Apps > All apps/Manage apps > Files (the one with the blue icon, name depends on language)` > Uninstall updates`. The app may be hidden from this list by default, in this case look for an option to un-hide system apps.
Note that these steps may vary depending on your device.

## Method 3: Use [Shizuku](https://shizuku.rikka.app/) with [ZArchiver (proprietary)](https://play.google.com/store/apps/details?id=ru.zdevs.zarchiver)
[Shizuku](https://shizuku.rikka.app/) is an app which lets other apps elevate their permissions with ADB Wireless Debugging or Root access.
[ZArchiver](https://play.google.com/store/apps/details?id=ru.zdevs.zarchiver) can be configured to use permissions from Shizuku: `ZArchiver settings > Root > Root type > Shizuku`.

## Method 4: Connect device to a PC with USB or ADB
Android/data can be accessed on a PC when the device is connected via ADB or USB.
For USB, selecting "file management" option is required after connecting the device.
For ADB, commands such as `adb pull` and `adb push` can be used. I do not know if there are GUI apps for this.

# For LAC or Polyfield
### LAC
- Use [LAC Tool](https://github.com/aliernfrog/lac-tool), it has Shizuku support.
- Use in-game community tab to share & download maps.
- Copy `.txt` link of the map you want to download, and paste it to map name field when creating map. This will download the map.
- Copy link of the wallpaper you want to use, and paste it on in-game cellphone settings.
- Manually manage files using the previous methods
 - `Android/data/com.MA.LAC/files/editor` for maps
 - `Android/data/com.MA.LAC/files/wallpapers` for wallpapers
 - `Android/data/com.MA.LAC/files/screenshots` for screenshots

### Polyfield
- Use [PF Tool](https://github.com/aliernfrog/pf-tool), it has Shizuku support.
- Download maps from the in-game maps list.
- Manually manage files using the previous methods
 - `Android/data/com.MA.Polyfield/files/editor` for maps