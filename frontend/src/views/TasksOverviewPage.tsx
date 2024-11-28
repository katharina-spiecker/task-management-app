import TaskCard from "../components/TaskCard.tsx";
import { useEffect, useState } from "react";

export default function TasksOverviewPage() {
    const [tasks, setTasks] = useState([]);
    const [priofilter, setPrioFilter] = useState(null);

    useEffect(() => {
        let url = "http://localhost:3000/api/tasks";
        if (priofilter) {
            url += "?prio=" + priofilter;
        }
        fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error("fetch failed");
            }
            return res.json();
        })
        .then(data => {
            setTasks(data);
        })
        .catch(error => console.error(error)) 
    }, [priofilter])

    function handlePrioFilter(e) {
        setPrioFilter(e.target.value);
    }
    
    return (
       <section>
            <label className="mr-2" htmlFor="filter-prio">Priority</label>
            <select className="bg-slate-200" id="filter-prio" onChange={handlePrioFilter}>
                <option value="all">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <div className="flex">
                <div className="w-1/3 border-r-4 border-indigo-500 text-center">
                    <h3 className="mb-2">Backlog</h3>
                    <div>
                    {
                        tasks.filter(task => task.status === "pending").map((task, index) => (
                            <TaskCard key={index} task={task} />
                        ))
                    }
                    </div>
                </div>

                <div className="w-1/3 border-r-4 border-indigo-500 text-center">
                    <h3 className="mb-2">In Progress</h3>
                    <div>
                    {
                        tasks.filter(task => task.status === "in progress").map((task, index) => (
                            <TaskCard key={index} task={task} />
                        ))
                    }
                    </div>
                </div>

                <div className="w-1/3 text-center">
                    <h3 className="mb-2">Fertig</h3>
                    <div>
                    {
                        tasks.filter(task => task.status === "completed").map((task, index) => (
                            <TaskCard key={index} task={task} />
                        ))
                    }
                    </div>
                </div>
            </div>
        </section>
    )
}