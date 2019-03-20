"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

var runningElectron           = false;
var lastReadedSyncData        = "";
var lastReadedAsyncData       = "";
var currentFileFolder         = "";
var droppedFiles              = [];
var currectDroppedFile        = "";
var currentOpenedFileFolder   = "";
var filesFolders              = [];
var chosenpath                = "";
var currentArg                = "";
var currentSelectedFileFolder = "";

/////////////////////////////////////
// Plugin class
cr.plugins_.armaldio_electron = function (runtime) {
	this.runtime = runtime;
};

function isElectron () {
	if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
		return true;
	}
	if (typeof process !== 'undefined' && process.versions && process.versions.electron) {
		return true;
	}
	return false;
}

if (isElectron()) {

	console.log("Running Electron");

	//https://github.com/jprichardson/node-fs-extra
	var fs            = require('fs-extra');
	var electron      = require('electron');
	var process       = require('process');
	var epath         = require("path");
	var os            = require('os');
	var child         = require('child_process').execFile;
	var shell         = electron.shell;
	var app           = electron.app;
	var remote        = electron.remote;
	var dialog        = remote.dialog;
	var remoteapp     = remote.app;
	var browserWindow = remote.getCurrentWindow();
	var clipboard     = electron.clipboard;
	var globalShortcut = remote.globalShortcut;
    var ipc = electron.ipcRenderer;

	runningElectron = true;
	var args        = require('electron').remote.getGlobal('args');
}

