// Function to display the date in the header
function displayDate() {
    // day.js plugin to use ordinal numbers 
    dayjs.extend(window.dayjs_plugin_advancedFormat);
    // variable to store the current date
    const currentDate = dayjs().format('dddd, MMM Do');
    // calls HTML element with the id 'currentDay' and adds text including the currentDate to the page
    $("#currentDay").text(currentDate);
};

// Function to set the colour of the time blocks based on the current time
function setBlockColor() {
    /* gets current hour in 24h format - parsInt transforms number in the string into an integer, so that the value of currentTime can be compared with the value of hour */
    let currentTime = parseInt(dayjs().format('H')); 
    // calls HTML elements with class 'time-block' and performs a function for each one
    $(".time-block").each(function () { 
        /* the variable timeblock corresponds to the element with class 'time-block' that is being passed in each iteration (referenced using the keyword 'this') */
        let timeBlock = $(this); 
        // the variable timeBlockId corresponds to the id of timeBlock 
        let timeBlockId = timeBlock.attr("id"); 
        /* the variable hour stores both the word and the number from the id of the timeBlockId - parsInt transforms the number in the id into an integer and .split separates the word and the number in the id by the dash '-' and then grabs only the number (index 1) */
        let hour = parseInt(timeBlockId.split('-')[1]); 
        /* condtional statements compare the value of hour with the value of currentTime and change the attribute of timeBlock so that the css styling set for the css classes is applied and the time block changes colour */
        if (hour > currentTime) { 
            timeBlock.addClass("future"); 
        } else if (hour < currentTime) {
            timeBlock.addClass("past");
        } else {
            timeBlock.addClass("present");
        }
    });
};

// Function to save the event to the window local storage when the save button is clicked
function saveEvent() {
    // calls HTML elements with class 'btn' and when the button is clicked runs a function
    $(".btn").on("click", function () {
        // the variable calEvent stores the value of the textarea element that is the sibling of the button - .val() is used to get the value of the textarea
        let calEvent = $(this).siblings("textarea").val();
        // the variable savedEvent stores the id of the textarea element that is the sibling of the button
        let savedEvent = $(this).siblings("textarea").attr("id");
        // stores the value of 'calEvent' into the local storage under the key 'savedEvent'
        localStorage.setItem(savedEvent, calEvent);
    })
};

// Function to persist events between refreshes of a page
function persistEvent() {
    // when the document (structure) is ready runs a function 
    $(document).ready(function () {
        // calls HTML textarea elements and for each runs a function
        $("textarea").each(function () {
            // the variable updatedEvent stores the id of the current textarea which is referenced using the keyword 'this'
            let updatedEvent = $(this).attr("id");
            // retrieves the value of updatedEvent from the local storage and stores it in the variable persEvent
            let persEvent = localStorage.getItem(updatedEvent);
            // sets the value of the current textarea to the retrieved value of persEvent
            $(this).val(persEvent);
        })
    });
};
// Function to initialise the application
function initialise() {
    displayDate();
    setBlockColor();
    saveEvent();
    persistEvent();
}

initialise();
