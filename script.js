// Function to calculate the time spent on a task
function calculateTimeSpent(startTime, endTime) {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const diff = end - start;
    const minutes = Math.floor(diff / 60000);
    return minutes / 60; // Return hours
  }
  
  // Function to create and download a .txt file
  function downloadTasksAsTxt() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const tasksText = tasks.map((task) => {
      return `${task.task} (${task.startTime} - ${task.endTime}), ${task.hoursSpent.toFixed(2)} hours`;
    }).join('\n');
  
    const blob = new Blob([tasksText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'task_data.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  // Function to add a task to the list and save it in local storage
  function addTask() {
    const taskInput = document.getElementById("task");
    const startTimeInput = document.getElementById("startTime");
    const endTimeInput = document.getElementById("endTime");
    const taskList = document.getElementById("taskList");
  
    const task = taskInput.value;
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;
  
    if (task && startTime && endTime) {
      const hoursSpent = calculateTimeSpent(startTime, endTime);
  
      // Create a task object
      const taskObj = {
        task,
        startTime,
        endTime,
        hoursSpent,
      };
  
      // Save the task in local storage
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(taskObj);
      localStorage.setItem("tasks", JSON.stringify(tasks));
  
      // Add the task to the list
      const listItem = document.createElement("li");
      listItem.textContent = `${task} (${startTime} - ${endTime}), ${hoursSpent.toFixed(2)} hours`;
      taskList.appendChild(listItem);
  
      // Clear input fields
      taskInput.value = "";
      startTimeInput.value = "";
      endTimeInput.value = "";
    }
  }
  
  document.getElementById("addTask").addEventListener("click", addTask);
  
  // Add a button for downloading task data
  const downloadButton = document.createElement("button");
  downloadButton.textContent = "Download Task Data";
  downloadButton.addEventListener("click", downloadTasksAsTxt);
  document.body.appendChild(downloadButton);
  
