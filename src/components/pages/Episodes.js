import React, { useState, useMemo } from 'react'
import { useUserData } from './../../context/DataContext'
import { Posts } from '../ui-layouts/Posts'
import { Pagination } from '../ui-layouts/Pagination'
import { SET_ITEMS } from '../../context/types'

export const Episodes = () => {
	const [{items}, dispatch] = useUserData()
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(25);
	
	useMemo(async () => {
		try {
			setLoading(true)
			const response = await fetch('https://rickandmortyapi.com/api/episode/')
			const data = await response.json()
			await dispatch({
				type: SET_ITEMS, 
				payload: {
					items: data.results,
					type: 'episodes'
				}})
			await localStorage.setItem('episodes', JSON.stringify(data.results))
			setLoading(false)
		} catch (error) {
			console.log(error)
		}
  }, []);
	
	// Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);
	
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
	
	return (
		<>
			<h1 style={{textAlign: "center"}}>The Episodes Blog</h1>
				<Posts posts={currentPosts} loading={loading}/>
				<div className="footer">
					<Pagination 
						postsPerPage={postsPerPage}
						totalPosts={items.length}
						paginate={paginate}
					/>
				</div>
		</>
	)
}
