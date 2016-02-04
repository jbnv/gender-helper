var CompositeDisposable, GenderHelper, GenderHelperView;

GenderHelperView = require('./gender-helper-view');
CompositeDisposable = require('atom').CompositeDisposable;

module.exports = GenderHelper = {

  genderHelperView: null,
  modalPanel: null,
  subscriptions: null,

  activate: function(state) {
    console.log("activate!",this);
    this.genderHelperView = new GenderHelperView(state.genderHelperViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.genderHelperView.getElement(),
      visible: false
    });
    this.subscriptions = new CompositeDisposable;
    commands = {
      'gender-helper:male': this.male,
      'gender-helper:female': this.female
    };
    return this.subscriptions.add(atom.commands.add('atom-workspace', commands));
  },

  deactivate: function() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    return this.genderHelperView.destroy();
  },

  serialize: function() {
    return {
      genderHelperViewState: this.genderHelperView.serialize()
    };
  },

  male: function() {
    editor = atom.workspace.getActiveTextEditor;
    if (editor) {
      editor.insertText('male!');
    } else {
      console.log("no current editor!");
    }
  }

  female: function() {
    if (editor = atom.workspace.getActiveTextEditor) {
      editor.insertText('male!');
    }
  }
};
