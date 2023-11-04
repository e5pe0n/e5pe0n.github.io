# Ubuntu 22.04

i migrated my private dev pc from windows and mac to ubuntu 22.04, and encountered some troubles. So note solutions for them.  

## Keyboard

### Use `Capslock` as `Ctrl`

to make `Capslock` function as `Ctrl`, use [Tweaks](https://wiki.gnome.org/Apps/Tweaks).  
install it through *Ubuntu Software*, open it, then go to *Keyboard & Mouse > Additional Layout Options*.  
Check *Ctrl position > Caps Lock as Ctrl*.  

## VSCode

### `Capslock` and `Ctrl`

Even if GNOME is configured as [Use Capslock as Ctrl](#use-capslock-as-ctrl), VSCode recognize pressing `Capslock` key as `Capslock + Ctrl`, not just `Ctrl`.  
To resolve this, configure `"keyboard.dispatch": "keyCode"` in settings.  

### `Ctrl + P` / `Ctrl + N`

To move a cursor up and down in seggestions or lists by `Ctrl + P` and `Ctrl + N` in addition to `UpArrow` and `DownArrow`, add them to *Keyboard Shortcuts* as following below.  
Don't forget set `When` properly otherwise some shortcuts don't work.  

#### Ctrl + N

`Ctrl + N` is assigned to *File: New Untitled Text File* by default, and it conflicts with moving cursor down by `Ctrl + N`. i removed the shortcut from *File: New Untitled Text File*.  

|Command|When|
|:---:|:---:|
|Select Next in Quick Open|inQuickOpen|
|selectNextCodeAction|codeActionMenuVisible|
|selectNextSuggestion|suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus || suggestWidgetVisible && textInputFocus && !suggestWidgetHasFocusedSuggestion|
|showNextParameterHint|editorFocus && parameterHintsMultipleSignatures && parameterHintsVisible|

#### Ctrl + P

`Ctrl + P` is assigned to *Go to File* by default, and it conflicts with moving cursor up by `Ctrl + P`.  
i gave up `Go to File` by `Ctrl + P`, compromised and assign `Alt + P` to *Go to File* instead.  


|Command|When|
|:---:|:---:|
|Select Previous in Quick Open|inQuickOpen|
|selectPrevCodeAction|codeActionMenuVisible|
|selectPrevSuggestion|suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus || suggestWidgetVisible && textInputFocus && !suggestWidgetHasFocusedSuggestion|
|showPrevParameterHint|editorFocus && parameterHintsMultipleSignatures && parameterHintsVisible|
