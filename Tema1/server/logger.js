module.exports = (function() {
    let loggedData = "";
    let numberOfRequests = 0;
    let numberOfErrors = 0;

    function log(string) {
        let date = new Date();
        loggedData += `${date.toLocaleTimeString()}  ${string} \n`;
    }

    return {
        log,
        handle: (request, response) => {
            response.writeHead(200, 'application/json');
            log(`Request done in ${new Date() - request.startTime} ms\n`);
            let data = {
                loggedData,
                numberOfRequests,
                numberOfErrors
            };
            response.end(JSON.stringify(data));
        },
        incrementReq: () => {
            numberOfRequests += 1;
        },
        incrementErrors: () => {
            numberOfErrors += 1;
        }
    };
})();