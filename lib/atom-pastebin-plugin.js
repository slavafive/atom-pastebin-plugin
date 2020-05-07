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

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
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
    console.log('AtomPastebinPlugin was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
