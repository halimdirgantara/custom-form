import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import useSWR from 'swr'
import axios from '@/lib/axios'
import ButtonEdit from '@/components/ButtonEdit'
import Link from 'next/link'

const Users = () => {
    const { data: userlist } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
    )

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    User List
                </h2>
            }>
            <Head>
                <title>Custom Form - User List</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr key="table-head">
                                            <th
                                                scope="col"
                                                className="px-6 py-3">
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3">
                                                Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3">
                                                Role
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3">
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody key="table-body">
                                        {userlist &&
                                            userlist.data.map(user => (
                                                <tr
                                                    key={user?.id}
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <td
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {user?.name}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {user?.email}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {user?.role}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {user?.status}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <ButtonEdit>
                                                            <Link
                                                                key={user?.name}
                                                                href={`/users/${user?.id}`}>
                                                                Edit User
                                                            </Link>
                                                        </ButtonEdit>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Users
