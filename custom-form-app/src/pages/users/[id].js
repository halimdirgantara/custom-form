/* eslint-disable linebreak-style */
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import useSWR from 'swr'
import axios from '@/lib/axios'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const UserPage = () => {
    const [user, setUser] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [status, setStatus] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState({})
    const [isDisabled, setIsDisabled] = useState(true)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (id) {
            axios
                .get(`api/user/${id}`)
                .then(response => {
                    setUser(response.data)
                    setName(response.data.name)
                    setEmail(response.data.email)
                    setRole(response.data.role)
                    setStatus(response.data.status)
                })
                .catch(error => console.log(error))
        }
    }, [id])

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const handleSubmit = async event => {
        event.preventDefault()
        await csrf()
        const response = axios.put(`/api/user/${id}`, {
            name,
            email,
            role,
            status,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
        })
        console.log(response)
        // if (response.status === 200) {
        //     router.push('/users')
        // } else {
        //     console.log('Error updating user')
        // }
    }

    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleEditButtonClick = () => {
        setIsDisabled(!isDisabled)
    }

    const isPasswordMatched = () => {
        if (password === passwordConfirmation) {
            return true
        }
        return false
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    User
                </h2>
            }>
            <Head>
                <title>Custom Form - edit user</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="relative overflow-x-auto">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Name
                                        </label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={name}
                                            className="block mt-1 w-full"
                                            onChange={event =>
                                                setName(event.target.value)
                                            }
                                            required
                                            disabled={isDisabled}
                                        />
                                        <InputError
                                            messages={errors.name}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Email
                                        </label>
                                        <Input
                                            id="email"
                                            type="text"
                                            value={email}
                                            className="block mt-1 w-full"
                                            onChange={event =>
                                                setEmail(event.target.value)
                                            }
                                            required
                                            disabled={isDisabled}
                                        />
                                        <InputError
                                            messages={errors.email}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Role
                                        </label>
                                        <Input
                                            id="role"
                                            type="text"
                                            value={role}
                                            className="block mt-1 w-full"
                                            onChange={event =>
                                                setRole(event.target.value)
                                            }
                                            disabled={isDisabled}
                                            required
                                        />
                                        <InputError
                                            messages={errors.role}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Status
                                        </label>
                                        <Input
                                            id="status"
                                            type="text"
                                            value={status}
                                            className="block mt-1 w-full"
                                            onChange={event =>
                                                setStatus(event.target.value)
                                            }
                                            required
                                            disabled={isDisabled}
                                        />
                                        <InputError
                                            messages={errors.status}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                value={password}
                                                className="block mt-1 w-full"
                                                onChange={event =>
                                                    setPassword(
                                                        event.target.value,
                                                    )
                                                }
                                                disabled={isDisabled}
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 px-3 text-gray-400 focus:outline-none hover:text-gray-500"
                                                onClick={toggleShowPassword}>
                                                {showPassword ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-6a1 1 0 00-1 1v2a1 1 0 002 0v-2a1 1 0 00-1-1z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.562 13.681A10.943 10.943 0 0110 16.5c-3.413 0-6.526-1.564-8.562-4.019a1.5 1.5 0 010-2.322C3.474 8.064 6.587 6.5 10 6.5s6.526 1.564 8.562 4.019a1.5 1.5 0 010 2.322zM10 8.5a3 3 0 110 6 3 3 0 010-6zm0 1.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        <InputError
                                            messages={errors.password}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Password Confirmation
                                        </label>
                                        <div className="relative">
                                            <Input
                                                id="passwordConfirmation"
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                value={passwordConfirmation}
                                                className="block mt-1 w-full"
                                                onChange={event =>
                                                    setPassword(
                                                        event.target.value,
                                                    )
                                                }
                                                disabled={isDisabled}
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 px-3 text-gray-400 focus:outline-none hover:text-gray-500"
                                                onClick={toggleShowPassword}>
                                                {showPassword ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-6a1 1 0 00-1 1v2a1 1 0 002 0v-2a1 1 0 00-1-1z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.562 13.681A10.943 10.943 0 0110 16.5c-3.413 0-6.526-1.564-8.562-4.019a1.5 1.5 0 010-2.322C3.474 8.064 6.587 6.5 10 6.5s6.526 1.564 8.562 4.019a1.5 1.5 0 010 2.322zM10 8.5a3 3 0 110 6 3 3 0 010-6zm0 1.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        <InputError
                                            messages={
                                                errors.passwordConfirmation
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            onClick={handleEditButtonClick}>
                                            {isDisabled ? 'Edit' : 'Cancel'}
                                        </button>
                                        <button
                                            type="submit"
                                            className={`ml-4 px-4 py-2 text-sm font-medium text-white rounded-md ${
                                                isDisabled
                                                    ? 'bg-gray-500 cursor-not-allowed'
                                                    : 'bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                                            }`}
                                            disabled={isDisabled}>
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
export default UserPage
