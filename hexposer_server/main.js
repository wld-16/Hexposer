var express = require('express');
var addon = require('bindings')('ImageProcessor');
var app = express();
var exec = require('child_process').execFile;
var fs = require('fs');


console.log("Start ImageProcessor");
exec('../hexposer_image_processor/cmake-build-debug/hexaposer.exe', function(err, data) {
		console.log(err);
		console.log(data.toString());
})

app.get('/dynamic_view', function(req, res){
   res.render('dynamic', {
      // open json and read to buffer
      //Hier müssten die .json Daten einfließen
         //name: "TutorialsPoint", 
         //url:"http://www.tutorialspoint.com"
   });
});

app.get('/test', function(req, res, next) {
  		res.json(JSON.parse(fs.readFileSync('pretty0.json')));
});

console.log(addon.hello());
app.use(express.static('static'));

//Serves all the request which includes /images in the url from Images folder
app.use('/images', express.static(__dirname + '/static/images'));
app.use('/fonts', express.static(__dirname + '/static/fonts'));
app.use('/css', express.static(__dirname + '/static/css'));
app.use('/js', express.static(__dirname + '/static/js'));

var server = app.listen(5000);