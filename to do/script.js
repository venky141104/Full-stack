function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value.trim();

    // Check empty input
    if (task === "") {
        alert("Enter task");
        return;
    }

    // Create list item with 1-based index appended
    let li = document.createElement("li");
    let list = document.getElementById("taskList");
    let index = list.children.length + 1;
    li.textContent = task + " (" + index + ")";

    // Toggle completed style on click
    li.addEventListener("click", function () {
        li.classList.toggle("completed");
    });

    // Append to list
    document.getElementById("taskList").appendChild(li);

    // Clear input
    input.value = "";
}