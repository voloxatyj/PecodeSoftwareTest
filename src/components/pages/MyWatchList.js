import React from 'react'
import { useUserData } from '../../context/DataContext'
import { Posts } from '../ui-layouts/Posts'

export const MyWatchList = () => {
	const [{my_list},dispatch] = useUserData()

	return (
		<>
			<h1 style={{textAlign: "center"}}>MyWatchList</h1>
				{my_list.length > 0 ? <Posts posts={my_list} loading={false}/> : null}
		</>
	)
}
