# DokuTris
A clone of [Woodoku by Tripledot Studios](https://play.google.com/store/apps/details?id=com.tripledot.woodoku) using the [p5.js library.](https://https://p5js.org/)

![start_game](https://user-images.githubusercontent.com/46922184/162483739-fcb8d891-8733-4b83-a706-89a55d659d99.png)

## Release Notes
### stable v1.01
Main changes:
- Added Menus and fixed/added UI elements
- Can now save stats and overall stats for progression
- Bag system implemented to reduce RNG
- Touchscreen devices can now use the app

Minor changes:
- S/Z and J/L pieces now show in all variations
- Start screen color for defaultSkin is now a better color. Sorry about that!

### stable v1
- Base game established.

## Mechanics

  As the name implies, it is a no-gravity, block-building game with Sudoku-esque rules. 
In this game, you place pieces and clear spaces to get points. You lose when you can't fit the given pieces to the board.
The clears in this game are the things that you look for in Sudoku: vertical, horizontal, and blocks of 3-by-3's.

Unlike the block-stacking game, rotations are not allowed here.

## Placing blocks:
- You select blocks by clicking to a insertable piece to a board. You can tell if a piece does not fit if it has a red outline.
- You place blocks by moving your mouse to a location on the board. Then you click when the board highlights a piece.

![placing_pieces](https://user-images.githubusercontent.com/46922184/162483826-60d33663-9517-4f32-82f9-ae4c9efe663e.png)


## Gaining points:
- You gain points by placing blocks. The bigger the blocks, the higher the score gained.
- You can also gain points by comboing. Clearing consecutively gives you more points than separate clears.
- And finally, you can gain points by clearing more things using a single piece. The setups for multiple clears are difficult, but you can gain the most points by doing so.

![dafault_skin](https://user-images.githubusercontent.com/46922184/160288874-32810fa9-d525-4a6e-b41a-b529ebf86002.png)

 _(Points gained for placing the block: 1200 for the 4-Clear, 40 for the piece placement)_

  
## Opening the game
To open the game, simply extract the .zip file when you (click the code button) -> (download the ZIP file). Then you open the index.html file using the browser of your choice.

This is probably the last major update for this small web-app. Thank you for checking out this thing. I'm pretty proud I did this. :smile: