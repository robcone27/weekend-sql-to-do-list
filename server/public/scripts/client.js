console.log('js');
$(onReady);

function onReady() {
    console.log('jq');
    clickListeners();
    getTask();
};
// click listeners
function clickListeners() {
    $(`#taskSubmit`).on(`click`, function () {
        let taskSend = {
            task: $(`#taskTxt`).val(),
            complete: $(`#completeSubmit`).val()
        };
        sendTasks(taskToSend);
    });
}; //end clickListeners

// client side GET
function getTask() {
    $.ajax({
        method: `GET`,
        url: `/to_do_list`
    }).then(function (response) {
        console.log('in client side GET');
        renderTasks(response);
    }).catch(function (error) {
        console.log('error on client side GET', error);
        res.sendStatus(500);
    });
};

//client side POST
function sendTasks(newTask) {
    $.ajax({
        method: `POST`,
        url: `/to_do_list`,
        data: newTask
    }).then(function (response) {
        console.log('in client side POST');
        getTasks(response);
    }).catch(function (error) {
        console.log('error on client side POST', error);
        alert('failed to add task');
    });
}