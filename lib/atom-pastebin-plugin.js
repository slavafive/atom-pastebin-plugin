'use babel';

import AtomPastebinPluginView from './atom-pastebin-plugin-view';
import { CompositeDisposable } from 'atom';

export default {

  atomPastebinPluginView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomPastebinPluginView = new AtomPastebinPluginView(state.atomPastebinPluginViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomPastebinPluginView.getElement(),
      visible: false
    });

    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-pastebin-plugin:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomPastebinPluginView.destroy();
  },

  serialize() {
    return {
      atomPastebinPluginViewState: this.atomPastebinPluginView.serialize()
    };
  },

  getPastebinLanguage(atomLanguage) {
      var languages = {
          'C' : 'c',
          'C++' : 'cpp',
          'C#' : 'csharp',
          'Clojure' : 'clojure',
          'CoffeeScript' : 'coffeescript',
          'CSS' : 'css',
          'GitHub Markdown' : 'markdown',
          'Go' : 'go',
          'HTML' : 'html5',
          'Java': 'java',
          'JavaScript' : 'javascript',
          'JSON' : 'json',
          'Makefile' : 'make',
          'Objective-C' : 'objc',
          'Objective-C++' : 'objc',
          'Perl' : 'perl',
          'PHP' : 'php',
          'Python' : 'python',
          'Ruby' : 'ruby',
          'Rust' : 'rust',
          'SQL' : 'sql',
          'XML' : 'xml',
          'YAML' : 'yaml'
      }
      var result = languages[atomLanguage]
      return typeof(result) == "undefined" ? null : result
  },

  toggle() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
        let selection = editor.getSelectedText()
        if (selection == "") {
            atom.notifications.addWarning("Code fragment was not selected")
            return
        }
        let refactoredSelection = this.removeMultipleTabs(selection)
        let atomLanguage = atom.workspace.getActiveTextEditor().getGrammar().name
        this.performPastebinRequest(refactoredSelection, 'Title', this.getPastebinLanguage(atomLanguage))
        }
    },

  performPastebinRequest(text, title, language) {
    var PastebinAPI = require('pastebin-js');
    pastebin = new PastebinAPI({
              'api_dev_key' : '738170ddf3e529e690dbf731a2f6f49b',
             });
    pastebin.createPaste(text, title, language).then(function(data) {
        atom.notifications.addSuccess(data)
    }).fail(function(err) {
        atom.notifications.addError(err);
    })

    },

    removeMultipleTabs(str) {
        var currentStr = str
        while (true) {
            var values = this.removeFirstTabs(currentStr)
            if (values[0]) {
                currentStr = values[1]
            } else {
                return values[1]
            }
        }
    },

    removeFirstTabs(str) {
        var lines = str.split(/\r?\n/)
        var areAllNonEmptyLinesRefactored = true
        var areAllLinesEmpty = true
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].length == 0) {
                continue
            } else if (/\s/.test(lines[i].substr(0, 1))) {
                lines[i] = lines[i].substr(1, lines[i].length - 1)
                areAllLinesEmpty = false
            } else {
                areAllNonEmptyLinesRefactored = false
                break
            }
        }
        result = areAllNonEmptyLinesRefactored && !areAllLinesEmpty
        return result ? [result, lines.join('\n')] : [result, str]
    }

};
