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
        this.performPastebinRequest(selection)
        }
    },

  performPastebinRequest(text) {
    var PastebinAPI = require('pastebin-js');
    pastebin = new PastebinAPI({
              'api_dev_key' : 'd9007a3cfb8bf861338d52fa48ff8101',
             });
    pastebin.createPaste(text, "pastebin-js").then(function(data) {
        atom.notifications.addSuccess(data)
    }).fail(function(err) {
        atom.notifications.addError(err);
    })

    }

};
