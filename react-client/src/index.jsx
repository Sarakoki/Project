import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      obj: {
      oldAuthor: "",
      newAuthor:"",
      books: "",
      
    },
    shown: ""
    }

    this.onChange=this.onChange.bind(this)
    this.search=this.search.bind(this)
    this.add=this.add.bind(this)

  }

  add () {
    console.log(this.state.obj)
    $.ajax({
      url: '/adding', 
      type: 'POST',
      data: this.state.obj,
      success: (data) => {
        console.log('succes')
      },
      error: (err) => {
        console.log('err', err);
      }
    });
     
  }

  onChange (x,e) {
    var obj = this.state.obj;
    obj[x] = e.target.value
    this.setState({obj : obj });
  }
  
search() {
  var that=this;
   $.ajax({
      url: '/searching', 
      type: 'POST',
      data: this.state.obj,
      success: (data) => {
        that.setState({shown:data[0].books})
          console.log(that.state.shown)
      },
      error: (err) => {
        console.log('err sadsa', err);
      }
    });
}

  render () {
    
    return (<div>
      <h1><center>Author</center></h1>
      <p> <font size="5"> search for an Author </font></p>
      <input value={this.state.oldAuthor} onChange={this.onChange.bind(this, 'oldAuthor')}/> <br></br> <br></br>
       <button id="but" onClick={this.search}> Search </button>
      <br></br><br></br>
      <p> <font size="5"> Add An Author </font></p>
      <input value={this.state.newAuthor} onChange={this.onChange.bind(this, 'newAuthor')}/> <br></br> <br></br>
      <p> <font size="5"> Add His Book! </font></p>
      <input value={this.state.books} onChange={this.onChange.bind(this,'books')}/> <br></br> <br></br>
       <button id="but" onClick={this.add}> Add To The List </button>
       <br></br> <br></br>

       <div>{this.state.shown}</div>

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));