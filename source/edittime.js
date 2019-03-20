function GetPluginSettings () {
	return {
		"name"       : "Electron",
		"id"         : "armaldio_electron",
		"version"    : "0.2.12",
		"description": "Run your game with the best performances inside Electron",
		"author"     : "Armaldio",
		"help url"   : "https://github.com/ElectronForConstruct/construct2-plugin",
		"category"   : "General",
		"type"       : "object",
		"rotatable"  : false,
		"flags"      : 0 | pf_singleglobal
	};
};

////////////////////////////////////////
// Parameter types:
// AddNumberParam(label, description [, initial_string = "0"])			// a number
// AddStringParam(label, description [, initial_string = "\"\""])		// a string
// AddAnyTypeParam(label, description [, initial_string = "0"])			// accepts either a number or string
// AddCmpParam(label, description)										// combo with equal, not equal, less, etc.
// AddComboParamOption(text)											// (repeat before "AddComboParam" to add combo items)
// AddComboParam(label, description [, initial_selection = 0])			// a dropdown list parameter
// AddObjectParam(label, description)									// a button to click and pick an object type
// AddLayerParam(label, description)									// accepts either a layer number or name (string)
// AddLayoutParam(label, description)									// a dropdown list with all project layouts
// AddKeybParam(label, description)										// a button to click and press a key (returns a VK)
// AddAnimationParam(label, description)								// a string intended to specify an animation name
// AddAudioFileParam(label, description)								// a dropdown list with all imported project audio files

////////////////////////////////////////
// Conditions

AddStringParam("Path", "Enter a file path to test if exists.");
AddCondition(6, cf_none, "Path exists", "File system - Synchronous", "Path <i>{0}</i> exists", "Test if a file exists on disk.", "Exists");

AddCondition(7, cf_trigger, "On file dropped", "Drag/Drop", "On file dropped", "Triggered when the user drag-and-drops a file in to the window.", "OnFileDrop");

AddCondition(8, cf_trigger, "On validate dialog", "Dialogs", "On validate dialog", "Triggered when validating a dialog window", "OnOpenDialogSuccess");
AddCondition(9, cf_trigger, "On cancel dialog", "Dialogs", "On cancel dialog", "Triggered when canceling dialog window", "OnOpenDialogFail");
AddCondition(10, cf_trigger, "On validate save dialog", "Dialogs", "On validate dialog", "Triggered when validating a save dialog window", "OnSaveDialogSuccess");
AddCondition(12, cf_trigger, "On cancel save dialog", "Dialogs", "On cancel dialog", "Triggered when canceling a save dialog window", "OnSaveDialogFail");

AddStringParam("Tag", "A unique tag", "");
AddCondition(0, cf_trigger, "On write success", "File system - Asynchronous", "On write {0} success", "Trigger when a specific write action succeed", "OnWriteSuccess");

AddStringParam("Tag", "A unique tag", "");
AddCondition(1, cf_trigger, "On write fail", "File system - Asynchronous", "On write {0} fail", "Trigger when a specific write action fail to write", "OnWriteFail");

AddStringParam("Tag", "A unique tag", "");
AddCondition(3, cf_trigger, "On read success", "File system - Asynchronous", "On read {0} success", "Trigger when a specific read action succeed", "OnReadSuccess");

AddStringParam("Tag", "A unique tag", "");
AddCondition(4, cf_trigger, "On read fail", "File system - Asynchronous", "On read {0} fail", "Trigger when a specific read action fail to read", "OnReadFail");

AddCondition(2, cf_none, "Is Electron", "Tests", " Electron", "Is on platform Electron", "IsElectron");

