module.exports = {

//---------------------------------------------------------------------
// Editor Extension Name
//
// This is the name of the editor extension displayed in the editor.
//---------------------------------------------------------------------

name: "Test Extension",

//---------------------------------------------------------------------
// Is Command Extension
//
// Must be true to appear in "command" context menu.
// This means each "command" will hold its own copy of this data.
//---------------------------------------------------------------------

isCommandExtension: true,

//---------------------------------------------------------------------
// Is Event Extension
//
// Must be true to appear in "event" context menu.
// This means each "event" will hold its own copy of this data.
//---------------------------------------------------------------------

isEventExtension: true,

//---------------------------------------------------------------------
// Is Editor Extension
//
// Must be true to appear in the main editor context menu.
// This means there will only be one copy of this data per project.
//---------------------------------------------------------------------

isEditorExtension: true,

//---------------------------------------------------------------------
// Extension Fields
//
// These are the fields for the extension. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the command's/event's JSON data.
//---------------------------------------------------------------------

fields: ["input1", "input2"],

//---------------------------------------------------------------------
// Default Fields
//
// The default values of the fields.
//---------------------------------------------------------------------

defaultFields: {
	input1: 0,
	input2: 0
},

//---------------------------------------------------------------------
// Extension Dialog Size
//
// Returns the size of the extension dialog.
//---------------------------------------------------------------------

size: function() {
	return { width: 300, height: 170 };
},

//---------------------------------------------------------------------
// Extension HTML
//
// This function returns a string containing the HTML used for
// the context menu dialog.
//---------------------------------------------------------------------

html: function(data) {
	return `
	<div style="padding: 10px 10px 10px 10px;">
		Input 1:<br>
		<input id="input1" class="round" type="text" value=${data.input1} style="width: 270px"><br>
		Input 2:<br>
		<input id="input2" class="round" type="text" value=${data.input2} style="width: 270px"><br>
	</div>`
},

//---------------------------------------------------------------------
// Extension Dialog Init Code
//
// When the HTML is first applied to the extension dialog, this code
// is also run. This helps add modifications or setup reactionary
// functions for the DOM elements.
//---------------------------------------------------------------------

init: function() {
},

//---------------------------------------------------------------------
// Extension Dialog Close Code
//
// When the dialog is closed, this is called. Use it to save the data.
//---------------------------------------------------------------------

close: function(document, data) {
	data.input1 = parseInt(document.getElementById("input1").value);
	data.input2 = parseInt(document.getElementById("input2").value);
},

//---------------------------------------------------------------------
// Extension On Load
//
// If an extension has a function for "load", it will be called
// whenever the editor loads data.
//
// The "DBM" parameter is the global variable. Store loaded data within it.
//---------------------------------------------------------------------

load: function(DBM, projectLoc) {
	let txt = "{}";
	const filepath = require('path').join(projectLoc, 'data', 'thisistest.json');
	if(require('fs').existsSync(filepath)) {
		txt = require('fs').readFileSync(filepath).toString();
	}
	DBM.__myCustomData = JSON.parse(txt);
},

//---------------------------------------------------------------------
// Extension On Save
//
// If an extension has a function for "save", it will be called
// whenever the editor saves data.
//
// The "data" parameter contains all data. Use this to modify
// the data that is saved. The properties correspond to the
// data file names:
//
//  - data.commands
//  - data.settings
// etc...
//---------------------------------------------------------------------

save: function(DBM, data, projectLoc) {
	if(!DBM.__myCustomData) return;
	if(!DBM.__myCustomData.number) DBM.__myCustomData.number = 0;
	DBM.__myCustomData.number++;
	data.thisistest = DBM.__myCustomData;
},

//---------------------------------------------------------------------
// Editor Extension Bot Mod
//
// Upon initialization of the bot, this code is run. Using the bot's
// DBM namespace, one can add/modify existing functions if necessary.
// In order to reduce conflictions between mods, be sure to alias
// functions you wish to overwrite.
//
// This is absolutely necessary for editor extensions since it
// allows us to setup modifications for the necessary functions
// we want to change.
//
// The client object can be retrieved from: `const bot = DBM.Bot.bot;`
// Classes can be retrieved also using it: `const { Actions, Event } = DBM;`
//---------------------------------------------------------------------

mod: function(DBM) {

	// Let's make our own namespace like the chads we are.
	DBM.Test_Context = DBM.Test_Context || {};

	// Modify "Actions.preformActions" function without losing original code.
	DBM.Test_Context._Actions_preformActions = DBM.Actions.preformActions;
	DBM.Actions.preformActions = function(msg, cmd) {

		// Get "customData" from command or event.
		const customData = cmd.customData;

		// Get the data unique to this extension.
		const data = customData ? customData["Test Extension"] : null;

		// Do something with the data.
		// For example:
		//
		// if(data.input1 == 20) return; // do not run the command

		// console.log(`Data for "${cmd.name}" command is: ${JSON.stringify(data)}`);

		// Call original function
		DBM.Test_Context._Actions_preformActions.apply(this, arguments);
	}

	// console.log("Test Editor Extension registered!");
}

}; // End of module