const formatter = require('../../services/formatter.service.js')
const compute = require('./../../services/computation.service.js')

class parser {
    constructor() {
        this.data = []
    }

    async getJson(req, res) {
        try{
            let kpi = req.query.kpi
            let file = await formatter.scorecardToJSON('C:\\Users\\USERPH\\Desktop\\scorecard-summary-export.xlsx')
            let parsedData = await formatter.parsedToCompute(file['Global KPI'][kpi].Countries)
            let IPQ = await compute.computeIPQ(parsedData)
            let ETM = await compute.computeETM(IPQ)
            let ETMIPQ = await compute.computeETMIPQ(ETM)
            let data = await formatter.dataToOut(ETMIPQ)

            res.status(200).send({ success: true, data: data});
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