AddStringParam("Path", "Path to loop through", '""');
AddComboParamOption("Folders");
AddComboParamOption("Files");
AddComboParamOption("Files/Folders");
AddComboParam("Files/Folders", "Whether to include files, folders or both in the loop (TODO)");
AddComboParamOption("No");
AddComboParamOption("Yes");
AddComboParam("Recursive", "Whether the query is recursive or not (TODO)");
AddCondition(5, cf_looping | cf_not_invertible, "For each file/folder", "For Each", "For each <i>{1}</i> in <i>{0}</i> (recursive = {2})", "Repeat the event for each file/folder in path.", "ForEachFileFolder");

AddCondition(11, cf_looping | cf_not_invertible, "For each dropped file", "Drag/Drop", "For each dropped file", "Repeat the event for each dropped file.", "ForEachDroppedFile");
AddCondition(13, cf_looping | cf_not_invertible, "For each selected file/folder", "Dialogs", "For each selected file/folder", "Repeat the event for each selected file/folder", "ForEachSelectedFileFolder");
AddCondition(14, cf_looping | cf_not_invertible, "For each application argument", "Startup", "For each application argument", "Repeat the event for each application argument", "ForEachArgument");

AddCondition(15, cf_trigger, "OnDragOver", "Drag/Drop", "OnDragOver", "OnDragOver", "OnDragOver");
AddCondition(16, cf_trigger, "OnDragEnter", "Drag/Drop", "OnDragEnter", "OnDragEnter", "OnDragEnter");
AddCondition(17, cf_trigger, "OnDragLeave", "Drag/Drop", "OnDragLeave", "OnDragLeave", "OnDragLeave");

AddCondition(18, cf_trigger, "OnResize", "Window", "OnResize", "OnResize", "OnResize");
AddCondition(19, cf_trigger, "OnLoseFocus", "Window", "OnLoseFocus", "OnLoseFocus", "OnLoseFocus");
AddCondition(20, cf_trigger, "OnFocus", "Window", "OnFocus", "OnFocus", "OnFocus");

AddStringParam("Tag", "Tag to differentiate shortcuts", '""');
AddCondition(21, cf_trigger, "On shortcut", "Keyboard", "On Shortcut {0}", "OnShortcut", "OnShortcut");
////////////////////////////////////////
// Actions

AddStringParam("Existing file", "Enter the path to the file to be renamed.");
AddStringParam("New name", "Enter the new name of the file");
AddAction(15, af_none, "Rename file", "File system - Synchronous", "Rename <i>{0}</i> to <i>{1}</i>", "Rename an existing file.", "RenameSync");

AddStringParam("Path", "Enter the folder path to create.");
AddAction(17, af_none, "Create folder", "File system - Synchronous", "Create folder <i>{0}</i>", "Create a new folder on disk.", "CreateFolder");

AddStringParam("Path", "Enter the file path to append to.", "");
AddStringParam("Contents", "Enter the text content to append to the file.");
AddAction(18, af_none, "Append file", "File system - Synchronous", "Append <b>{1}</b> to file <i>{0}</i>", "Add some text to the end of a file.", "AppendFile");

AddStringParam("Path", "Enter the folder path to list files from.");
AddAction(19, af_none, "List files", "File system - Synchronous", "List files from <i>{0}</i>", "Load a list of files in a given folder. Use expressions after this action to get the count and file names.", "ListFiles");

AddStringParam("Title", "The title of the window", "");
AddStringParam("Default path", "The preselected path", "");
AddStringParam("Confirmation text (optional)", "The text of the Confirm button", "");
AddStringParam("Filters (TODO)", "You can filter by filetype", "");
AddStringParam("Properties", "openFile, openDirectory, multiSelections, createDirectory and showHiddenFiles (comma separated)", "");
AddAction(20, af_none, "Show dialog", "Dialogs", "Show dialog {4} '{0}' (accept <i>{3}</i>)", "Show a dialog allowing the user to pick a file or a folder.", "ShowOpenDialog");

