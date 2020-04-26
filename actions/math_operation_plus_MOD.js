module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Math Operation Plus",

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
	const info = ['Addition', 'Subtraction', 'Multiplication', 'Division', 'Round', 'Round to S.F.', 'Floating point rounding (32-bit precision)', 'Absolute Value', 'Ceiling', 'Floor', 'Factorial', 'Double Factorial', 'Raised by (Exponents)', 'Rooted by (Roots)', 'Sine', 'Cosine', 'Tangent', 'Arc Sine', 'Arc Cosine', 'Arc Tangent', 'Arc Sine (Hyperbolic)', 'Arc Cosine (Hyperbolic)', 'Arc Tangent (Hyperbolic)', 'Calculate Angle between (Radians)', '% Of Number', 'Increase By %', 'Decrease By %', 'Log', 'Natural Log 10 Value', 'Lower of two numbers', 'Bigger of two numbers', 'Exponent of e minus 1', 'Is number positive or negative?', 'Truncate number to X places', 'Value of LN2', 'Value of Log2E', 'Value of Log10E', 'Value of Pi', 'Value of Tau', 'Value of Eulers number', '32-bit Integer Max Value', '64-bit Integer Max Value', 'Infinity'];
	return `${info[data.info]}`;
},
	
//---------------------------------------------------------------------
// DBM Mods Manager Variables (Optional but nice to have!)
//
// These are variables that DBM Mods Manager uses to show information
// about the mods for people to see in the list.
//---------------------------------------------------------------------

// Who made the mod (If not set, defaults to "DBM Mods")
author: "Hexeract",

// The version of the mod (Defaults to 1.0.0)
version: "1.9.3",

// A short description to show on the mod line for this mod (Must be on a single line)
short_description: "Performs a wide variety of math operations",

// If it depends on any other mods by name, ex: WrexMODS if the mod uses something from WrexMods

//---------------------------------------------------------------------
// Action Storage Function
//
// Stores the relevant variable info for the editor.
//---------------------------------------------------------------------

variableStorage: function (data, varType) {
	const type = parseInt(data.storage);
	if (type !== varType) return;
	let dataType = 'Number';
	return ([data.varName, dataType]);
},

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["FirstNumber", "info", "SecondNumber", "storage", "varName"],

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
			Originally created by Hexeract; Extended and improved by CoolGuy<br>
		</p>
	</div><br>
<div id="FirstNum" style="width: 90%;">
	First Number:<br>
	<input id="FirstNumber" class="round" type="text">
</div><br>
<div style="padding-top: 8px; width: 60%;">
	Math Operation:
	<select id="info" class="round" onchange="glob.onChange1(this)">
			<option value="0" selected>Addition</option>
			<option value="1">Subtraction</option>
			<option value="2">Multiplication</option>
			<option value="3">Division</option>
			<option value="4">Round</option>
			<option value="5">Round to S.F.</option>
			<option value="6">Floating point rounding (32-bit precision)</option>
			<option value="7">Absolute Value</option>
			<option value="8">Ceiling</option>
			<option value="9">Floor</option>
			<option value="10">Factorial</option>
			<option value="11">Double Factorial</option>
			<option value="12">Raised by (Exponents)</option>
			<option value="13">Rooted by (Roots)</option>
			<option value="14">Sine</option>
			<option value="15">Cosine</option>
			<option value="16">Tangent</option>
			<option value="17">Arc Sine</option>
			<option value="18">Arc Cosine</option>
			<option value="19">Arc Tangent</option>
			<option value="20">Arc Sine (Hyperbolic)</option>
			<option value="21">Arc Cosine (Hyperbolic)</option>
			<option value="22">Arc Tangent (Hyperbolic)</option>
			<option value="23">Calculate Angle between (Radians)</option>
			<option value="24">% Of Number</option>
			<option value="25">Increase Number By %</option>
			<option value="26">Decrease Number By %</option>
			<option value="27">Log</option>
			<option value="28">Natural Log 10 Value</option>
			<option value="29">Lower of two numbers</option>
			<option value="30">Bigger of two numbers</option>
			<option value="31">Exponent of e, minus 1</option>
			<option value="32">Is number positive or negative?</option>
			<option value="33">Truncate number to X places</option>
			<option value="34">Convert Degrees to Radians</option>
			<option value="35">Convert Radians to Degrees</option>
			<option value="36">Value of LN2</option>
			<option value="37">Value of Log2E</option>
			<option value="38">Value of Log10E</option>
			<option value="39">Value of Pi</option>
			<option value="40">Value of Tau</option>
			<option value="41">Value of Eulers number</option>
			<option value="42">32-bit Integer Max Value</option>
			<option value="43">64-bit Integer Max Value</option>
			<option value="44">Infinity</option>
	</select>
