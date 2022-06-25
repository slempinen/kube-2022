import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  const initialTodos = []
  const [todos, setTodos] = useState(initialTodos)
  const [input, setInput] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const todosResponse = await fetch(`/todos`)
      const todosJson = await todosResponse.json()
      setTodos(todosJson.todos)
    }
    fetchData()
  }, [])

  const handleAddTodo = async (event) => {
    event.preventDefault()
    setTodos(currentTodos => currentTodos.concat(input))

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ todo: input })
    }

    await fetch(`/todos`, options )

  }

  return (
    <>
      <Head>
        <title>Project</title>
        <meta name="description" content="Project for devops with kubernetes 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image height={500} width={500} src='/api/image.jpg' />
      <form onSubmit={handleAddTodo} >
        <input type='text' value={input} onChange={e => setInput(e.target.value)}/>
        <button type='submit'>add todo</button>
      </form>
      <ul>
        {todos.map((todo, index) => <li key={index}>{todo}</li>)}
      </ul>
    </>

  )
}
