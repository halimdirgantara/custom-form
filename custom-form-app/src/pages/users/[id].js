import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import useSWR from 'swr'
import axios from '@/lib/axios'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import { useRouter } from 'next/router'
import { useState } from 'react'

const UserPage = () => {
    const router = useRouter()
    const { id } = router.query

    const { data: userdata } = useSWR(`/api/user/${id}`, () =>
        axios
            .get(`/api/user/${id}`)
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
    )

    console.log(userdata)

    if (!userdata) {
        return <div>Loading</div>
    }
    const [name, setName] = useState(userdata?.name)
    const [email, setEmail] = useState(userdata?.email)
    const [role, setRole] = useState(userdata?.role)
    const [status, setStatus] = useState(userdata?.status)
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState({})
    const [isDisabled, setIsDisabled] = useState(true)

    const handleSubmit = event => {
        event.preventDefault()
        // Handle form submission here
        // name,
        // email,
        // role,
        // status,
        // password,
        // password_confirmation: passwordConfirmation,
        // setErrors,
    }

    const handleEditButtonClick = () => {
        setIsDisabled(!isDisabled)
    }


    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    User
                </h2>
            }>
            <Head>
                <title>Custom Form - {name}</title>
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
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            className="block mt-1 w-full"
                                            onChange={event =>
                                                setPassword(event.target.value)
                                            }
                                            disabled={isDisabled}
                                        />
                                        <InputError
                                            messages={errors.password}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Password Confirmation
                                        </label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            value={passwordConfirmation}
                                            className="block mt-1 w-full"
                                            onChange={event =>
                                                setPasswordConfirmation(
                                                    event.target.value,
                                                )
                                            }
                                            disabled={isDisabled}
                                        />
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
                                            className={`ml-4 px-4 py-2 text-sm font-medium text-white rounded-md ${isDisabled
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
