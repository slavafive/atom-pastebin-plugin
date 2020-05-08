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

  toggle() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
        let selection = editor.getSelectedText()
        let refactoredSelection = this.removeMultipleTabs(selection)
        let language = atom.workspace.getActiveTextEditor().getGrammar().name
        language = language.toLowerCase()
        // atom.notifications.addInfo(language)
        this.performPastebinRequest(refactoredSelection)
        }
    },

  performPastebinRequest(text) {
    var PastebinAPI = require('pastebin-js');
    pastebin = new PastebinAPI({
              'api_dev_key' : 'd9007a3cfb8bf861338d52fa48ff8101',
             });
    pastebin.createPaste(text, "Title", 'java').then(function(data) {
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
