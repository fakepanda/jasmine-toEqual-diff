import React from 'preact';

import parseToDiff from '../utils/parseToDiff';
import diff from '../utils/diff';
import { Diff2Html } from 'diff2html';
import $ from 'jquery';
//import Diff2HtmlUI from '../../node_modules/diff2html/dist/diff2html-ui';

import '../../node_modules/diff2html/dist/diff2html.css';

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
