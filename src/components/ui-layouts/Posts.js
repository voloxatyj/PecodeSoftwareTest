import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core/styles'
import { useUserData } from '../../context/DataContext'
import { VIEW_ITEM, ADD_ITEM, DELETE_ITEM } from '../../context/types'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

const useStyles = makeStyles((theme) => ({
  root: {
		display: 'flex',
		flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    '& > *': {
      padding: theme.spacing(1),
    },
  },
  gridList: {
    width: "100%",
		height: "100%",
  },
  icon: {
		color: 'rgba(255, 255, 255, 0.54)',
		cursor: "pointer"
	},
	title: {
    color: theme.palette.primary,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

export const Posts = ({ posts, loading }) => {
	const history = useHistory()
	const classes = useStyles();
	const [{type, my_list}, dispatch] = useUserData()
	const [items, setItems] = useState(my_list)

	useEffect(()=>{
		setItems(my_list)
	},[my_list])

  const handleChecked = (id) => {
		const index = items.findIndex(item=>item.id===id)
		items[index].checkbox = !items[index].checkbox		
		localStorage.setItem('mywatchlist', JSON.stringify(items))
		setItems(JSON.parse(localStorage.getItem('mywatchlist')))
	};
	
	const addItem = item => {
		item.checkbox = false
		dispatch({
			type: ADD_ITEM,
			payload: item
		})
	}

	const deleteItem = id => {
		dispatch({
			type: DELETE_ITEM,
			payload: id
		})
	}

	const viewItem = item => {
		dispatch({
			type: VIEW_ITEM,
			payload: item
		})
	}

	if (loading) {
		return <h2>Loading...</h2>;
	} else if(posts.length === 0 && items.length === 0) {
		return <h2>No item can find...</h2>;
	} else if(history.location.pathname === '/mywatchlist') {
		posts = items
	}

  return (
   	<div className={classes.root}>
			 {posts.length > 0 ?
			<GridList cellHeight={posts[0].image !== undefined ? 300:100} cols={posts[0].image !== undefined ? 2:4} spacing={50} className={classes.gridList}>
				{posts.map(item => (
						<GridListTile key={item.id}>
							{item.image !== undefined ? <img src={item.image} alt={item.name} /> : null}
								{history.location.pathname === '/mywatchlist' ?
								<Checkbox
									checked={item.checkbox}
									onChange={()=>handleChecked(item.id)}
									inputProps={{ 'aria-label': 'primary checkbox' }}
								/> : null}
								<GridListTileBar
									title={item.name}
									classes={{
										root: classes.titleBar,
										title: classes.title,
									}}
									actionIcon={
										<div style={{display: "inline-flex"}}>
											{type !== 'locations' && type !== 'characters' ?
											<IconButton aria-label={`info`} className={classes.icon} onClick={()=>{
												item.checkbox === undefined ? addItem(item) : deleteItem(item.id)}}>
												{type === 'episodes' ? <AddCircleOutlineIcon /> : <HighlightOffIcon />}
											</IconButton> : null}
											<IconButton aria-label={`info about ${item.name}`} className={classes.icon} onClick={()=>viewItem(item)}>
												<InfoIcon />
											</IconButton>
										</div>
									}
								/>
							</GridListTile>
					))
				}
				</GridList> : null}
			</div>
  );
};