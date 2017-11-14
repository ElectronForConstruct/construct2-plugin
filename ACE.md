# Configuration
## Electron plugin - v0.2.11 - by Armaldio <img src='source\c2addon\files\armaldio_electron\PluginIcon.ico' alt='Icon'>
Property | Value
:---: | ---
Description | Run your game with the best performances inside Electron
Category | General
Cordova | No
Flags | No
Help | https://github.com/C2Electron/c2-plugin
Id | armaldio_electron
Rotatable | No
Type | object

# Actions
#### There are 39 actions available
**File system - Synchronous::Rename file** : Rename an existing file.

* **Existing file** : Enter the path to the file to be renamed.
* **New name** : Enter the new name of the file

---

**File system - Synchronous::Create folder** : Create a new folder on disk.

* **Path** : Enter the folder path to create.

---

**File system - Synchronous::Append file** : Add some text to the end of a file.

* **Path** : Enter the file path to append to.
* **Contents** : Enter the text content to append to the file.

---

**File system - Synchronous::List files** : Load a list of files in a given folder. Use expressions after this action to get the count and file names.

* **Path** : Enter the folder path to list files from.

---

**Dialogs::Show dialog** : Show a dialog allowing the user to pick a file or a folder.

* **Title** : The title of the window
* **Default path** : The preselected path
* **Confirmation text (optional)** : The text of the Confirm button
* **Filters (TODO)** : You can filter by filetype
* **Properties** : openFile, openDirectory, multiSelections, createDirectory and showHiddenFiles (comma separated)

---

**Dialogs::Show save dialog** : Show a save file dialog.

* **Accept** : The file types to filter by. Leave empty to show all files, or e.g. ".txt" or ".txt,.json" or "text/*"

---

**File system - Synchronous::Copy file** : Make an identical copy of a file.

* **Path** : Enter the file path to copy.
* **Destination** : Enter the file path to copy to.

---

**File system - Synchronous::Move file** : Copy a file then delete the original.

* **Path** : Enter the file path to move.
* **Destination** : Enter the file path to move to.

---

**File system - Synchronous::Run file** : Run a file, such as executing another program.

* **Path** : Enter the path of the file to execute. This can also include space-separated arguments. To execute a path with spaces in it, wrap in double-quotes (e.g. """C:\Program Files\file.exe""").
* **Parameters** : A semicolon separated list of arguments to pas to the file

---

**Window::Set Position** : Set the position of the window on the screen.

* **X** : The X co-ordinate to move the window to on the screen.
* **Y** : The Y co-ordinate to move the window to on the screen.
* **Animated** : Whether the change is animated or not (MacOS) (default value : Yes)
  * Yes
  * No

---

**Window::Set Size** : Set the size of the window.

* **Width** : The new width of the window.
* **Height** : The new height of the window.
* **Animated** : Whether the change is animated or not (MacOS) (default value : Yes)
  * Yes
  * No

---

**Window::Set title** : Set the text appearing in the window title bar.

* **Title** : A string to display in the window title bar.

---

**Window::Minimize** : Minimize the window.


---

**Window::Maximize** : Maximize the window.


---

**Window::UnMaximize** : UnMaximize the window (i.e. the reverse of maximizing).


---

**Window::Restore** : Restore the window (i.e. show again after minimizing).


---

**Window::(DEPRECATED) Hide** : Hide app window


---

**Window::(DEPRECATED) Show** : Show app window


---

**Window::(DEPRECATED) Maximize** : (DEPRECATED) Maximize window


---

**Window::Request attention** : Start or stop requesting attention from the user, e.g. by flashing the title bar (depends on OS).

* **Mode** : Whether to request attention or cancel a previous request for attention.
  * Request attention
  * Stop requesting attention

---

**Window::Set maximum size** : Set the maximum size of the window.

* **Max width** : The maximum window width to set, in pixels.
* **Max height** : The maximum window height to set, in pixels.

---

**Window::Set minimum size** : Set the minimum size of the window.

