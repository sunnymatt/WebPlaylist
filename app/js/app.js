(function(){
'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['LocalStorageModule']);

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


app.controller('ListController', ['$scope', 'localStorageService', function($scope, localStorageService){

	this.numon = curr;

	this.listnames = playnames;

	this.multilist = links;

	if(localStorageService.get('playlists') != null)
	{
		var x = localStorageService.get('playlists');
		this.multilist = x;
		this.listnames = localStorageService.get('playlistnames');
	}

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
		this.multilist[this.numon].splice(index-1, 1);
		localStorageService.set('playlists', this.multilist);
		localStorageService.set('playlistnames', this.listnames);
	}

	this.removePlaylist = function(index){
		this.listnames.splice(index, 1); 
		this.multilist.splice(index, 1);
		localStorageService.set('playlists', this.multilist);
		localStorageService.set('playlistnames', this.listnames);
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
}]);

app.controller('AddController', ['$scope', 'localStorageService', function($scope, localStorageService){
	var clicked = false;

	this.site = {};

	this.setClick = function(){
		this.clicked = (!this.clicked);
		console.log(this.clicked);
	};

	this.addSite = function(list){

		list.push(this.site);
		this.site = {};
		console.log(JSON.stringify(links));
		localStorageService.set('playlists', links);
		localStorageService.set('playlistnames', playnames);
	};

}]);

app.controller('AddListController', ['$scope', 'localStorageService', function($scope, localStorageService){
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
		console.log(JSON.stringify(links));
		localStorageService.set('playlists', multilist);
		localStorageService.set('playlistnames', listnames);
	};

}]);

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


