import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ImageList } from '@material-ui/core';
import ImageListItem from '@material-ui/core/ImageListItem';
import { ImageListItemBar } from '@material-ui/core';
import './View.css';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      padding: 20,
      width: 1000
    }
  }));

function View({kitties, show_my_kitties, show_all_kitties, image_url}) {
    
    const classes = useStyles();
    return (
        <div className="View">
          <h3>Show Kitties:</h3>
          <div>
            <input
                  type="button"
                  value="My kitties"
                  onClick={show_my_kitties}
                  />
            
            <input
                  type="button"
                  value="All kitties"
                  onClick={show_all_kitties}
                  />
          </div>
          <p>{kitties.length === 0 ? "Mint at least one kitty to show..." : ""}</p>
          <div className={classes.root}>
            <ImageList cols={4} rowHeight={225}  gap={20} className={classes.gridList}>
              {kitties.map((tile) => (
                <ImageListItem key={tile}>
                  <img src={"https://arweave.net/" + "60Y_LV_957hWcDfLZQ56LcGRbLKHOgc4d4RnJf3nLho/" + tile.toString() + ".png"} />
                  <ImageListItemBar
                    title={"Kitties #" + tile.toString()}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </div>
    )
}

export default View