</div><br>
<div id="SecondNum" style="width: 90%;">
	Second Number:<br>
	<input id="SecondNumber" class="round" type="text">
</div><br>
<div style="padding-top: 8px;">
	<div style="float: left; width: 35%;">
		Store In:<br>
		<select id="storage" class="round">
			${data.variables[1]}
		</select>
	</div>
	<div id="varNameContainer" style="float: right; width: 60%;">
		Variable Name:<br>
		<input id="varName" class="round" type="text">
	</div>
</div>
	`
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

    glob.onChange1 = function(event) {
        const value = parseInt(event.value);
        const dom = document.getElementById('SecondNum');
		const dom2 = document.getElementById('FirstNum');
        const domtext = document.getElementById('SecondNumber');
		const dom2text = document.getElementById('FirstNumber');
		const dom2full = `<div id="FirstNum" style="width: 90%;">
	First Number:<br>
	<input id="FirstNumber" class="round" type="text">
</div>`
        const dom1full = `<div id="SecondNum" style="width: 90%;">
	Second Number:<br>
	<input id="SecondNumber" class="round" type="text">
</div>`
        if (value == 0) {
            dom.style.display = null;
          
        } else if (value == 1 || value == 2 || value == 3) {
		    dom.style.display = null;
			dom.innerHTML = dom1full;
			dom2.style.display = null;
			dom2.innerHTML = dom2full;
		} else if (value == 4) {
		    dom.style.display = null;
			dom.innerHTML = "";
			dom2.style.display = null;
			dom2.innerHTML = `<div id="FirstNum" style="width: 90%;">
	Main Number:<br>
	<input id="FirstNumber" class="round" type="text">
</div>`;
		} else if (value == 5) {
		    dom.style.display = null;
			dom.innerHTML = `<div id="SecondNum" style="width: 90%;">
	Round to this many decimal places:<br>
	<input id="FirstNumber" class="round" type="text">
</div>`;
			dom2.style.display = null;
			dom2.innerHTML = `<div id="FirstNum" style="width: 90%;">
	Main Number:<br>
	<input id="FirstNumber" class="round" type="text">
</div>`;
		} else if (value == 6 || value == 7 || value == 8 || value == 9 || value == 10 || value == 11) {
		    dom.style.display = null;
			dom.innerHTML = "";
			dom2.innerHTML = `<div id="FirstNum" style="width: 90%;">
	Number:<br>
	<input id="FirstNumber" class="round" type="text">
</div>`;
		} else if (value == 12) {
		    dom.style.display = null;
		    dom.innerHTML = `<div id="SecondNum" style="width: 90%;">
	Exponent:<br>
	<input id="FirstNumber" class="round" type="text">
</div>`;
			dom2.innerHTML = `<div id="FirstNum" style="width: 90%;">
	Main Number:<br>
	<input id="FirstNumber" class="round" type="text">
</div>`;
		} else if (value == 13) {
			dom2.style.display = null;
			dom2.innerHTML = `<div id="FirstNum" style="width: 90%;">
	Main Number:<br>
	<input id="FirstNumber" class="round" type="text">
</div>`;
		    dom.style.display = null;
		    dom.innerHTML = `<div id="SecondNum" style="width: 90%;">
	Root Power (Ex: 2 for square root):<br>
	<input id="SecondNumber" class="round" type="text">
</div>`;
		} else if (value == 14 || value == 15 || value == 16 || value == 17 || value == 18 || value == 19 || value == 20 || value == 21 || value == 22) {
		    dom.innerHTML = "";
			dom2.innerHTML = `<div id="FirstNum" style="width: 90%;">
	Number:<br>
	<input id="FirstNumber" class="round" type="text">
</div>`;
		} else if (value == 23) {
		    dom.style.display = null;
		    dom.innerHTML = `<div id="SecondNum" style="width: 90%;">
	Second angle (No degree sign):<br>
	<input id="SecondNumber" class="round" type="text">
</div>`;
			dom2.innerHTML = `<div id="FirstNum" style="width: 90%;">
	First angle (No degree sign):<br>
	<input id="FirstNumber" class="round" type="text">
