import React, { Component } from 'react';
import placeholder from '../../logo.svg';
import './mainpage.css';
import SearchBar from './searchbar';
import data from '../../data';
import {DropdownToggle, DropdownMenu, DropdownItem, Button, UncontrolledDropdown, Col} from 'reactstrap';
import { Link } from 'react-router-dom';

// This is our Search Results page. Users will be brought here after clicking the 'search' button
// from the Search Bar. There are 'filter by' dropdowns and a 'sort-by' dropdown, followed by the
// search results. As with the main content, I chose to represent the result cards as Buttons. 
// This is rendered in MainPage.

const styles = {
    cardStyles: {
        height: '220px',
        width: '100%',
        marginBottom: '30px'
    }
}

class SearchResults extends Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      data: data
    };
  }
   
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleRenderSearchResults = () => {
      if (!this.props.location.state.searchResults) {
          return <h1>No cars were found!</h1>
      } else {
        return ( this.props.location.state.searchResults.map((car) => {
            return (
             <Col lg="3" md="6" key={car._id}>
                 <Button style={styles.cardStyles} key={car._id}> 
                     <img src={placeholder} style={{ height: '60px' }} />
                     {/* <p>Star Rating {Math.round(car.averageScore * 100) / 100}</p>   */}
                     <p>{Math.round(car.averageScore * 100 / 100)}</p>
                     <p>{car.year} {car.make} {car.model}</p>
                     <p>{car.edition}</p>
                 </Button>
             </Col>
             );
         }))
      }
  }

    render() { 
        return (
            <div>

                <div style={styles.buttonContainerStyles}>
                    <Link style={styles.linkStyles} to='/'>
                        <Button style={styles.buttonStylesMiddle}>Home</Button>
                    </Link>
                </div>

                <SearchBar isLoggedIn={this.props.location.state.isLoggedIn}/>
                <div className="filter-row">
                    <div className="filters"> 
                        <h5>Filter by:</h5>
                        <UncontrolledDropdown className="dropdowns">
                            <DropdownToggle caret>
                                Reviewer
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>TODO:</DropdownItem>
                                <DropdownItem disabled>map reviewers onto this list</DropdownItem>
                                <DropdownItem>IheartPrius</DropdownItem>
                                <DropdownItem>FordStrong</DropdownItem>
                                <DropdownItem>ToyotaJim</DropdownItem>
                                <DropdownItem>MommaJeep</DropdownItem>
                                <DropdownItem>BMWsRcool</DropdownItem>
                                <DropdownItem divider />
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown className="dropdowns">
                            <DropdownToggle caret>
                                Owned
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Rented</DropdownItem>
                                <DropdownItem>Driven</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                    <div className="sort-by">
                        <h5>Sort by:</h5>
                        <UncontrolledDropdown className="dropdowns">
                            <DropdownToggle caret>
                                Reviewer
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Rating Up</DropdownItem>
                                <DropdownItem>Rating Down</DropdownItem>
                                <DropdownItem>Year Up</DropdownItem>
                                <DropdownItem>Year Down</DropdownItem>
                                <DropdownItem>Date of Review</DropdownItem>
                                <DropdownItem divider />
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </div>
                <div>
                   {this.handleRenderSearchResults()}
                </div>
                
            </div>
        );
    }
}
 
export default SearchResults;
