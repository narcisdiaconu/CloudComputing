const logger = require('./logger');
const service = require('./service');
const url = require('url');

service.init();

module.exports = {
    handleRequest: (request, response) => {
        logger.incrementReq();
        request.startTime = new Date();
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Headers', '*');
        if (request.method === 'OPTIONS') {
            response.writeHead(200);
            response.end();
            return;
        }
        logger.log("Request received: " + request.method + ' ' + request.url);
        let apiUrl = url.parse(request.url, true);
        request.query = apiUrl.query;
        try {
            switch (apiUrl.pathname) {
                case '/api/service/':
                    service.callServices(request, response);
                    break;
                case '/api/metrics':
                    logger.handle(request, response);
                    break;
                case '/api/categories':
                    service.sendCategories(request, response);
                    break;
                default:
                    response.writeHead(404);
                    response.write('Not found!');
                    break;
            }
        } catch (e) {
            logger.incrementErrors();
            response.writeHead(500);
            response.write('Internal server error!');
        }
    }
};