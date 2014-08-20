(function(){
'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', []);

app.config(function($sceProvider) {
  // Completely disable SCE.  For demonstration purposes only!
  // Do not use in new projects.
  $sceProvider.enabled(false);
});

var curr = 0;

var curinlist = false;

var playnames = ['Cool', 'Bad',];

var links = [
	[
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

	], 

	[
		{
			name: 'Microsoft',
			url: 'http://www.microsoft.com',
			notes: 'Check out this nifty software site!'

		},

		{
			name: 'FCPS',
			url: 'http://www.fcps.edu',
			notes: 'This is a great county!'
		},
	],
];


app.controller('ListController', function(){
	this.numon = curr;

	this.listnames = playnames;

	this.multilist = links;

	this.inlist = curinlist;

	this.list = links[this.numon];

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

	this.select = function(temp){
		this.inlist = true;
		this.numon = temp;
		this.list = links[temp];
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

app.controller('AddListController', function(){
	this.clicked = false;

	this.listname = '';

	this.setClick = function(){
		this.clicked = (!this.clicked);
		console.log(this.clicked);
	};

	this.addList = function(multilist, listnames){
		var emptyarr = [];
		multilist.push(emptyarr);
		listnames.push(this.listname);
		this.listname = '';
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


