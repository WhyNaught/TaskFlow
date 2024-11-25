import {useState, useEffect} from 'react'; 
import {useParams} from 'react-router-dom';
import axios from 'axios'; 

export default function TaskFlow({authenticated}) {
    const {username, taskflowId} = useParams();
    const endpoint = `http://localhost:3000/api/user/save/${username}/${taskflowId}`;
    const [modal, setModal] = useState(false); 
    const [loading, setLoading] = useState(true); 
    const [collabModal, setCollabModal] = useState(false);
    const [pending, setPending] = useState([]); 
    const [doing, setDoing] = useState([]); 
    const [closed, setClosed] = useState([]); 
    const [collaborator, setCollaborator] = useState(''); 
    const [editor, setEditor] = useState(false);  
    const [newTask, setNewTask] = useState({ 
        id: '',
        name: '', 
        description: '', 
        author: '', 
        dob: '', 
        order: '', 
        deadline: '', 
        assigned: [],
        category: ''
    }); 

    const [taskflow, setTaskFlow] = useState(''); 
    useEffect(() => {
        const fetchTaskFlow = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/user/taskflow`, { params: { taskflowId } });
                const fetchedTaskflow = response.data.taskflow;
                setTaskFlow(fetchedTaskflow);
                setPending(fetchedTaskflow.pending || []);
                setDoing(fetchedTaskflow.doing || []);
                setClosed(fetchedTaskflow.closed || []);
            } catch (err) {
                console.error('Something went wrong', err);
            } finally {
                setLoading(false); 
            }; 
        };
    
        fetchTaskFlow();
    }, [taskflowId]);

    async function handleSaveChange(e) {
        e.preventDefault(); 
        await axios.patch(endpoint, {
            pending: pending, 
            doing: doing, 
            closed: closed
        }); 
    };

    async function handleShare(e) {
        e.preventDefault(); 
        await axios.patch(`http://localhost:3000/api/user/${username}/${taskflowId}/share`, 
            {collaboratorName: collaborator}, 
            {editor: editor}
        ); 
    };

    function handleClick(category) {
        setNewTask({
            id: '',
            name: '', 
            description: '', 
            author: '', 
            dob: '', 
            order: '', 
            deadline: '', 
            assigned: [],
            category: category           
        });
        setModal(true); 
    };

    function deleteTask(id, category) {
        console.log(id); 
        if (category === 'pending') {
            const newPending = pending.filter(task => task.id !== id)
            setPending(newPending); 
        } else if (category === 'doing') {
            const newDoing = doing.filter(task => task.id !== id);
            setDoing(newDoing); 
        } else if (category === 'closed') {
            const newClosed = closed.filter(task => task.id !== id);
            setClosed(newClosed); 
        };
    };

    function handleChange(e) {
        const {name, value} = e.target; 
        setNewTask(prev => ({...prev, [name]: value}))
    }; 

    function handleTask(e) {
        e.preventDefault(); 
        const {name, description, category} = newTask; 
        const task = {id: Date.now(), name, description}; 
        if (category === 'pending') {
            setPending([...pending, task]); 
        } else if (category === 'doing') {
            setDoing([...doing, task]); 
        } else {
            setClosed([...closed, task]); 
        }; 
        setModal(false); 
    };

    if (loading) {
        return (
            <h2>Loading...</h2>
        );
    } else if (authenticated) {
        return (
            <>
                <h2>{taskflow.name}</h2>
                <h2>{taskflow.description}</h2>
                <button onClick = {() => {setCollabModal(true)}}>Share</button>
                <button onClick={handleSaveChange}>Save changes</button>
                <h3>Pending tasks</h3>
                <ul>
                    {pending.map(task => (
                        <li key = {task.id}>
                            <p>{task.name}</p>
                            <p>{task.description}</p>
                            <button>Edit Task</button>
                            <button onClick = {() => deleteTask(task.id, 'pending')}>Delete Task</button>
                        </li>
                    ))}
                </ul>
                <button onClick = {() => handleClick('pending')}>Add pending</button>
                <h3>In-progress tasks</h3>
                <ul>
                    {doing.map(task => (
                        <li key = {task.id}>
                            <p>{task.name}</p>
                            <p>{task.description}</p>
                            <button>Edit Task</button>
                            <button onClick = {() => deleteTask(task.id, 'doing')}>Delete Task</button>
                        </li>
                    ))}
                </ul>
                <button onClick = {() => handleClick('doing')}>Add doing</button>
                <h3>Closed tasks</h3>
                <ul> 
                    {closed.map(task => (
                        <li key = {task.id}>
                            <p>{task.name}</p>
                            <p>{task.description}</p>
                            <button>Edit Task</button>
                            <button onClick = {() => deleteTask(task.id, 'closed')}>Delete Task</button>
                        </li>
                    ))}
                </ul>
                <button onClick = {() => handleClick('closed')}>Add closed</button>
                {modal && 
                    <div>
                        <h3>Add task to {newTask.category}</h3>
                        <form onSubmit={handleTask}>
                            <label>
                                Task name: <input name = "name" type='text' value = {newTask.name} onChange={handleChange} required/>
                            </label>
                            <label>
                                Task description: <input name = "description" type='text' value = {newTask.description} onChange={handleChange} required/>
                            </label>
                            <button type = 'submit'>Add task!</button>
                            <button onClick={() => setModal(false)}>Cancel</button>
                        </form>
                    </div>
                }
                {collabModal && 
                    <div>
                        <h3>Add new collaborator to {taskflow.name}</h3>
                        <form onSubmit={handleShare}>
                            <label>
                                Collaborator name: <input name = "collabname" type = "text" value = {collaborator} onChange={(e) => {setCollaborator(e.target.value)}}/>
                            </label>
                            <select onChange={(e) => setEditor(e.target.value === 'editor')}>
                                <option value = 'editor'>Editor</option>
                                <option value = 'viewer'>Viewer</option>
                            </select>
                            <button type = 'submit'>Add collaborator</button>
                        </form>
                    </div>
                }
            </>
        );
    } else {
        return (
            <h2>Unauthorized</h2>
        )
    }
};