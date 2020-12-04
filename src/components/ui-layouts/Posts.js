import React from 'react';
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import { makeStyles } from '@material-ui/core/styles'
import { useUserData } from '../../context/DataContext';
import { VIEW_ITEM } from '../../context/types'

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
	const classes = useStyles();
	const [state, dispatch] = useUserData()

	const viewItem = item => {
		dispatch({
			type: VIEW_ITEM,
			payload: item
		})
	}

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
   	<div className={classes.root}>
			<GridList cellHeight={posts[0].image?300:100} cols={posts[0].image?2:1} spacing={50} className={classes.gridList}>
				{posts.map(item => (
						<GridListTile key={item.id}>
							{item.image ? <img src={item.image} alt={item.name} /> : null}
								<GridListTileBar
									onClick={()=>viewItem(item)}
									title={item.name}
									classes={{
										root: classes.titleBar,
										title: classes.title,
									}}
									actionIcon={
										<IconButton aria-label={`info about ${item.name}`} className={classes.icon}>
											<InfoIcon />
										</IconButton>
									}
								/>
							</GridListTile>
					))
				}
				</GridList>
			</div>
  );
};