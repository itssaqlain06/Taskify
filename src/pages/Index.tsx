import React, { useState } from 'react';
import './Index.css';
import Header from './Header';
import { IonContent, IonInput, IonPage, IonButton, IonIcon } from '@ionic/react';
import './index.css';
import { checkbox, trash } from 'ionicons/icons';

const Index: React.FC = () => {
    const [task, setTask] = useState('');
    const [taskList, setTaskList] = useState<string[]>([]);
    const [searchInput, setSearchInput] = useState('');
    const [completedTasks, setCompletedTasks] = useState<number[]>([]);

    const handleAddTask = () => {
        if (task.trim() !== '') {
            setTaskList([...taskList, task]);
            setTask('');
        }
    };

    const handleTaskInputChange = (event: any) => {
        setTask(event.target.value);
    };

    const handleTaskInputKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    };

    const handleRemoveTask = (index: number) => {
        const updatedTaskList = [...taskList];
        updatedTaskList.splice(index, 1);
        setTaskList(updatedTaskList);
    };
    const filteredTaskList = taskList.filter(task =>
        task.toLowerCase().includes(searchInput.toLowerCase())
    );

    const toggleTaskCompletion = (index: number) => {
        if (completedTasks.includes(index)) {
            setCompletedTasks(completedTasks.filter(taskIndex => taskIndex !== index));
        } else {
            setCompletedTasks([...completedTasks, index]);
        }
    };


    return (
        <>
            <IonPage>
                <Header setSearchInput={(value) => setSearchInput(value)} searchInput={searchInput} />
                <IonContent>
                    <div className='addTask'>
                        <IonInput
                            className='addInput'
                            label="Add Task"
                            labelPlacement="floating"
                            fill="outline"
                            placeholder="Add Task"
                            value={task}
                            onIonChange={handleTaskInputChange}
                            onKeyPress={handleTaskInputKeyPress}
                        ></IonInput>
                        <IonButton size='large' onClick={handleAddTask}>Add</IonButton>
                    </div>
                    <div className='taskItem'>
                        <ul>
                            {filteredTaskList.map((task, index) => (
                                <li key={index} className={completedTasks.includes(index) ? 'completed-task' : ''}>
                                    <IonButton>
                                        <input
                                            type="checkbox"
                                            onChange={() => toggleTaskCompletion(taskList.indexOf(task))}
                                            checked={completedTasks.includes(taskList.indexOf(task))}
                                        />
                                    </IonButton>
                                    <span><h3>{task}</h3></span>
                                    <IonButton onClick={() => handleRemoveTask(taskList.indexOf(task))}>
                                        <IonIcon slot='icon-only' icon={trash} />
                                    </IonButton>
                                </li>
                            ))}
                        </ul>
                    </div>
                </IonContent>
            </IonPage>
        </>
    );
};

export default Index;
