# Paste Creator and Inserter

This plugin integrates Pastebin service into Atom IDE. It can automatically create new pastes by selecting a code fragment in your editor and insert code by paste ID or corresponding URL.

:star: Designed by Vyacheslav Efimov and Denis Fevralyov

## Creating pastes

In order to create a new paste select a code fragment that you want to share on Pastebin.com. Then perform any of these action:
* Navigate to Packages :arrow_right: Pastebin :arrow_right: Create Paste
* Click on the mouse and choose: Create Paste
* Press Ctrl-Alt-C

The language will be recognised by Pastebin according to the type of current file in Atom where the code fragment is selected. The following languages and formats are supported (otherwise, the paste will be created as plain text):
* C
* C++
* C#
* Clojure
* CoffeeScript
* CSS
* GitHub Markdown
* Go
* HTML
* Java
* JavaScript
* JSON
* Makefile
* Objective-C
* Perl
* PHP
* Python
* Ruby
* Rust
* SQL
* XML
* YAML

After creating a new paste an Atom success notification will appear in IDE with paste URL.
## Inserting pastes

Inserting a paste into your editor can be performed by selecting a paste ID or URL to paste location in your code. Then perform any of these action:
* Navigate to Packages :arrow_right: Pastebin :arrow_right: Insert Paste
* Click on the mouse and choose: Insert Paste
* Press Ctrl-Alt-I

In case of providing a wrong paste ID or URL the error message in IDE will appear.

![A screenshot of your package](https://f.cloud.github.com/assets/69169/2290250/c35d867a-a017-11e3-86be-cd7c5bf3ff9b.gif)