AddStringParam("Accept", "The file types to filter by. Leave empty to show all files, or e.g. \".txt\" or \".txt,.json\" or \"text/*\"");
AddAction(22, af_none, "Show save dialog", "Dialogs", "Show save dialog (accept <i>{0}</i>)", "Show a save file dialog.", "ShowSaveDialog");

AddStringParam("Path", "Enter the file path to copy.");
AddStringParam("Destination", "Enter the file path to copy to.");
AddAction(23, af_none, "Copy file", "File system - Synchronous", "Copy <i>{0}</i> to <i>{1}</i>", "Make an identical copy of a file.", "CopySync");

AddStringParam("Path", "Enter the file path to move.");
AddStringParam("Destination", "Enter the file path to move to.");
AddAction(24, af_none, "Move file", "File system - Synchronous", "Move <i>{0}</i> to <i>{1}</i>", "Copy a file then delete the original.", "MoveSync");

AddStringParam("Path", "Enter the path of the file to execute. This can also include space-separated arguments. To execute a path with spaces in it, wrap in double-quotes (e.g. \"\"\"C:\\Program Files\\file.exe\"\"\").");
AddStringParam("Parameters", "A semicolon separated list of arguments to pas to the file");
AddAction(25, af_none, "Run file", "File system - Synchronous", "Run <i>{0}</i> <b>{1}</b>", "Run a file, such as executing another program.", "RunFile");

AddNumberParam("X", "The X co-ordinate to move the window to on the screen.");
AddNumberParam("Y", "The Y co-ordinate to move the window to on the screen.");
AddComboParamOption("Yes");
AddComboParamOption("No");
AddComboParam("Animated", "Whether the change is animated or not (MacOS)", "Yes");
AddAction(27, af_none, "Set Position", "Window", "Set window position to <i>{0</i>;<i>{1}</i>", "Set the position of the window on the screen.", "SetWindowPosition");

AddNumberParam("Width", "The new width of the window.");
AddNumberParam("Height", "The new height of the window.");
AddComboParamOption("Yes");
AddComboParamOption("No");
AddComboParam("Animated", "Whether the change is animated or not (MacOS)", "Yes");
AddAction(29, af_none, "Set Size", "Window", "Set window size to <i>{0}</i>;<i>{1}</i>", "Set the size of the window.", "SetWindowSize");

AddStringParam("Title", "A string to display in the window title bar.");
AddAction(30, af_none, "Set title", "Window", "Set window title to <i>{0}</i>", "Set the text appearing in the window title bar.", "SetWindowTitle");

AddAction(31, af_none, "Minimize", "Window", "Minimize window", "Minimize the window.", "WindowMinimize");
AddAction(32, af_none, "Maximize", "Window", "Maximize window", "Maximize the window.", "WindowMaximize");
AddAction(33, af_none, "UnMaximize", "Window", "UnMaximize window", "UnMaximize the window (i.e. the reverse of maximizing).", "WindowUnmaximize");
AddAction(34, af_none, "Restore", "Window", "Restore window", "Restore the window (i.e. show again after minimizing).", "WindowRestore");

AddAction(4, af_none, "(DEPRECATED) Hide", "Window", "Hide app window", "Hide app window", "Hide");
AddAction(5, af_none, "(DEPRECATED) Show", "Window", "Show app window", "Show app window", "Show");
AddAction(7, af_none, "(DEPRECATED) Maximize", "Window", "(DEPRECATED) Maximize window", "(DEPRECATED) Maximize window", "Maximize");

AddComboParamOption("Request attention");
AddComboParamOption("Stop requesting attention");
AddComboParam("Mode", "Whether to request attention or cancel a previous request for attention.");
AddAction(35, af_none, "Request attention", "Window", "Window: {0}", "Start or stop requesting attention from the user, e.g. by flashing the title bar (depends on OS).", "WindowRequestAttention");

