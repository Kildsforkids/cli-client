import axios from 'axios';
import React, { useEffect, useState } from 'react';
import OutputField from './components/OutputField';
import { ICommand } from './types';

enum KeyEvents {
    ArrowUp = "ArrowUp",
    ArrowDown = "ArrowDown"
}

function App() {

    const [inputValue, setInputValue] = useState('')
    const [outputValue, setOutputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [commands, setCommands] = useState<ICommand[]>([])
    const [currentCommandIndex, setCurrentCommandIndex] = useState(-1)

    useEffect(() => {
        fetchCommands()
    }, [])

    function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (inputValue.trim().length !== 0) {
            sendCommand()
        }
        setInputValue('')
        fetchCommands()
    }

    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value)
    }

    function keyDownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
        switch (event.key) {
            case KeyEvents.ArrowUp:
                event.preventDefault()
                showNextHint()
                break;
            case KeyEvents.ArrowDown:
                event.preventDefault()
                showPreviousHint()
                break;
            default:
                setCurrentCommandIndex(commands.length)
        }
    }

    function showNextHint() {
        if (commands.length > 0) {
            const index = currentCommandIndex === 0 ? 0 : currentCommandIndex - 1
            setInputValue(commands[index].value)
            setCurrentCommandIndex(index)
        }
    }

    function showPreviousHint() {
        if (currentCommandIndex < commands.length) {
            setCurrentCommandIndex(currentCommandIndex + 1)
            setInputValue(commands[currentCommandIndex].value)
        }
    }

    async function sendCommand() {
        setOutputValue('')
        setIsLoading(true)
        const response = await axios.post<string>('/api/cmd', {
            value: inputValue
        })
        setOutputValue(response.data)
        setIsLoading(false)
    }

    async function fetchCommands() {
        await axios.get<ICommand[]>('/api/cmd')
            .then(response => {
                setCommands(response.data)
                setCurrentCommandIndex(response.data.length)
            })
    }

    return (
        <div className="flex flex-col items-center mt-60">
            <form onSubmit={submitHandler} className="w-2/6">
                <input
                    value={inputValue}
                    onChange={changeHandler}
                    onKeyDown={keyDownHandler}
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Enter command..." />
            </form>
            <OutputField value={outputValue} isLoading={isLoading} />
        </div>
    );
}

export default App;