* **Min width** : The minimum window width to set, in pixels.
* **Min height** : The minimum window height to set, in pixels.

---

**Window::Set resizable** : Enable or disable resize controls on the window.

* **Mode** : Whether to enable or disable resizing on the window.
  * not resizable
  * resizable

---

**Keyboard::Register a shortcut** : Register global OS shortcut

* **Accelerator** : The accelerator corresponding to the shortcut you want to register. (ex: CommandOrControl+X) More infos : https://go.armaldio.xyz/electronaccelerators
* **Tag** : A tag to identify the shortcut.

---

**Window::Set always on top** : Enable or disable the window always being on top of other windows.

* **Mode** : Whether to enable or disable the window always being on top.
  * not always on top
  * always on top

---

**Window::Show dev tools** : Display the web developer tools e.g. for Javascript debugging or inspecting console messages.


---

**Clipboard::Set clipboard text** : Copy some text to the clipboard.

* **Text** : Enter the text to copy to the clipboard.

---

**Clipboard::Clear clipboard** : Clear the clipboard so nothing is copied.


---

**File system - Synchronous::Open browser** : Open the default browser to a given URL.

* **URL** : The web address to open in a browser.

---

**Window::Exit** : Close electron windows


---

**Window::Restart** : Restart electron windows


---

**Window::Focus** : focuses on the application’s first window


---

**Window::Set Fullscreen** : Toggle fullscreen

* **State** : Fullscreen state (default value : Set fullscreen)
  * Fullscreen
  * Not fullscreen

---

**File system - Asynchronous::Write** : Write data to a specific file asynchronously

* **Tag** : A unique tag to keep track of the result
* **Path** : The path of the file to write
* **Data** : The data to write
* **Encoding Mode** : Encoding mode.
  * utf8
  * binary
  * base64

---

**File system - Asynchronous::Read** : Read a file asynchronously

* **Tag** : A unique tag to keep track of the result
* **Path** : The file to read
* **Encoding** : The encoding of the file (default value : "utf8")

---

**File system - Synchronous::Delete synchronously a file** : Delete a file synchronously

* **Path** : The path of the file to read

---

**File system - Synchronous::Write** : Write data to a specific file synchronously

* **Path** : The path of the file to write
* **Data** : The data to write
* **Encoding Mode** : Encoding mode.
  * utf8
  * binary
  * base64
* **Overwrite** : Overwrite the file if it already exists (default value : No)
  * No
  * Yes

---

**Rendering::Set background transparent** : Replace dark game background by a transparent color when all layers are set to transparent


---

**Rendering::Ignore mouse clicks** : Add the ability to click through the window

* **State** : Whether to ignore or to catch the mouse (default value : Catch)
  * Catch
  * Ignore

---

# Conditions
#### There are 22 conditions available
**File system - Synchronous::Path exists** : Test if a file exists on disk.

* **Path** : Enter a file path to test if exists.

---

**Drag/Drop::On file dropped** : Triggered when the user drag-and-drops a file in to the window.


---

**Dialogs::On validate dialog** : Triggered when validating a dialog window


---

**Dialogs::On cancel dialog** : Triggered when canceling dialog window


---

**Dialogs::On validate save dialog** : Triggered when validating a save dialog window


---

**Dialogs::On cancel save dialog** : Triggered when canceling a save dialog window


---

**File system - Asynchronous::On write success** : Trigger when a specific write action succeed

* **Tag** : A unique tag

---

**File system - Asynchronous::On write fail** : Trigger when a specific write action fail to write

* **Tag** : A unique tag

---

**File system - Asynchronous::On read success** : Trigger when a specific read action succeed

* **Tag** : A unique tag

---

**File system - Asynchronous::On read fail** : Trigger when a specific read action fail to read

* **Tag** : A unique tag

---

**Tests::Is Electron** : Is on platform Electron


---

**For Each::For each file/folder** : Repeat the event for each file/folder in path.