AddNumberParam("Max width", "The maximum window width to set, in pixels.");
AddNumberParam("Max height", "The maximum window height to set, in pixels.");
AddAction(36, af_none, "Set maximum size", "Window", "Set window maximum size to <i>{0}</i> x <i>{1}</i>", "Set the maximum size of the window.", "WindowSetMaxSize");

AddNumberParam("Min width", "The minimum window width to set, in pixels.");
AddNumberParam("Min height", "The minimum window height to set, in pixels.");
AddAction(37, af_none, "Set minimum size", "Window", "Set window minimum size to <i>{0}</i> x <i>{1}</i>", "Set the minimum size of the window.", "WindowSetMinSize");

AddComboParamOption("not resizable");
AddComboParamOption("resizable");
AddComboParam("Mode", "Whether to enable or disable resizing on the window.");
AddAction(38, af_none, "Set resizable", "Window", "Set window {0}", "Enable or disable resize controls on the window.", "WindowSetResizable");

AddStringParam("Accelerator", "The accelerator corresponding to the shortcut you want to register. (ex: CommandOrControl+X) More infos : https://go.armaldio.xyz/electronaccelerators");
AddStringParam("Tag", "A tag to identify the shortcut.");
AddAction(45, af_none, "Register a shortcut", "Keyboard", "Register shortcut <b>{0}</b> for {1}", "Register global OS shortcut", "RegisterShortcut");

/**
 * TODO https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetalwaysontopflag-level
 AddComboParamOption("");
 AddComboParamOption("");
 AddComboParam("Mode", "Whether to enable or disable the window always being on top.");
 */
AddComboParamOption("not always on top");
AddComboParamOption("always on top");
AddComboParam("Mode", "Whether to enable or disable the window always being on top.");
AddAction(39, af_none, "Set always on top", "Window", "Set window {0}", "Enable or disable the window always being on top of other windows.", "WindowSetAlwaysOnTop");

AddAction(40, af_none, "Show dev tools", "Window", "Show dev tools", "Display the web developer tools e.g. for Javascript debugging or inspecting console messages.", "ShowDevTools");

AddStringParam("Text", "Enter the text to copy to the clipboard.");
AddAction(41, af_none, "Set clipboard text", "Clipboard", "Set clipboard text to <i>{0}</i>", "Copy some text to the clipboard.", "SetClipboardText");

AddAction(42, af_none, "Clear clipboard", "Clipboard", "Clear clipboard", "Clear the clipboard so nothing is copied.", "ClearClipboard");

AddStringParam("URL", "The web address to open in a browser.");
AddAction(43, af_none, "Open browser", "File system - Synchronous", "Open browser to URL <i>{0}</i>", "Open the default browser to a given URL.", "OpenBrowser");

AddAction(1, af_none, "Exit", "Window", "Close electron windows", "Close electron windows", "Exit");
AddAction(2, af_none, "Restart", "Window", "Restart electron windows", "Restart electron windows", "Restart");
AddAction(3, af_none, "Focus", "Window", "Focuses on the application’s first window", "focuses on the application’s first window", "Focus");

AddComboParamOption("Fullscreen");
AddComboParamOption("Not fullscreen");
AddComboParam("State", "Fullscreen state", "Set fullscreen"); // a dropdown list parameter
AddAction(8, af_none, "Set Fullscreen", "Window", "Set {0}", "Toggle fullscreen", "Fullscreen");

AddStringParam("Tag", "A unique tag to keep track of the result", "");
AddStringParam("Path", "The path of the file to write", "");
AddStringParam("Data", "The data to write", "");
AddComboParamOption("utf8");
AddComboParamOption("binary");
AddComboParamOption("base64");
AddComboParam("Encoding Mode", "Encoding mode.");
AddAction(0, af_none, "Write", "File system - Asynchronous", " ({0}) Write {2} to {1} ({3})", "Write data to a specific file asynchronously", "Write");

