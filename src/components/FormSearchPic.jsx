import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class FormSearchPic extends React.Component {
  constructor() {
    super();
    this.state = { pictures: [] };
    this.tukhoa = React.createRef();
  }

  async timhinh(e) {
    let tk = this.tukhoa.current.value;
    let page = 1;
    let per_page = 20;
    let url = `https://api.unsplash.com/search/photos?query=${tk}&page=${page}&per_page=${per_page}&client_id=qSl1Xitpvb1C_PaPtIRZoUn53quqziYfD1d5i2POXHI`;
    await axios.get(url)
      .then((res) => {
        let pictures = res.data.results.map((p, index) => {
          return <img key={index} src={p.urls.regular} height="150" />;
        });
        this.setState({ pictures: pictures });
      })
      .catch((error) => { console.log('Có lỗi nè : \n', error); });
  }

  render() {
    let listPic = this.state.pictures.map((pic, index) => {
      return <div key={index}>{pic}</div>;
    });

    return (
      <div className='ui segment'>
        <form className="ui form">
            <div className='field'>
                <label htmlFor="">Image Search</label> <br />
                <input ref={this.tukhoa} className="form-control" />
                <button onClick={() => this.timhinh()} type="button" className="btn btn-primary">Search</button> <br />
                Found: {this.state.pictures.length} images
            </div>

        </form>
        <div id="kqSeachPic" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {listPic}
        </div>
      </div>
    );
  }
}

export default FormSearchPic;