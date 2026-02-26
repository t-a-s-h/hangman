# Hangman

A simple game of hangman. Lets you to play against the computer as either the executioner or the condemned.
## Tech
React.
## Run

### Option 1
- View demo [here](https://t-a-s-h.github.io/hangman/).
### Option 2
- Download [here](https://github.com/t-a-s-h/hangman/archive/refs/heads/main.zip).
- Unzip folder.
- Navigate to unzipped folder in terminal.
- Run `npm start`
## Current status
 #working #on_hold #needs_ui_improvements
## Notes
An API was originally used for word retrieval, but removed as that particular API was unreliable, however the original words from that API are still being used in the app. That being said, there is the potential for the game to give "unsavoury" words as prompts. This will likely be changed in the future.
## Future considerations
### Structural changes
- Update `words.json` to get words from system dictionary (e.g. `/usr/share/dict/words`).
### UI / UX improvements
- Remove idea of "executioner" and "condemned" from the game.
- Replace with less violent context without changing the name of the game or making it so that is cannot be played with pencil and paper.
- Solidify current idea about how to do this.
