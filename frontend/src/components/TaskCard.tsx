export default function TaskCard({task}) {

    return (
        <div className="bg-white shadow shadow-slate-300 p-4 pb-8 mx-auto relative rounded-2xl flex justify-center items-center w-2/3">
            <div className="text-gray-500 text-sm">{task.title}</div>

            <span className="px-3 text-xs absolute bg-red-600 text-white rounded-2xl bottom-2 right-2">{task.priority}</span>
        </div>
    )
}