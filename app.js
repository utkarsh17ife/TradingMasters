var app = angular.module('myApp', []);
app.controller('stockCtrl', function ($scope, $http) {
    $scope.stocks = [
        {
            name: "UBL",
            bprice: 856,
            stoploss: "-",
            target: 900,
            cprice: ""
        },
        {
            name: "OIL",
            bprice: 350,
            stoploss: 345,
            target: 400,
            cprice: ""
        },
        {
            name: "PTC",
            bprice: 124,
            stoploss: "-",
            target: 135,
            cprice: ""
        },

        {
            name: "TATAMOTORS",
            bprice: 428,
            stoploss: "-",
            target: 460,
            cprice: ""
        },
        {
            name: "BASF",
            bprice: 1731,
            stoploss: "-",
            target: 1800,
            cprice: ""
        },
        {
            name: "GODREJCP",
            bprice: 935,
            stoploss: "-",
            target: "-",
            cprice: ""
        },
        {
            name: "JUSTDIAL",
            bprice: 420,
            stoploss: "-",
            target: 490,
            cprice: ""
        },
        {
            name: "DIVISLAB",
            bprice: 925,
            stoploss: "-",
            target: 1070,
            cprice: ""
        },
        {
            name: "PETRONET",
            bprice: 263,
            stoploss: "-",
            target: 285,
            cprice: ""
        },
        {
            name: "AUTOAXLES",
            bprice: 965,
            stoploss: "-",
            target: 1040,
            cprice: ""
        },
        {
            name: "HINDZINC",
            bprice: 325,
            stoploss: "-",
            target: 350,
            cprice: ""
        },
        {
            name: "TATAELXSI",
            bprice: 866,
            stoploss: "-",
            target: 900,
            cprice: ""
        },
        {
            name: "HDFC",
            bprice: 1779,
            stoploss: "-",
            target: 1820,
            cprice: ""
        },
        {
            name: "M&M",
            bprice: 1358,
            stoploss: "-",
            target: 1420,
            cprice: ""
        },
        {
            name: "ASIANPAINT",
            bprice: 1190,
            stoploss: "-",
            target: "-",
            cprice: ""
        }
    ];


    var apiGen = (name) => { return `https://www.quandl.com/api/v3/datasets/NSE/${name}.json?api_key=gwZhGszfyS5bH7p44UfA&rows=1`; }

    var apifetcher = (name) => {
        return new Promise((resolve, reject) => {
            $http.get(apiGen(name))
                .then(response => {
                    return resolve(response.data.dataset.data[0][5]);
                })
                .catch(err => {
                    console.log("Failed to fetch for: " + name);
                })
        })

    }    
    var dataFetcher = () => {
        console.log("dataFetcher triggered!");
        $scope.stocks.forEach(function (element) {     
            sleep()
            apifetcher(element.name)
                .then(response => {
                    console.log("response is here for: " + element.name + ": " + JSON.stringify(response))
                    $scope.stocks.find(stock => stock.name === element.name).cprice = response;
                })
        });
    }
    setTimeout(()=>{
        setInterval(dataFetcher, ($scope.stocks.length * 2)*1000 + 4000);
    }, 2000);
    


    function sleep() {
        var date = new Date();
        do { curDate = new Date(); }
        while (curDate - date < 1000);
    }



});