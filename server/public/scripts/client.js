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
        let taskToSend = {
            task: $(`#taskTxt`).val(),
            complete: $(`#completeSubmit`).val()
        };
        sendTasks(taskToSend);
    });

    $(`#viewTasks`).on(`click`, `.completeBtn`, taskComplete);
    $(`#viewTasks`).on(`click`, `.deleteBtn`, deleteTask);
}; //end clickListeners

// client side GET
function getTask() {
    $.ajax({
        method: `GET`,
        url: `/tasks`
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
        url: `/tasks`,
        data: newTask
    }).then(function (response) {
        console.log('in client side POST');
        getTask(response);
    }).catch(function (error) {
        console.log('error on client side POST', error);
        alert('failed to add task');
    });
}

//Renders to the DOM
function renderTasks(tasks) {
    $(`#viewTasks`).empty();
    for (let i = 0; i < tasks.length; i++) {

        if (!tasks[i].complete) {

        let completeBtn = `<button class="completeBtn"> Complete </button>`;
        let taskEntry = (`
        <tr data-id="${tasks[i].id}">
        <td>${tasks[i].task}</td>
        <td>${tasks[i].complete}</td>
        <td>
        <button class="completeBtn">Complete</button>
        <button class="deleteBtn">Delete</button>
           </td>
        </tr>
        `);
            $(`#viewTasks`).append(taskEntry);
        }
   else if (tasks[i].complete) {
    let taskEntry = (`
    <tr class="finished" data-id="${tasks[i].id}">
    <td>${tasks[i].task}</td>
    <td>${tasks[i].complete}</td>
    <td>
    <button class="completeBtn">Complete</button>
    <button class="deleteBtn">Delete</button>
       </td>
    </tr>`);
    
        $(`#viewTasks`).append(taskEntry);
    }
 }
}
    //client side PUT
    function taskComplete() {
        let complete = $(this).text();
        let id = $(this).closest(`tr`).data(`id`);
        console.log(id, complete);

        $.ajax({
            method: `PUT`,
            url: `/tasks/${id}`,
            data: {
                complete: complete
            }
        }).then(function (response) {
            getTask();
        }).catch(function (error) {
            console.log('something is funky', error);
        });
    };

    //client side delete
    function deleteTask() {

        let idToDelete = $(this).closest(`tr`).data(`id`);
        console.log(idToDelete);
        $.ajax({
            method: `DELETE`,
            url: `/tasks/${idToDelete}`,

        }).then(function (response) {
            getTask()
        }).catch(function (error) {
            console.log('something is funky', error);
        });
    }

