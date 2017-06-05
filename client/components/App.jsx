import React from 'preact';

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
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
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
