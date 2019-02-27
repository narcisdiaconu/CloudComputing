const logger = require('./logger');
const fs = require('fs');
const http = require('http');
const https = require('https');

let tokens;

module.exports = (function() {
    let serviceOneEndpoint;
    let serviceTwoEndpoint;
    let serviceThreeEndpoint;

    function callServiceOne(request, response) {
        logger.log(`Service one called...`);
        let serviceStart = new Date();

        http.get(serviceOneEndpoint, (res) => {
            var data = "";
            res.on('data', (body) => {
                data += body;
            });

            res.on('end', () => {
                data = JSON.parse(data);
                logger.log(`Service one responded in ${new Date() - serviceStart}ms.`);
                request.serviceOneData = data;
                callServiceTwo(request, response);
            });
        });
    }

    function callServiceTwo(request, response) {
        logger.log("Service two called...");
        let serviceStart = new Date();
        return https.get(serviceTwoEndpoint, (res) => {
            var data = "";
            res.on('data', (body) => {
                data += body;
            });

            res.on('end', () => {
                data = JSON.parse(data);
                logger.log(`Service two responded in ${new Date() - serviceStart}ms.`);
                request.serviceTwoData = data;
                callServiceThree(request, response);
            });
        });
    }

    function callServiceThree(request, response) {
        if (request.query["categoryId"] !== "none") {
            serviceThreeEndpoint = `https://www.eventbriteapi.com/v3/events/search/?token=${tokens.API_THREE}&location.latitude=${request.serviceOneData.latitude}&location.longitude=${request.serviceOneData.longitude}&location.within=${request.serviceTwoData}km&categories=${request.query["categoryId"]}`;
        } else {
            serviceThreeEndpoint = `https://www.eventbriteapi.com/v3/events/search/?token=${tokens.API_THREE}&location.latitude=${request.serviceOneData.latitude}&location.longitude=${request.serviceOneData.longitude}&location.within=${request.serviceTwoData}km`;
        }
        logger.log("Service three called...");
        let serviceStart = new Date();
        return https.get(serviceThreeEndpoint, (res) => {
            var data = "";
            res.on('data', (body) => {
                data += body;
            });

            res.on('end', () => {
                data = JSON.parse(data);
                logger.log(`Service three responded in ${new Date() - serviceStart}ms.`);
                response.end(JSON.stringify(data));
                logger.log(`Request from client done in ${new Date() - request.startTime}ms.\n`);
            });
        });
    }

    function init() {
        fs.readFile("./app.config.json", function(err, data) {
            data = JSON.parse(data.toString());
            serviceOneEndpoint = `http://api.ipstack.com/check?access_key=${data.API_ONE}`;
            serviceTwoEndpoint = `https://www.random.org/integers/?num=1&min=50&max=400&col=1&base=10&format=plain&rnd=new`;
            tokens = data;
        });
    }

    function callServices(request, response) {
        response.writeHead(200, 'application/json');
        callServiceOne(request, response);
    }

    function sendCategories(request, response) {
        response.writeHead(200, 'application/json');
        let url = `https://www.eventbriteapi.com/v3/categories/?token=${tokens.API_THREE}`;
        logger.log(`Service three called...`);
        let serviceStart = new Date();
        https.get(url, (res) => {
            var data = "";
            res.on('data', (body) => {
                data += body;
            });

            res.on('end', () => {
                data = JSON.parse(data);
                logger.log(`Service three responded in ${new Date() - serviceStart}ms.`);
                response.end(JSON.stringify(data));
                logger.log(`Request from client done in ${new Date() - request.startTime}ms.\n`);
            });
        });
    }

    return {
        init,
        callServices,
        sendCategories
    };
})();