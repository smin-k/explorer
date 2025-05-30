angular.module('ethExplorer')
    .controller('blockInfosCtrl', function ($rootScope, $scope, $location, $routeParams,$q) {

	var web3 = $rootScope.web3;

    $scope.init = function() {

        $scope.blockId = $routeParams.blockId;

        if($scope.blockId !== undefined) {

            getBlockInfos().then(function(result){
                var number = web3.eth.blockNumber;

                $scope.result = result;

                $scope.hash = result.hash || 'pending';
                $scope.miner = result.miner || 'pending';
                $scope.gasLimit = result.gasLimit;
                $scope.gasUsed = result.gasUsed;
                $scope.nonce = result.nonce;
                $scope.difficulty = ("" + result.difficulty).replace(/['"]+/g, '');
                $scope.number = result.number;
                $scope.parentHash = result.parentHash;
                $scope.blockNumber = result.number;
                $scope.timestamp = result.timestamp;
                $scope.extraData = result.extraData;
                $scope.dataFromHex = hex2a(result.extraData);
                $scope.size = result.size;

                // WorldLand additions
                $scope.codeword = result.codeword;
                $scope.codewordDecoded = hexToBase64DecodedString(result.codeword);
                $scope.codewordBits = hexToBitString(result.codeword);
                $scope.codelength = result.codelength;

                if($scope.blockNumber !== undefined){
                    $scope.conf = number - $scope.blockNumber + " Confirmations";
                    if($scope.conf === "0 Confirmations"){
                        $scope.conf = 'Unconfirmed';
                    }
                }

                if($scope.blockNumber !== undefined){
                    var info = web3.eth.getBlock($scope.blockNumber);
                    if(info !== undefined){
                        var newDate = new Date();
                        newDate.setTime(info.timestamp * 1000);
                        $scope.time = newDate.toUTCString();
                    }
                }
            });

        } else {
            $location.path("/");
        }

        function getBlockInfos() {
            var deferred = $q.defer();

            web3.eth.getBlock($scope.blockId, function(error, result) {
                if(!error) {
                    deferred.resolve(result);
                } else {
                    deferred.reject(error);
                }
            });
            return deferred.promise;
        }
    };

    $scope.init();

    // parse transactions
    $scope.transactions = []
    web3.eth.getBlockTransactionCount($scope.blockId, function(error, result){
        var txCount = result

        for (var blockIdx = 0; blockIdx < txCount; blockIdx++) {
            web3.eth.getTransactionFromBlock($scope.blockId, blockIdx, function(error, result) {

                var transaction = {
                    id: result.hash,
                    hash: result.hash,
                    from: result.from,
                    to: result.to,
                    gas: result.gas,
                    input: result.input,
                    value: result.value
                }
                $scope.$apply(
                    $scope.transactions.push(transaction)
                )
            })
        }
    })

    function hex2a(hexx) {
        var hex = hexx.toString();
        var str = '';
        for (var i = 0; i < hex.length; i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str;
    }

    function hexToBase64DecodedString(hexx) {
        try {
            let hex = hexx.toString().replace(/^0x/, '');
            let binary = '';
            for (let i = 0; i < hex.length; i += 2) {
                binary += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
            }
            let decoded = atob(btoa(binary));
            return decoded;
        } catch (e) {
            return 'Invalid Base64 hex';
        }
    }

    function hexToBitString(hexx) {
        try {
            let hex = hexx.toString().replace(/^0x/, '');
            return hex.split('').map(h => parseInt(h, 16).toString(2).padStart(4, '0')).join('');
        } catch (e) {
            return 'Invalid BitString';
        }
    }

});
