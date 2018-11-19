![Rock Band stream screenshot](https://i.imgur.com/oMumA7t.png)

 Adds a banner displaying the current playing song and authors. Use the web browser plugin in OBS and add index.html as a local file.
 
 Text file current.txt should contain the info, formatted as such.
 
 ```
 Artist - Song Title :: main_author, collab_author, collab_author, collab_author
 ```
 
Banner appears every 3 minutes. Text file is read right before displaying, so data can be changed in the time between.