(function () {
		var pluginProto = cr.plugins_.armaldio_electron.prototype;

		/////////////////////////////////////
		// Object type class
		pluginProto.Type = function (plugin) {
			this.plugin  = plugin;
			this.runtime = plugin.runtime;
		};

		var typeProto = pluginProto.Type.prototype;

		// called on startup for each object type
		typeProto.onCreate = function () {

		};

		/////////////////////////////////////
		// Instance class
		pluginProto.Instance = function (type) {
			this.type    = type;
			this.runtime = type.runtime;
		};

		var instanceProto = pluginProto.Instance.prototype;

		// called whenever an instance is created
		instanceProto.onCreate = function () {
			if (!runningElectron) return;
			var self = this;

			document.addEventListener('drop', function (e) {

				e.preventDefault();
				e.stopPropagation();
				droppedFiles = e.dataTransfer.files;
				self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnFileDrop, self);

				/*
				 for (let f of e.dataTransfer.files) {
				 console.log('File(s) you dragged here: ', f.path)
				 }
				 */
				return false;
			});

			document.addEventListener('dragover', function (e) {
				e.preventDefault();
				e.stopPropagation();
				self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnDragOver, self);
			});

			document.addEventListener('dragenter', function (e) {
				e.preventDefault();
				e.stopPropagation();
				self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnDragEnter, self);
			});

			document.addEventListener('dragleave', function (e) {
				e.preventDefault();
				e.stopPropagation();
				self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnDragLeave, self);
			});

			remote.getCurrentWindow().on('resize', function () {
				self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnResize, self);
			});

			remote.getCurrentWindow().on('blur', function () {
				self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnLoseFocus, self);
			});

			remote.getCurrentWindow().on('focus', function () {
				self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnFocus, self);
			});
		};

		instanceProto.saveToJSON = function () {
			return this.dictionary;
		};

		instanceProto.loadFromJSON = function (o) {
			this.dictionary = o;

			// Update the key count
			this.key_count = 0;

			for (var p in this.dictionary) {
				if (this.dictionary.hasOwnProperty(p)) this.key_count++;
			}
		};

		/**BEGIN-PREVIEWONLY**/
		instanceProto.getDebuggerValues = function (propsections) {
			var props = [];

			for (var p in this.dictionary) {
				if (this.dictionary.hasOwnProperty(p)) {
					props.push({
						"name" : p,
						"value": this.dictionary[p]
					});
				}
			}

			propsections.push({
				"title"     : "Electron",
				"properties": props
			});
		};

		instanceProto.onDebugValueEdited = function (header, name, value) {
			this.dictionary[name] = value;
		};
		/**END-PREVIEWONLY**/

		//////////////////////////////////////
		// Conditions
		function Cnds () {
		};

		/**
		 * @return {boolean}
		 */
		Cnds.prototype.OnWriteSuccess = function (tag) {
			return cr.equals_nocase(tag, this.tag);
		};

		Cnds.prototype.OnWriteFail = function (tag) {
			return cr.equals_nocase(tag, this.tag);
		};

		Cnds.prototype.OnOpenDialogSuccess = function () {
			return true;
		};

		Cnds.prototype.OnSaveDialogSuccess = function () {
			return true;
		};

		Cnds.prototype.OnOpenDialogFail = function () {
			return true;
		};

		Cnds.prototype.OnSaveDialogFail = function () {
			return true;
		};

		Cnds.prototype.OnReadSuccess = function (tag) {
			return cr.equals_nocase(tag, this.tag);
		};

		Cnds.prototype.OnReadFail = function (tag) {
			return cr.equals_nocase(tag, this.tag);
		};

		Cnds.prototype.IsElectron = function () {
			return runningElectron;
		};

		Cnds.prototype.OnFileDrop = function () {
			return true;
		};

		Cnds.prototype.OnDragOver = function () {
			return true;
		};

		Cnds.prototype.OnDragEnter = function () {
			return true;
		};

		Cnds.prototype.OnDragLeave = function () {
			return true;
		};

		Cnds.prototype.ForEachFileFolder = function (path, type, recursive) {
			if (!runningElectron)
				return;
			var current_event = this.runtime.getCurrentEventStack().current_event;

			var files = fs.readdirSync(path, 'utf8');
			$.each(files, function (index, value) {
				//TODO is folder
				currentFileFolder = value;
				current_event.retrigger();
			})
		};

		Cnds.prototype.ForEachDroppedFile = function () {
			if (!runningElectron)
				return;
			var current_event = this.runtime.getCurrentEventStack().current_event;

			$.each(droppedFiles, function (index, value) {
				currectDroppedFile = value;
				current_event.retrigger();
			})
		};

		Cnds.prototype.ForEachSelectedFileFolder = function () {
			if (!runningElectron)
				return;
			var current_event = this.runtime.getCurrentEventStack().current_event;

			$.each(filesFolders, function (index, value) {
				currentSelectedFileFolder = value;
				current_event.retrigger();
			})
		};

		Cnds.prototype.ForEachArgument = function () {
			if (!runningElectron)
				return;
			var current_event = this.runtime.getCurrentEventStack().current_event;

			$.each(args, function (index, value) {
				currentArg = value;
				current_event.retrigger();
			})
		};

		Cnds.prototype.OnResize = function () {
			return (true);
		};

		Cnds.prototype.OnLoseFocus = function () {
			return (true);
		};

		Cnds.prototype.OnFocus = function () {
			return (true);
		};

		Cnds.prototype.Exists = function (path) {
			if (!runningElectron)
				return;
			return (fs.existsSync(path));
		};

		Cnds.prototype.OnShortcut = function (tag) {
			if (!runningElectron)
				return;

			if (tag === this.tag)
				return (true);
			return (false);
		};

		pluginProto.cnds = new Cnds();

		//////////////////////////////////////
		// Actions
		function Acts () {
		};

		Acts.prototype.Write = function (tag, path, data, encoding) {
			if (!runningElectron)
				return;
			var encoding_mode_ = ['utf8', 'binary', 'base64'][encoding];
			console.log(encoding_mode_);
			var self = this;
			self.tag = tag;
			fs.writeFile(path, data, function (err) {
				if (err) {
					self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnWriteFail, self);
				}
				self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnWriteSuccess, self);
			});
		};

		function ValidFilePath (path) {
			return true
		}

		Acts.prototype.WriteSync = function (path, data, encoding, overwrite) {
			if (!runningElectron)
				return;
			var encoding_mode_ = ['utf8', 'binary', 'base64'][encoding];
			console.log(data);
			console.log(encoding_mode_);
			console.log(overwrite);
			if (ValidFilePath(path)) {
				if (overwrite) {
					try {
						if (encoding_mode_ === "base64") data = data.replace("data:image/png;base64,", "");
						fs.writeFileSync(path, data, {'encoding': encoding_mode_});
						console.log("Wrote success");
					} catch (err) {
						console.log("Error : ", err);
					}
				} else {
					console.log("Cannot overwrite file");
				}
			}

		};

		Acts.prototype.AppendFile = function (tag, path, data) {
			if (!runningElectron)
				return;
			var self = this;
			self.tag = tag;
			fs.appendFile(path, data, function (err) {
				if (err) {
					self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnAppendFail, self);
				}
				self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnAppendSuccess, self);
			});
		};

		Acts.prototype.AppendFileSync = function (path, data) {
			if (!runningElectron)
				return;
			try {
				fs.appendFileSync(path, data);
			} catch (err) {
				console.log("Error : ", err);
			}
		};

		Acts.prototype.Rename = function (tag, path, newname) {
			if (!runningElectron)
				return;
			var self = this;
			self.tag = tag;
			fs.rename(path, epath.join(epath.dirname(path), newname), function (err) {
				if (err) {
					self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnRenameFail, self);
				}
				self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnRenameSuccess, self);
			});
		};

		Acts.prototype.RenameSync = function (tag, path, newname) {
			if (!runningElectron)
				return;
			try {
				fs.rename(path, epath.join(epath.dirname(path), newname));
				//self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnReadSuccess, self);
			} catch (err) {
				console.log("Error : ", err);
			}
		};

		Acts.prototype.Move = function (tag, path, newpath) {
			if (!runningElectron)
				return;
			var self = this;
			self.tag = tag;
			fs.rename(path, newpath, function (err) {
				if (err) {
					self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnMoveFail, self);
				}
				self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnMoveSuccess, self);
			});
		};

		Acts.prototype.MoveSync = function (tag, path, newpath) {
			if (!runningElectron)
				return;
			try {
				fs.renameSync(path, newpath);
				//self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnMoveSuccess, self);
			} catch (err) {
				console.log("Error : ", err);
			}
		};

		Acts.prototype.Copy = function (tag, path, newpath) {
			if (!runningElectron)
				return;
			var self = this;
			self.tag = tag;
			fs.copy(path, newpath, function (err) {
				if (err) {
					self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnCopyFail, self);
				}
				self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnCopySuccess, self);
			});
		};

		Acts.prototype.CopySync = function (tag, path, newpath) {
			if (!runningElectron)
				return;
			try {
				fs.copy(path, newpath);
				//self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnCopySuccess, self);
			} catch (err) {
				console.log("Error : ", err);
			}
		};

		//TOOD add encoding
		Acts.prototype.Read = function (tag, path, encoding) {
			if (!runningElectron)
				return;
			var self = this;
			self.tag = tag;
			fs.readFile(path, encoding, function (err, data) {
				if (err) {
					lastReadedAsyncData = err.toString();
					self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnReadFail, self);
				}
				lastReadedAsyncData = data;
				self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnReadSuccess, self);
			});
		};

		Acts.prototype.DeleteSync = function (path) {
			if (!runningElectron)
				return;
			try {
				fs.unlinkSync(path);
			} catch (err) {
				console.log("Error : ", err);
			}
		};

		Acts.prototype.CreateSync = function (path) {
			if (!runningElectron)
				return;
			try {
				if (!fs.existsSync(path)) {
					fs.mkdirSync(path);
				}
			} catch (err) {
				console.log("Error : ", err);
			}
		};

		Acts.prototype.CreateFolder = function (path) {
			if (!runningElectron)
				return;
			try {
				if (!fs.existsSync(path)) {
					fs.mkdirSync(path);
				}
			} catch (err) {
				console.log("Error : ", err);
			}
		};

		Acts.prototype.ShowOpenDialog = function (title, default_path, button_label, filters, properties) {
			if (!runningElectron)
				return;
			var self = this;
			dialog.showOpenDialog({
				title      : title,
				defaultPath: default_path,
				buttonLabel: button_label, //filters:filters,
				properties : properties.split(",")
			}, function (files) {
				console.log(files);
				if (files.length > 0) {
					filesFolders = files;
					if (files.length === 1) {
						chosenpath = files[0];
					}
					self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnOpenDialogSuccess, self);
				} else {
					self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnOpenDialogFail, self);
				}
			});
		};

		Acts.prototype.ShowSaveDialog = function (title, default_path, button_label, filters) {
			if (!runningElectron)
				return;
			dialog.showSaveDialog({
				title      : title,
				defaultPath: default_path,
				buttonLabel: button_label, //filters: filters
			}, function (filepath) {
				if (filepath) self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnSaveDialogSuccess, self); else
					self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnSaveDialogSuccess, self);
			});
		};

		Acts.prototype.RunFile = function (path, args) {
			if (!runningElectron)
				return;
			var parameters = args.split(";");

			child(path, parameters, function (err, data) {
				console.log(err);
				console.log(data.toString());
			});
		};

		Acts.prototype.SetClipboardText = function (text, type) {
			if (!runningElectron)
				return;
			clipboard.writeText(text, type);
		};

		Acts.prototype.ClearClipboard = function (type) {
			if (!runningElectron)
				return;
			clipboard.clear(type);
		};

		Acts.prototype.OpenBrowser = function (url) {
			if (!runningElectron)
				return;
			shell.openExternal(url); //[, options, callback])
		};

		Acts.prototype.Exit = function () {
			if (!runningElectron)
				return;
			browserWindow.close();
		};

		Acts.prototype.Restart = function () {
			if (!runningElectron)
				return;
			browserWindow.reload();
		};

		Acts.prototype.Focus = function () {
			if (!runningElectron)
				return;
			browserWindow.focus();
		};

		Acts.prototype.Show = function () {
			if (!runningElectron)
				return;
			browserWindow.show();
		};

		Acts.prototype.Hide = function () {
			if (!runningElectron)
				return;
			browserWindow.hide();
		};

		Acts.prototype.WindowMinimize = function () {
			if (!runningElectron)
				return;
			browserWindow.minimize();
		};

		Acts.prototype.WindowMaximize = function () {
			if (!runningElectron)
				return;
			browserWindow.maximize();
		};

		Acts.prototype.WindowUnmaximize = function () {
			if (!runningElectron)
				return;
			browserWindow.unmaximize();
		};

		Acts.prototype.WindowRestore = function () {
			if (!runningElectron)
				return;
			browserWindow.restore();
		};

		Acts.prototype.Fullscreen = function (b) {
			if (!runningElectron)
				return;
			browserWindow.setFullScreen((b == 0));
		};

		Acts.prototype.SetWindowPosition = function (x, y, animate) {
			if (!runningElectron)
				return;
			browserWindow.setPosition(x, y, animate == 0);
		};

		Acts.prototype.SetWindowSize = function (width, heigth, animate) {
			if (!runningElectron)
				return;
			browserWindow.setSize(width, heigth, animate == 0);
		};

		Acts.prototype.SetWindowTitle = function (title) {
			if (!runningElectron)
				return;
			browserWindow.setTitle(title);
		};

		Acts.prototype.WindowSetResizable = function (resizable) {
			if (!runningElectron)
				return;
			browserWindow.setResizable(resizable === 0);
		};

		Acts.prototype.WindowSetMaxSize = function (width, height) {
			if (!runningElectron)
				return;
			browserWindow.setMinimumSize(width, height);
		};

		Acts.prototype.WindowSetMinSize = function (width, height) {
			if (!runningElectron)
				return;
			browserWindow.setMaximumSize(width, height);
		};

		Acts.prototype.WindowSetAlwaysOnTop = function (top) {
			if (!runningElectron)
				return;
			browserWindow.setAlwaysOnTop(top === 0);
		};

		Acts.prototype.WindowRequestAttention = function (flash) {
			if (!runningElectron)
				return;
			browserWindow.flashFrame(flash === 0);
		};

		Acts.prototype.SetTransparent = function () {
			if (!runningElectron)
				return;


			if (this.runtime.glwrap) {
				console.log("WebGL mode not supported on transparent games, fill an issue here : https://github.com/C2Electron/template/issues");
			}
			else
			{
				var c2canvasdiv = $("#c2canvasdiv");
				c2canvasdiv.css("background", "rgba(0, 0, 0, 0)");

				var c2canvas = document.getElementById('c2canvas');
				var ctx      = c2canvas.getContext('2d');

				ctx.fillStyle = "rgba(0, 0, 0, 0)";
			}

			$("html, body").css("background", "rgba(0, 0, 0, 0)");
		};

		Acts.prototype.ClickThrough = function (state) {
			if (!runningElectron)
				return;

			console.log("Stete :" + state);
			browserWindow.setIgnoreMouseEvents((state === 1));
		};

		Acts.prototype.ShowDevTools = function (state) {
			if (!runningElectron)
				return;

			browserWindow.openDevTools();
		};

		Acts.prototype.RegisterShortcut = function (accelerator, tag) {
			if (!runningElectron)
				return;

			var self = this;

			const ret = globalShortcut.register(accelerator, function () {
				self.tag         = tag;
				self.accelerator = accelerator;
				self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnShortcut, self);
			});

			if (!ret) {
				console.log('Registration of ' + accelerator + 'failed')
			}
			else
				console.log('Registration of ' + accelerator + ' succeed');
		};

		pluginProto.acts = new Acts();

		//////////////////////////////////////
		// Expressions
		// ret.set_float, ret.set_string, ret.set_any
		function Exps () {
		};

		/**
		 * NW.js
		 */
		Exps.prototype.AppFolder = function (ret) {
			if (!runningElectron)
				return;
			ret.set_string(__dirname);
		};

		Exps.prototype.UserFolder = function (ret) {
			if (!runningElectron)
				return;
			ret.set_string(remoteapp.getPath("home"));
		};

		Exps.prototype.ReadFile = function (ret, path, encoding) {
			if (!runningElectron)
				return;
			try {
				lastReadedSyncData = fs.readFileSync(path, "utf8");
				ret.set_any(lastReadedSyncData);
			} catch (err) {
				console.log("Error : ", err);
			}
		};

		//------------------------------------------------------------------------------------------------------------------
		Exps.prototype.FileSize = function (ret, path_) {
			if (!runningElectron)
				return;
			var size = 0;

			try {
				var stat = fs["statSync"](path_);
				if (stat) size = stat["size"] || 0;
			} catch (e) {
			}

			ret.set_int(size);
		};

		//------------------------------------------------------------------------------------------------------------------
		Exps.prototype.ListCount = function (ret) {
			if (!runningElectron)
				return;
			ret.set_int(filelist.length);
		};

		//------------------------------------------------------------------------------------------------------------------
		Exps.prototype.ListAt = function (ret, index) {
			if (!runningElectron)
				return;
			index = Math.floor(index);

			if (index < 0 || index >= filelist.length) ret.set_string(""); else
				ret.set_string(filelist[index]);
		};

		Exps.prototype.DroppedFileName = function (ret) {
			if (!runningElectron)
				return;
			ret.set_string(currectDroppedFile.name);
		};

		Exps.prototype.DroppedFileSize = function (ret) {
			if (!runningElectron)
				return;
			ret.set_string(currectDroppedFile.size);
		};

		Exps.prototype.DroppedFilePath = function (ret) {
			if (!runningElectron)
				return;
			ret.set_string(currectDroppedFile.path);
		};

		Exps.prototype.ChosenPath = function (ret) {
			if (!runningElectron)
				return;
			ret.set_string(chosenpath);
		};

		Exps.prototype.WindowX = function (ret) {
			if (!runningElectron)
				return;
			ret.set_int(browserWindow.getBounds().x);
		};

		Exps.prototype.WindowY = function (ret) {
			if (!runningElectron)
				return;
			ret.set_int(browserWindow.getBounds().y);
		};

		Exps.prototype.WindowWidth = function (ret) {
			if (!runningElectron)
				return;
			ret.set_int(browserWindow.getBounds().width);
		};

		Exps.prototype.WindowHeight = function (ret) {
			if (!runningElectron)
				return;
			ret.set_int(browserWindow.getBounds().height);
		};

		Exps.prototype.WindowTitle = function (ret) {
			if (!runningElectron)
				return;
			ret.set_string(browserWindow.getTitle());
		};

		Exps.prototype.ClipboardText = function (ret) {
			if (!runningElectron)
				return;
			ret.set_string(clipboard.readText());
		};

		/**
		 * Custom
		 */

		Exps.prototype.GetAppPath = function (ret) {
			if (!runningElectron)
				return;
			ret.set_string(remoteapp.getAppPath());
		};

		Exps.prototype.GetLocale = function (ret) {
			if (!runningElectron)
				return;
			ret.set_string(remoteapp.getLocale());
		};

		Exps.prototype.GetOSArch = function (ret) {
			if (!runningElectron)
				return;
			ret.set_string(os.arch());
		};

		Exps.prototype.GetOSHomedir = function (ret) {
			if (!runningElectron)
				return;
			ret.set_string(os.homedir());
		};

		Exps.prototype.GetOSHostname = function (ret) {
			if (!runningElectron)
				return;
			ret.set_string(os.hostname());
		};

		Exps.prototype.GetOSPlatform = function (ret) {
			if (!runningElectron)
				return;
			ret.set_string(os.platform());
		};

		Exps.prototype.GetAppDataPath = function (ret) {
			if (!runningElectron)
				return;
			ret.set_string(remoteapp.getPath("appData"));
		};

		Exps.prototype.GetUserDataPath = function (ret) {
			if (!runningElectron)
				return;
			ret.set_string(remoteapp.getPath("userData"));
		};

		Exps.prototype.GetExePath = function (ret) {
			if (!runningElectron)
				return;
			ret.set_string(remoteapp.getPath("exe"));
		};

		Exps.prototype.GetDesktopPath = function (ret) {
			if (!runningElectron)
				return;
			ret.set_string(remoteapp.getPath("desktop"));
		};

		Exps.prototype.GetDocumentsPath = function (ret) {
			if (!runningElectron)
				return;
			ret.set_string(remoteapp.getPath("documents"));
		};

		Exps.prototype.GetDownloadsPath = function (ret) {
			if (!runningElectron)
				return;
			ret.set_string(remoteapp.getPath("downloads"));
		};

		Exps.prototype.GetMusicPath = function (ret) {
			if (!runningElectron)
				return;
			ret.set_string(remoteapp.getPath("music"));
		};

		Exps.prototype.GetPicturesPath = function (ret) {
			if (!runningElectron)
				return;
			ret.set_string(remoteapp.getPath("pictures"));
		};

		Exps.prototype.GetVideoPath = function (ret) {
			if (!runningElectron)
				return;
			ret.set_string(remoteapp.getPath("videos"));
		};

		Exps.prototype.GetTempPath = function (ret) {
			if (!runningElectron)
				return;
			ret.set_string(remoteapp.getPath("temp"));
		};

		Exps.prototype.LastReadAsync = function (ret) {
			if (!runningElectron)
				return;
			ret.set_any(lastReadedAsyncData);
		};

		Exps.prototype.CurrentFileFolder = function (ret) {
			if (!runningElectron)
				return;
			ret.set_any(currentFileFolder);
		};

		Exps.prototype.CurrentOpenedFileFolder = function (ret) {
			if (!runningElectron)
				return;
			ret.set_any(currentOpenedFileFolder);
		};

		function getFilesizeInBytes (filename) {
			if (!runningElectron)
				return;
			var stats = fs.statSync(filename);
			return stats["size"];
		}

		Exps.prototype.FileSize = function (ret, path) {
			if (!runningElectron)
				return;
			ret.set_any(getFilesizeInBytes(path));
		};

		//TODO
		Exps.prototype.FileFolderCount = function (ret, path) {
			if (!runningElectron)
				return;
			var items = fs.readdirSync(path, 'utf8');
			ret.set_any(items.length);
		};

		Exps.prototype.Exists = function (ret, path) {
			if (!runningElectron)
				return;
			try {
				var access = fs.accessSync(path, fs.F_OK);
				console.log("Access : ", access);
				ret.set_int(access);
			} catch (e) {
				ret.set_int(0);
			}
		};

		Exps.prototype.CurrentArg = function (ret) {
			if (!runningElectron)
				return;
			ret.set_any(currentArg);
		};

		pluginProto.exps = new Exps();

	}()
);
