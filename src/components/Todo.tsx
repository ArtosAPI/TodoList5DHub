import React, { useState, FormEvent } from "react";
import ThemeToggle from "./ThemeToggle";
import "./Todo.scss";

interface Task {
	id: number;
	text: string;
	completed: boolean;
}

const TaskComponent: React.FC<{
	task: Task;
	toggleTask: Function;
	deleteTask: Function;
}> = ({ task, toggleTask, deleteTask }) => {
	return (
		<div className="task-container">
			<div className="task-container-checkbox">
				<input
					type="checkbox"
					checked={task.completed}
					onChange={() => toggleTask(task.id)}
					className={
						task.completed ? "checkbox-active" : "checkbox-inactive"
					}
				/>
				<label
					style={{
						textDecoration: task.completed
							? "line-through"
							: "none",
					}}>
					{task.text}
				</label>
			</div>
			<button
				className="task-container-deletebtn"
				onClick={() => deleteTask(task.id)}>
				×
			</button>
		</div>
	);
};

const Todo: React.FC = () => {
	const [inputValue, setInputValue] = useState<string>("");
	const [tasks, setTasks] = useState<Task[]>([]);
	const [isDarkTheme, setTheme] = useState<boolean>(false);
	document.documentElement.classList.add("light-theme");

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Здесь добавить логику добавления задачи
		setTasks((prev) => [
			...prev,
			{
				id: Date.now(),
				text: inputValue,
				completed: false,
			},
		]);
	};

	const toggleTask = (id: number) => {
		setTasks((prev) =>
			prev.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
	};

	const deleteTask = (id: number) => {
		setTasks((prev) => prev.filter((task) => task.id !== id));
	};

	const toggleTheme = () => {
		setTheme((prev) => !prev);
		if (isDarkTheme) {
			document.documentElement.classList.remove("dark-theme");
			document.documentElement.classList.add("light-theme");
		} else {
			document.documentElement.classList.remove("light-theme");
			document.documentElement.classList.add("dark-theme");
		}
	};

	return (
		<div className="todo-container">
			<div className="todo-header">
				<h1>Список задач</h1>
				<ThemeToggle onClick={toggleTheme} />
			</div>
			<span>Tektov Pavel</span>
			<form className="input-section" onSubmit={handleSubmit}>
				<input
					type="text"
					className="task-input"
					placeholder="Введите новую задачу"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<button type="submit" className="add-button">
					Добавить
				</button>
			</form>

			<div className="tasks-list">
				{tasks.map((task) => (
					<TaskComponent
						key={task.id}
						task={task}
						toggleTask={toggleTask}
						deleteTask={deleteTask}
					/>
				))}
			</div>
		</div>
	);
};

export default Todo;
