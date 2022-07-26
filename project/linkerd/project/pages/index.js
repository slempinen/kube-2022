import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  const initialTodos = []
  const [todos, setTodos] = useState(initialTodos)
  const [input, setInput] = useState('')

  const handleAddTodo = useCallback(async (event) => {
    event.preventDefault()
    const newTodoContent = input
    const newTodo = { id: -1, todo: newTodoContent, isdone: false }
    setTodos(currentTodos => currentTodos.concat(newTodo))

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ todo: input })
    }

    await fetch(`/todos`, options )
  }, [input])

  const handleUpdateTodo = async (event) => {
    const todoId = parseInt(event.target.id)
    const options = {
      method: 'PUT',
    }

    await fetch(`/todos/${todoId}`, options )
    setTodos(currentTodos => currentTodos.map(todo => todo.id === todoId ? { ...todo, isdone: !todo.isdone } : todo))
  }

  useEffect(() => {
    const fetchData = async () => {
      const todosResponse = await fetch(`/todos`)
      const todosJson = await todosResponse.json()
      setTodos(todosJson.todos)
    }
    fetchData()
  }, [handleAddTodo])


  return (
    <>
      <Head>
        <title>Project</title>
        <meta name="description" content="Project for devops with kubernetes 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image height={500} width={500} src='/api/image.jpg' alt='' />
      <form onSubmit={handleAddTodo} >
        <input type='text' value={input} onChange={e => setInput(e.target.value)}/>
        <button type='submit'>add todo</button>
      </form>
      <ul>
        {todos.map((todo) =>
          <li key={todo.id}>
            {todo.todo}
            <input type='checkbox' checked={todo.isdone} onChange={handleUpdateTodo} id={todo.id}/>
          </li>)}
      </ul>
    </>
  )
}
