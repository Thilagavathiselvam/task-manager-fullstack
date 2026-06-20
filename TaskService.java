package com.taskmanager.service;

import com.taskmanager.model.Task;
import com.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // Create Task
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    // Get All Tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Get Task By Id
    public Task getTaskById(Long id) {

        Optional<Task> task = taskRepository.findById(id);

        if (task.isPresent()) {
            return task.get();
        }

        return null;
    }

    // Update Task
    public Task updateTask(Long id, Task updatedTask) {

        Optional<Task> optionalTask = taskRepository.findById(id);

        if (optionalTask.isPresent()) {

            Task task = optionalTask.get();

            task.setTitle(updatedTask.getTitle());
            task.setDescription(updatedTask.getDescription());
            task.setStatus(updatedTask.getStatus());
            task.setDueDate(updatedTask.getDueDate());

            return taskRepository.save(task);
        }

        return null;
    }

    // Delete Task
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}