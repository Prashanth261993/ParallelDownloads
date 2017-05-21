
function setStatus(index, status){
    if(status == "In Progress"){
        $("table td:nth-child(2)")[index].children[0].classList.remove('status-not-started');
        $("table td:nth-child(2)")[index].children[0].classList.add('status-in-progress');
        $("table td:nth-child(2)")[index].children[0].innerHTML = "In Progress";
    }
    else if(status == "Completed"){
        $("table td:nth-child(2)")[index].children[0].classList.remove('status-in-progress');
        $("table td:nth-child(2)")[index].children[0].classList.add('status-completed');
        $("table td:nth-child(2)")[index].children[0].innerHTML = "Completed";
    }
    else{
        $("table td:nth-child(2)")[index].children[0].classList.remove('status-in-progress');
        $("table td:nth-child(2)")[index].children[0].classList.add('status-not-started');
        $("table td:nth-child(2)")[index].children[0].innerHTML = "Error";
    }
}

var MyRequestsCompleted = (function () {
    var numRequestToComplete, requestsCompleted, callBacks, singleCallBack;

    return function (options) {
        if (!options) options = {};

        numRequestToComplete = options.numRequest || 0;
        requestsCompleted = options.requestsCompleted || 0;
        callBacks = [];
        var fireCallbacks = function () {
            alert("we're all complete");
            for (var i = 0; i < callBacks.length; i++) callBacks[i]();
        };
        if (options.singleCallback) callBacks.push(options.singleCallback);

        this.addCallbackToQueue = function (isComplete, callback) {
            if (isComplete) requestsCompleted++;
            if (callback) callBacks.push(callback);
            if (requestsCompleted == numRequestToComplete) fireCallbacks();
        };
        this.requestComplete = function (isComplete, data, index) {

            if (isComplete)
            {
                setStatus(index, "Completed");
                $("table td:nth-child(3)")[index].innerHTML = $(data).find("value")[0].innerHTML;

            }
            else{
                setStatus(index, "Completed");
            }

            if (requestsCompleted == numRequestToComplete) fireCallbacks();
        };
        this.setCallback = function (callback) {
            callBacks.push(callBack);
        };
    };
})();

var requestCallback = new MyRequestsCompleted({
    numRequest: items.length
});


function initiateParallelCalls(item, index) {
    setStatus(index, "In Progress");
    $.ajax({
        url: 'https://glacial-sands-39825.herokuapp.com/downloads/' + item,
        dataType: "xml",
        async:true,
        success: function (data) {
            requestCallback.requestComplete(true, data, index);
        },
        error: function(data){
            requestCallback.requestComplete(false, data, index);
        }
    });

}

window.onload = function() {
    $("#download").click(function(){
        items.forEach(initiateParallelCalls);
    });

};