</div>`;
		} else if (value == 24 || value == 25 || value == 26) {
		    dom.style.display = null;
		    dom.innerHTML = `<div id="SecondNum" style="width: 90%;">
	Percentage (No % sign. Entering 35 means 35%):<br>
	<input id="SecondNumber" class="round" type="text">
</div>`;
		    dom2.style.display = null;
			dom2.innerHTML = `<div id="FirstNum" style="width: 90%;">
	Main Number:<br>
	<input id="FirstNumber" class="round" type="text">
</div>`;
		} else if (value == 27) {
		    dom.style.display = null;
		    dom.innerHTML = `<div id="SecondNum" style="width: 90%;">
	Log Base (Entering nothing defaults to 10):<br>
	<input id="SecondNumber" class="round" type="text">
</div>`;
		    dom2.style.display = null;
			dom2.innerHTML = `<div id="FirstNum" style="width: 90%;">
	Main Log Number:<br>
	<input id="FirstNumber" class="round" type="text">
</div>`;
		} else if (value == 28) {
		    dom.innerHTML = "";
		    dom2.innerHTML = "";
		} else if (value == 29 || value == 30) {
		    dom.style.display = null;
		    dom.innerHTML = dom1full;
		    dom2.style.display = null;
			dom2.innerHTML = dom2full;
		} else if (value == 31) {
		    dom.style.display = null;
			dom.innerHTML = "";
		    dom.style.display = null;
			dom2.innerHTML = `<div id="FirstNum" style="width: 90%;">
	Exponent:<br>
	<input id="FirstNumber" class="round" type="text">
</div>`;
		} else if (value == 32) {
			dom.textContent = "Returns \"positive\" if the number is positive and \"negative\" if the number is negative (without quotes). Zero is still positive.";
			dom2.innerHTML = `<div id="FirstNum" style="width: 90%;">
	Number:<br>
	<input id="FirstNumber" class="round" type="text">
</div>`;
		} else if (value == 33) {
		    dom.style.display = null;
			dom.innerHTML = `<div id="SecondNum" style="width: 90%;">
	Number of places (Entering nothing defaults to getting rid of all decimals):<br>
	<input id="SecondNumber" class="round" type="text">
</div>`;
		    dom.style.display = null;
			dom2.innerHTML = `<div id="FirstNum" style="width: 90%;">
	Main Number:<br>
	<input id="FirstNumber" class="round" type="text">
</div>`;
		} else if (value == 34 || value == 35) {
		    dom.style.display = null;
		    dom.innerHTML = "";
		    dom2.style.display = null;
			dom2.innerHTML = `<div id="FirstNum" style="width: 90%;">
	Number to Convert:<br>
	<input id="FirstNumber" class="round" type="text">
