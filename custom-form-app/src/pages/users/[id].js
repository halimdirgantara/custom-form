import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import useSWR from 'swr'
import axios from '@/lib/axios'
import ButtonEdit from '@/components/ButtonEdit'
import Link from 'next/link'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import { useRouter } from 'next/router'
import { useState } from 'react'

const UserPage = () => {
    const router = useRouter()
    const { id } = router.query
    const { data: userpage, error } = useSWR(`/api/user/${id}`, () =>
        axios
            .get(`/api/user/${id}`)
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
    )
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    User
                </h2>
            }>

            <Head>
                <title>Custom Form - </title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="relative overflow-x-auto">
                                <form>
                                    <div className='mb-6'>
                                        <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={userpage?.name}
                                            className="block mt-1 w-full"
                                            onChange={event => setName(event.target.value)}
                                            required
                                            disabled
                                            autoFocus
                                        />
                                        <InputError messages={errors.name} className="mt-2" />
                                    </div>
                                    <div className='mb-6'>
                                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <Input
                                            id="email"
                                            type="text"
                                            value={userpage?.email}
                                            className="block mt-1 w-full"
                                            onChange={event => setEmail(event.target.value)}
                                            required
                                            disabled
                                            autoFocus
                                        />
                                        <InputError messages={errors.name} className="mt-2" />
                                    </div>
                                    <div className='mb-6'>
                                        <label for="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                                        <Input
                                            id="role"
                                            type="text"
                                            value={userpage?.role}
                                            className="block mt-1 w-full"
                                            onChange={event => setRole(event.target.value)}
                                            disabled
                                            required
                                            autoFocus
                                        />
                                        <InputError messages={errors.name} className="mt-2" />
                                    </div>
                                    <div className='mb-6'>
                                        <label for="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                        <Input
                                            id="status"
                                            type="text"
                                            value={userpage?.status}
                                            className="block mt-1 w-full"
                                            onChange={event => setStatus(event.target.value)}
                                            required
                                            disabled
                                            autoFocus
                                        />
                                        <InputError messages={errors.name} className="mt-2" />
                                    </div>
                                    <div className='mb-6'>
                                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value='********'
                                            className="block mt-1 w-full"
                                            onChange={event => setPassword(event.target.value)}
                                            autoFocus
                                        />
                                        <InputError messages={errors.name} className="mt-2" />
                                    </div>
                                    <div className='mb-6'>
                                        <label for="password_confirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password Confirmation</label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            value='********'
                                            className="block mt-1 w-full"
                                            onChange={event => setPasswordConfirmation(event.target.value)}
                                            autoFocus
                                        />
                                        <InputError messages={errors.name} className="mt-2" />
                                    </div>
                                    <button
                                        id="edit-button"
                                        className="edit-button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >Edit</button>
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
