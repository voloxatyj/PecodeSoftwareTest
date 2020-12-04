import React, { useRef } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import { useUserData } from '../../context/DataContext'
import { STOP_VIEW_ITEM } from '../../context/types'

const useStyles = makeStyles((theme) => ({
  root: {
		maxWidth: 600,
		display: "grid",
    backgroundColor: "transparent",
    margin: "10% 30%",
    width: "70%",
		boxShadow: "rgba(0, 0, 0, 0.7) 0px 5px 8px 0px, rgba(0, 0, 0, 0.7) 0px 7px 20px 20px",
		color: theme.palette.primary.contrastText,
		cursor: "pointer"
	},
  media: {
    height: 400,
	},
}));

export const Item = ({item}) => {
	const classes = useStyles()
	const card = useRef()
	const [state, dispatch] = useUserData()

	const closeCard = (event) => {
		if(event.target.className === 'modal-content'){
			dispatch({
				type: STOP_VIEW_ITEM
			})
		}
	}
	return(
		<div className="modal-content" onClick={(event)=>closeCard(event)}>
			<Card className={classes.root} ref={card}>
				{item.image ? <CardMedia
					image={item.image}
					title="Profile image"
					className={classes.media}
				/> : null}
				<CardContent className={classes.content}>
					<Typography
						variant="h5"
					>
						name: {item.name}
					</Typography>
					{item.image ? <Typography variant="body1">
						gender: {item.gender}<br/>
						species: {item.species}<br/>
						status: {item.status}
					</Typography> : 
					item.dimension ?  <Typography variant="body1">
						dimension: {item.dimension}<br/>
						type: {item.type}<br/> 
					</Typography> : 
					item.air_date ? <Typography variant="body1">
						air_date: {item.air_date}<br/>
						episode: {item.episode}<br/> 
					</Typography> : null}
					<Typography variant="body2">
						createdAt: {moment(item.created).format('LLLL')}
					</Typography>
				</CardContent>
			</Card>
		</div>
		)
}
