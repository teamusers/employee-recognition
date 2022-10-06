const readXlsxFile = require('read-excel-file/node')
const CommonFunctions = require('../util/common-functions.js');

class Formatter {

    constructor() {
        //This is intentional
    }

    async scorecardToJSON(file){
        let KPI = ['Grade of Service','Abandoned Call Rate','Trace Resolution - CS','Complaint Resolution - CS','Claim Resolution - CS','Upselling']
        let countries = ["Afghanistan","Algeria","Bahrain","Egypt","Iran","Iraq","Jordan","Kuwait","Lebanon","Libya","Mauritania","Morocco","Oman","Qatar","Saudi Arabia","Syria","United Arab Emirates","Tunisia","Yemen"]
        let data = {}
        let keys = []
        let currentKPI

        await readXlsxFile(file).then((rows) => {                
            data.Period = rows[1][0].substring(8,9)
            data['Hierarchy Code'] = rows[1][0].slice(-4);
            data['Global KPI'] = {}


            for (let index = 0; index < rows.length; index++) {
                if(rows[index][0] == 'CS Performance'){
                    keys = rows[index].slice(1,-6)
                }

                if(KPI.includes(rows[index][0])){
                    currentKPI = rows[index][0]
                    data['Global KPI'][rows[index][0]] = {}
                    data['Global KPI'][rows[index][0]].Average = {}
                    data['Global KPI'][currentKPI].Countries = {}
                    keys.forEach((key,ind) => {
                        data['Global KPI'][rows[index][0]].Average[key] ={}
                        data['Global KPI'][rows[index][0]].Average[key] = rows[index][ind+1]
                    });
                }      
                if(countries.includes(rows[index][0])){
                    data['Global KPI'][currentKPI].Countries[rows[index][0]] = {}
                    keys.forEach((key,ind) => {
                        data['Global KPI'][currentKPI].Countries[rows[index][0]][key] = {}
                        if(rows[index][ind+1] == '-'){
                            rows[index][ind+1] = '0.0%'
                        }
                        data['Global KPI'][currentKPI].Countries[rows[index][0]][key] = rows[index][ind+1]
                    });
                }             
            }
        })
        return data
    }

    async parsedToCompute(countries){
        let inputData = []
        for (var key in countries) {
            inputData.push({
                countryName: key,
                currentQuarter: {
                    firstMonth: parseFloat(countries[key]['Oct-2021'].replace('%','')),
                    secondMonth: parseFloat(countries[key]['Nov-2021'].replace('%','')),
                    thirdMonth: parseFloat(countries[key]['Dec-2021'].replace('%','')),
                },
                pastQuarter: {
                    firstMonth: parseFloat(countries[key]['Jul-2021'].replace('%','')),
                    secondMonth: parseFloat(countries[key]['Aug-2021'].replace('%','')),
                    thirdMonth: parseFloat(countries[key]['Sep-2021'].replace('%','')),
                }
            })
        }
        return inputData
    }

    async dataToOut (data){
        let out = []
        for (var countryName in data) {
            out.push({
                country: countryName,
                ...data[countryName]
            })
        }
        return out
    }

    async getQuarterlyData(currentMonth,currentYear){
        let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
        let monthInd = months.findIndex(month=> month == currentMonth);
        let ind = CommonFunctions.lessArrInd(monthInd,11)

    
        for (var key in data['Global KPI'][kpi].Countries) {
            inputData.push({
                countryName: key,
                currentQuarter: {
                    firstMonth: parseFloat(data['Global KPI'][kpi].Countries[key][months[monthInd-2 < 0 ? monthInd-2 : 11]+currentYear].replace('%','')),
                    secondMonth: parseFloat(data['Global KPI'][kpi].Countries[key][months[monthInd-1 < 0 ? monthInd-1 : 11]+currentYear].replace('%','')),
                    thirdMonth: parseFloat(data['Global KPI'][kpi].Countries[key][months[monthInd]+currentYear].replace('%','')),
                },
                pastQuarter: {
                    firstMonth: parseFloat(data['Global KPI'][kpi].Countries[key]['Jul'].replace('%','')),
                    secondMonth: parseFloat(data['Global KPI'][kpi].Countries[key]['Aug'].replace('%','')),
                    thirdMonth: parseFloat(data['Global KPI'][kpi].Countries[key]['Sep'].replace('%','')),
                }
            })
        }
    }
}

module.exports = new Formatter();