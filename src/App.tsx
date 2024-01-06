import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from "./App.module.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { ITask } from './interfaces/Task';
import Modal from './components/Modal';


function App() {

  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter(task => {
        return task.id !== id;
      })
    );
  };

  const hideOrShowModal = (display: boolean) => {
    const modal = document.getElementById("modal")
    if (display) {
      modal!.classList.remove("hide")
    } else {
      modal!.classList.add("hide")
    }
  }

  const editTask = (task: ITask): void => {
    hideOrShowModal(true);
    setTaskToUpdate(task);
  }

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updateTask: ITask = { id, title, difficulty }
    const updateItems = taskList.map((task) => {
      return task.id === updateTask.id ? updateTask : task
    })

    setTaskList(updateItems)

    hideOrShowModal(false)

  }

  return (
    <div>
      <Modal
        children={
          <TaskForm
            btnText='Editar Tarefa'
            taskList={taskList}
            task={taskToUpdate}
            handleUpdate={updateTask}
          />
        }
      />
      <Header />
      <main className={styles.main}>
        <div>
          <h2>Oque Fazer</h2>
          <TaskForm
            btnText='Criar Tarefa'
            taskList={taskList}
            setTaskList={setTaskList}
          />
        </div>
        <div>
          <h2>Suas Tarefas:</h2>
          <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask} />
        </div>
      </main>
      <Footer />
    </div>

  );
}

export default App;
