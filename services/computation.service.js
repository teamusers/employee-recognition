class Computation {

    constructor() {
        this.entryScore = 90
        this.targetScore = 91
        this.maximumScore = 92

        this.entryIPQ = 1
        this.targetIPQ = 1
        this.maximumIPQ = 1

        this.entryGain = 30
        this.targetGain = 40
        this.maximumGain = 50
    }

    async computeIPQ(body){
        try {
            // Extraction of the entire request
            let request = body;
            // Setup for the response
            let response = {};

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
                response[countryName] = {
                    IPQ: ipqResult,
                    currentQuarterTotalAverage: averageCurrentQuarter,
                    pastQuarterTotalAverage: averagePastQuarter,
                    score : country.currentQuarter.thirdMonth
                }
            }

            // Return the response
            return response
        } catch(e) {
            return {
                "code": -1,
                "message": e
            }
        }
    }

    async computeETM(response){
        try {            
            for (var countryName in response) {
                let points = 0;
                let countryScore = response[countryName].score;

                if(countryScore >= this.entryScore){
                    points = this.entryGain
                }

                if(countryScore >= this.targetScore){
                    points = this.targetGain
                }

                if(countryScore >= this.maximumScore){
                    points = this.maximumGain
                }

                response[countryName].ETM = points
            }

            return response
        } catch (e) {
            return {
                "code": -1,
                "message": e
            }
        }
    }

    async computeETMIPQ(response) {
        try {            
            for (var countryName in response) {
                let points = 0;
                let countryScore = response[countryName].IPQ;

                if(countryScore >= this.entryIPQ){
                    points = this.entryGain
                }

                if(countryScore >= this.targetIPQ){
                    points = this.targetGain
                }

                if(countryScore >= this.maximumIPQ){
                    points = this.maximumGain
                }

                response[countryName].ETMvsIPQ = points
            }

            return response
        } catch (e) {
            return {
                "code": -1,
                "message": e
            }
        }
    }
}

module.exports = new Computation();