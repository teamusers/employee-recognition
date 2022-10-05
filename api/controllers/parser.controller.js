const formatter = require('../../services/formatter.service.js')
const compute = require('./../../services/computation.service.js')

class parser {
    constructor() {

    }

    async getJson(req, res) {
        try{
            let kpi = req.query.kpi
            let inputData = []
            let data = await formatter.scorecardToJSON('C:\\Users\\USERPH\\Desktop\\scorecard-summary-export.xlsx')

            for (var key in data['Global KPI'][kpi].Countries) {
                inputData.push({
                    countryName: key,
                    currentQuarter: {
                        firstMonth: parseFloat(data['Global KPI'][kpi].Countries[key]['Oct-2021'].replace('%','')),
                        secondMonth: parseFloat(data['Global KPI'][kpi].Countries[key]['Nov-2021'].replace('%','')),
                        thirdMonth: parseFloat(data['Global KPI'][kpi].Countries[key]['Dec-2021'].replace('%','')),
                    },
                    pastQuarter: {
                        firstMonth: parseFloat(data['Global KPI'][kpi].Countries[key]['Jul-2021'].replace('%','')),
                        secondMonth: parseFloat(data['Global KPI'][kpi].Countries[key]['Aug-2021'].replace('%','')),
                        thirdMonth: parseFloat(data['Global KPI'][kpi].Countries[key]['Sep-2021'].replace('%','')),
                    }
                })
            }
            
            console.log(inputData)

            res.status(200).send({ success: true, data: await compute.computeIPQ(inputData)});

        } catch(e){
            console.error(e);
            res.status(400).send({ success: false, reason: "Bad Request" });
        }
    }

    async getJson2(){
        XLSX.set_fs(fs);     
        XLSX.stream.set_readable(Readable);   
        XLSX.set_cptable(file);

        console.log(XLSX)
    }
}

module.exports = new parser();