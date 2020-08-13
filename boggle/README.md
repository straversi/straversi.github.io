## Develop on docked iPhone

0. Click Safari > Develop > Steven's iPhone > Connect to Network
1. Run `ifconfig` in terminal
2. Take note of last inet IP (something like 169.254.110.250)
3. Go to http://169.254.110.250:1234 on docked iPhone

## Left off

- [x] cube doesn't enlarge when fauxcused. That was handled by boggle-board but needs to be updated now that we're not using actual :focus.
- [x] the _actual_ focus isn't shifting to the input in boggle-board when a cube is clicked. Something to do with :focus within shadow roots? (the goal here is to get the keyboard to open on iOS, so the solution must be cross-browser-friendly)
- [x] deploy boggle endpoint to heroku
- [x] make the word box fly in when the board is solved. Probably will want to wrap [word box and solve button] in a relatively positioned div, then absolutely position the word box and solve button. That way they can fly in with the same transforms.
- [x] see if Fetch/Request API actually works on mobile Safari. Try fetching to api.steven.codes. If it doesn't work, may have to switch to XHRblahblahrequest
- [x] tapping a cube twice makes the keyboard disappear on mobile safari.
- [x] Q or Qu? dialog. Must also implement this in the server.
- [x] Make cube text smaller when text is "QU".
