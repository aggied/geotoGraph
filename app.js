var fs = require('fs');
var split = require('split');
var request = require('request');
var keys = [
                'geonameId',
                'name',
                'asciiname',
                'alternatenames',
                'latitude',
                'longitude',
                'featureClass',
                'featureCode',
                'countryCode',
                'cc2',
                'admin1Code',
                'admin2Code',
                'admin3Code',
                'admin4Code',
                'population',
                'elevation',
                'dem',
                'timezone',
                'modificationDate'
];

var cnt=0;
var rstream = fs.createReadStream('/data/allCountries.txt')
.pipe(split())
.on('data',function(line){
        var row = line.split('\t');
        var geotag={};
        var qs ='';
        for (var i=0;i<keys.length;i++){
                if (row[i]!==''){
                        geotag[keys[i]]=row[i];
                }
        }
        for (prop in geotag){
                qs+=prop+'='+geotag[prop]+'&';
        }
        request.post({url:'http://localhost:8182/graphs/graph/vertices/'+geotag.geonameId+'?'+qs},
        function(err,httpResponse,body){
        cnt+=1;
                console.log(cnt);
        });
});
