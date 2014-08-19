(function(){
'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', []);

app.config(function($sceProvider) {
  // Completely disable SCE.  For demonstration purposes only!
  // Do not use in new projects.
  $sceProvider.enabled(false);
});

var links = [
	{
		name: 'Time',
		url: 'http://www.time.com',
		notes: 'Check out this nifty news site!'

	},

	{
		name: 'Imgur',
		url: 'http://www.imgur.com',
		notes: 'The cat on page 3 is so cute!'
	},

	{
		name: 'Agilex',
		url: 'https://www.agilex.com/',
		notes: 'What an awesome company!'
	},

];


app.controller('ListController', function(){
	this.list = links;

	this.playing = false;

	this.play = function(){
		this.playing = (!this.playing);
		console.log(this.playing);
	};

	this.currentlyPlaying = function(){
		return this.playing;
	};

	this.remove = function(index){
		this.list.splice(index-1, 1);
	}

	this.shorten = function(str){
		if(str.length>6)
		{
			return str.substring(0, 6) + '...';
		}
		else
		{
			return str;
		}
	}
});

app.controller('AddController', function(){
	var clicked = false;

	this.site = {};

	this.setClick = function(){
		this.clicked = (!this.clicked);
		console.log(this.clicked);
	};

	this.addSite = function(list){

		list.push(this.site);
		this.site = {};

	};

});

app.controller('PlayController', function(){
	this.num = 0;

	this.next = function(){
		if(this.num!=links.length-1)
		{
			this.num += 1;
		}
	}

	this.prev = function(){
		if(this.num!=0)
		{
			this.num -= 1;
		}
	}
});

})()