</div>`;
		} else if (value == 36 || value == 37 || value == 38 || value == 39 || value == 40 || value == 41 || value == 42 || value == 43 || value == 44) {
		    dom2.style.display = null;
			dom2.innerHTML = "";	
		    dom.style.display = null;
		    dom.innerHTML = "";
		} else if (value > 44) {
		    dom.style.display = null;
		    dom.innerHTML = "";
		    dom2.style.display = null;
			dom2.innerHTML = "";
		} else {
            dom.style.display = 'none';
		}
		
		`legacy code leftover just in case
		if (value < 38) {
			dom2.style.display = null;
               	   
        } else {
			dom2.style.display = 'none';
			dom.innerHTML = "";
			dom2.innerHTML = "";
		}
		`
    };
	glob.onChange1(document.getElementById('info'));

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
	const storage = parseInt(data.storage);
	const varName = this.evalMessage(data.varName, cache);
	const FN = parseFloat(this.evalMessage(data.FirstNumber, cache).replace(/,/g, ''));
	const SN = parseFloat(this.evalMessage(data.SecondNumber, cache).replace(/,/g, ''));
	const info = parseInt(data.info);

	let result;
	switch(info) {
		case 0:
			result = FN + SN;
			break;
		case 1:
			result = FN - SN;
			break;
		case 2:
			result = FN * SN;
			break;
		case 3:
			result = FN / SN;
			break;
		case 4:
			result = Math.round(FN);
			break;
		case 5:
		    result = FN.toPrecision(SN);
			break;
		case 6:
			result = Math.fround(FN);
			break;
		case 7:
			result = Math.abs(FN);
			break;
		case 8:
		    result = Math.ceil(FN);
			break;
		case 9:
		    result = Math.floor(FN);
			break;
		case 10:
		    function fact(x) {
                  	if(x == 0) {
                    	return 1;
                  	}
                  	if(x < 0 ) {
                    	return undefined;
                  	}
                  	for(var i = x; --i; ) {
                    	x *= i;
                  	}
                  	return x;
                  	}
			result = fact(FN);
			break;
		case 11:
		    function dblfact(x) {
                  	if(x == 0 || x == 1) {
                    	   return 1;
                  	}
                  	if(x < 0 ) {
                    	   return undefined;
                  	}
			for(var i = x; i = i-2; ) {
                    	   x *= i;
                  	   return x;
            		}
			}
			result = dblfact(FN);
			break;
		case 12:
		    result = Math.pow(FN, SN);
			break;
		case 13:
		    PO = 1 / SN
		    result = Math.pow(FN, SN);
			break;
		case 14:
		    result = Math.sin(FN);
			break;
		case 15:
			result = Math.cos(FN);
			break;
		case 16:
			result = Math.tan(FN);
			break;
		case 17:
			result = Math.asin(FN);
			break;
		case 18:
			result = Math.acos(FN);
			break;
		case 19:
			result = Math.atan(FN);
			break;
		case 20:
			result = Math.asinh(FN);
			break;
		case 21:
			result = Math.acosh(FN);
			break;
		case 22:
			result = Math.atanh(FN);
			break;
		case 23:
			function calcAngleDegrees(x, y) {
				return Math.atan2(y, x) * 180 / Math.PI;
			}
			result = calcAngleDegrees(FN, SN);
			break;
		case 24:
		`	old code
			PN = FN * SN;
			result = PN / 100;
		`
			result = FN * (SN / 100);
			break;
		case 25:
		`	old code
		    PN = FN * SN;
			result = PN / 100 + FN;
		`
			result = FN * (1 + (SN / 100));
			break;
		case 26:
		`	old code
		    DN = 100 - SN;
			PN = FN * DN;
			result = PN / 100;
		`
			if (SN > 100) {
				result = 0;
				break;
			}
			if (SN < 0) {
				PN = Math.Absolute(SN) / 100;
				
				result = FN * (1 + PN);
				break;
			}
			result = FN * (SN / 100);
			break;
		case 27:
		    if (SN == null || SN === null || SN == "") {
			SN = 10;
			}
			function getBaseLog(x, y) {
				return Math.log(y) / Math.log(x);
			}
			result = getBaseLog(FN, SN);
			break;
		case 28:
		    function getNatLog10() {
				return Math.LN10;
			}
			result = getNatLog10();
			break;
		case 29:
			result = Math.min(FN, SN);
			break;
		case 30:
			result = Math.max(FN, SN);
			break;
		case 31:
			result = Math.expm1(FN);
			break;
		case 32:
			function PosORneg(x) {
                if(x == 0) {
                    return "positive";
                }
                if(x < 0 ) {
                    return "negative";
                }
                if(x > 0 ) {
                    return "positive";
                }
            }
			result = PosORneg(FN);
			break;
		case 33:
			if (SN == null || SN === null || SN == "" || SN == " ") {
			result = Math.trunc(FN);
			break;
			}
			PN = FN.toString();
			if (PN.length <= SN) {
				result = FN;
				break;
			}
			if (SN <= 0) {
			FN = Math.abs(FN);
			result = DN = PN.substr(FN);
			break;
			}
			DN = PN.substr(0,PN.length-SN);
			result = DN;
			break;
		case 34:
			result = FN * (Math.Pi / 180);
			break;
		case 35:
			result = FN * (180 / Math.Pi);
			break;
		case 36:
			result = Math.LN2;
			break;
		case 37:
			result = Math.LOG2E;
			break;
		case 38:
			result = Math.LOG10E;
			break;
		case 39:
		    result = Math.PI;
			break;
		case 40:
		    result = Math.PI * 2;
			break;
		case 41:
		    result = Math.E;
			break;
		case 42:
		    result = 2147483647;
			break;
		case 43:
		    result = 9223372036854775807;
			break;
		case 44:
		    result = Infinity;
			break;
		default:
			break;
	}
	
	if (result !== undefined) {
		const storage = parseInt(data.storage);
		const varName = this.evalMessage(data.varName, cache);
		this.storeValue(result, storage, varName, cache);
	}
	this.callNextAction(cache);
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