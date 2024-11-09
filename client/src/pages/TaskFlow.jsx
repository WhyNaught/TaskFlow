import {useState, useEffect} from 'react'; 
import {useParams} from 'react-router-dom';

export default function TaskFlow({taskflows, authenticated}) {
    const {username, taskflowId} = useParams();
    const taskflow = taskflows.find(flow => flow.id === parseInt(taskflowId))

    if (authenticated) {
        return (
            <>
                <h2>{taskflow.name}</h2>
                <h2>{taskflow.description}</h2>
            </>
        );
    } else {
        return (
            <h2>Unauthorized</h2>
        )
    }
};