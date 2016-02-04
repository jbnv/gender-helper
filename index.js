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

var transforms = [
  ["he/she","he","she"],
  ["his/hers","his","hers"],
  ["his/her","his","her"],
  ["him/her","him","her"],
  ["He/she","He","She"],
  ["His/her","His","Her"],
  ["male/female","male","female"]
];

function transform(editor,index) {
  content = editor.getText();
  transforms.forEach(function (t) {
    pattern = new RegExp(t[0],"g");
    replacement = t[index];
    content = content.replace(pattern,replacement);
  })
  editor.setText(content);
}

function makeMale() {
  transform(getEditor(),1);
}

function makeFemale() {
  transform(getEditor(),2);
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
