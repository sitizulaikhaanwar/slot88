'use babel';

import Slot88View from './slot88-view';
import { CompositeDisposable } from 'atom';

export default {

  slot88View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slot88View = new Slot88View(state.slot88ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slot88View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot88:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slot88View.destroy();
  },

  serialize() {
    return {
      slot88ViewState: this.slot88View.serialize()
    };
  },

  toggle() {
    console.log('Slot88 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
