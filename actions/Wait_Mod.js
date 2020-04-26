module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Wait Mod",

//---------------------------------------------------------------------
// Action Section
//
// This is the section the action will fall into.
//---------------------------------------------------------------------

section: "Other Stuff",

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
	const measurements = ['Miliseconds', 'Seconds', 'Minutes', 'Hours', 'Days', 'Weeks', 'Months (30 Days)', 'Years (365 Days)', '(Time)s/m/d'];
	return `${data.time} ${measurements[parseInt(data.measurement)]}`;
},

	author: "Alon",

	version: "1.0.0",

	short_description: "Wait mod with more functions!",

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["time", "measurement"],

//---------------------------------------------------------------------
// Command HTML
//
// This function returns a string containing the HTML used for
// editting actions. 
//
// The "isEvent" parameter will be true if this action is being used
// for an event. Due to their nature, events lack certain information, 
// so edit the HTML to reflect this.
//
// The "data" parameter stores constants for select elements to use. 
// Each is an array: index 0 for commands, index 1 for events.
// The names are: sendTargets, members, roles, channels, 
//                messages, servers, variables
//---------------------------------------------------------------------

html: function(isEvent, data) {
	return `
<div>
<p>
This Wait Mod : 
</p>
<p>
Created By : 𝑨𝒍𝒐𝒏 - 𝑮𝒂𝒎𝒊𝒏𝒈𝑷𝒍𝒖𝒔𝑷𝒍𝒖𝒔#9050
</p>
	<div style="float: left; width: 45%;">
		Measurement:<br>
		<select id="measurement" class="round">
			<option value="0">Miliseconds</option>
			<option value="1" selected>Seconds</option>
			<option value="2">Minutes</option>
			<option value="3">Hours</option>
			<option value="4">Days</option>
			<option value="5">Weeks</option>
			<option value="6">Months (30 Days)</option>
			<option value="7">Years (365 Days)</option>
			<option value="8">(Time)s/m/d  ( Write Number Of Parameter )</option>
		</select>
	</div>
	<div style="float: right; width: 50%;">
		Amount:<br>
		<input id="time" class="round" type="text">
	</div>
	<p>
	(Time)s/m/d : 
	</p>
	<p>
	s = Seconds
	</p>
	<p>
	m = Minutes
	</p>
	<p>
	d = Days
	</p>
</div>`
},

//---------------------------------------------------------------------
// Action Editor Init Code
//
// When the HTML is first applied to the action editor, this code
// is also run. This helps add modifications or setup reactionary
// functions for the DOM elements.
//---------------------------------------------------------------------

init: function() {
},

//---------------------------------------------------------------------
// Action Bot Function
//
// This is the function for the action within the Bot's Action class.
// Keep in mind event calls won't have access to the "msg" parameter, 
// so be sure to provide checks for variable existance.
//---------------------------------------------------------------------

action: function(cache) {
	const data = cache.actions[cache.index];
	const msg = cache.msg;
	const time = parseInt(this.evalMessage(data.time, cache));
	const type = parseInt(data.measurement);
	const separator = this.getDBM().Files.data.settings.separator || '\\s+';
	var WrexMODS = this.getWrexMods();
	const ms = WrexMODS.require('ms');
	switch(type) {
		case 0:
			setTimeout(this.callNextAction.bind(this, cache), time);
			break;
		case 1:
			setTimeout(this.callNextAction.bind(this, cache), time * 1000);
			break;
		case 2:
			setTimeout(this.callNextAction.bind(this, cache), time * 1000 * 60);
			break;
		case 3:
			setTimeout(this.callNextAction.bind(this, cache), time * 1000 * 60 * 60);
			break;
			case 4:
			setTimeout(this.callNextAction.bind(this, cache), time * 1000 * 60 * 60 * 24);
			break;
			case 5:
			setTimeout(this.callNextAction.bind(this, cache), time * 1000 * 60 * 60 * 24 * 7);
			break;
			case 6:
			setTimeout(this.callNextAction.bind(this, cache), time * 1000 * 60 * 60 * 24 * 30);
			break;
			case 7:
			setTimeout(this.callNextAction.bind(this, cache), time * 1000 * 60 * 60 * 24 * 365);
			break;
			case 8:
			if(msg && msg.content) {
				const params = msg.content.split(new RegExp(separator));
				source = params[time] || '';
			}
			setTimeout(this.callNextAction.bind(this, cache), ms(source));
			break;
		default:
			this.callNextAction(cache);
	}
},

//---------------------------------------------------------------------
// Action Bot Mod
//
// Upon initialization of the bot, this code is run. Using the bot's
// DBM namespace, one can add/modify existing functions if necessary.
// In order to reduce conflictions between mods, be sure to alias
// functions you wish to overwrite.
//---------------------------------------------------------------------

mod: function(DBM) {
}

}; // End of module