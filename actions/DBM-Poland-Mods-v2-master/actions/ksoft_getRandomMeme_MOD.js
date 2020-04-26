module.exports = {

    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------
    
    name: "Ksoft Random Meme Command",
    
    //---------------------------------------------------------------------
    // Action Section
    //
    // This is the section the action will fall into.
    //---------------------------------------------------------------------
    
    section: "Quick Commands",
    
    //---------------------------------------------------------------------
    // Action Subtitle
    //
    // This function generates the subtitle displayed next to the name.
    //---------------------------------------------------------------------
    
    subtitle: function(data) {
        return `Ksoft Random Meme Command`;
    },
    
    //---------------------------------------------------------------------
         // DBM Mods Manager Variables (Optional but nice to have!)
         //
         // These are variables that DBM Mods Manager uses to show information
         // about the mods for people to see in the list.
         //---------------------------------------------------------------------
    
         // Who made the mod (If not set, defaults to "DBM Mods")
         author: "_iTrqPss",
    
         // The version of the mod (Defaults to 1.0.0)
         version: "1.0.1",
    
         // A short description to show on the mod line for this mod (Must be on a single line)
         short_description: "Get random meme from ksoft them return it in an embed",
    
         // If it depends on any other mods by name, ex: WrexMODS if the mod uses something from WrexMods
    
    
         //---------------------------------------------------------------------
    
    //---------------------------------------------------------------------
    // Action Fields
    //
    // These are the fields for the action. These fields are customized
    // by creating elements with corresponding IDs in the HTML. These
    // are also the names of the fields stored in the action's JSON data.
    //---------------------------------------------------------------------
    
    fields: ["key"],
    
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
                <u>Mod Info:</u><br>
                Created by _iTrqPss<br>
                Single action command that will return a random meme from ksoft in an embed!
            </p>
            <textarea id="key" rows="2" placeholder="Write your key. Get one from Ksoft" style="width: 95%; font-family: monospace; white-space: nowrap; resize: none;"></textarea>
            <p>You can get an api key here:
            https://api.ksoft.si</p>
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
        const {glob, document} = this;
    },
    
    //---------------------------------------------------------------------
    // Action Bot Function
    //
    // This is the function for the action within the Bot's Action class.
    // Keep in mind event calls won't have access to the "msg" parameter,
    // so be sure to provide checks for variable existance.
    //---------------------------------------------------------------------
    
    action: function(cache) {
        const d = require('discord.js');
        var _this = this;
        const WrexMODS = _this.getWrexMods();
        WrexMODS.CheckAndInstallNodeModule('ksoft.js');
        const msg = cache.msg;
        const data = cache.actions[cache.index];
        const key = this.evalMessage(data.key, cache);
        if (!key) return console.log("Please get your key from Ksoft and write it in the field.");
        const Ksoft = require("ksoft.js");
        const ksoft = new Ksoft(key);

        ksoft.images.getRandomMeme()
        .then(res => {
        msg.channel.send(new d.RichEmbed()
        .setColor('36393E')
        .setImage(res.image_url)
        .setTitle(res.title)
        .setFooter('Ksoft.Si')
            );
        })      
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
    
