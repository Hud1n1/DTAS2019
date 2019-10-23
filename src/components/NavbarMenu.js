import React, {Component} from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    ButtonGroup,
    Button } from 'reactstrap';


export class NavbarMenu extends Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    render() {
      return (
        <div>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Biblioteka</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
              <ButtonGroup horizontal block size = "lg">
                <Button href='/books'> Książki </Button>
                <Button href='/readers'> Czytelnicy </Button>
              </ButtonGroup>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Kategorie
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem href="/books">
                      Książki
                    </DropdownItem>
                    <DropdownItem href="readers">
                      Czytelnicy
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Wypożycz
                    </DropdownItem>
                    <DropdownItem>
                      Zwróć
                    </DropdownItem>
                    <DropdownItem>
                      Dodaj książkę
                    </DropdownItem>
                    <DropdownItem>
                      Dodaj czytelnika
                    </DropdownItem>
                    <DropdownItem>
                      Szukaj książki
                    </DropdownItem>
                    <DropdownItem>
                      Szukaj czytelnika
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }