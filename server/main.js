"use strict";

var architect = require('architect');
var path = require ('path');

var config = architect.loadConfig(path.join (__dirname, "plugins.js"));

var a = architect.createApp(config);

a.on("ready", function s(a)
{
   console.log("Application is ready"); 
});

process.on ('uncaughtException', function (ex)
{
    console.log ('Exception:');
    console.log (ex); 
});

