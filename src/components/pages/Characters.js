import React, { useState, useMemo } from 'react'
import { useUserData } from './../../context/DataContext'
import { Posts } from '../ui-layouts/Posts'
import { Pagination } from '../ui-layouts/Pagination'

export const Characters = () => {
	const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);
	
	useMemo(async () => {
		try {
			setLoading(true)
			const response = await fetch('https://rickandmortyapi.com/api/character/')
			const data = await response.json()
			setPosts(data.results)
			setLoading(false)
		} catch (error) {
			console.log(error)
		}
  }, []);
	
	// Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
	
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
	
	return (
		<>
			<h1 style={{textAlign: "center"}}>The Characters Blog</h1>
				<Posts posts={currentPosts} loading={loading}/>
					<div className="footer">
						<Pagination 
							postsPerPage={postsPerPage}
							totalPosts={posts.length}
							paginate={paginate}
						/>
					</div>
		</>
	)
}
