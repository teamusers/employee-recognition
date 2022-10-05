class Computation {

    constructor() {
        //This is intentional
    }

    async computeIPQ(body){
        try {
            // Extraction of the entire request
            let request = body;
            // Setup for the response
            let response = [];

            for (var i = 0; i < request.length; i++) {
                // Extraction of data from the request
                var country = request[i];
                var countryName = country.countryName;
                var currentQuarterFirstMonth = country.currentQuarter.firstMonth;
                var currentQuarterSecondMonth = country.currentQuarter.secondMonth;
                var currentQuarterThirdMonth = country.currentQuarter.thirdMonth;
                var pastQuarterFirstMonth = country.pastQuarter.firstMonth;
                var pastQuarterSecondMonth = country.pastQuarter.secondMonth;
                var pastQuarterThirdMonth = country.pastQuarter.thirdMonth;

                // The average of the current quarter
                var averageCurrentQuarter = (currentQuarterFirstMonth + currentQuarterSecondMonth + currentQuarterThirdMonth) / 3;
                averageCurrentQuarter = Math.round((averageCurrentQuarter + Number.EPSILON) * 100) / 100;

                // The average of the past quarter
                var averagePastQuarter = (pastQuarterFirstMonth + pastQuarterSecondMonth + pastQuarterThirdMonth) / 3;
                averagePastQuarter = Math.round((averagePastQuarter + Number.EPSILON) * 100) / 100;

                // The result for IPQ
                var ipqResult = averageCurrentQuarter - averagePastQuarter;
                ipqResult = Math.round((ipqResult + Number.EPSILON) * 100) / 100;

                // The result of the country of this iteration
                var result = {
                    countryName,
                    ipqResult,
                    averageCurrentQuarter,
                    averagePastQuarter
                };

                // The data to be returned as part of the entire response
                response.push(result);
            }

            // Return the response
            return {
                "code": 0,
                "message": "success",
                "result": response
            }
        } catch(e) {
            return {
                "code": -1,
                "message": e
            }
        }
    }
}

module.exports = new Computation();