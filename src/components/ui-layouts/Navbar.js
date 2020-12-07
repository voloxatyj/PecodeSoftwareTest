import React, { useEffect, useState } from 'react';
import { useUserData } from '../../context/DataContext'
import { useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';
import { StyledMenuItem, StyledMenu } from './btnstyles'
import { SET_FILTER, SET_TYPE } from '../../context/types'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "relative"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export const Navbar = () => {
  let [{type, items}, dispatch] = useUserData()
  const history = useHistory()
  if(type === null){
    type = history.location.pathname.slice(1)
  }
  const storage = JSON.parse(localStorage.getItem(`${type}`))
  const [data, setData] = useState(items)
	const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  
  useEffect(()=>{
    setData(storage)
  },[type])

  const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setPage = type => {
    dispatch({
      type: SET_TYPE,
      payload: type
    })
  }

  const handleChange = (event, type) => {
    switch (type) {
      case 'characters':
        dispatch({
          type: SET_FILTER,
          payload: data.filter(item => item.species.toLowerCase().startsWith(event.target.value) || item.status.toLowerCase().startsWith(event.target.value) || item.gender.toLowerCase().startsWith(event.target.value))
        })
        break;
      case 'episodes':
        dispatch({
          type: SET_FILTER,
          payload: data.filter(item => item.name.toLowerCase().startsWith(event.target.value) || item.air_date.toLowerCase().startsWith(event.target.value))
        })
        break;
      case 'locations':
        dispatch({
          type: SET_FILTER,
          payload: data.filter(item => item.name.toLowerCase().startsWith(event.target.value) || item.type.toLowerCase().startsWith(event.target.value) || item.dimension.toLowerCase().startsWith(event.target.value))
        })
        break;
      case 'mywatchlist':
        dispatch({
          type: SET_FILTER,
          payload: {data: data.filter(item => item.name.toLowerCase().startsWith(event.target.value)), type: 'mywatchlist'}
        })
        break;
      default:
        break;
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
						aria-label="open drawer"
						onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
					<StyledMenu
						id="customized-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<Link to="/characters" onClick={()=>setPage("characters")}>
							<StyledMenuItem>
								<i className="fas fa-users fa-2x"></i>
								<ListItemText primary="Characters" />
							</StyledMenuItem>
  					</Link>
						<Link to="/episodes" onClick={()=>setPage("episodes")}>
							<StyledMenuItem>
								<i className="fas fa-film fa-2x"></i>
								<ListItemText primary="Episodes" />
							</StyledMenuItem>
						</Link>
						<Link to="/locations" onClick={()=>setPage("locations")}>
							<StyledMenuItem>
								<i className="fas fa-map-marker-alt fa-2x"></i>
								<ListItemText primary="Locations" />
							</StyledMenuItem>
						</Link>
						<Link to="/mywatchlist" onClick={()=>setPage("mywatchlist")}>
							<StyledMenuItem>
								<i className="far fa-list-alt fa-2x"></i>
								<ListItemText primary="MyWatchList" />
							</StyledMenuItem>
						</Link>
					</StyledMenu>
          <Typography className={classes.title} variant="h6" noWrap>
            Rick and Morty test task
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => handleChange(event,type)}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
