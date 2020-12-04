import React, { useState, useMemo } from 'react'
import { useUserData } from './../../context/DataContext'
import axios from 'axios'
import { Posts } from '../ui-layouts/Posts'
import { Pagination } from '../ui-layouts/Pagination'

export const Characters = () => {
	const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);
	
	useMemo(() => {
		const fetchPosts = async () => {
			setLoading(true);
      const res = await axios.get('https://rickandmortyapi.com/api/character/');
      setPosts(res.data.results);
      setLoading(false);
    };
    fetchPosts();
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