AddStringParam("Tag", "A unique tag to keep track of the result", "");
AddStringParam("Path", "The file to read", "");
AddStringParam("Encoding", "The encoding of the file", "\"utf8\"");
AddAction(9, af_none, "Read", "File system - Asynchronous", "Read {1} ({0})", "Read a file asynchronously", "Read");

AddStringParam("Path", "The path of the file to read", "");
AddAction(11, af_none, "Delete synchronously a file", "File system - Synchronous", "Delete {0}", "Delete a file synchronously", "DeleteSync");

//AddStringParam("Path", "The path of the file to read", "");
//AddAction(12, af_none, "Create synchronously a file", "File system - Synchronous", "Create {0}", "Create a file synchronously", "CreateSync");

AddStringParam("Path", "The path of the file to write", "");
AddStringParam("Data", "The data to write", "");
AddComboParamOption("utf8");
AddComboParamOption("binary");
AddComboParamOption("base64");
AddComboParam("Encoding Mode", "Encoding mode.");
AddComboParamOption("No");
AddComboParamOption("Yes");
AddComboParam("Overwrite", "Overwrite the file if it already exists", "No");
AddAction(13, af_none, "Write", "File system - Synchronous", "Write {1} to {0} Overwrite: {3} ({2})", "Write data to a specific file synchronously", "WriteSync");

AddAction(14, af_none, "Set background transparent", "Rendering", "Set game background to transparent color", "Replace dark game background by a transparent color when all layers are set to transparent", "SetTransparent");

AddComboParamOption("Catch");
AddComboParamOption("Ignore");
AddComboParam("State", "Whether to ignore or to catch the mouse", "Catch"); 
AddAction(44, af_none, "Ignore mouse clicks", "Rendering", "{0} mouse events", "Add the ability to click through the window", "ClickThrough");

////////////////////////////////////////
// Expressions

AddExpression(23, ef_return_string, "", "Paths", "AppFolder", "Return the application's folder. Note it may not have write permission.");
AddExpression(24, ef_return_string, "", "Paths", "UserFolder", "Return the current user's folder.");

AddStringParam("Path", "The file path to load.");
AddExpression(25, ef_return_string, "", "File system - Synchronous", "ReadFile", "Return the text content of a file on disk.");

AddStringParam("Path", "The file path to get the size of.");
AddExpression(26, ef_return_number, "", "File system - Synchronous", "FileSize", "Return the size of a file on disk, in bytes.");

AddExpression(27, ef_return_number, "", "File system - Synchronous", "ListCount", "Return the number of files after 'List files'.");

AddNumberParam("Index", "Zero-based index of file to retrieve.");
AddExpression(28, ef_return_string, "", "File system - Synchronous", "ListAt", "Return the filename at an index after 'List files'.");

AddExpression(29, ef_return_string, "", "Drag/Drop", "DroppedFileName", "Return the filename of a file dropped in to the window.");
AddExpression(37, ef_return_string, "", "Drag/Drop", "DroppedFileSize", "Return the size of a file dropped in to the window.");
AddExpression(38, ef_return_string, "", "Drag/Drop", "DroppedFilePath", "Return the full path of a file dropped in to the window.");

AddExpression(30, ef_return_string, "", "Dialogs", "ChosenPath", "Return the chosen path after a file dialog.");

AddExpression(31, ef_return_number, "", "Window", "WindowX", "The X position of the window on the screen.");
AddExpression(32, ef_return_number, "", "Window", "WindowY", "The Y position of the window on the screen.");
AddExpression(33, ef_return_number, "", "Window", "WindowWidth", "The width of the UI window in the operating system.");
AddExpression(34, ef_return_number, "", "Window", "WindowHeight", "The height of the UI window in the operating system.");
AddExpression(35, ef_return_string, "", "Window", "WindowTitle", "The current window title bar text.");

AddExpression(36, ef_return_string, "", "Clipboard", "ClipboardText", "The current text copied to the clipboard, if any.");
AddExpression(20, ef_return_any, "Last read async data", "File system - Synchronous", "LastReadAsync", "Get the last data asynced readed");

