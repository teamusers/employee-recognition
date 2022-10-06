class Computation {

    constructor() {
        this.countries = [{
            countryName: "Afghanistan",
            eData: { countryScore: 90, value: 91, points: 30 },
            tData: { countryScore: 91, value: 91, points: 40 },
            mData: { countryScore: 92, value: 91, points: 50 }
        }, {
            countryName: "Algeria",
            eData: { countryScore: 90, value: 92, points: 30 },
            tData: { countryScore: 91, value: 92, points: 40 },
            mData: { countryScore: 92, value: 92, points: 50 }
        }, {
            countryName: "Bahrain",
            eData: { countryScore: 90, value: 93, points: 30 },
            tData: { countryScore: 91, value: 93, points: 40 },
            mData: { countryScore: 92, value: 93, points: 50 }
        }, {
            countryName: "Egypt",
            eData: { countryScore: 90, value: 91, points: 30 },
            tData: { countryScore: 91, value: 92, points: 40 },
            mData: { countryScore: 92, value: 93, points: 50 }
        }, {
            countryName: "Iran",
            eData: { countryScore: 90, value: 93, points: 30 },
            tData: { countryScore: 91, value: 92, points: 40 },
            mData: { countryScore: 92, value: 91, points: 50 }
        }, {
            countryName: "Iraq",
            eData: { countryScore: 90, value: 92, points: 30 },
            tData: { countryScore: 91, value: 91, points: 40 },
            mData: { countryScore: 92, value: 93, points: 50 }
        }, {
            countryName: "Jordan",
            eData: { countryScore: 90, value: 93, points: 30 },
            tData: { countryScore: 91, value: 91, points: 40 },
            mData: { countryScore: 92, value: 92, points: 50 }
        }, {
            countryName: "Kuwait",
            eData: { countryScore: 90, value: 92, points: 30 },
            tData: { countryScore: 91, value: 93, points: 40 },
            mData: { countryScore: 92, value: 91, points: 50 }
        }, {
            countryName: "Lebanon",
            eData: { countryScore: 90, value: 91, points: 30 },
            tData: { countryScore: 91, value: 93, points: 40 },
            mData: { countryScore: 92, value: 92, points: 50 }
        }]
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

    async computeETM(body){
        try {
            let response = [];
            for (var i = 0; i < this.countries.length; i++) {
                let country = this.countries[i];

                let eDataScore = country.eData.countryScore;
                let tDataScore = country.tData.countryScore;
                let mDataScore = country.mData.countryScore;
                let eDataValue = country.eData.value;
                let tDataValue = country.tData.value;
                let mDataValue = country.mData.value;

                let ePoints = eDataValue >= eDataScore && eDataValue < tDataScore ? 30 : 0;
                let tPoints = tDataValue >= tDataScore && tDataValue < mDataScore ? 40 : 0;
                let mPoints = mDataValue >= mDataScore ? 50 : 0;

                let result = {
                    country: country.countryName,
                    eData: ePoints,
                    tData: tPoints,
                    mData: mPoints
                };

                response.push(result);
            }

            // Return the response
            return {
                "code": 0,
                "message": "success",
                "result": response
            }
        } catch (e) {
            return {
                "code": -1,
                "message": e
            }
        }
    }
}

module.exports = Computation;