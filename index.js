var CompositeDisposable, GenderHelper;

CompositeDisposable = require('atom').CompositeDisposable;

function getEditor() {
  editor = atom.workspace.getActiveTextEditor();
  if (!editor) {
    console.log("no current editor!");
    editor = {};
  }
  if (!editor.insertText) {
    console.log("no 'insertText' function!",editor);
    editor.insertText = function(){};
  }
  return editor;
}

function makeMale() {
  getEditor().insertText('male!');
}

function makeFemale() {
  getEditor().insertText('female!');
}

module.exports = GenderHelper = {

  subscriptions: null,

  activate: function(state) {
    this.subscriptions = new CompositeDisposable;
    commands = {
      'gender-helper:male': makeMale,
      'gender-helper:female': makeFemale
    };
    return this.subscriptions.add(atom.commands.add('atom-workspace', commands));
  },

  deactivate: function() {
    return this.subscriptions.dispose();
  },

  serialize: function() {
    return {};
  }
};
