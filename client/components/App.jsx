import React from 'preact';

import parseToDiff from '../utils/parseToDiff';
import diff from '../utils/diff';
import { Diff2Html } from 'diff2html';
import $ from 'jquery';
//import Diff2HtmlUI from '../../node_modules/diff2html/dist/diff2html-ui';

import '../../node_modules/diff2html/dist/diff2html.css';

console.log('sample:');
console.log(
  "Expected Object({ id: 'NAV', type: 'OPEN_RECORD', content: Object({ appId: 'n', tblId: 2, recId: 3, nextRecordId: 4, previousRecordId: 5 }) }) to equal Object({ id: 'NAV', type: 'OPEN_RECORD', content: Object({ appId: 1, tblId: 2, recId: 3, nextRecordId: 4, previousRecordId: 5 }) })"
);
console.log();
console.log('sample');
console.log(
  "Expected [ Object({ id: 'NAV', type: 'SAVE_RECORD', content: Object({ appId: '1', tblId: '2', recId: null, changes: Object({ 4: Object({ fieldName: 'col_num', fieldDef: Object({ id: 4, builtIn: false, datatypeAttributes: true }), newVal: Object({ value: 'hi', display: 'there' }) }), 5: Object({ fieldName: 'col_builtin', fieldDef: Object({ id: 5, builtIn: true }), newVal: Object({ value: '5', display: 'no edit' }) }) }) }) }), Object({ id: 'NAV', type: 'SAVE_RECORD_ERROR', content: Object({ appId: '1', tblId: '2', recId: null, errors: Object({ data: Object({ response: Object({ errors: \"<circular reference: Object>\" }) }), response: Object({ status: null, data: Object({ response: Object({ status: null }) }) }) }) }) }), Object({ id: 'NAV', type: 'SAVE_RECORD_COMPLETE', content: Object({ appId: '1', tblId: '2', recId: null }) }) ] to equal [ Object({ id: null, type: 'SAVE_RECORD', content: Object({ appId: '1', tblId: '2', recId: null, changes: Object({ 4: Object({ fieldName: 'col_num', fieldDef: Object({ id: 4, builtIn: false, datatypeAttributes: true }), newVal: Object({ value: 'hi', display: 'there' }) }), 5: Object({ fieldName: 'col_builtin', fieldDef: Object({ id: 5, builtIn: true }), newVal: Object({ value: '5', display: 'no edit' }) }) }) }) }), Object({ id: null, type: 'SAVE_RECORD_ERROR', content: Object({ appId: '1', tblId: '2', recId: null, errors: \"<jasmine.any(Object)>\" }) }), Object({ id: null, type: 'SAVE_RECORD_COMPLETE', content: Object({ appId: '1', tblId: '2', recId: null }) }) ]"
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { jasmineDiffText: '' };
  }

  onTextChange(event) {
    this.setState({ jasmineDiffText: event.target.value });
  }

  onClickHandler() {
    console.log(this.state.jasmineDiffText);
    // parse to 2 strings so we can diff them
    const diffArr = parseToDiff(this.state.jasmineDiffText);
    // create diff
    const diffStr = diff(diffArr[0], diffArr[1]);
    // print the diff
    //Diff2Html.getPrettyHtml;
    //Diff2HtmlUI.
    //    var diff2htmlUi = new Diff2HtmlUI({ diff: diffStr });
    var diff2htmlUi = new Diff2HtmlUI({ diff: diffStr });

    //TODO add filename with "Actual", "Expected"
    diff2htmlUi.draw('#diff', {
      inputFormat: 'diff',
      outputFormat: 'side-by-side',
      matching: 'word'
    });
    diff2htmlUi.draw('#diff2', {
      inputFormat: 'diff',
      outputFormat: 'side-by-side',
      matching: 'line'
    });
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 1200,
          margin: 'auto',
          marginTop: 50
        }}
      >
        <textarea
          rows="15"
          cols="100"
          value={this.state.jasmineDiffText}
          onChange={this.onTextChange.bind(this)}
        />
        <button onClick={this.onClickHandler.bind(this)}>Diff</button>
      </div>
    );
  }
}
