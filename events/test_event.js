module.exports = {

//---------------------------------------------------------------------
// Event Name
//
// This is the name of the event displayed in the editor.
//---------------------------------------------------------------------

name: "Test Custom Event",

//---------------------------------------------------------------------
// Is Event
//
// Must be true for this to be an event.
//---------------------------------------------------------------------

isEvent: true,

//---------------------------------------------------------------------
// Event Variables
//
// The variables associated with this event. Can only have 0, 1, or 2.
//---------------------------------------------------------------------

fields: ["Temp Variable Name 1", "Temp Variable Name 2"],

//---------------------------------------------------------------------
// Action Bot Mod
//
// Upon initialization of the bot, this code is run. Using the bot's
// DBM namespace, one can add/modify existing functions if necessary.
// In order to reduce conflictions between mods, be sure to alias
// functions you wish to overwrite.
//
// This is absolutely necessary for custom event triggers since it
// allows us to setup callbacks for the necessary events we would
// like to be notified about.
//
// The client object can be retrieved from: `const bot = DBM.Bot.bot;`
// Classes can be retrieved also using it: `const { Actions, Event } = DBM;`
//---------------------------------------------------------------------

mod: function(DBM) {

	// Let's make our own namespace like the chads we are.
	DBM.Test_Event = DBM.Test_Event || {};

	// This function calls all events that use this trigger.
	DBM.Test_Event.callAllEvents = function() {
		// Grab them classes from the DBM namespace.
		const { Bot, Actions } = DBM;

		// Get all events that use this custom event trigger.
		const events = Bot.$evts["Test Custom Event"];

		// Ensure there are any.
		// If the user did not create any events with this trigger, this will be null.
		if(!events) return;

		// Call each one.
		for(let i = 0; i < events.length; i++) {
			const event = events[i];

			// Allocate the "temporary" variables object.
			const temp = {};

			// If the event has any "temporary variable" names, they can be found under "temp" and "temp2".
			// Store whatever information is necessary.
			// For example, we are storing the number 10 in the first temp variable, and 20 in the second if they exist.
			if(event.temp) temp[event.temp] = 10;
			if(event.temp2) temp[event.temp2] = 20;

			// If possible, store the Discord server this event's context will run in.
			// (For example, the "guildMemberAdd" Bot Client Event provides a GuildMember that contains the "Guild" or Server object).
			const server = null;

			// Call the actions stored in the event.
			Actions.invokeEvent(event, server, temp);
		}
	};

	// Call the function in some sort of callback.
	// For example:
	//
	// DBM.Bot.bot.on('messageReactionAdd', DBM.Test_Event.callAllEvents);
	// 
	// or:
	//
	// setTimeout(DBM.Test_Event.callAllEvents, 2000);

	// This message will appear in the console if this mod is installed successfully at runtime.
	// console.log("Test Event registered!");
}

}; // End of module