AddExpression(0, ef_return_any, "Get app path", "Paths", "GetAppPath", "Returns the current application directory.");

AddExpression(2, ef_return_any, "Get Locale", "Language", "GetLocale", "Get locale based on the system");

AddExpression(3, ef_return_any, "Get OS arch", "OS", "GetOSArch", "Returns a string identifying the operating system CPU architecture");
AddExpression(4, ef_return_any, "Get OS homedir", "OS", "GetOSHomedir", "Returns the home directory of the current user");
AddExpression(5, ef_return_any, "Get OS hostname", "OS", "GetOSHostname", "Returns the hostname of the operating system");
AddExpression(6, ef_return_any, "Get platform", "OS", "GetOSPlatform", "Returns the operating system platform");

AddExpression(8, ef_return_any, "Get appdata path", "Paths", "GetAppDataPath", "%APPDATA% (Win), $XDG_CONFIG_HOME or ~/.config (linux), ~/Library/Application (Mac)");
AddExpression(9, ef_return_any, "Get user data path", "Paths", "GetUserDataPath", "By default it is the appData directory appended with your app’s name");
AddExpression(10, ef_return_any, "Get current executable file path", "Paths", "GetExePath", "The current executable file");
AddExpression(11, ef_return_any, "Get desktop path", "Paths", "GetDesktopPath", "The current user’s Desktop directory");
AddExpression(12, ef_return_any, "Get documents path", "Paths", "GetDocumentsPath", "User’s document directory");
AddExpression(13, ef_return_any, "Get downloads path", "Paths", "GetDownloadsPath", "User’s download directory");
AddExpression(14, ef_return_any, "Get music path", "Paths", "GetMusicPath", "User’s music directory");
AddExpression(15, ef_return_any, "Get pictures path", "Paths", "GetPicturesPath", "User’s picture directory");
AddExpression(16, ef_return_any, "Get videos path", "Paths", "GetVideoPath", "User’s video directory");
AddExpression(17, ef_return_any, "Get temp path", "Paths", "GetTempPath", "Temporary folder path");

AddExpression(22, ef_return_any, "The current file/folder in the loop", "Files", "CurrentFileFolder", "The current file/folder in the loop");
AddExpression(40, ef_return_any, "The current file/folder in the loop opened by 'open' modal", "Files", "CurrentOpenedFileFolder", "The current file/folder in the loop opened by 'open' modal");
AddExpression(41, ef_return_any, "The count of files/folders in a directory", "Files", "FileFolderCount", "The count of files/folders in a directory");
AddExpression(42, ef_return_any, "The current argument", "Startup", "CurrentArg", "The current argument in the loop");

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_color,		name,	initial_value,	description)		// a color dropdown
// new cr.Property(ept_font,		name,	"Arial,-16", 	description)		// a font with the given face name and size
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)
// new cr.Property(ept_link,		name,	link_text,		description, "firstonly")		// has no associated value; simply calls "OnPropertyChanged" on click

var property_list = [];

function CreateIDEObjectType () {
	return new IDEObjectType();
}

function IDEObjectType () {
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

IDEObjectType.prototype.CreateInstance = function (instance) {
	return new IDEInstance(instance);
};

function IDEInstance (instance, type) {
	assert2(this instanceof arguments.callee, "Constructor called as a function");

	this.instance = instance;
	this.type     = type;

	this.properties = {};

	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
}

IDEInstance.prototype.OnInserted = function () {
};

IDEInstance.prototype.OnDoubleClicked = function () {
};

IDEInstance.prototype.OnPropertyChanged = function (property_name) {
};

IDEInstance.prototype.OnRendererInit = function (renderer) {
};

IDEInstance.prototype.Draw = function (renderer) {
};

IDEInstance.prototype.OnRendererReleased = function (renderer) {
};