* **Path** : Path to loop through (default value : "")
* **Files/Folders** : Whether to include files, folders or both in the loop (TODO)
  * Folders
  * Files
  * Files/Folders
* **Recursive** : Whether the query is recursive or not (TODO)
  * No
  * Yes

---

**Drag/Drop::For each dropped file** : Repeat the event for each dropped file.


---

**Dialogs::For each selected file/folder** : Repeat the event for each selected file/folder


---

**Startup::For each application argument** : Repeat the event for each application argument


---

**Drag/Drop::OnDragOver** : OnDragOver


---

**Drag/Drop::OnDragEnter** : OnDragEnter


---

**Drag/Drop::OnDragLeave** : OnDragLeave


---

**Window::OnResize** : OnResize


---

**Window::OnLoseFocus** : OnLoseFocus


---

**Window::OnFocus** : OnFocus


---

**Keyboard::On shortcut** : OnShortcut

* **Tag** : Tag to differentiate shortcuts (default value : "")

---

# Expressions
#### There are 37 expressions available
**Paths::AppFolder** : Return the application's folder. Note it may not have write permission.


---

**Paths::UserFolder** : Return the current user's folder.


---

**File system - Synchronous::ReadFile** : Return the text content of a file on disk.

* Param 1 : **Path** : The file path to load.

---

**File system - Synchronous::FileSize** : Return the size of a file on disk, in bytes.

* Param 1 : **Path** : The file path to get the size of.

---

**File system - Synchronous::ListCount** : Return the number of files after 'List files'.


---

**File system - Synchronous::ListAt** : Return the filename at an index after 'List files'.

* Param 1 : **Index** : Zero-based index of file to retrieve.

---

**Drag/Drop::DroppedFileName** : Return the filename of a file dropped in to the window.


---

**Drag/Drop::DroppedFileSize** : Return the size of a file dropped in to the window.


---

**Drag/Drop::DroppedFilePath** : Return the full path of a file dropped in to the window.


---

**Dialogs::ChosenPath** : Return the chosen path after a file dialog.


---

**Window::WindowX** : The X position of the window on the screen.


---

**Window::WindowY** : The Y position of the window on the screen.


---

**Window::WindowWidth** : The width of the UI window in the operating system.


---

**Window::WindowHeight** : The height of the UI window in the operating system.


---

**Window::WindowTitle** : The current window title bar text.


---

**Clipboard::ClipboardText** : The current text copied to the clipboard, if any.


---

**File system - Synchronous::LastReadAsync** : Get the last data asynced readed


---

**Paths::GetAppPath** : Returns the current application directory.


---

**Language::GetLocale** : Get locale based on the system


---

**OS::GetOSArch** : Returns a string identifying the operating system CPU architecture


---

**OS::GetOSHomedir** : Returns the home directory of the current user


---

**OS::GetOSHostname** : Returns the hostname of the operating system


---

**OS::GetOSPlatform** : Returns the operating system platform


---

**Paths::GetAppDataPath** : %APPDATA% (Win), $XDG_CONFIG_HOME or ~/.config (linux), ~/Library/Application (Mac)


---

**Paths::GetUserDataPath** : By default it is the appData directory appended with your app’s name


---

**Paths::GetExePath** : The current executable file


---

**Paths::GetDesktopPath** : The current user’s Desktop directory


---

**Paths::GetDocumentsPath** : User’s document directory


---

**Paths::GetDownloadsPath** : User’s download directory


---

**Paths::GetMusicPath** : User’s music directory


---

**Paths::GetPicturesPath** : User’s picture directory


---

**Paths::GetVideoPath** : User’s video directory


---

**Paths::GetTempPath** : Temporary folder path


---

**Files::CurrentFileFolder** : The current file/folder in the loop


---

**Files::CurrentOpenedFileFolder** : The current file/folder in the loop opened by 'open' modal


---

**Files::FileFolderCount** : The count of files/folders in a directory


---

**Startup::CurrentArg** : The current argument in the loop


---

