import { Component } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./styles.css";
import "./App.css";
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      monsterNames: []
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        this.setState(() => {
          return { monsterNames: users };
        });
      });
  }
  onChangeSearch = (e) => {
    const searchString = e.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchString };
    });
  };
  render() {
    const { monsterNames, searchString } = this.state;
    const { onChangeSearch } = this;
    const filterMonsters = monsterNames.filter((mons) => {
      return mons.name.toLocaleLowerCase().includes(searchString);
    });

    return (
      <div className="App">
        <h1 className="title"> Monster Cards </h1>
        <SearchBox
          className={"monsters-search-box"}
          onChangeHandler={onChangeSearch}
          placeholder="Search Monsters"
        />
        <CardList monsters={filterMonsters} />
      </div>
    );
  }
}
