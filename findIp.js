const geoip = require('geoip-lite');
const fs = require('fs');
const colors = require('colors');


function ipRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateIp() {
    a = ipRange(0, 255)
    b = ipRange(0, 255)
    c = ipRange(0, 255)
    d = ipRange(0, 255)
    let result = `${a}.${b}.${c}.${d}`
    return result
}

function getLongitude(ip) {
    try {
        let geo = geoip.lookup(ip)
        let coordinates = geo.ll      
        let longitude = coordinates[1]  
    return longitude
    } catch {
    }
} 

function getLatitude(ip) {
    try {
        let geo = geoip.lookup(ip)
        let coordinates = geo.ll      
        let latitude = coordinates[0] 
    return latitude
    } catch {
    }
} 

function getCityFromIp(ip) {
    try {
        let emptyValue = ''
        let nullValue = null
        let noCity = 'Unknown'
        
        let geo = geoip.lookup(ip)
        let city = geo.city
        if(city == emptyValue || nullValue) {
            return noCity
        } else {
            return city
        }
    } catch {
    }
}



let latitudeTarget = process.argv[2]
let longitudeTarget = process.argv[3]


function ipParser() {
    try {
        let ip = generateIp()
        let city = getCityFromIp(ip)
        let longitude = getLongitude(ip)
        let latitude = getLatitude(ip)
        let badResult = '[-] No device at this ip'
        let latitudeFluffPlus = latitude + 0.01
        let latitudeFluffMinus = latitude - 0.01
        let longitudeFluffPlus = longitude + 0.01
        let longitudeFluffMinus = longitude - 0.01
        if(latitudeTarget<latitudeFluffPlus && latitudeTarget>latitudeFluffMinus && longitudeTarget<longitudeFluffPlus && longitudeTarget>longitudeFluffMinus) {
            fs.appendFileSync(`RESULT.txt`, `${ip}\n`)
            let result = `[+] ${ip} Latitude is: ${latitude} Longitude is: ${longitude}`
            console.log(result.green.bold)
            return result
        } else {
            //console.log(`[-] Too far: ${ip} ${city} ${latitude} ${longitude}`.red)
            return badResult
        }
    } catch {

    }
}

while(1<2){
    ipParser()
}


//usage: node if.js latitude longitude