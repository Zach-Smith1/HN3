const React = require("react");
const axios = require('axios');
const HNAPI = require('./fetcher.js');
const React = require("react");
const axios = require('axios');
const HNAPI = require('./fetcher.js');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [],
      page: 1,
      underConstruction: false,
      prev: false
      stories: [],
      page: 1,
      underConstruction: false,
      prev: false
    }
  }

  // Get first 30 stories on page load
  componentDidMount() {
    HNAPI.getStories('top')
    .then((stories) => {
  // Get first 30 stories on page load
  componentDidMount() {
    HNAPI.getStories('top')
    .then((stories) => {
      this.setState({
        download: totals[0]
      })
    })
  }

  // function to quickly make clickable links to "under construction" page
  makeLink = (word) => {
    return <a onClick = {this.switchPage}>{word}</a>
        stories: stories
      })
    })
  }

  // function to quickly make clickable links to "under construction" page
  makeLink = (word) => {
    return <a onClick = {this.switchPage}>{word}</a>
  }

  dragEnter = (e) => {
    e.preventDefault();
    this.setState({
      dragging: true
    })
  };

  dragLeave = (e) => {
    e.preventDefault();
    this.setState({
      dragging: false
    })
  };

  dragOver = (e) => {
    e.preventDefault();
    HNAPI.getStories('top', 0, 30)
    .then((stories) => {
      this.setState({
        file: readerFiles,
        name: name,
        category: null
      })
    };

    if (files[1] !== undefined) {
      for (const file of files) {
        const handleFileChange = async (f) => {
          try {
            await readFile(f);
          } catch (error) {
            console.log('Error reading file:', error);
          }
      };
      handleFileChange(file)
      }
      name = 'Multiple Files'
    } else {
      file = files[0]
      name = file.name;
      readFile(file)
    }
  }

  // makes API call to get next 30 stories
  nextPage = (e) => {
  // makes API call to get next 30 stories
  nextPage = (e) => {
    e.preventDefault();
    const newPage = this.state.page + 1;
    const end = newPage + 30;
    const start = end - 30;
    HNAPI.getStories('top', start, end)
    .then((stories) => {
      this.setState({
        download: totals[0],
        object: totals[1]
      })
    }
    // this code is so that the name input box doesn't disappear if you delete all the text
    if (this.state.name === '') {
      this.setState({
        name: ' '
    })
    }
  }

  getTotals = (e) => {
    e.preventDefault();
    const newPage = this.state.page - 1;
    const end = newPage + 30;
    const start = end - 30;
    let prev = newPage === 1 ? false : true;
    HNAPI.getStories('top', start, end)
    .then((stories) => {
      this.setState({
        stories: stories,
        page: newPage,
        prev: prev
      })
    })
  }

  getFineGrained = () => {
    let totals = fineGrainedBreakdown(this.state.download);
    this.setState({
      download: totals,
      show: 'none'
    })
  }

  handleDownloadCSV = (e) => {
    e.preventDefault();
    const blob = new Blob([this.state.download], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    let name = this.state.name
    console.log(name,name.slice(-3))
    if (name.slice(-3) !== "csv") {
      name += '.csv'
    }
    let storyList = [];
    // calculate time since post
    let now = Math.floor(Date.now() / 1000)
    let count = this.state.page * 30 - 30;
    this.state.stories.forEach((story) => {
      let d = story.data;
      let title;
      if (!d.url) {
        title = '(No Link) ' + d.title
      } else {
        title = d.title
      }
      let timePassed = (now - d.time)/60
        if (timePassed < 60) {
          timePassed = Math.floor(timePassed )+ ' min ago'
        } else if (timePassed/60 < 24) {
          timePassed = Math.floor(timePassed/60) + ' hours ago'
        } else {
          timePassed = Math.floor(timePassed/1440) + ' days ago'
        }
      // increment list number
      count ++;
      // create block of story data with clickable links
      storyList.push(
      <div key={count} className="storyBlocks">{count}. <a id="arrow" onClick = {this.switchPage}>👍</a> <a id = "titleLink" href={d.url}>{title}</a><br/>
        &emsp;&emsp;&emsp;{d.score} points by <a onClick = {this.switchPage}>{d.by}</a> {timePassed} | <a onClick = {this.switchPage}>hide</a> | <a onClick = {this.switchPage}>{d.descendants} comments</a>
      </div>);
    })
  }

  render() {
    // declare variable equal to null that will appear as elements once the requisite data is stored in state
    let [name, totals, fine, downloadButton, category, specifics, table, baseGraph, myGraph] = Array(9).fill(null);
    if (this.state.name) {
      // name = name of imported file
      name = <div>
        Spending Data Generated from:<br/>
        <input className='nameInput' type='text' placeholder='a' value={this.state.name} onChange={this.nameChange}/>
      </div>
    }
    if (this.state.download) {
      baseGraph = <div className='donut'>Suggested Budget<br/><Donut/></div>
      myGraph = <div className='myDonut'>My Spending<br/><MyDonut series={this.state.series}/></div>
      // Housing, Insurance, Food, Savings, Utilities, Transportation, Needs, Wants
      let list = Object.keys(this.state.object);
      let all = [<option key='base' value={null}>All</option>];
      list.forEach((cat) => {
        all.push(<option key={cat} value={cat}>{cat}</option>)
      })
      // category = selector dropdown of all payment categories from initial csv file
      category =
        <form>
          <select className='categoryWheel' name="category" onChange={this.addCategory}>
            {all}
          </select>
          <label id='categoryLabel' htmlFor='category'>&emsp;Show</label>
        </form>
      // download button = button to download the table displayed on screen as a csv file to local device
      downloadButton = <button onClick={this.handleDownloadCSV}>Download Table</button>
      table = <div className="tableDiv">
        <CsvToHtmlTable
          data={this.state.download}
          csvDelimiter=","
        />
      </div>
    }
    if (this.state.category) {
      // totals = button that shows all transactions from imported csv file aggregated by type/ category
      totals = <button style={{ display: this.state.show }} onClick={this.getFineGrained}>Combine Payments</button>
    }

    return (
      <div>
        <h1>
          <span id="nav">&ensp;<a id="home" onClick={this.startPage}>Spending Tracker</a></span><br />
        </h1>
        <div className='grid'>
        <div className={`drag-drop-input ${this.state.dragging ? 'dragging' : ''}`}
          onDragEnter={this.dragEnter} onDragLeave={this.dragLeave}
          onDragOver={this.dragOver} onDrop={this.dragDrop}>
          {this.file ? (<div>File: {this.name}</div>) :
          (<div className='dragMessage'><strong>Drag and Drop Credit Card or Bank Statement(s)</strong><br/> or click to browse</div>)}
          <input className ='inputButton' type='file' name='file' onChange={this.importFile} multiple/>
          <label htmlFor='file'></label>
        </div>
        {baseGraph}
        {myGraph}
        <div className='name'>{name}</div>
        <div className='totals'>{totals}</div>
        <div className='specifics'>{specifics}</div>
        <div className='downloadButton'>{downloadButton}</div>
        <div className='category'>{category}</div>
        <div className='table'>{table}</div>
        </div>
      </div>
    );
  }
}


  export default App;
